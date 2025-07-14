"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Award,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  UserPlus,
  Share2,
  Download,
  Calendar as CalendarIcon,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  type: 'conference' | 'workshop' | 'seminar' | 'training';
  points: number;
  maxAttendees: number;
  currentAttendees: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  registrationDeadline: string;
  fee: number;
  organizer: string;
  isRegistered: boolean;
  attendanceConfirmed: boolean;
}

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    type: 'seminar' as Event['type'],
    points: 0,
    maxAttendees: 0,
    fee: 0,
    organizer: ''
  });

  const events: Event[] = [
    {
      id: 1,
      title: "Cardiology Symposium 2024",
      description: "Latest advances in cardiovascular medicine and interventional cardiology procedures.",
      date: "2024-02-15",
      time: "9:00 AM - 5:00 PM",
      venue: "Ilocos Training Hospital Auditorium",
      type: "conference",
      points: 8,
      maxAttendees: 150,
      currentAttendees: 89,
      status: "upcoming",
      registrationDeadline: "2024-02-10",
      fee: 1500,
      organizer: "INMS Cardiology Committee",
      isRegistered: true,
      attendanceConfirmed: false
    },
    {
      id: 2,
      title: "Emergency Medicine Update",
      description: "Critical care protocols and emergency management techniques for primary care physicians.",
      date: "2024-02-20",
      time: "2:00 PM - 6:00 PM",
      venue: "INMS Conference Room",
      type: "seminar",
      points: 5,
      maxAttendees: 80,
      currentAttendees: 45,
      status: "upcoming",
      registrationDeadline: "2024-02-18",
      fee: 800,
      organizer: "Emergency Medicine Society",
      isRegistered: false,
      attendanceConfirmed: false
    },
    {
      id: 3,
      title: "CPR and Basic Life Support Training",
      description: "Hands-on training for CPR certification and basic life support techniques.",
      date: "2024-01-25",
      time: "8:00 AM - 12:00 PM",
      venue: "Mariano Marcos Memorial Hospital",
      type: "training",
      points: 4,
      maxAttendees: 50,
      currentAttendees: 50,
      status: "completed",
      registrationDeadline: "2024-01-20",
      fee: 500,
      organizer: "INMS Training Committee",
      isRegistered: true,
      attendanceConfirmed: true
    },
    {
      id: 4,
      title: "Pediatric Infectious Diseases Workshop",
      description: "Management of common pediatric infections and antibiotic stewardship.",
      date: "2024-03-05",
      time: "1:00 PM - 5:00 PM",
      venue: "Don Mariano Marcos Memorial Hospital",
      type: "workshop",
      points: 6,
      maxAttendees: 60,
      currentAttendees: 23,
      status: "upcoming",
      registrationDeadline: "2024-03-01",
      fee: 1000,
      organizer: "Pediatric Society of Ilocos Norte",
      isRegistered: false,
      attendanceConfirmed: false
    },
    {
      id: 5,
      title: "Mental Health in Primary Care",
      description: "Screening, diagnosis, and management of mental health conditions in primary care settings.",
      date: "2024-01-15",
      time: "9:00 AM - 4:00 PM",
      venue: "Laoag City Convention Center",
      type: "conference",
      points: 7,
      maxAttendees: 120,
      currentAttendees: 98,
      status: "completed",
      registrationDeadline: "2024-01-10",
      fee: 1200,
      organizer: "INMS Mental Health Committee",
      isRegistered: true,
      attendanceConfirmed: true
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

  const handleRegister = async (eventId: number) => {
    setIsLoading(true);
    // Simulate registration
    setTimeout(() => {
      alert('Successfully registered for the event!');
      setIsLoading(false);
    }, 1000);
  };

  const handleUnregister = async (eventId: number) => {
    setIsLoading(true);
    // Simulate unregistration
    setTimeout(() => {
      alert('Successfully unregistered from the event!');
      setIsLoading(false);
    }, 1000);
  };

  const handleCreateEvent = async () => {
    if (!newEvent.title || !newEvent.date || !newEvent.venue) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    // Simulate event creation
    setTimeout(() => {
      alert('Event created successfully!');
      setNewEvent({
        title: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        type: 'seminar',
        points: 0,
        maxAttendees: 0,
        fee: 0,
        organizer: ''
      });
      setShowCreateEvent(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleShareEvent = (event: Event) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    }
  };

  const handleDownloadCalendar = (event: Event) => {
    // Create ICS file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//INMS//Event//EN
BEGIN:VEVENT
DTSTART:${event.date.replace(/-/g, '')}T${event.time.replace(':', '')}00
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.venue}
END:VEVENT
END:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

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
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <TopBar 
          onMenuClick={() => {}}
          title="Events & CME"
        />
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-600">Continuing Medical Education and Professional Development</p>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="eventTitle">Event Title *</Label>
                        <Input
                          id="eventTitle"
                          value={newEvent.title}
                          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                          placeholder="Enter event title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventType">Event Type</Label>
                        <Select value={newEvent.type} onValueChange={(value: Event['type']) => setNewEvent({...newEvent, type: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conference">Conference</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="seminar">Seminar</SelectItem>
                            <SelectItem value="training">Training</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="eventDescription">Description</Label>
                      <Textarea
                        id="eventDescription"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                        placeholder="Event description"
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="eventDate">Date *</Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventTime">Time</Label>
                        <Input
                          id="eventTime"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                          placeholder="e.g., 9:00 AM - 5:00 PM"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="eventVenue">Venue *</Label>
                      <Input
                        id="eventVenue"
                        value={newEvent.venue}
                        onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                        placeholder="Event venue"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="eventPoints">CME Points</Label>
                        <Input
                          id="eventPoints"
                          type="number"
                          value={newEvent.points}
                          onChange={(e) => setNewEvent({...newEvent, points: parseInt(e.target.value) || 0})}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventCapacity">Max Attendees</Label>
                        <Input
                          id="eventCapacity"
                          type="number"
                          value={newEvent.maxAttendees}
                          onChange={(e) => setNewEvent({...newEvent, maxAttendees: parseInt(e.target.value) || 0})}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventFee">Registration Fee (₱)</Label>
                        <Input
                          id="eventFee"
                          type="number"
                          value={newEvent.fee}
                          onChange={(e) => setNewEvent({...newEvent, fee: parseInt(e.target.value) || 0})}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="eventOrganizer">Organizer</Label>
                      <Input
                        id="eventOrganizer"
                        value={newEvent.organizer}
                        onChange={(e) => setNewEvent({...newEvent, organizer: e.target.value})}
                        placeholder="Event organizer"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setShowCreateEvent(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateEvent} disabled={isLoading}>
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Creating...
                          </div>
                        ) : (
                          'Create Event'
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
                      <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                      <Badge className={getTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.venue}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {event.currentAttendees}/{event.maxAttendees} attendees
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="w-4 h-4 mr-2" />
                      {event.points} CME Points
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm">
                      <span className="font-medium">Fee: </span>
                      <span className="text-green-600">₱{event.fee.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {event.isRegistered ? (
                        <div className="flex items-center space-x-2">
                          {event.attendanceConfirmed ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Attended
                            </Badge>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                <UserPlus className="w-3 h-3 mr-1" />
                                Registered
                              </Badge>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleUnregister(event.id)}
                                disabled={isLoading}
                              >
                                Unregister
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          disabled={event.status !== 'upcoming'} 
                          onClick={() => handleRegister(event.id)}
                        >
                          {isLoading ? 'Registering...' : 'Register'}
                        </Button>
                      )}
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedEvent(event)}>
                            <Eye className="w-4 h-4 mr-1" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{event.title}</DialogTitle>
                          </DialogHeader>
                          {selectedEvent && (
                            <div className="space-y-4">
                              <div className="flex items-center space-x-2">
                                <Badge className={getTypeColor(selectedEvent.type)}>
                                  {selectedEvent.type}
                                </Badge>
                                <Badge className={getStatusColor(selectedEvent.status)}>
                                  {selectedEvent.status}
                                </Badge>
                              </div>
                              
                              <p className="text-gray-700">{selectedEvent.description}</p>
                              
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center text-sm">
                                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>{selectedEvent.date}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>{selectedEvent.time}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>{selectedEvent.venue}</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center text-sm">
                                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>{selectedEvent.currentAttendees}/{selectedEvent.maxAttendees} attendees</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Award className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>{selectedEvent.points} CME Points</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <span className="font-medium">Fee: ₱{selectedEvent.fee.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex justify-between items-center pt-4 border-t">
                                <div className="flex space-x-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleShareEvent(selectedEvent)}
                                  >
                                    <Share2 className="w-4 h-4 mr-1" />
                                    Share
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleDownloadCalendar(selectedEvent)}
                                  >
                                    <Download className="w-4 h-4 mr-1" />
                                    Add to Calendar
                                  </Button>
                                </div>
                                
                                {!selectedEvent.isRegistered && selectedEvent.status === 'upcoming' && (
                                  <Button onClick={() => handleRegister(selectedEvent.id)} disabled={isLoading}>
                                    {isLoading ? 'Registering...' : 'Register Now'}
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Upcoming Events</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {events.filter(e => e.status === 'upcoming').length}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Registered Events</p>
                    <p className="text-2xl font-bold text-green-600">
                      {events.filter(e => e.isRegistered).length}
                    </p>
                  </div>
                  <UserPlus className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Points Earned</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {events.filter(e => e.attendanceConfirmed).reduce((sum, e) => sum + e.points, 0)}
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
                    <p className="text-sm text-gray-600">Events Attended</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {events.filter(e => e.attendanceConfirmed).length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <TopBar 
          onMenuClick={() => {}}
          title="Events & CME"
        />
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-600">Continuing Medical Education and Professional Development</p>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="eventTitle">Event Title *</Label>
                        <Input
                          id="eventTitle"
                          value={newEvent.title}
                          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                          placeholder="Enter event title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventType">Event Type</Label>
                        <Select value={newEvent.type} onValueChange={(value: Event['type']) => setNewEvent({...newEvent, type: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conference">Conference</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="seminar">Seminar</SelectItem>
                            <SelectItem value="training">Training</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="eventDescription">Description</Label>
                      <Textarea
                        id="eventDescription"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                        placeholder="Event description"
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="eventDate">Date *</Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventTime">Time</Label>
                        <Input
                          id="eventTime"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                          placeholder="e.g., 9:00 AM - 5:00 PM"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="eventVenue">Venue *</Label>
                      <Input
                        id="eventVenue"
                        value={newEvent.venue}
                        onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                        placeholder="Event venue"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="eventPoints">CME Points</Label>
                        <Input
                          id="eventPoints"
                          type="number"
                          value={newEvent.points}
                          onChange={(e) => setNewEvent({...newEvent, points: parseInt(e.target.value) || 0})}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventCapacity">Max Attendees</Label>
                        <Input
                          id="eventCapacity"
                          type="number"
                          value={newEvent.maxAttendees}
                          onChange={(e) => setNewEvent({...newEvent, maxAttendees: parseInt(e.target.value) || 0})}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventFee">Registration Fee (₱)</Label>
                        <Input
                          id="eventFee"
                          type="number"
                          value={newEvent.fee}
                          onChange={(e) => setNewEvent({...newEvent, fee: parseInt(e.target.value) || 0})}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="eventOrganizer">Organizer</Label>
                      <Input
                        id="eventOrganizer"
                        value={newEvent.organizer}
                        onChange={(e) => setNewEvent({...newEvent, organizer: e.target.value})}
                        placeholder="Event organizer"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setShowCreateEvent(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateEvent} disabled={isLoading}>
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Creating...
                          </div>
                        ) : (
                          'Create Event'
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
                      <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                      <Badge className={getTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.venue}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {event.currentAttendees}/{event.maxAttendees} attendees
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="w-4 h-4 mr-2" />
                      {event.points} CME Points
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm">
                      <span className="font-medium">Fee: </span>
                      <span className="text-green-600">₱{event.fee.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {event.isRegistered ? (
                        <div className="flex items-center space-x-2">
                          {event.attendanceConfirmed ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Attended
                            </Badge>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                <UserPlus className="w-3 h-3 mr-1" />
                                Registered
                              </Badge>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleUnregister(event.id)}
                                disabled={isLoading}
                              >
                                Unregister
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          disabled={event.status !== 'upcoming'} 
                          onClick={() => handleRegister(event.id)}
                        >
                          {isLoading ? 'Registering...' : 'Register'}
                        </Button>
                      )}
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedEvent(event)}>
                            <Eye className="w-4 h-4 mr-1" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{event.title}</DialogTitle>
                          </DialogHeader>
                          {selectedEvent && (
                            <div className="space-y-4">
                              <div className="flex items-center space-x-2">
                                <Badge className={getTypeColor(selectedEvent.type)}>
                                  {selectedEvent.type}
                                </Badge>
                                <Badge className={getStatusColor(selectedEvent.status)}>
                                  {selectedEvent.status}
                                </Badge>
                              </div>
                              
                              <p className="text-gray-700">{selectedEvent.description}</p>
                              
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center text-sm">
                                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>{selectedEvent.date}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>{selectedEvent.time}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>{selectedEvent.venue}</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center text-sm">
                                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>{selectedEvent.currentAttendees}/{selectedEvent.maxAttendees} attendees</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Award className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>{selectedEvent.points} CME Points</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <span className="font-medium">Fee: ₱{selectedEvent.fee.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex justify-between items-center pt-4 border-t">
                                <div className="flex space-x-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleShareEvent(selectedEvent)}
                                  >
                                    <Share2 className="w-4 h-4 mr-1" />
                                    Share
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleDownloadCalendar(selectedEvent)}
                                  >
                                    <Download className="w-4 h-4 mr-1" />
                                    Add to Calendar
                                  </Button>
                                </div>
                                
                                {!selectedEvent.isRegistered && selectedEvent.status === 'upcoming' && (
                                  <Button onClick={() => handleRegister(selectedEvent.id)} disabled={isLoading}>
                                    {isLoading ? 'Registering...' : 'Register Now'}
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Upcoming Events</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {events.filter(e => e.status === 'upcoming').length}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Registered Events</p>
                    <p className="text-2xl font-bold text-green-600">
                      {events.filter(e => e.isRegistered).length}
                    </p>
                  </div>
                  <UserPlus className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Points Earned</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {events.filter(e => e.attendanceConfirmed).reduce((sum, e) => sum + e.points, 0)}
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
                    <p className="text-sm text-gray-600">Events Attended</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {events.filter(e => e.attendanceConfirmed).length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}