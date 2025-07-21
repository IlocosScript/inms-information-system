"use client";

import { useState } from 'react';
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
import { useMembers } from '@/hooks/useMembers';
import { Member, SearchFilter } from '@/types/api';
import { useAuth } from '@/contexts/AuthContext';

// Using the Member interface from types/api.ts instead of local interface

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [referralContent, setReferralContent] = useState('');
  const [patientDetails, setPatientDetails] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMobileProfile, setShowMobileProfile] = useState<Member | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Search filter
  const filter: SearchFilter = {
    searchTerm: searchQuery || undefined,
    pageNumber: currentPage,
    pageSize,
    sortBy: 'fullName',
    sortDescending: false
  };

  // API hook
  const { data: membersData, loading: isLoading, refetch } = useMembers(filter);

  // Filter members based on search and filters
  const filteredMembers = membersData?.items?.filter(member => {
    const matchesSearch = !searchQuery || 
                         member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.specialty?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.hospital?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = specialtyFilter === 'all' || member.specialty?.name === specialtyFilter;
    const matchesGender = genderFilter === 'all' || member.gender === genderFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && member.status === 1) ||
                         (statusFilter === 'inactive' && member.status === 2);
    
    return matchesSearch && matchesSpecialty && matchesGender && matchesStatus;
  }) || [];

  // Get unique specialties from members data
  const specialties = Array.from(new Set(
    membersData?.items?.map(m => m.specialty?.name).filter(Boolean) || []
  ));

  const handleViewMember = (member: Member) => {
    setSelectedMember(member);
  };

  const handleSendMessage = async () => {
    if (!messageContent.trim() || !selectedMember) return;
    
    // Simulate sending message
    setTimeout(() => {
      alert(`Message sent to ${selectedMember.fullName}!`);
      setMessageContent('');
      setSelectedMember(null);
    }, 1000);
  };

  const handleSendReferral = async () => {
    if (!referralContent.trim() || !patientDetails.trim() || !selectedMember) return;
    
    // Simulate sending referral
    setTimeout(() => {
      alert(`Patient referral sent to ${selectedMember.fullName}!`);
      setReferralContent('');
      setPatientDetails('');
      setSelectedMember(null);
    }, 1000);
  };

  const closeDialog = () => {
    setSelectedMember(null);
    setMessageContent('');
    setReferralContent('');
    setPatientDetails('');
  };

  const { isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Sidebar onDesktopToggle={setSidebarCollapsed} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={() => {}}
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
                    <TableRow key={member.memberId}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {member.fullName.split(' ').map((n: string) => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{member.fullName}</p>
                            <p className="text-sm text-gray-600">{member.membershipType}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{member.birthday ? new Date().getFullYear() - new Date(member.birthday).getFullYear() : 'N/A'}</TableCell>
                      <TableCell>{member.gender}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{member.specialty?.name || 'N/A'}</p>
                          {member.subspecialty?.name && (
                            <p className="text-sm text-gray-600">{member.subspecialty.name}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{member.hospital?.name || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={member.status === 1 ? 'default' : 'secondary'}
                          className={member.status === 1 ? 'bg-green-100 text-green-700' : ''}
                        >
                          {member.status === 1 ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewMember(member)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setSelectedMember(member)}
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setSelectedMember(member)}
                          >
                            <UserPlus className="w-4 h-4 mr-1" />
                            Refer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>

            {/* View Member Dialog */}
            <Dialog open={selectedMember !== null} onOpenChange={closeDialog}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Member Profile
                  </DialogTitle>
                </DialogHeader>
                {selectedMember && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarFallback className="text-lg bg-blue-100 text-blue-600">
                          {(selectedMember.fullName || `${selectedMember.firstName || ''} ${selectedMember.lastName || ''}`)
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold">{selectedMember.name}</h2>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{selectedMember.specialty}</Badge>
                          {selectedMember.subspecialty && (
                            <Badge variant="secondary">{selectedMember.subspecialty}</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span>{selectedMember.age} years old</span>
                          <span>•</span>
                          <span>{selectedMember.gender}</span>
                          <span>•</span>
                          <Badge className={selectedMember.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                            {selectedMember.status}
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
                            <span>{selectedMember.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{selectedMember.email}</span>
                          </div>
                          <div className="flex items-start">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                            <span>{selectedMember.address}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800">Professional Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{selectedMember.hospital?.name || 'N/A'}</span>
                          </div>
                          {selectedMember.clinicAddress && (
                            <div className="flex items-start">
                              <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                              <span>{selectedMember.clinicAddress}</span>
                            </div>
                          )}
                          {selectedMember.clinicHours && (
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-gray-400" />
                              <span>{selectedMember.clinicHours}</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            <span>Member since {selectedMember.joinDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4 border-t">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send Message
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Send Message to {selectedMember.fullName}</DialogTitle>
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
                              <Button variant="outline" onClick={closeDialog}>
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
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Refer Patient
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Refer Patient to {selectedMember.name}</DialogTitle>
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
                              <Button variant="outline" onClick={closeDialog}>
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
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </Card>

          {/* Member Cards View (Alternative) */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Featured Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.slice(0, 6).map((member) => (
                <Card key={member.memberId} className="hover:shadow-lg transition-shadow bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium text-blue-600">
                          {member.fullName.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{member.fullName}</h3>
                        <p className="text-gray-600">{member.specialty?.name || 'N/A'}</p>
                        {member.subspecialty?.name && (
                          <p className="text-sm text-gray-500">{member.subspecialty.name}</p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Age: {member.birthday ? new Date().getFullYear() - new Date(member.birthday).getFullYear() : 'N/A'}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="w-4 h-4 mr-2" />
                        {member.hospital?.name || 'N/A'}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {member.address}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={member.status === 1 ? 'default' : 'secondary'}
                        className={member.status === 1 ? 'bg-green-100 text-green-700' : ''}
                      >
                        {member.status === 1 ? 'Active' : 'Inactive'}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewMember(member)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setSelectedMember(member)}>
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setSelectedMember(member)}>
                          <UserPlus className="w-4 h-4" />
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
              onClose={() => setShowMobileProfile(null)}
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
                    <Button className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full">
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