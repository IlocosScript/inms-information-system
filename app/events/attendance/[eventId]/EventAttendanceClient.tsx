"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  QrCode, 
  UserCheck, 
  Users, 
  CheckCircle, 
  XCircle,
  Search,
  Download,
  Camera,
  Smartphone,
  Monitor,
  Clock,
  Award,
  AlertCircle,
  RefreshCw,
  Plus,
  X
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Role, RegistrationStatus, EventType } from '@/types/api';
import { eventService } from '@/services/eventService';
import { useEvent, useEventRegistrations } from '@/hooks/useEvents';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { MobileDrawer } from '@/components/ui/mobile-drawer';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

interface EventAttendanceClientProps {
  eventId: string;
}

export default function EventAttendanceClient({ eventId }: EventAttendanceClientProps) {
  const numericEventId = parseInt(eventId);
  const [qrInput, setQrInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [attendanceStats, setAttendanceStats] = useState({
    totalRegistered: 0,
    totalAttended: 0,
    attendanceRate: 0
  });
  const [lastScannedMember, setLastScannedMember] = useState<any>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMobileScanner, setShowMobileScanner] = useState(false);
  const [bulkScanMode, setBulkScanMode] = useState(false);
  const [scannedQueue, setScannedQueue] = useState<string[]>([]);
  const isOnline = useOnlineStatus();

  const { data: event, loading: eventLoading } = useEvent(numericEventId);
  const { data: registrations, loading: registrationsLoading, refetch: refetchRegistrations } = useEventRegistrations(numericEventId);

  useEffect(() => {
    if (numericEventId) {
      loadAttendanceStats();
    }
  }, [numericEventId]);

  const loadAttendanceStats = async () => {
    try {
      const stats = await eventService.getEventAttendanceStats(numericEventId);
      setAttendanceStats(stats);
    } catch (error) {
      console.error('Failed to load attendance stats:', error);
    }
  };

  const handleQRScan = async () => {
    if (!qrInput.trim()) {
      alert('Please enter a QR code or member ID');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate QR code scanning - in real implementation, this would decode the QR
      const memberData = await eventService.getMemberByQRCode(qrInput, numericEventId);
      
      if (memberData.registration.status === RegistrationStatus.Attended) {
        alert(`${memberData.member.fullName} is already marked as attended!`);
        setLastScannedMember(memberData);
      } else {
        await eventService.markAttendance(memberData.registration.registrationId);
        setLastScannedMember(memberData);
        await refetchRegistrations();
        await loadAttendanceStats();
        alert(`✅ ${memberData.member.fullName} marked as attended!`);
      }
      
      setQrInput('');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Member not found or not registered for this event');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualAttendance = async (registrationId: number, memberName: string) => {
    setIsLoading(true);
    try {
      await eventService.markAttendance(registrationId);
      await refetchRegistrations();
      await loadAttendanceStats();
      alert(`✅ ${memberName} marked as attended!`);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to mark attendance');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkAttendance = async () => {
    if (selectedMembers.length === 0) {
      alert('Please select members to mark as attended');
      return;
    }

    setIsLoading(true);
    try {
      await eventService.markBulkAttendance(selectedMembers);
      await refetchRegistrations();
      await loadAttendanceStats();
      setSelectedMembers([]);
      alert(`✅ ${selectedMembers.length} members marked as attended!`);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to mark bulk attendance');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkScan = async () => {
    if (scannedQueue.length === 0) {
      alert('No QR codes scanned for bulk processing');
      return;
    }

    setIsLoading(true);
    try {
      const results = [];
      for (const qrCode of scannedQueue) {
        try {
          const memberData = await eventService.getMemberByQRCode(qrCode, numericEventId);
          if (memberData.registration.status !== RegistrationStatus.Attended) {
            await eventService.markAttendance(memberData.registration.registrationId);
            results.push(memberData.member.fullName);
          }
        } catch (error) {
          console.error('Failed to process QR code:', qrCode);
        }
      }
      
      await refetchRegistrations();
      await loadAttendanceStats();
      setScannedQueue([]);
      setBulkScanMode(false);
      alert(`✅ ${results.length} members marked as attended!`);
    } catch (error) {
      alert('Failed to process bulk attendance');
    } finally {
      setIsLoading(false);
    }
  };

  const addToScanQueue = () => {
    if (qrInput.trim() && !scannedQueue.includes(qrInput.trim())) {
      setScannedQueue(prev => [...prev, qrInput.trim()]);
      setQrInput('');
    }
  };

  const handleExportReport = async () => {
    try {
      const blob = await eventService.exportAttendanceReport(numericEventId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${event?.title}-attendance-report.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Failed to export attendance report');
    }
  };

  const toggleMemberSelection = (registrationId: number) => {
    setSelectedMembers(prev => 
      prev.includes(registrationId) 
        ? prev.filter(id => id !== registrationId)
        : [...prev, registrationId]
    );
  };

  const filteredRegistrations = registrations?.filter(reg =>
    reg.member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reg.member.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (eventLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <ProtectedRoute requiredRole={Role.Admin}>
      <div className="min-h-screen bg-gray-50">
        <Sidebar onDesktopToggle={setSidebarCollapsed} />
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <TopBar 
            onMenuClick={() => {}}
            title="Event Attendance"
            showSearch={false}
            sidebarCollapsed={sidebarCollapsed}
          />
          <div className="p-6 pt-20">
            {/* Header */}
            <div className="mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">{event?.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>📅 {event?.eventDate}</span>
                    <span>📍 {event?.venue}</span>
                    <span>🎯 {event?.cmePoints} CME Points</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button onClick={loadAttendanceStats} variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button 
                    onClick={() => setShowMobileScanner(true)} 
                    variant="outline" 
                    className="md:hidden"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Mobile Scanner
                  </Button>
                  <Button onClick={handleExportReport} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Registered</p>
                      <p className="text-2xl font-bold text-blue-600">{attendanceStats.totalRegistered}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Attended</p>
                      <p className="text-2xl font-bold text-green-600">{attendanceStats.totalAttended}</p>
                    </div>
                    <UserCheck className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Attendance Rate</p>
                      <p className="text-2xl font-bold text-purple-600">{attendanceStats.attendanceRate.toFixed(1)}%</p>
                    </div>
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Event Type</p>
                      <p className="text-2xl font-bold text-gray-800">{event?.eventType}</p>
                    </div>
                    <Monitor className="w-8 h-8 text-gray-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Registrations List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Registered Members ({filteredRegistrations.length})
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {selectedMembers.length > 0 && (
                          <Button onClick={handleBulkAttendance} disabled={isLoading}>
                            <UserCheck className="w-4 h-4 mr-2" />
                            Mark {selectedMembers.length} Attended
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedMembers(filteredRegistrations.filter(r => r.status !== RegistrationStatus.Attended).map(r => r.registrationId));
                                } else {
                                  setSelectedMembers([]);
                                }
                              }}
                              checked={selectedMembers.length === filteredRegistrations.filter(r => r.status !== RegistrationStatus.Attended).length}
                            />
                          </TableHead>
                          <TableHead>Member</TableHead>
                          <TableHead>Registration</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRegistrations.map((registration) => (
                          <TableRow key={registration.registrationId}>
                            <TableCell>
                              <input
                                type="checkbox"
                                checked={selectedMembers.includes(registration.registrationId)}
                                onChange={() => toggleMemberSelection(registration.registrationId)}
                                disabled={registration.status === RegistrationStatus.Attended}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarFallback>
                                    {registration.member.firstName[0]}{registration.member.lastName[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{registration.member.fullName}</p>
                                  <p className="text-sm text-gray-600">{registration.member.email}</p>
                                  <p className="text-xs text-gray-500">{registration.member.specialty?.name}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <p>Registered: {registration.registrationDate}</p>
                                {registration.attendanceDate && (
                                  <p className="text-green-600">Attended: {registration.attendanceDate}</p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                className={
                                  registration.status === RegistrationStatus.Attended 
                                    ? 'bg-green-100 text-green-700' 
                                    : registration.status === RegistrationStatus.Registered
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }
                              >
                                {registration.status === RegistrationStatus.Attended && <CheckCircle className="w-3 h-3 mr-1" />}
                                {registration.status === RegistrationStatus.NoShow && <XCircle className="w-3 h-3 mr-1" />}
                                {registration.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {registration.status !== RegistrationStatus.Attended ? (
                                <Button 
                                  size="sm"
                                  onClick={() => handleManualAttendance(registration.registrationId, registration.member.fullName)}
                                  disabled={isLoading}
                                >
                                  <UserCheck className="w-4 h-4 mr-1" />
                                  Mark Attended
                                </Button>
                              ) : (
                                <span className="text-green-600 text-sm font-medium">✅ Attended</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {filteredRegistrations.length === 0 && (
                      <EmptyState
                        icon={Users}
                        title="No registrations found"
                        description="No members match your search criteria"
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* Mobile Scanner Drawer */}
            <MobileDrawer
              isOpen={showMobileScanner}
              onClose={() => setShowMobileScanner(false)}
              title="Mobile QR Scanner"
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mobileQrInput">Scan QR Code</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      id="mobileQrInput"
                      value={qrInput}
                      onChange={(e) => setQrInput(e.target.value)}
                      placeholder="INMS-2024-001234"
                    />
                    <Button onClick={handleQRScan} disabled={isLoading}>
                      {isLoading ? <LoadingSpinner size="sm" /> : <UserCheck className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600">
                    Use your device camera to scan QR codes or enter member ID manually
                  </p>
                </div>
              </div>
            </MobileDrawer>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 