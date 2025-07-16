"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  CreditCard, 
  Award, 
  CheckCircle,
  TrendingUp,
  MessageSquare,
  Bell,
  AlertCircle,
  Settings
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { StatsCard } from '@/components/ui/stats-card';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [attendedEventsCount, setAttendedEventsCount] = useState(12);
  const [dashboardPreferences, setDashboardPreferences] = useLocalStorage('dashboardPreferences', {
    showQuickStats: true,
    showRecentActivities: true,
    showUpcomingEvents: true,
    showAnnouncements: true
  });
  const isOnline = useOnlineStatus();

  // Enhanced analytics data
  const analyticsData = {
    totalPoints: { value: 45, trend: { value: 12, isPositive: true } },
    duesStatus: { value: 'PAID', trend: { value: 0, isPositive: true } },
    eventsAttended: { value: attendedEventsCount, trend: { value: 8, isPositive: true } },
    messages: { value: 3, trend: { value: 2, isPositive: false } },
    monthlyActivity: {
      eventsAttended: 4,
      pointsEarned: 15,
      hoursOfCME: 12,
      networkConnections: 8
    },
    upcomingDeadlines: [
      { type: 'Event Registration', name: 'Cardiology Symposium', date: '2024-02-10', urgent: true },
      { type: 'CME Requirement', name: 'Annual CME Points', date: '2024-12-31', urgent: false },
      { type: 'Dues Payment', name: 'Q2 Assessment', date: '2024-06-30', urgent: false }
    ]
  };
  const recentActivities = [
    {
      id: 1,
      title: "Monthly Medical Conference",
      date: "2024-01-15",
      type: "event",
      points: 5,
      status: "attended"
    },
    {
      id: 2,
      title: "CPR Training Workshop",
      date: "2024-01-10",
      type: "training",
      points: 3,
      status: "attended"
    },
    {
      id: 3,
      title: "Annual Dues Payment",
      date: "2024-01-05",
      type: "payment",
      amount: 2000,
      status: "paid"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Cardiology Symposium",
      date: "2024-02-15",
      time: "9:00 AM",
      venue: "Ilocos Training Hospital",
      points: 8,
      registered: true
    },
    {
      id: 2,
      title: "Emergency Medicine Update",
      date: "2024-02-20",
      time: "2:00 PM",
      venue: "INMS Conference Room",
      points: 5,
      registered: false
    }
  ];

  const announcements = [
    {
      id: 1,
      title: "New CME Requirements for 2024",
      date: "2024-01-20",
      content: "All members must complete 40 CME points this year...",
      priority: "high"
    },
    {
      id: 2,
      title: "Updated Constitution and By-laws",
      date: "2024-01-18",
      content: "The revised constitution is now available...",
      priority: "medium"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onDesktopToggle={setSidebarCollapsed} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={() => {}}
          title="Dashboard"
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6 pt-20">
          {/* Welcome Message */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, Dr. Juan Dela Cruz</h2>
            <p className="text-gray-600">Here's what's happening with your INMS account today.</p>
          </div>

          {/* Quick Stats */}
          {dashboardPreferences.showQuickStats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Points"
                value={analyticsData.totalPoints.value}
                icon={Award}
                trend={analyticsData.totalPoints.trend}
                color="inms-primary"
              />
              <StatsCard
                title="Dues Status"
                value={analyticsData.duesStatus.value}
                icon={CreditCard}
                color="green"
              />
              <StatsCard
                title="Events Attended"
                value={analyticsData.eventsAttended.value}
                icon={Calendar}
                trend={analyticsData.eventsAttended.trend}
                color="inms-accent"
              />
              <StatsCard
                title="Messages"
                value={analyticsData.messages.value}
                icon={MessageSquare}
                trend={analyticsData.messages.trend}
                color="orange"
              />
            </div>
          )}

          {/* Enhanced Analytics Section */}
          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Monthly Activity Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-inms-light rounded-lg">
                    <p className="text-2xl font-bold text-inms-primary">{analyticsData.monthlyActivity.eventsAttended}</p>
                    <p className="text-sm text-gray-600">Events Attended</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{analyticsData.monthlyActivity.pointsEarned}</p>
                    <p className="text-sm text-gray-600">Points Earned</p>
                  </div>
                  <div className="text-center p-4 bg-inms-accent/10 rounded-lg">
                    <p className="text-2xl font-bold text-inms-accent">{analyticsData.monthlyActivity.hoursOfCME}</p>
                    <p className="text-sm text-gray-600">CME Hours</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">{analyticsData.monthlyActivity.networkConnections}</p>
                    <p className="text-sm text-gray-600">New Connections</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          {/* Main Content */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{deadline.name}</p>
                        <p className="text-xs text-gray-600">{deadline.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{deadline.date}</p>
                        <Badge variant={deadline.urgent ? "destructive" : "secondary"} className="text-xs">
                          {deadline.urgent ? "Urgent" : "Upcoming"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-inms-light rounded-full flex items-center justify-center mr-3">
                            {activity.type === 'event' && <Calendar className="w-5 h-5 text-inms-primary" />}
                            {activity.type === 'training' && <Award className="w-5 h-5 text-inms-primary" />}
                            {activity.type === 'payment' && <CreditCard className="w-5 h-5 text-inms-primary" />}
                          </div>
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-gray-600">{activity.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {activity.points && (
                            <Badge variant="secondary">+{activity.points} pts</Badge>
                          )}
                          {activity.amount && (
                            <Badge variant="secondary">₱{activity.amount}</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{event.title}</h3>
                            <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                            <p className="text-sm text-gray-600">{event.venue}</p>
                          </div>
                          <Badge variant="outline">+{event.points} pts</Badge>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            {event.registered ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Registered
                              </Badge>
                            ) : (
                              <Badge variant="outline">Not Registered</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Announcements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Announcements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <div key={announcement.id} className="border-l-4 border-inms-primary pl-4">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm">{announcement.title}</h4>
                          <Badge 
                            className={announcement.priority === 'high' ? 'bg-inms-secondary text-white text-xs' : 'bg-gray-100 text-gray-700 text-xs'}
                          >
                            {announcement.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                        <p className="text-xs text-gray-500 mt-2">{announcement.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Dues Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Dues Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Annual Dues (2024)</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        PAID
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">PMA Dues</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        PAID
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Points Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Points Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Current Points</span>
                        <span className="text-sm font-medium">45/60</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-inms-primary h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">15 more points needed for COGS eligibility</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Advertisements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Sponsored</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-inms-primary to-inms-accent text-white p-4 rounded-lg text-center">
                    <h4 className="font-semibold mb-2">Medical Equipment Sale</h4>
                    <p className="text-sm opacity-90">Up to 30% off on diagnostic equipment</p>
                  </div>
                </CardContent>
              </Card>
              <div className="flex items-center space-x-2">
                <p className="text-gray-600">Here's what's happening with your INMS account today.</p>
                {!isOnline && (
                  <Badge className="bg-inms-secondary text-white text-xs">
                    Offline Mode
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}