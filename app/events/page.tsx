"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Award,
  Clock,
  Search,
  Filter,
  Plus,
  UserCheck,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/types/api';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  type: 'conference' | 'workshop' | 'seminar' | 'training' | 'meeting' | 'social';
  specialty: string;
  cmePoints: number;
  maxCapacity: number;
  registrationFee: number;
  registrationDeadline: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  registrationCount: number;
  isRegistered: boolean;
  canManageAttendance: boolean;
}

export default function EventsPage() {
  const { isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const events: Event[] = [
    {
      id: 1,
      title: "Cardiology Symposium 2024",
      description: "Comprehensive event featuring the latest advances in cardiovascular medicine, interventional cardiology procedures, and case discussions.",
      date: "2024-02-15",
      time: "9:00 AM - 5:00 PM",
      venue: "Ilocos Training Hospital Auditorium",
      type: "conference",
      specialty: "Cardiology",
      cmePoints: 8,
      maxCapacity: 150,
      registrationFee: 1500,
      registrationDeadline: "2024-02-10",
      status: "upcoming",
      registrationCount: 89,
      isRegistered: true,
      canManageAttendance: true
    },
    {
      id: 2,
      title: "Emergency Medicine Update",
      description: "Latest protocols and techniques in emergency medicine practice, focusing on critical care and emergency management.",
      date: "2024-02-20",
      time: "2:00 PM - 6:00 PM",
      venue: "INMS Conference Room",
      type: "seminar",
      specialty: "Emergency Medicine",
      cmePoints: 5,
      maxCapacity: 80,
      registrationFee: 800,
      registrationDeadline: "2024-02-18",
      status: "upcoming",
      registrationCount: 45,
      isRegistered: false,
      canManageAttendance: true
    },
    {
      id: 3,
      title: "CPR and Basic Life Support Training",
      description: "Hands-on training session for CPR and basic life support techniques with certification.",
      date: "2024-01-25",
      time: "8:00 AM - 12:00 PM",
      venue: "Mariano Marcos Memorial Hospital",
      type: "training",
      specialty: "Emergency Medicine",
      cmePoints: 4,
      maxCapacity: 30,
      registrationFee: 500,
      registrationDeadline: "2024-01-20",
      status: "completed",
      registrationCount: 30,
      isRegistered: true,
      canManageAttendance: true
    },
    {
      id: 4,
      title: "Pediatric Infectious Diseases Workshop",
      description: "Workshop covering common pediatric infectious diseases, diagnostic approaches, and treatment protocols.",
      date: "2024-03-05",
      time: "1:00 PM - 5:00 PM",
      venue: "Don Mariano Marcos Memorial Hospital",
      type: "workshop",
      specialty: "Pediatrics",
      cmePoints: 6,
      maxCapacity: 60,
      registrationFee: 1200,
      registrationDeadline: "2024-03-01",
      status: "upcoming",
      registrationCount: 23,
      isRegistered: false,
      canManageAttendance: false
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || event.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'ongoing': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'conference': return 'bg-purple-100 text-purple-700';
      case 'workshop': return 'bg-orange-100 text-orange-700';
      case 'seminar': return 'bg-indigo-100 text-indigo-700';
      case 'training': return 'bg-teal-100 text-teal-700';
      case 'meeting': return 'bg-yellow-100 text-yellow-700';
      case 'social': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <TopBar 
          onMenuClick={() => {}}
          title="Events"
        />
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-600">Discover and register for INMS events and activities</p>
            </div>
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              )}
              <Badge variant="outline" className="text-sm">
                {filteredEvents.length} events found
              </Badge>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Search & Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="search">Search Events</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="search"
                      placeholder="Title, venue, description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="type">Event Type</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="seminar">Seminar</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
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
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                        <Badge variant="outline">
                          <Award className="w-3 h-3 mr-1" />
                          {event.cmePoints} pts
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.venue}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {event.registrationCount}/{event.maxCapacity} registered
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      Registration deadline: {event.registrationDeadline}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm">
                      <span className="font-semibold text-green-600">₱{event.registrationFee.toLocaleString()}</span>
                      <span className="text-gray-600 ml-1">registration fee</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      
                      {event.status === 'upcoming' && !event.isRegistered && (
                        <Button size="sm">
                          Register
                        </Button>
                      )}
                      
                      {event.isRegistered && (
                        <Badge className="bg-green-100 text-green-700">
                          ✓ Registered
                        </Badge>
                      )}

                      {/* Admin Actions */}
                      {isAdmin && (
                        <>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          
                          {(event.status === 'ongoing' || event.status === 'completed') && event.canManageAttendance && (
                            <Link href={`/events/attendance/${event.id}`}>
                              <Button size="sm" variant="outline">
                                <UserCheck className="w-4 h-4 mr-1" />
                                Attendance
                              </Button>
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No events found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}