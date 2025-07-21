"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  CreditCard, 
  Award,
  Settings,
  Shield,
  Bell,
  TrendingUp,
  UserCheck,
  AlertTriangle,
  FileText,
  Database,
  Stethoscope,
  RefreshCw
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { StatsCard } from '@/components/ui/stats-card';
import { useSecurityContext } from '@/components/SecurityProvider';
import { useAuth } from '@/contexts/AuthContext';
import { memberService } from '@/services/memberService';
import { authService } from '@/services/authService';
import { useMutation } from '@/hooks/useApi';
import { Member, User } from '@/types/api';

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, hasRole } = useAuth();
  const [stats] = useState({
    totalMembers: 198,
    activeMembers: 185,
    pendingApplications: 7,
    upcomingEvents: 4,
    totalRevenue: 425000,
    pendingPayments: 23,
    cmePoints: 8945,
    announcements: 12
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pendingMembers, setPendingMembers] = useState<Member[]>([]);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [loadingPending, setLoadingPending] = useState(false);
  const [loadingPendingUsers, setLoadingPendingUsers] = useState(false);
  const { logSecurityEvent } = useSecurityContext();

  const approveMemberMutation = useMutation(memberService.approveMember);
  const approveUserMutation = useMutation(authService.approveUser);

  // Fetch pending members
  const fetchPendingMembers = async () => {
    try {
      setLoadingPending(true);
      const pending = await memberService.getPendingMembers();
      setPendingMembers(pending);
    } catch (error) {
      console.error('Error fetching pending members:', error);
    } finally {
      setLoadingPending(false);
    }
  };

  // Fetch pending users
  const fetchPendingUsers = async () => {
    try {
      setLoadingPendingUsers(true);
      const pending = await authService.getPendingUsers();
      setPendingUsers(pending);
    } catch (error) {
      console.error('Error fetching pending users:', error);
    } finally {
      setLoadingPendingUsers(false);
    }
  };

  // Handle member approval
  const handleApproveMember = async (memberId: number) => {
    try {
      await approveMemberMutation.mutate(memberId);
      // Refresh the pending members list
      await fetchPendingMembers();
      // Update stats
      stats.pendingApplications = Math.max(0, stats.pendingApplications - 1);
      // Show success message
      alert('Member approved successfully!');
    } catch (error) {
      console.error('Error approving member:', error);
      alert('Failed to approve member. Please try again.');
    }
  };

  // Handle user approval
  const handleApproveUser = async (userId: string) => {
    try {
      await approveUserMutation.mutate(userId);
      // Refresh the pending users list
      await fetchPendingUsers();
      // Show success message
      alert('User approved successfully!');
    } catch (error) {
      console.error('Error approving user:', error);
      alert('Failed to approve user. Please try again.');
    }
  };

  // Fetch pending data on component mount
  useEffect(() => {
    fetchPendingMembers();
    fetchPendingUsers();
  }, []);

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

  // Enhanced admin analytics
  const adminAnalytics = {
    systemHealth: {
      uptime: '99.9%',
      responseTime: '120ms',
      errorRate: '0.1%',
      activeUsers: 45
    },
    securityMetrics: {
      loginAttempts: 234,
      failedLogins: 3,
      suspiciousActivity: 0,
      lastSecurityScan: '2024-01-20'
    },
    membershipTrends: {
      newThisMonth: 12,
      renewals: 156,
      churnRate: '2.1%',
      satisfaction: '4.8/5'
    }
  };

  const recentActivities = [
    {
      id: 1,
      type: 'member',
      message: 'New member application from Dr. Sarah Johnson',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'payment',
      message: 'Payment received from Dr. Mark Wilson - Annual Dues',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'event',
      message: 'Cardiology Symposium registration opened',
      time: '1 day ago',
      status: 'active'
    },
    {
      id: 4,
      type: 'announcement',
      message: 'New CME requirements announcement published',
      time: '2 days ago',
      status: 'published'
    }
  ];

  const pendingActions = [
    {
      id: 1,
      title: 'Review Member Applications',
      count: 7,
      priority: 'high',
      action: 'Review'
    },
    {
      id: 2,
      title: 'Approve Event Registrations',
      count: 23,
      priority: 'medium',
      action: 'Approve'
    },
    {
      id: 3,
      title: 'Process COGS Requests',
      count: 5,
      priority: 'high',
      action: 'Process'
    },
    {
      id: 4,
      title: 'Update Member Records',
      count: 12,
      priority: 'low',
      action: 'Update'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Sidebar onDesktopToggle={setSidebarCollapsed} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={() => {}}
          title="Admin Dashboard"
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6 pt-20">
          {/* Welcome Message */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
            <p className="text-gray-600">Manage INMS operations and member services</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Members"
              value={stats.totalMembers}
              icon={Users}
              trend={{ value: 6, isPositive: true }}
              color="blue"
            />
            <StatsCard
              title="Active Members"
              value={stats.activeMembers}
              icon={UserCheck}
              trend={{ value: 3, isPositive: true }}
              color="green"
            />
            <StatsCard
              title="Pending Applications"
              value={stats.pendingApplications}
              icon={AlertTriangle}
              trend={{ value: 2, isPositive: false }}
              color="orange"
            />
            <StatsCard
              title="Total Revenue"
              value={`₱${stats.totalRevenue.toLocaleString()}`}
              icon={TrendingUp}
              trend={{ value: 12, isPositive: true }}
              color="purple"
            />
          </div>

          {/* Quick Access to Member Management */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Member Applications
                </div>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  {pendingMembers.length + pendingUsers.length} pending
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-2">
                    Review and approve new member applications with unified approval system.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>• Users: {pendingUsers.length}</span>
                    <span>• Members: {pendingMembers.length}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => router.push('/admin/members')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Applications
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Health Dashboard */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Uptime</span>
                    <Badge className="bg-green-100 text-green-700">{adminAnalytics.systemHealth.uptime}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Response Time</span>
                    <span className="text-sm font-medium">{adminAnalytics.systemHealth.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Error Rate</span>
                    <span className="text-sm font-medium">{adminAnalytics.systemHealth.errorRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Users</span>
                    <span className="text-sm font-medium">{adminAnalytics.systemHealth.activeUsers}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Login Attempts</span>
                    <span className="text-sm font-medium">{adminAnalytics.securityMetrics.loginAttempts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Failed Logins</span>
                    <Badge variant={adminAnalytics.securityMetrics.failedLogins > 5 ? "destructive" : "secondary"}>
                      {adminAnalytics.securityMetrics.failedLogins}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Suspicious Activity</span>
                    <Badge className="bg-green-100 text-green-700">{adminAnalytics.securityMetrics.suspiciousActivity}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Scan</span>
                    <span className="text-xs text-gray-500">{adminAnalytics.securityMetrics.lastSecurityScan}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Membership Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">New This Month</span>
                    <Badge className="bg-blue-100 text-blue-700">{adminAnalytics.membershipTrends.newThisMonth}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Renewals</span>
                    <span className="text-sm font-medium">{adminAnalytics.membershipTrends.renewals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Churn Rate</span>
                    <span className="text-sm font-medium">{adminAnalytics.membershipTrends.churnRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Satisfaction</span>
                    <Badge className="bg-green-100 text-green-700">{adminAnalytics.membershipTrends.satisfaction}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pending Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Pending Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingActions.map((action) => (
                      <div key={action.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            action.priority === 'high' ? 'bg-red-500' :
                            action.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                          <div>
                            <p className="font-medium">{action.title}</p>
                            <p className="text-sm text-gray-600">{action.count} items pending</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={action.priority === 'high' ? 'destructive' : 'secondary'}>
                            {action.priority}
                          </Badge>
                          <Button size="sm">{action.action}</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'member' ? 'bg-blue-100' :
                          activity.type === 'payment' ? 'bg-green-100' :
                          activity.type === 'event' ? 'bg-purple-100' : 'bg-orange-100'
                        }`}>
                          {activity.type === 'member' && <Users className="w-5 h-5 text-blue-600" />}
                          {activity.type === 'payment' && <CreditCard className="w-5 h-5 text-green-600" />}
                          {activity.type === 'event' && <Calendar className="w-5 h-5 text-purple-600" />}
                          {activity.type === 'announcement' && <Bell className="w-5 h-5 text-orange-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => router.push('/admin/members')}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Manage Members
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Create Event
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Bell className="w-4 h-4 mr-2" />
                      Send Announcement
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Reports
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => router.push('/admin/specialties')}>
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Manage Specialties
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Database className="w-4 h-4 mr-2" />
                      Backup Data
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Shield className="w-4 h-4 mr-2" />
                      Security Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Database</span>
                      <Badge className="bg-green-100 text-green-700">Online</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Payment Gateway</span>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Email Service</span>
                      <Badge className="bg-green-100 text-green-700">Running</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Backup System</span>
                      <Badge className="bg-yellow-100 text-yellow-700">Scheduled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">New Members</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Events Held</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Revenue</span>
                      <span className="font-medium">₱45,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CME Points Awarded</span>
                      <span className="font-medium">156</span>
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