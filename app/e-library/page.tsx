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
  BookOpen, 
  Search, 
  Filter, 
  Download,
  Eye,
  Calendar,
  User,
  FileText,
  Star,
  Heart,
  Share2
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { useSidebarState } from '@/hooks/useSidebarState';

interface LibraryResource {
  id: number;
  title: string;
  author: string;
  category: 'guidelines' | 'textbook' | 'journal' | 'reference' | 'research';
  specialty: string;
  description: string;
  publishDate: string;
  fileSize: string;
  pages: number;
  language: string;
  rating: number;
  downloads: number;
  isBookmarked: boolean;
  tags: string[];
  thumbnail: string;
}

export default function ELibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const { sidebarCollapsed, setSidebarCollapsed, isMobileMenuOpen, setIsMobileMenuOpen, openMobileMenu } = useSidebarState();

  const libraryResources: LibraryResource[] = [
    {
      id: 1,
      title: "Clinical Practice Guidelines for Hypertension Management 2024",
      author: "Philippine Heart Association",
      category: "guidelines",
      specialty: "Cardiology",
      description: "Updated clinical practice guidelines for the diagnosis, evaluation, and management of hypertension in Filipino adults. Includes evidence-based recommendations and treatment algorithms.",
      publishDate: "2024-01-15",
      fileSize: "2.5 MB",
      pages: 45,
      language: "English",
      rating: 4.8,
      downloads: 1234,
      isBookmarked: true,
      tags: ["hypertension", "cardiovascular", "guidelines", "treatment"],
      thumbnail: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 2,
      title: "Pediatric Emergency Medicine Handbook",
      author: "Dr. Maria Santos, MD",
      category: "textbook",
      specialty: "Pediatrics",
      description: "Comprehensive handbook covering common pediatric emergencies, diagnostic approaches, and treatment protocols. Essential reference for emergency physicians and pediatricians.",
      publishDate: "2023-11-20",
      fileSize: "8.7 MB",
      pages: 156,
      language: "English",
      rating: 4.6,
      downloads: 892,
      isBookmarked: false,
      tags: ["pediatrics", "emergency", "handbook", "protocols"],
      thumbnail: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 3,
      title: "Philippine Journal of Internal Medicine - Vol 61, Issue 4",
      author: "Philippine College of Physicians",
      category: "journal",
      specialty: "Internal Medicine",
      description: "Latest research articles and case studies in internal medicine. Features original research on diabetes management, infectious diseases, and clinical innovations.",
      publishDate: "2023-12-01",
      fileSize: "12.3 MB",
      pages: 89,
      language: "English",
      rating: 4.4,
      downloads: 567,
      isBookmarked: true,
      tags: ["internal medicine", "research", "diabetes", "infectious diseases"],
      thumbnail: "https://images.pexels.com/photos/4386468/pexels-photo-4386468.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 4,
      title: "Surgical Techniques in Orthopedic Trauma",
      author: "Dr. Roberto Aquino, MD",
      category: "textbook",
      specialty: "Orthopedics",
      description: "Detailed surgical techniques and approaches for common orthopedic trauma cases. Includes step-by-step procedures with illustrations and post-operative care guidelines.",
      publishDate: "2023-10-15",
      fileSize: "15.2 MB",
      pages: 234,
      language: "English",
      rating: 4.9,
      downloads: 445,
      isBookmarked: false,
      tags: ["orthopedics", "surgery", "trauma", "techniques"],
      thumbnail: "https://images.pexels.com/photos/4386469/pexels-photo-4386469.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 5,
      title: "Mental Health Assessment Tools and Scales",
      author: "Philippine Psychiatric Association",
      category: "reference",
      specialty: "Psychiatry",
      description: "Comprehensive collection of validated mental health assessment tools, screening instruments, and rating scales commonly used in clinical practice.",
      publishDate: "2023-09-30",
      fileSize: "4.1 MB",
      pages: 78,
      language: "English",
      rating: 4.3,
      downloads: 678,
      isBookmarked: true,
      tags: ["psychiatry", "assessment", "mental health", "screening"],
      thumbnail: "https://images.pexels.com/photos/4386470/pexels-photo-4386470.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 6,
      title: "COVID-19 Management Protocols - Updated Guidelines",
      author: "Department of Health Philippines",
      category: "guidelines",
      specialty: "Infectious Disease",
      description: "Latest protocols for COVID-19 patient management, including diagnostic criteria, treatment algorithms, and infection control measures for healthcare facilities.",
      publishDate: "2024-01-08",
      fileSize: "3.8 MB",
      pages: 67,
      language: "English",
      rating: 4.7,
      downloads: 2156,
      isBookmarked: true,
      tags: ["covid-19", "protocols", "infectious disease", "management"],
      thumbnail: "https://images.pexels.com/photos/4386471/pexels-photo-4386471.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 7,
      title: "Research Methodology in Medical Sciences",
      author: "Dr. Ana Gonzales, MD, PhD",
      category: "research",
      specialty: "Research",
      description: "Comprehensive guide to research methodology in medical sciences, covering study design, statistical analysis, and publication guidelines for medical research.",
      publishDate: "2023-08-22",
      fileSize: "6.9 MB",
      pages: 145,
      language: "English",
      rating: 4.5,
      downloads: 334,
      isBookmarked: false,
      tags: ["research", "methodology", "statistics", "publication"],
      thumbnail: "https://images.pexels.com/photos/4386472/pexels-photo-4386472.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 8,
      title: "Obstetric Emergencies: Quick Reference Guide",
      author: "Philippine Obstetrical and Gynecological Society",
      category: "reference",
      specialty: "Obstetrics & Gynecology",
      description: "Quick reference guide for managing obstetric emergencies. Includes decision trees, drug dosages, and emergency procedures for common obstetric complications.",
      publishDate: "2023-07-10",
      fileSize: "2.1 MB",
      pages: 34,
      language: "English",
      rating: 4.6,
      downloads: 789,
      isBookmarked: false,
      tags: ["obstetrics", "emergencies", "reference", "complications"],
      thumbnail: "https://images.pexels.com/photos/4386473/pexels-photo-4386473.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  ];

  const filteredResources = libraryResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
    const matchesSpecialty = specialtyFilter === 'all' || resource.specialty === specialtyFilter;
    
    return matchesSearch && matchesCategory && matchesSpecialty;
  });

  const specialties = Array.from(new Set(libraryResources.map(r => r.specialty)));

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'guidelines': return 'bg-blue-100 text-blue-700';
      case 'textbook': return 'bg-green-100 text-green-700';
      case 'journal': return 'bg-purple-100 text-purple-700';
      case 'reference': return 'bg-orange-100 text-orange-700';
      case 'research': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleDownload = (resource: LibraryResource) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${resource.title}.pdf`;
    link.click();
    console.log(`Downloaded: ${resource.title}`);
  };

  const handleBookmark = (resourceId: number) => {
    console.log(`Bookmarked resource ${resourceId}`);
    // Update bookmark status
  };

  const handleShare = (resource: LibraryResource) => {
    if (navigator.share) {
      navigator.share({
        title: resource.title,
        text: resource.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
            ? 'text-yellow-400 fill-current opacity-50' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

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
          title="E-Library"
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6 pt-20">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-600">Access medical references, guidelines, and educational materials</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                {filteredResources.length} resources found
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
                  <Label htmlFor="search">Search Library</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="search"
                      placeholder="Title, author, keywords..."
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
                      <SelectItem value="guidelines">Guidelines</SelectItem>
                      <SelectItem value="textbook">Textbooks</SelectItem>
                      <SelectItem value="journal">Journals</SelectItem>
                      <SelectItem value="reference">Reference</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All specialties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      {specialties.map(specialty => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className={getCategoryColor(resource.category)}>
                      {resource.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-black bg-opacity-50 text-white text-xs">
                      {resource.pages} pages
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {resource.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {resource.publishDate}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Specialty:</span>
                      <span className="font-medium">{resource.specialty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">File Size:</span>
                      <span className="font-medium">{resource.fileSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Language:</span>
                      <span className="font-medium">{resource.language}</span>
                    </div>
                  </div>

                  {/* Rating and Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      {renderStars(resource.rating)}
                      <span className="text-sm text-gray-600 ml-2">
                        {resource.rating}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {resource.downloads} downloads
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{resource.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleBookmark(resource.id)}
                        className="p-2"
                      >
                        <Heart className={`w-4 h-4 ${resource.isBookmarked ? 'text-red-500 fill-current' : ''}`} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleShare(resource)}
                        className="p-2"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="p-2">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleDownload(resource)}
                        className="p-2"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No resources found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Resources</p>
                    <p className="text-2xl font-bold text-blue-600">{libraryResources.length}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Guidelines</p>
                    <p className="text-2xl font-bold text-green-600">
                      {libraryResources.filter(r => r.category === 'guidelines').length}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Textbooks</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {libraryResources.filter(r => r.category === 'textbook').length}
                    </p>
                  </div>
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Downloads</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {libraryResources.reduce((sum, r) => sum + r.downloads, 0).toLocaleString()}
                    </p>
                  </div>
                  <Download className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}