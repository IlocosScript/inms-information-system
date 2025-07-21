"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  UserCheck,
  Search,
  Filter,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Stethoscope,
  Award,
  Clock
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { useSecurityContext } from '@/components/SecurityProvider';
import { useAuth } from '@/contexts/AuthContext';
import { memberService } from '@/services/memberService';
import { authService } from '@/services/authService';
import { useMutation } from '@/hooks/useApi';
import { Member, User } from '@/types/api';

interface PendingApplication {
  user: User;
  member: Member | null;
  isUserApproved: boolean;
  isMemberApproved: boolean;
}

export default function MemberManagementPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, hasRole } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pendingApplications, setPendingApplications] = useState<PendingApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved'>('all');
  const { logSecurityEvent } = useSecurityContext();

  const approveUserMutation = useMutation(authService.approveUser);
  const approveMemberMutation = useMutation(memberService.approveMember);

  // Route protection for admin
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/');
        return;
      }
      if (!hasRole('Admin')) {
        router.push('/dashboard');
        return;
      }
    }
  }, [isAuthenticated, authLoading, hasRole, router]);

  // Fetch all pending applications
  const fetchPendingApplications = async () => {
    try {
      setLoading(true);
      
      // Fetch both pending users and members
      const [pendingUsers, pendingMembers] = await Promise.all([
        authService.getPendingUsers(),
        memberService.getPendingMembers()
      ]);

      // Create a map of user email to member data
      const memberMap = new Map();
      pendingMembers.forEach(member => {
        memberMap.set(member.email.toLowerCase(), member);
      });

      // Combine user and member data
      const applications: PendingApplication[] = pendingUsers.map(user => ({
        user,
        member: memberMap.get(user.email.toLowerCase()) || null,
        isUserApproved: false,
        isMemberApproved: false
      }));

      setPendingApplications(applications);
    } catch (error) {
      console.error('Error fetching pending applications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Unified approval function
  const handleUnifiedApproval = async (application: PendingApplication) => {
    try {
      const promises = [];

      // Approve user if not already approved
      if (!application.isUserApproved) {
        promises.push(approveUserMutation.mutate(application.user.id));
      }

      // Approve member if exists and not already approved
      if (application.member && !application.isMemberApproved) {
        promises.push(approveMemberMutation.mutate(application.member.memberId));
      }

      await Promise.all(promises);

      // Update local state
      setPendingApplications(prev => 
        prev.map(app => 
          app.user.id === application.user.id 
            ? { ...app, isUserApproved: true, isMemberApproved: true }
            : app
        )
      );

      alert('Application approved successfully!');
      
      // Refresh the list after a short delay
      setTimeout(() => {
        fetchPendingApplications();
      }, 1000);

    } catch (error) {
      console.error('Error approving application:', error);
      alert('Failed to approve application. Please try again.');
    }
  };

  // Debug function to check user roles
  const debugUserRoles = (user: User) => {
    console.log('User ID:', user.id);
    console.log('User Email:', user.email);
    console.log('User Roles:', user.roles);
    console.log('User Active:', user.isActive);
    console.log('Has Member Role:', user.roles?.includes('Member'));
    console.log('Has Member/member Role:', user.roles?.includes('Member/member'));
    console.log('All Roles:', user.roles);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPendingApplications();
  }, []);

  // Filter applications based on search and status
  const filteredApplications = pendingApplications.filter(app => {
    const matchesSearch = 
      app.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.member?.pmaNumber || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'pending' && (!app.isUserApproved || !app.isMemberApproved)) ||
      (filterStatus === 'approved' && app.isUserApproved && app.isMemberApproved);

    return matchesSearch && matchesStatus;
  });

  // Show loading while auth is initializing
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Don't render if not authenticated or not admin
  if (!isAuthenticated || !hasRole('Admin')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        onDesktopToggle={(isCollapsed) => setSidebarCollapsed(isCollapsed)}
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={() => {}}
          title="Member Management"
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6 pt-20">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Member Management</h2>
            <p className="text-gray-600">Review and approve member applications</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Pending</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {pendingApplications.filter(app => !app.isUserApproved || !app.isMemberApproved).length}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Users Only</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {pendingApplications.filter(app => !app.isUserApproved && !app.member).length}
                    </p>
                  </div>
                  <UserCheck className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Complete Profiles</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {pendingApplications.filter(app => app.member && !app.isMemberApproved).length}
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Approved Today</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {pendingApplications.filter(app => app.isUserApproved && app.isMemberApproved).length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search by name, email, or PMA number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="border rounded-md px-3 py-2 text-sm"
                    >
                      <option value="all">All Applications</option>
                      <option value="pending">Pending Approval</option>
                      <option value="approved">Approved</option>
                    </select>
                  </div>
                </div>

                <Button
                  onClick={fetchPendingApplications}
                  disabled={loading}
                  variant="outline"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Applications List */}
          <div className="space-y-4">
            {loading ? (
              <Card>
                <CardContent className="p-12">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    <span className="ml-2 text-gray-600">Loading applications...</span>
                  </div>
                </CardContent>
              </Card>
            ) : filteredApplications.length === 0 ? (
              <Card>
                <CardContent className="p-12">
                  <div className="text-center">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No applications found</p>
                    <p className="text-sm text-gray-500">
                      {searchTerm || filterStatus !== 'all' 
                        ? 'Try adjusting your search or filters' 
                        : 'All applications have been processed'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              filteredApplications.map((application) => (
                <Card key={application.user.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {application.user.firstName.charAt(0)}{application.user.lastName.charAt(0)}
                            </span>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {application.user.fullName}
                              </h3>
                              <div className="flex items-center space-x-1">
                                {application.isUserApproved && (
                                  <Badge className="bg-green-100 text-green-700">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    User Approved
                                  </Badge>
                                )}
                                {application.member && application.isMemberApproved && (
                                  <Badge className="bg-blue-100 text-blue-700">
                                    <Award className="w-3 h-3 mr-1" />
                                    Member Approved
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span>{application.user.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>{application.user.phoneNumber}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4" />
                                <span>Joined {new Date(application.user.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>

                            {/* Member-specific info */}
                            {application.member && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                                  <Stethoscope className="w-4 h-4 mr-2" />
                                  Medical Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium">PMA Number:</span>
                                    <span className="ml-2">{application.member.pmaNumber}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium">License:</span>
                                    <span className="ml-2">{application.member.licenseNumber}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium">Specialty:</span>
                                    <span className="ml-2">{application.member.specialty?.name || 'Not specified'}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium">Gender:</span>
                                    <span className="ml-2 capitalize">{application.member.gender}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium">Birthday:</span>
                                    <span className="ml-2">{application.member.birthday ? new Date(application.member.birthday).toLocaleDateString() : 'Not specified'}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium">Address:</span>
                                    <span className="ml-2">{application.member.address}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col items-end space-y-2 ml-6">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {application.member ? 'Complete Profile' : 'User Only'}
                          </p>
                          <p className="text-xs text-gray-400">
                            {application.isUserApproved && application.isMemberApproved 
                              ? 'Fully Approved' 
                              : 'Pending Approval'}
                          </p>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          {(!application.isUserApproved || (application.member && !application.isMemberApproved)) ? (
                            <Button
                              onClick={() => handleUnifiedApproval(application)}
                              disabled={approveUserMutation.loading || approveMemberMutation.loading}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              {(approveUserMutation.loading || approveMemberMutation.loading) ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              ) : (
                                <CheckCircle className="w-4 h-4 mr-2" />
                              )}
                              Approve All
                            </Button>
                          ) : (
                            <Badge className="bg-green-100 text-green-700">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approved
                            </Badge>
                          )}
                          
                          {/* Debug button */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => debugUserRoles(application.user)}
                            className="text-xs"
                          >
                            Debug Roles
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 