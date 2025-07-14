"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Camera, 
  Search, 
  Filter, 
  Calendar,
  Eye,
  Download,
  Heart,
  Share2,
  MapPin,
  Users,
  WifiOff,
  Upload,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  date: string;
  event: string;
  venue: string;
  photographer: string;
  category: 'conference' | 'workshop' | 'social' | 'awards' | 'community';
  images: string[];
  likes: number;
  views: number;
  isLiked: boolean;
}

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Cardiology Symposium 2024 Highlights",
      description: "Key moments from the annual cardiology symposium featuring renowned speakers and interactive sessions.",
      date: "2024-01-15",
      event: "Cardiology Symposium 2024",
      venue: "Ilocos Training Hospital Auditorium",
      photographer: "INMS Media Team",
      category: "conference",
      images: [
        "https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7089021/pexels-photo-7089021.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7089022/pexels-photo-7089022.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      likes: 45,
      views: 234,
      isLiked: true
    },
    {
      id: 2,
      title: "CPR Training Workshop",
      description: "Hands-on CPR and basic life support training session for INMS members.",
      date: "2024-01-25",
      event: "CPR and Basic Life Support Training",
      venue: "Mariano Marcos Memorial Hospital",
      photographer: "Dr. Ana Gonzales",
      category: "workshop",
      images: [
        "https://images.pexels.com/photos/7089023/pexels-photo-7089023.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7089024/pexels-photo-7089024.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      likes: 32,
      views: 156,
      isLiked: false
    },
    {
      id: 3,
      title: "INMS Annual Christmas Party 2023",
      description: "Celebrating the holiday season with INMS members and their families.",
      date: "2023-12-15",
      event: "INMS Christmas Party",
      venue: "Laoag City Convention Center",
      photographer: "Event Photography Services",
      category: "social",
      images: [
        "https://images.pexels.com/photos/7089025/pexels-photo-7089025.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7089026/pexels-photo-7089026.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7089027/pexels-photo-7089027.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7089028/pexels-photo-7089028.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      likes: 78,
      views: 445,
      isLiked: true
    },
    {
      id: 4,
      title: "Outstanding Member Awards 2023",
      description: "Recognizing excellence in medical practice and community service.",
      date: "2023-11-20",
      event: "INMS Awards Night",
      venue: "Java Hotel Laoag",
      photographer: "INMS Media Team",
      category: "awards",
      images: [
        "https://images.pexels.com/photos/7089029/pexels-photo-7089029.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7089030/pexels-photo-7089030.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      likes: 56,
      views: 289,
      isLiked: false
    },
    {
      id: 5,
      title: "Medical Mission in Rural Ilocos Norte",
      description: "INMS members providing free medical services to underserved communities.",
      date: "2023-10-10",
      event: "Community Medical Mission",
      venue: "Barangay San Mateo, Dingras",
      photographer: "Dr. Roberto Aquino",
      category: "community",
      images: [
        "https://images.pexels.com/photos/7089031/pexels-photo-7089031.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7089032/pexels-photo-7089032.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7089033/pexels-photo-7089033.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      likes: 92,
      views: 567,
      isLiked: true
    },
    {
      id: 6,
      title: "Emergency Medicine Update Seminar",
      description: "Latest protocols and techniques in emergency medicine practice.",
      date: "2023-09-15",
      event: "Emergency Medicine Update",
      venue: "INMS Conference Room",
      photographer: "Emergency Medicine Society",
      category: "conference",
      images: [
        "https://images.pexels.com/photos/7089034/pexels-photo-7089034.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7089035/pexels-photo-7089035.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      likes: 28,
      views: 178,
      isLiked: false
    }
  ];

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.event.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesYear = yearFilter === 'all' || item.date.startsWith(yearFilter);
    
    return matchesSearch && matchesCategory && matchesYear;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'conference': return 'bg-blue-100 text-blue-700';
      case 'workshop': return 'bg-green-100 text-green-700';
      case 'social': return 'bg-purple-100 text-purple-700';
      case 'awards': return 'bg-yellow-100 text-yellow-700';
      case 'community': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleLike = (itemId: number) => {
    console.log(`Liked item ${itemId}`);
    // Update like status
  };

  const handleShare = (item: GalleryItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = (imageUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title}.jpg`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <TopBar 
          onMenuClick={() => {}}
          title="Gallery"
        />
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-600">Capturing moments from INMS events and activities</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                {filteredItems.length} albums found
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
                  <Label htmlFor="search">Search Gallery</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="search"
                      placeholder="Event name, description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="awards">Awards</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Select value={yearFilter} onValueChange={setYearFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => setSelectedImage(item.images[0])}
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className={getCategoryColor(item.category)}>
                      {item.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-black bg-opacity-50 text-white">
                      {item.images.length} photos
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.date}
                    </div>
                    <div className="flex items-center">
                      <Camera className="w-4 h-4 mr-1" />
                      {item.photographer}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="font-medium">Event:</span>
                      <span className="ml-1">{item.event}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="font-medium">Venue:</span>
                      <span className="ml-1">{item.venue}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Heart className={`w-4 h-4 mr-1 ${item.isLiked ? 'text-red-500 fill-current' : ''}`} />
                        {item.likes}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {item.views}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleLike(item.id)}
                      >
                        <Heart className={`w-4 h-4 ${item.isLiked ? 'text-red-500 fill-current' : ''}`} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleShare(item)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownload(item.images[0], item.title)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Camera className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No photos found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}

          {/* Image Modal */}
          {selectedImage && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-4xl max-h-full">
                <img
                  src={selectedImage}
                  alt="Gallery image"
                  className="max-w-full max-h-full object-contain"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-4 right-4 bg-white"
                  onClick={() => setSelectedImage(null)}
                >
                  ✕
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}