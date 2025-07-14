"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Bell, 
  Calendar, 
  User, 
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Eye,
  Share2,
  Bookmark,
  BookmarkCheck,
  Plus,
  Send,
  Archive,
  Pin,
  Edit,
  Trash2
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

interface Announcement {
  id: number;
  title: string;
  content: string;
  type: 'event' | 'general' | 'urgent' | 'dues' | 'cme';
  priority: 'high' | 'medium' | 'low';
  author: string;
  publishDate: string;
  eventDate?: string;
  eventVenue?: string;
  attendanceResponse?: 'attending' | 'not_attending' | 'pending';
  isRead: boolean;
  emailSent: boolean;
  attachments?: string[];
}

export default function AnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [showCreateAnnouncement, setShowCreateAnnouncement] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    type: 'general' as Announcement['type'],
    priority: 'medium' as Announcement['priority'],
    eventDate: '',
    eventVenue: ''
  });

  const announcements: Announcement[] = [
    {
      id: 1,
      title: "Cardiology Symposium 2024 - Registration Open",
      content: "We are pleased to announce that registration is now open for the Cardiology Symposium 2024. This comprehensive event will feature the latest advances in cardiovascular medicine, interventional cardiology procedures, and case discussions. The symposium will be held at the Ilocos Training Hospital Auditorium and will provide 8 CME points for attendees. Early bird registration is available until February 10, 2024. Please confirm your attendance by clicking the button below.",
      type: "event",
      priority: "high",
      author: "Dr. Maria Santos",
      publishDate: "2024-01-20",
      eventDate: "2024-02-15",
      eventVenue: "Ilocos Training Hospital Auditorium",
      attendanceResponse: "attending",
      isRead: true,
      emailSent: true
    },
    {
      id: 2,
      title: "Annual Dues Payment Reminder",
      content: "This is a friendly reminder that the annual INMS membership dues for 2024 are now due. The payment deadline is March 31, 2024. Members who have not settled their dues by the deadline will be temporarily marked as inactive, and their INMS ID QR codes will be deactivated. Please settle your dues through the online payment system or visit the INMS office. For questions regarding your dues status, please contact the secretariat.",
      type: "dues",
      priority: "high",
      author: "INMS Secretariat",
      publishDate: "2024-01-18",
      attendanceResponse: "pending",
      isRead: false,
      emailSent: true
    },
    {
      id: 3,
      title: "New CME Requirements for 2024",
      content: "The Philippine Medical Association has updated the CME requirements for 2024. All practicing physicians are now required to complete a minimum of 40 CME points annually, with at least 20 points from Category 1 activities. The INMS will be organizing various CME activities throughout the year to help members meet these requirements. Please track your CME points through the INMS portal and ensure compliance with the new guidelines.",
      type: "cme",
      priority: "medium",
      author: "Dr. Roberto Aquino",
      publishDate: "2024-01-15",
      isRead: true,
      emailSent: true
    },
    {
      id: 4,
      title: "Emergency Medicine Update Seminar",
      content: "Join us for an important seminar on Emergency Medicine Updates, focusing on critical care protocols and emergency management techniques for primary care physicians. This seminar will cover the latest guidelines in emergency medicine, trauma management, and life-saving procedures. The event will provide 5 CME points and includes hands-on training sessions.",
      type: "event",
      priority: "medium",
      author: "Emergency Medicine Society",
      publishDate: "2024-01-12",
      eventDate: "2024-02-20",
      eventVenue: "INMS Conference Room",
      attendanceResponse: "not_attending",
      isRead: true,
      emailSent: true
    },
    {
      id: 5,
      title: "INMS Constitution and By-laws Updated",
      content: "The INMS Constitution and By-laws have been revised and updated to reflect current practices and regulations. All members are encouraged to review the updated document, which is now available in the INMS portal under the Constitution section. Key changes include updated membership categories, dues structure, and disciplinary procedures. The updated constitution will take effect on February 1, 2024.",
      type: "general",
      priority: "medium",
      author: "INMS Board of Directors",
      publishDate: "2024-01-10",
      isRead: false,
      emailSent: true
    },
    {
      id: 6,
      title: "URGENT: COVID-19 Protocol Updates",
      content: "Important updates to COVID-19 protocols for healthcare workers. New guidelines from the Department of Health regarding patient management, PPE requirements, and vaccination protocols. All members must review and implement these protocols immediately. Additional training sessions will be scheduled for next week.",
      type: "urgent",
      priority: "high",
      author: "DOH Ilocos Norte",
      publishDate: "2024-01-08",
      isRead: true,
      emailSent: true,
      attachments: ["covid-protocol-2024.pdf", "ppe-guidelines.pdf"]
    }
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || announcement.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || announcement.priority === priorityFilter;
    
    return matchesSearch && matchesType && matchesPriority;
  });

  const handleAttendanceResponse = (announcementId: number, response: 'attending' | 'not_attending') => {
    setIsLoading(true);
    setTimeout(() => {
      alert(`Response recorded: ${response === 'attending' ? 'Will attend' : 'Cannot attend'}`);
      setIsLoading(false);
    }, 500);
  };

  const markAsRead = (announcementId: number) => {
    console.log(`Marking announcement ${announcementId} as read`);
    // Update announcement read status
  };

  const handleBookmark = (announcementId: number) => {
    console.log(`Bookmarking announcement ${announcementId}`);
    // Toggle bookmark status
  };

  const handleShare = (announcement: Announcement) => {
    if (navigator.share) {
      navigator.share({
        title: announcement.title,
        text: announcement.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Announcement link copied to clipboard!');
    }
  };

  const handleCreateAnnouncement = async () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    // Simulate announcement creation
    setTimeout(() => {
      alert('Announcement created successfully!');
      setNewAnnouncement({
        title: '',
        content: '',
        type: 'general',
        priority: 'medium',
        eventDate: '',
        eventVenue: ''
      });
      setShowCreateAnnouncement(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleArchive = (announcementId: number) => {
    console.log(`Archiving announcement ${announcementId}`);
    // Archive announcement
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event': return 'bg-blue-100 text-blue-700';
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'dues': return 'bg-orange-100 text-orange-700';
      case 'cme': return 'bg-purple-100 text-purple-700';
      case 'general': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <TopBar 
          onMenuClick={() => {}}
          title="Announcements"
        />
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-600">Stay updated with INMS news and events</p>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={showCreateAnnouncement} onOpenChange={setShowCreateAnnouncement}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Announcement
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Announcement</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="announcementTitle">Title *</Label>
                      <Input
                        id="announcementTitle"
                        value={newAnnouncement.title}
                        onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                        placeholder="Announcement title"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="announcementContent">Content *</Label>
                      <Textarea
                        id="announcementContent"
                        value={newAnnouncement.content}
                        onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                        placeholder="Announcement content"
                        rows={5}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="announcementType">Type</Label>
                        <Select value={newAnnouncement.type} onValueChange={(value: Announcement['type']) => setNewAnnouncement({...newAnnouncement, type: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="event">Event</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                            <SelectItem value="dues">Dues</SelectItem>
                            <SelectItem value="cme">CME</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="announcementPriority">Priority</Label>
                        <Select value={newAnnouncement.priority} onValueChange={(value: Announcement['priority']) => setNewAnnouncement({...newAnnouncement, priority: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {newAnnouncement.type === 'event' && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="eventDate">Event Date</Label>
                          <Input
                            id="eventDate"
                            type="date"
                            value={newAnnouncement.eventDate}
                            onChange={(e) => setNewAnnouncement({...newAnnouncement, eventDate: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="eventVenue">Event Venue</Label>
                          <Input
                            id="eventVenue"
                            value={newAnnouncement.eventVenue}
                            onChange={(e) => setNewAnnouncement({...newAnnouncement, eventVenue: e.target.value})}
                            placeholder="Event venue"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setShowCreateAnnouncement(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateAnnouncement} disabled={isLoading}>
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Publishing...
                          </div>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Publish
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Badge variant="outline" className="text-sm">
                {filteredAnnouncements.length} announcements
              </Badge>
              <Badge variant="destructive" className="text-sm">
                {announcements.filter(a => !a.isRead).length} unread
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
                  <Label htmlFor="search">Search Announcements</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="search"
                      placeholder="Title, content, author..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="dues">Dues</SelectItem>
                      <SelectItem value="cme">CME</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All priorities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Announcements List */}
          <div className="space-y-6">
            {filteredAnnouncements.map((announcement) => (
              <Card 
                key={announcement.id} 
                className={`hover:shadow-lg transition-shadow ${
                  !announcement.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        {!announcement.isRead && (
                          <Badge variant="destructive" className="text-xs">
                            NEW
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {announcement.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {announcement.publishDate}
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {announcement.emailSent ? 'Email sent' : 'Email pending'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getTypeColor(announcement.type)}>
                        {announcement.type}
                      </Badge>
                      <Badge className={getPriorityColor(announcement.priority)}>
                        {announcement.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {announcement.content}
                  </p>

                  {/* Event Details */}
                  {announcement.eventDate && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold mb-2">Event Details:</h4>
                      <div className="grid md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                          <span>Date: {announcement.eventDate}</span>
                        </div>
                        {announcement.eventVenue && (
                          <div className="flex items-center">
                            <Bell className="w-4 h-4 mr-2 text-blue-600" />
                            <span>Venue: {announcement.eventVenue}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Attachments */}
                  {announcement.attachments && announcement.attachments.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Attachments:</h4>
                      <div className="space-y-1">
                        {announcement.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center text-sm text-blue-600 hover:underline cursor-pointer">
                            <Eye className="w-4 h-4 mr-2" />
                            {attachment}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleBookmark(announcement.id)}
                      >
                        <Bookmark className="w-4 h-4 mr-1" />
                        Bookmark
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleShare(announcement)}
                      >
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      {!announcement.isRead && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => markAsRead(announcement.id)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Mark as Read
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleArchive(announcement.id)}
                      >
                        <Archive className="w-4 h-4 mr-1" />
                        Archive
                      </Button>
                    </div>

                    {/* Attendance Response for Events */}
                    {announcement.type === 'event' && announcement.eventDate && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 mr-2">Will you attend?</span>
                        {announcement.attendanceResponse === 'attending' ? (
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Attending
                          </Badge>
                        ) : announcement.attendanceResponse === 'not_attending' ? (
                          <Badge className="bg-red-100 text-red-700">
                            <XCircle className="w-3 h-3 mr-1" />
                            Not Attending
                          </Badge>
                        ) : (
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              disabled={isLoading}
                              onClick={() => handleAttendanceResponse(announcement.id, 'attending')}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              {isLoading ? 'Updating...' : 'Attend'}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              disabled={isLoading}
                              onClick={() => handleAttendanceResponse(announcement.id, 'not_attending')}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Can't Attend
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAnnouncements.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No announcements found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}