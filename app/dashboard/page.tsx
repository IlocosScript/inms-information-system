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
  Bell
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <TopBar 
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title="Dashboard"
        />
        
        <div className="p-6">
          {/* Welcome Message */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, Dr. Juan Dela Cruz</h2>
            <p className="text-gray-600">Here's what's happening with your INMS account today.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Points</p>
                    <p className="text-2xl font-bold text-blue-600">45</p>
                  </div>
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Dues Status</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      PAID
                    </Badge>
                  </div>
                  <CreditCard className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Events Attended</p>
                    <p className="text-2xl font-bold text-purple-600">12</p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Messages</p>
                    <p className="text-2xl font-bold text-orange-600">3</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
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
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            {activity.type === 'event' && <Calendar className="w-5 h-5 text-blue-600" />}
                            {activity.type === 'training' && <Award className="w-5 h-5 text-blue-600" />}
                            {activity.type === 'payment' && <CreditCard className="w-5 h-5 text-blue-600" />}
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
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
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
                      <div key={announcement.id} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm">{announcement.title}</h4>
                          <Badge 
                            variant={announcement.priority === 'high' ? 'destructive' : 'secondary'}
                            className="text-xs"
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
                      <Progress value={75} className="h-2" />
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
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg text-center">
                    <h4 className="font-semibold mb-2">Medical Equipment Sale</h4>
                    <p className="text-sm opacity-90">Up to 30% off on diagnostic equipment</p>
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