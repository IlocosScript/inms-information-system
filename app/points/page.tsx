"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Award, 
  Calendar, 
  TrendingUp, 
  CheckCircle, 
  Clock,
  FileText,
  Download,
  Target,
  Star
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

interface PointsActivity {
  id: number;
  activity: string;
  type: 'conference' | 'workshop' | 'seminar' | 'training' | 'research';
  date: string;
  points: number;
  status: 'confirmed' | 'pending' | 'rejected';
  venue: string;
  organizer: string;
  year: number;
  certificate?: string;
}

export default function PointsPage() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [cogsRequested, setCogsRequested] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const pointsActivities: PointsActivity[] = [
    {
      id: 1,
      activity: "Cardiology Symposium 2024",
      type: "conference",
      date: "2024-01-15",
      points: 8,
      status: "confirmed",
      venue: "Ilocos Training Hospital",
      organizer: "INMS Cardiology Committee",
      year: 2024,
      certificate: "CERT-2024-001"
    },
    {
      id: 2,
      activity: "CPR and Basic Life Support Training",
      type: "training",
      date: "2024-01-25",
      points: 4,
      status: "confirmed",
      venue: "Mariano Marcos Memorial Hospital",
      organizer: "INMS Training Committee",
      year: 2024,
      certificate: "CERT-2024-002"
    },
    {
      id: 3,
      activity: "Emergency Medicine Update",
      type: "seminar",
      date: "2024-02-20",
      points: 5,
      status: "pending",
      venue: "INMS Conference Room",
      organizer: "Emergency Medicine Society",
      year: 2024
    },
    {
      id: 4,
      activity: "Mental Health in Primary Care",
      type: "conference",
      date: "2024-01-15",
      points: 7,
      status: "confirmed",
      venue: "Laoag City Convention Center",
      organizer: "INMS Mental Health Committee",
      year: 2024,
      certificate: "CERT-2024-003"
    },
    {
      id: 5,
      activity: "Pediatric Infectious Diseases Workshop",
      type: "workshop",
      date: "2024-03-05",
      points: 6,
      status: "confirmed",
      venue: "Don Mariano Marcos Memorial Hospital",
      organizer: "Pediatric Society of Ilocos Norte",
      year: 2024,
      certificate: "CERT-2024-004"
    },
    {
      id: 6,
      activity: "Research Methodology Workshop",
      type: "research",
      date: "2023-11-20",
      points: 5,
      status: "confirmed",
      venue: "MMSU Medical Center",
      organizer: "INMS Research Committee",
      year: 2023,
      certificate: "CERT-2023-015"
    },
    {
      id: 7,
      activity: "Diabetes Management Seminar",
      type: "seminar",
      date: "2023-10-15",
      points: 4,
      status: "confirmed",
      venue: "Laoag City Health Office",
      organizer: "Endocrine Society",
      year: 2023,
      certificate: "CERT-2023-012"
    }
  ];

  const filteredActivities = pointsActivities.filter(activity => 
    selectedYear === 'all' || activity.year.toString() === selectedYear
  );

  const totalPoints = filteredActivities
    .filter(activity => activity.status === 'confirmed')
    .reduce((sum, activity) => sum + activity.points, 0);

  const pendingPoints = filteredActivities
    .filter(activity => activity.status === 'pending')
    .reduce((sum, activity) => sum + activity.points, 0);

  // This will be automatically updated when attendance is marked via the API
  // The backend should create CMEPoint records when attendance is confirmed

  const cogsRequirement = 60; // Points needed for COGS
  const cogsProgress = (totalPoints / cogsRequirement) * 100;
  const isEligibleForCogs = totalPoints >= cogsRequirement;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'conference': return 'bg-purple-100 text-purple-700';
      case 'workshop': return 'bg-orange-100 text-orange-700';
      case 'seminar': return 'bg-indigo-100 text-indigo-700';
      case 'training': return 'bg-teal-100 text-teal-700';
      case 'research': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleRequestCogs = () => {
    if (!isEligibleForCogs) {
      alert(`You need ${cogsRequirement - totalPoints} more points to be eligible for COGS.`);
      return;
    }
    
    setCogsRequested(true);
    alert('COGS request submitted! Admin will review and approve your certificate.');
  };

  const downloadCertificate = (certificateId: string) => {
    // Simulate certificate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `Certificate-${certificateId}.pdf`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar onDesktopToggle={setSidebarCollapsed} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={() => {}}
          title="Points & Certification"
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6 pt-20">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-600">Track your CME points and certification progress</p>
            </div>
            <div className="flex items-center space-x-4">
              <Label htmlFor="year">Filter by Year:</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Points ({selectedYear})</p>
                    <p className="text-2xl font-bold text-blue-600">{totalPoints}</p>
                  </div>
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Points</p>
                    <p className="text-2xl font-bold text-yellow-600">{pendingPoints}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Activities Attended</p>
                    <p className="text-2xl font-bold text-green-600">
                      {filteredActivities.filter(a => a.status === 'confirmed').length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">COGS Status</p>
                    <Badge className={isEligibleForCogs ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                      {isEligibleForCogs ? 'Eligible' : 'In Progress'}
                    </Badge>
                  </div>
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Points Activities */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Points Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Activity</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredActivities.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{activity.activity}</p>
                              <p className="text-sm text-gray-600">{activity.venue}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getTypeColor(activity.type)}>
                              {activity.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                              {activity.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Award className="w-4 h-4 mr-2 text-blue-600" />
                              <span className="font-medium">{activity.points}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(activity.status)}>
                              <div className="flex items-center">
                                {getStatusIcon(activity.status)}
                                <span className="ml-1">{activity.status}</span>
                              </div>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {activity.certificate && activity.status === 'confirmed' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => downloadCertificate(activity.certificate!)}
                              >
                                <Download className="w-4 h-4 mr-1" />
                                Certificate
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* COGS Progress & Request */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    COGS Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Current Points</span>
                        <span className="text-sm font-medium">{totalPoints}/{cogsRequirement}</span>
                      </div>
                      <Progress value={Math.min(cogsProgress, 100)} className="h-3" />
                      <p className="text-xs text-gray-600 mt-1">
                        {isEligibleForCogs 
                          ? 'You are eligible for COGS!' 
                          : `${cogsRequirement - totalPoints} more points needed`
                        }
                      </p>
                    </div>

                    <div className="pt-4 border-t">
                      <Button 
                        className="w-full" 
                        onClick={handleRequestCogs}
                        disabled={!isEligibleForCogs || cogsRequested}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        {cogsRequested ? 'COGS Requested' : 'Request COGS'}
                      </Button>
                      
                      {cogsRequested && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-700">
                            Your COGS request has been submitted and is pending admin approval.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Points Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Points Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['conference', 'workshop', 'seminar', 'training', 'research'].map(type => {
                      const typePoints = filteredActivities
                        .filter(a => a.type === type && a.status === 'confirmed')
                        .reduce((sum, a) => sum + a.points, 0);
                      
                      if (typePoints === 0) return null;
                      
                      return (
                        <div key={type} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Badge className={getTypeColor(type)} variant="outline">
                              {type}
                            </Badge>
                          </div>
                          <span className="font-medium">{typePoints} pts</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* COGS Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    About COGS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p className="text-gray-600">
                      Certificate of Good Standing (COGS) is issued to members who have:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Accumulated 60+ CME points</li>
                      <li>Paid all dues and fees</li>
                      <li>Active membership status</li>
                      <li>No pending disciplinary actions</li>
                    </ul>
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs text-yellow-700">
                        <strong>Note:</strong> COGS is not considered official unless it bears the dry seal of the INMS.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}