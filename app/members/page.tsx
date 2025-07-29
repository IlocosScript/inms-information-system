"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  Search, 
  Filter, 
  Eye, 
  MessageSquare, 
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Calendar, 
  Send,
  X,
  Building,
  Clock,
  Stethoscope,
  User,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { MobileDrawer } from '@/components/ui/mobile-drawer';

interface Member {
  id: number;
  name: string;
  age: number;
  gender: string;
  specialty: string;
  subspecialty?: string;
  hospital: string;
  contact: string;
  email: string;
  address: string;
  status: 'active' | 'inactive';
  membershipType: 'regular' | 'senior' | 'emeritus';
  joinDate: string;
  avatar?: string;
  clinicAddress?: string;
  clinicHours?: string;
}

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [referralContent, setReferralContent] = useState('');
  const [patientDetails, setPatientDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMobileProfile, setShowMobileProfile] = useState<Member | null>(null);
  
  // Modal stack management
  const [modalStack, setModalStack] = useState<Array<{
    type: 'view' | 'message' | 'referral';
    member: Member;
  }>>([]);
  const [currentModal, setCurrentModal] = useState<{
    type: 'view' | 'message' | 'referral';
    member: Member;
  } | null>(null);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const members: Member[] = [
    {
      id: 1,
      name: 'Dr. Juan Dela Cruz',
      age: 45,
      gender: 'Male',
      specialty: 'Internal Medicine',
      subspecialty: 'Cardiology',
      hospital: 'Ilocos Training Hospital',
      contact: '+63 917 123 4567',
      email: 'juan.delacruz@example.com',
      address: 'Laoag City, Ilocos Norte',
      status: 'active',
      membershipType: 'regular',
      joinDate: '2020-01-15',
      clinicAddress: 'Medical Arts Building, Room 205',
      clinicHours: 'Mon-Fri: 2:00 PM - 6:00 PM'
    },
    {
      id: 2,
      name: 'Dr. Maria Santos',
      age: 38,
      gender: 'Female',
      specialty: 'Pediatrics',
      hospital: 'Mariano Marcos Memorial Hospital',
      contact: '+63 917 987 6543',
      email: 'maria.santos@example.com',
      address: 'Batac City, Ilocos Norte',
      status: 'active',
      membershipType: 'regular',
      joinDate: '2021-03-22',
      clinicAddress: 'Pediatric Center, 3rd Floor',
      clinicHours: 'Mon-Sat: 9:00 AM - 5:00 PM'
    },
    {
      id: 3,
      name: 'Dr. Roberto Aquino',
      age: 52,
      gender: 'Male',
      specialty: 'Surgery',
      subspecialty: 'Orthopedics',
      hospital: 'Ilocos Training Hospital',
      contact: '+63 917 555 0123',
      email: 'roberto.aquino@example.com',
      address: 'Vigan City, Ilocos Sur',
      status: 'active',
      membershipType: 'senior',
      joinDate: '2018-07-10',
      clinicAddress: 'Orthopedic Clinic, Ground Floor',
      clinicHours: 'Tue-Thu: 1:00 PM - 7:00 PM'
    },
    {
      id: 4,
      name: 'Dr. Carmen Reyes',
      age: 42,
      gender: 'Female',
      specialty: 'Obstetrics & Gynecology',
      hospital: 'Don Mariano Marcos Memorial Hospital',
      contact: '+63 917 444 5678',
      email: 'carmen.reyes@example.com',
      address: 'Laoag City, Ilocos Norte',
      status: 'active',
      membershipType: 'regular',
      joinDate: '2019-11-05',
      clinicAddress: 'Women\'s Health Center, 2nd Floor',
      clinicHours: 'Mon-Fri: 8:00 AM - 4:00 PM'
    },
    {
      id: 5,
      name: 'Dr. Eduardo Fernandez',
      age: 65,
      gender: 'Male',
      specialty: 'Internal Medicine',
      hospital: 'Retired',
      contact: '+63 917 333 2222',
      email: 'eduardo.fernandez@example.com',
      address: 'San Nicolas, Ilocos Norte',
      status: 'inactive',
      membershipType: 'emeritus',
      joinDate: '1995-04-12',
      clinicAddress: 'Retired',
      clinicHours: 'N/A'
    }
  ];

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = specialtyFilter === 'all' || member.specialty === specialtyFilter;
    const matchesGender = genderFilter === 'all' || member.gender === genderFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesSpecialty && matchesGender && matchesStatus;
  });

  const specialties = Array.from(new Set(members.map(m => m.specialty)));

  const openModal = (type: 'view' | 'message' | 'referral', member: Member) => {
    if (isMobile) {
      // On mobile, show mobile profile for view, or use mobile drawer for message/referral
      if (type === 'view') {
        setShowMobileProfile(member);
      } else {
        // For message/referral on mobile, still use modal but don't show mobile profile
        if (currentModal) {
          setModalStack(prev => [...prev, currentModal]);
        }
        setCurrentModal({ type, member });
        setSelectedMember(member);
      }
    } else {
      // On desktop, use modal stack
      if (currentModal) {
        setModalStack(prev => [...prev, currentModal]);
      }
      setCurrentModal({ type, member });
      setSelectedMember(member);
    }
  };

  const closeCurrentModal = () => {
    if (modalStack.length > 0) {
      // If there are modals in stack, restore the previous one
      const previousModal = modalStack[modalStack.length - 1];
      setCurrentModal(previousModal);
      setSelectedMember(previousModal.member);
      setModalStack(prev => prev.slice(0, -1));
    } else {
      // No more modals in stack, close everything
      setCurrentModal(null);
      setSelectedMember(null);
      setMessageContent('');
      setReferralContent('');
      setPatientDetails('');
    }
  };

  const closeMobileProfile = () => {
    setShowMobileProfile(null);
  };

  const closeAllModals = () => {
    setCurrentModal(null);
    setSelectedMember(null);
    setModalStack([]);
    setMessageContent('');
    setReferralContent('');
    setPatientDetails('');
  };

  const handleViewMember = (member: Member) => {
    openModal('view', member);
  };

  const handleSendMessage = async () => {
    if (!messageContent.trim() || !currentModal) return;
    
    setIsLoading(true);
    // Simulate sending message
    setTimeout(() => {
      alert(`Message sent to ${currentModal.member.name}!`);
      setMessageContent('');
      closeCurrentModal();
      setIsLoading(false);
    }, 1000);
  };

  const handleSendReferral = async () => {
    if (!referralContent.trim() || !patientDetails.trim() || !currentModal) return;
    
    setIsLoading(true);
    // Simulate sending referral
    setTimeout(() => {
      alert(`Patient referral sent to ${currentModal.member.name}!`);
      setReferralContent('');
      setPatientDetails('');
      closeCurrentModal();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar 
        isMobileOpen={isMobileMenuOpen}
        onMobileToggle={setIsMobileMenuOpen}
        onDesktopToggle={setSidebarCollapsed} 
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={() => setIsMobileMenuOpen(true)}
          title="Members Directory"
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6 pt-20">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-600">Connect with fellow medical professionals</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                {filteredMembers.length} members found
              </Badge>
              <Button 
                variant="outline" 
                className="md:hidden"
                onClick={() => setShowMobileFilters(true)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Search & Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="search">Search Members</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="search"
                      placeholder="Name, specialty, hospital..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All specialties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      {specialties.map(specialty => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={genderFilter} onValueChange={setGenderFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All genders" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genders</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Members Table */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Members List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Hospital</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.membershipType}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{member.age}</TableCell>
                      <TableCell>{member.gender}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{member.specialty}</p>
                          {member.subspecialty && (
                            <p className="text-sm text-gray-600">{member.subspecialty}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{member.hospital}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={member.status === 'active' ? 'default' : 'secondary'}
                          className={member.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => openModal('view', member)} className="group relative">
                            <Eye className="w-4 h-4" />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              View
                            </span>
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => openModal('message', member)} className="group relative">
                            <MessageSquare className="w-4 h-4" />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              Message
                            </span>
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => openModal('referral', member)} className="group relative">
                            <UserPlus className="w-4 h-4" />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              Refer
                            </span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>

            {/* Unified Modal Dialog */}
            <Dialog open={currentModal !== null} onOpenChange={closeCurrentModal}>
              <DialogContent className="max-w-2xl">
                {currentModal && (
                  <>
                    {currentModal.type === 'view' && (
                      <>
                        <DialogHeader>
                          <DialogTitle className="flex items-center">
                            <User className="w-5 h-5 mr-2" />
                            Member Profile
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          {/* Header */}
                          <div className="flex items-start space-x-4">
                            <Avatar className="w-20 h-20">
                              <AvatarFallback className="text-lg bg-blue-100 text-blue-600">
                                {currentModal.member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h2 className="text-xl font-semibold">{currentModal.member.name}</h2>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline">{currentModal.member.specialty}</Badge>
                                {currentModal.member.subspecialty && (
                                  <Badge variant="secondary">{currentModal.member.subspecialty}</Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                <span>{currentModal.member.age} years old</span>
                                <span>•</span>
                                <span>{currentModal.member.gender}</span>
                                <span>•</span>
                                <Badge className={currentModal.member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                                  {currentModal.member.status}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* Contact Information */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <h3 className="font-semibold text-gray-800">Contact Information</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center">
                                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                  <span>{currentModal.member.contact}</span>
                                </div>
                                <div className="flex items-center">
                                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                  <span>{currentModal.member.email}</span>
                                </div>
                                <div className="flex items-start">
                                  <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                                  <span>{currentModal.member.address}</span>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <h3 className="font-semibold text-gray-800">Professional Details</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center">
                                  <Building className="w-4 h-4 mr-2 text-gray-400" />
                                  <span>{currentModal.member.hospital}</span>
                                </div>
                                {currentModal.member.clinicAddress && (
                                  <div className="flex items-start">
                                    <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                                    <span>{currentModal.member.clinicAddress}</span>
                                  </div>
                                )}
                                {currentModal.member.clinicHours && (
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>{currentModal.member.clinicHours}</span>
                                  </div>
                                )}
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                  <span>Member since {currentModal.member.joinDate}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex justify-end space-x-3 pt-4 border-t">
                            <Button variant="outline" onClick={() => openModal('message', currentModal.member)}>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Send Message
                            </Button>
                            <Button onClick={() => openModal('referral', currentModal.member)}>
                              <UserPlus className="w-4 h-4 mr-2" />
                              Refer Patient
                            </Button>
                          </div>
                        </div>
                      </>
                    )}

                    {currentModal.type === 'message' && (
                      <>
                        <DialogHeader>
                          <DialogTitle>Send Message to {currentModal.member.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              placeholder="Type your message here..."
                              value={messageContent}
                              onChange={(e) => setMessageContent(e.target.value)}
                              rows={4}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={closeCurrentModal}>
                              Cancel
                            </Button>
                            <Button onClick={handleSendMessage} disabled={isLoading || !messageContent.trim()}>
                              {isLoading ? (
                                <div className="flex items-center">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Sending...
                                </div>
                              ) : (
                                <>
                                  <Send className="w-4 h-4 mr-2" />
                                  Send Message
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </>
                    )}

                    {currentModal.type === 'referral' && (
                      <>
                        <DialogHeader>
                          <DialogTitle>Refer Patient to {currentModal.member.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="patientDetails">Patient Details</Label>
                            <Textarea
                              id="patientDetails"
                              placeholder="Patient name, age, chief complaint, relevant history..."
                              value={patientDetails}
                              onChange={(e) => setPatientDetails(e.target.value)}
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label htmlFor="referralReason">Referral Reason & Notes</Label>
                            <Textarea
                              id="referralReason"
                              placeholder="Reason for referral, specific questions, urgency level..."
                              value={referralContent}
                              onChange={(e) => setReferralContent(e.target.value)}
                              rows={3}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={closeCurrentModal}>
                              Cancel
                            </Button>
                            <Button 
                              onClick={handleSendReferral} 
                              disabled={isLoading || !referralContent.trim() || !patientDetails.trim()}
                            >
                              {isLoading ? (
                                <div className="flex items-center">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Sending...
                                </div>
                              ) : (
                                <>
                                  <Send className="w-4 h-4 mr-2" />
                                  Send Referral
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </DialogContent>
            </Dialog>
          </Card>

          {/* Member Cards View (Alternative) */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Featured Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.slice(0, 6).map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-shadow bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium text-blue-600">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-gray-600">{member.specialty}</p>
                        {member.subspecialty && (
                          <p className="text-sm text-gray-500">{member.subspecialty}</p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Age: {member.age}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="w-4 h-4 mr-2" />
                        {member.hospital}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {member.address}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={member.status === 'active' ? 'default' : 'secondary'}
                        className={member.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                      >
                        {member.status}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => openModal('view', member)} className="group relative">
                          <Eye className="w-4 h-4" />
                          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            View
                          </span>
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openModal('message', member)} className="group relative">
                          <MessageSquare className="w-4 h-4" />
                          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            Message
                          </span>
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openModal('referral', member)} className="group relative">
                          <UserPlus className="w-4 h-4" />
                          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            Refer
                          </span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Mobile Filters Drawer */}
            <MobileDrawer
              isOpen={showMobileFilters}
              onClose={() => setShowMobileFilters(false)}
              title="Filter Members"
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mobileSearch">Search Members</Label>
                  <Input
                    id="mobileSearch"
                    placeholder="Name, specialty, hospital..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="mobileSpecialty">Specialty</Label>
                  <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All specialties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      {specialties.map(specialty => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="mobileGender">Gender</Label>
                  <Select value={genderFilter} onValueChange={setGenderFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All genders" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genders</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => setShowMobileFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </MobileDrawer>

            {/* Mobile Member Profile Drawer */}
            <MobileDrawer
              isOpen={showMobileProfile !== null}
              onClose={closeMobileProfile}
              title="Member Profile"
            >
              {showMobileProfile && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-lg font-medium text-blue-600">
                        {showMobileProfile.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">{showMobileProfile.name}</h3>
                    <p className="text-gray-600">{showMobileProfile.specialty}</p>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Hospital:</span>
                      <p className="text-gray-600">{showMobileProfile.hospital}</p>
                    </div>
                    <div>
                      <span className="font-medium">Contact:</span>
                      <p className="text-gray-600">{showMobileProfile.contact}</p>
                    </div>
                    <div>
                      <span className="font-medium">Email:</span>
                      <p className="text-gray-600">{showMobileProfile.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full" onClick={() => openModal('message', showMobileProfile)}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => openModal('referral', showMobileProfile)}>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Refer Patient
                    </Button>
                  </div>
                </div>
              )}
            </MobileDrawer>
        </div>
      </div>
    </div>
  );
}