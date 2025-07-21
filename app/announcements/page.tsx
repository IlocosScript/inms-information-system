"use client";

import { useState, useEffect } from 'react';
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
import { useAuth } from '@/contexts/AuthContext';
import { announcementService } from '@/services/announcementService';

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    type: 'general' as Announcement['type'],
    priority: 'medium' as Announcement['priority'],
    eventDate: '',
    eventVenue: ''
  });
  const { user } = useAuth();
  const isAdmin = user?.roles?.some(role => ['admin', 'dev'].includes(role.toLowerCase()));
  const [sendEmail, setSendEmail] = useState(true);
  const [expiryDate, setExpiryDate] = useState('');
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any | null>(null);

  const fetchAnnouncements = async (page = pageNumber, size = pageSize) => {
    setApiLoading(true);
    setApiError(null);
    try {
      const result = await announcementService.getAnnouncements({
        pageNumber: page,
        pageSize: size,
        searchTerm: searchQuery || undefined,
      });
      setAnnouncements(result.items || []);
      setTotalPages(result.totalPages || 1);
      setTotalCount(result.totalCount || 0);
    } catch (err: any) {
      setApiError('Failed to load announcements.');
    } finally {
      setApiLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    // eslint-disable-next-line
  }, [pageNumber, pageSize]);

  // Enum mapping
  const typeLabels: Record<number, string> = {
    1: 'General', 2: 'Event', 3: 'Urgent', 4: 'Dues', 5: 'CME'
  };
  const typeColors: Record<number, string> = {
    1: 'bg-gray-100 text-gray-700',
    2: 'bg-blue-100 text-blue-700',
    3: 'bg-red-100 text-red-700',
    4: 'bg-orange-100 text-orange-700',
    5: 'bg-purple-100 text-purple-700',
  };
  const priorityLabels: Record<number, string> = {
    1: 'Low', 2: 'Medium', 3: 'High'
  };
  const priorityColors: Record<number, string> = {
    1: 'bg-green-100 text-green-700',
    2: 'bg-yellow-100 text-yellow-700',
    3: 'bg-red-100 text-red-700',
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (announcement.author?.fullName || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || typeLabels[announcement.type]?.toLowerCase() === typeFilter;
    const matchesPriority = priorityFilter === 'all' || priorityLabels[announcement.priority]?.toLowerCase() === priorityFilter;
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

  // Open modal for editing
  const handleEditClick = (announcement: any) => {
    setEditingAnnouncement(announcement);
    setShowCreateAnnouncement(true);
    setNewAnnouncement({
      title: announcement.title,
      content: announcement.content,
      type: typeLabels[announcement.type]?.toLowerCase() || 'general',
      priority: priorityLabels[announcement.priority]?.toLowerCase() || 'medium',
      eventDate: announcement.eventDate ? announcement.eventDate.slice(0, 10) : '',
      eventVenue: announcement.eventVenue || ''
    });
    setExpiryDate(announcement.expiryDate ? announcement.expiryDate.slice(0, 10) : '');
    setSendEmail(!!announcement.isEmailSent);
  };

  // Reset modal state
  const resetModal = () => {
    setShowCreateAnnouncement(false);
    setEditingAnnouncement(null);
    setNewAnnouncement({
      title: '',
      content: '',
      type: 'general',
      priority: 'medium',
      eventDate: '',
      eventVenue: ''
    });
    setExpiryDate('');
    setSendEmail(true);
  };

  // Create or update
  const handleCreateAnnouncement = async () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      alert('Please fill in all required fields');
      return;
    }
    setIsLoading(true);
    try {
      // Map UI values to backend enums
      const typeMap: Record<string, number> = {
        general: 1, event: 2, urgent: 3, dues: 4, cme: 5
      };
      const priorityMap: Record<string, number> = {
        low: 1, medium: 2, high: 3
      };
      const payload = {
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        type: typeMap[newAnnouncement.type],
        priority: priorityMap[newAnnouncement.priority],
        eventDate: newAnnouncement.eventDate ? new Date(newAnnouncement.eventDate).toISOString() : undefined,
        eventVenue: newAnnouncement.eventVenue || undefined,
        expiryDate: expiryDate ? new Date(expiryDate).toISOString() : undefined,
        sendEmail,
      };
      if (editingAnnouncement) {
        // Update
        await announcementService.updateAnnouncement(editingAnnouncement.announcementId, {
          title: newAnnouncement.title,
          content: newAnnouncement.content,
          type: typeMap[newAnnouncement.type],
          priority: priorityMap[newAnnouncement.priority],
          eventDate: newAnnouncement.eventDate ? new Date(newAnnouncement.eventDate).toISOString() : undefined,
          eventVenue: newAnnouncement.eventVenue || undefined,
          expiryDate: expiryDate ? new Date(expiryDate).toISOString() : undefined,
          status: editingAnnouncement.status || 1
        });
        alert('Announcement updated successfully!');
      } else {
        // Create
        await announcementService.createAnnouncement(payload);
        alert('Announcement created successfully!');
      }
      resetModal();
      fetchAnnouncements(1, pageSize);
      setPageNumber(1);
    } catch (err) {
      alert('Failed to save announcement.');
    } finally {
      setIsLoading(false);
    }
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
    <div className="min-h-screen bg-white">
      <Sidebar onDesktopToggle={setSidebarCollapsed} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={() => {}}
          title="Announcements"
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6 pt-20">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-600">Stay updated with INMS news and events</p>
            </div>
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <Dialog open={showCreateAnnouncement} onOpenChange={open => { setShowCreateAnnouncement(open); if (!open) resetModal(); }}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Announcement
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}</DialogTitle>
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
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            type="date"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center mt-6">
                          <input
                            id="sendEmail"
                            type="checkbox"
                            checked={sendEmail}
                            onChange={e => setSendEmail(e.target.checked)}
                            className="mr-2"
                          />
                          <Label htmlFor="sendEmail">Send Email</Label>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={resetModal}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateAnnouncement} disabled={isLoading}>
                          {isLoading ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              {editingAnnouncement ? 'Saving...' : 'Publishing...'}
                            </div>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              {editingAnnouncement ? 'Save Changes' : 'Publish'}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <Badge variant="outline" className="text-sm">
                {filteredAnnouncements.length} announcements
              </Badge>
              <Badge variant="destructive" className="text-sm">
                {announcements.filter(a => !a.isRead).length} unread
              </Badge>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">
              Showing page {pageNumber} of {totalPages} ({totalCount} total)
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" disabled={pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)}>
                Previous
              </Button>
              <Button size="sm" variant="outline" disabled={pageNumber === totalPages} onClick={() => setPageNumber(pageNumber + 1)}>
                Next
              </Button>
              <select
                className="border rounded px-2 py-1 text-sm"
                value={pageSize}
                onChange={e => { setPageSize(Number(e.target.value)); setPageNumber(1); }}
              >
                {[5, 10, 20, 50].map(size => (
                  <option key={size} value={size}>{size} per page</option>
                ))}
              </select>
            </div>
          </div>

          {/* Loading/Error States */}
          {apiLoading && (
            <Card><CardContent className="text-center py-12">Loading announcements...</CardContent></Card>
          )}
          {apiError && (
            <Card><CardContent className="text-center py-12 text-red-600">{apiError}</CardContent></Card>
          )}

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
          {!apiLoading && !apiError && filteredAnnouncements.map((announcement) => (
            <Card 
              key={announcement.announcementId} 
              className={`hover:shadow-lg transition-shadow ${!announcement.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''}`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-lg">{announcement.title}</CardTitle>
                      {!announcement.isRead && (
                        <Badge variant="destructive" className="text-xs">NEW</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {announcement.author?.fullName || 'Unknown'}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {announcement.publishDate ? new Date(announcement.publishDate).toLocaleDateString() : ''}
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {announcement.isEmailSent ? 'Email sent' : 'Email pending'}
                      </div>
                    </div>
                  </div>
                  <Badge className={typeColors[announcement.type]}>
                    {typeLabels[announcement.type] || 'Unknown'}
                  </Badge>
                  <Badge className={priorityColors[announcement.priority]}>
                    {priorityLabels[announcement.priority] || 'Unknown'}
                  </Badge>
                  {isAdmin && (
                    <Button size="sm" variant="outline" className="ml-2" onClick={() => handleEditClick(announcement)}>
                      <Edit className="w-4 h-4 mr-1" /> Edit
                    </Button>
                  )}
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
                        <span>Date: {new Date(announcement.eventDate).toLocaleDateString()}</span>
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
                      {announcement.attachments.map((attachment: string, index: number) => (
                        <div key={index} className="flex items-center text-sm text-blue-600 hover:underline cursor-pointer">
                          <Eye className="w-4 h-4 mr-2" />
                          {attachment}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Action Buttons (bookmark/share/etc.) can remain as before */}
                <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleBookmark(announcement.announcementId)}
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
                          onClick={() => markAsRead(announcement.announcementId)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Mark as Read
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleArchive(announcement.announcementId)}
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
                              onClick={() => handleAttendanceResponse(announcement.announcementId, 'attending')}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              {isLoading ? 'Updating...' : 'Attend'}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              disabled={isLoading}
                              onClick={() => handleAttendanceResponse(announcement.announcementId, 'not_attending')}
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

          {!apiLoading && !apiError && filteredAnnouncements.length === 0 && (
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