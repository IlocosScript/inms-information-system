"use client";

import { useState } from 'react';
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
  Database
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { useSidebarState } from '@/hooks/useSidebarState';
import { StatsCard } from '@/components/ui/stats-card';
import { useSecurityContext } from '@/components/SecurityProvider';

export default function AdminPage() {
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
  const { sidebarCollapsed, setSidebarCollapsed, isMobileMenuOpen, setIsMobileMenuOpen, openMobileMenu } = useSidebarState();
  const { logSecurityEvent } = useSecurityContext();

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
      <Sidebar 
        isMobileOpen={isMobileMenuOpen}
        onMobileToggle={setIsMobileMenuOpen}
        onDesktopToggle={setSidebarCollapsed} 
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={openMobileMenu}
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
                    <Button className="w-full justify-start" variant="outline">
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