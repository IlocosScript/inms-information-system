"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Building,
  Stethoscope,
  Clock,
  Edit,
  Shield,
  Award,
  CreditCard,
  QrCode
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function ViewProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Route protection
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, authLoading, router]);

  // Show loading while auth is initializing
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Use real user data with fallbacks
  const memberData = {
    id: user?.id || "INMS-2024-001234",
    name: user ? `${user.firstName} ${user.lastName}` : "Dr. Juan Dela Cruz",
    email: user?.email || "juan.delacruz@example.com",
    phone: user?.phoneNumber || "+63 917 123 4567",
    age: 45, // Not in user data, keeping default
    gender: "Male", // Not in user data, keeping default
    birthday: "March 15, 1979", // Not in user data, keeping default
    address: "123 Rizal Street, Laoag City, Ilocos Norte 2900", // Not in user data, keeping default
    specialty: "Internal Medicine", // Not in user data, keeping default
    subspecialty: "Cardiology", // Not in user data, keeping default
    pmaNumber: "PMA-12345678", // Not in user data, keeping default
    licenseNumber: "LIC-98765432", // Not in user data, keeping default
    hospital: "Ilocos Training Hospital", // Not in user data, keeping default
    clinicHours: "Monday-Friday: 2:00 PM - 6:00 PM", // Not in user data, keeping default
    clinicAddress: "Medical Arts Building, 2nd Floor, Room 205", // Not in user data, keeping default
    clinicPhone: "+63 77 123 4567", // Not in user data, keeping default
    membershipStatus: user?.isActive ? "Active" : "Inactive",
    membershipType: "Regular", // Not in user data, keeping default
    joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "January 15, 2020",
    lastLogin: user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "January 20, 2024 - 2:30 PM",
    totalPoints: 45, // Not in user data, keeping default
    duesStatus: "Paid", // Not in user data, keeping default
    emergencyContact: {
      name: "Maria Dela Cruz",
      relationship: "Spouse",
      phone: "+63 917 987 6543"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar onDesktopToggle={setSidebarCollapsed} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={() => {}}
          title="My Profile"
          showSearch={false}
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6 pt-20">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-600">View and manage your INMS profile information</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/profile/edit">
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <Link href="/inms-id">
                <Button variant="outline">
                  <QrCode className="w-4 h-4 mr-2" />
                  My INMS ID
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarFallback className="text-3xl bg-blue-100 text-blue-600">
                      {memberData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-2xl">{memberData.name}</CardTitle>
                  <div className="space-y-2">
                    <Badge className="bg-blue-100 text-blue-700">
                      {memberData.specialty}
                    </Badge>
                    {memberData.subspecialty && (
                      <Badge variant="outline">
                        {memberData.subspecialty}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Member ID</span>
                      <span className="font-medium text-sm">{memberData.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge className={memberData.membershipStatus === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                        <Shield className="w-3 h-3 mr-1" />
                        {memberData.membershipStatus}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Member Since</span>
                      <span className="font-medium text-sm">{memberData.joinDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">CME Points</span>
                      <Badge variant="outline">
                        <Award className="w-3 h-3 mr-1" />
                        {memberData.totalPoints}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Dues Status</span>
                      <Badge className="bg-green-100 text-green-700">
                        <CreditCard className="w-3 h-3 mr-1" />
                        {memberData.duesStatus}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="/profile/edit" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </Link>
                    <Link href="/inms-id" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <QrCode className="w-4 h-4 mr-2" />
                        View INMS ID
                      </Button>
                    </Link>
                    <Link href="/points" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Award className="w-4 h-4 mr-2" />
                        View Points
                      </Button>
                    </Link>
                    <Link href="/dues" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <CreditCard className="w-4 h-4 mr-2" />
                        View Dues
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Full Name</label>
                        <p className="text-gray-800">{memberData.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Age</label>
                        <p className="text-gray-800">{memberData.age} years old</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Gender</label>
                        <p className="text-gray-800">{memberData.gender}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Birthday</label>
                        <p className="text-gray-800 flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {memberData.birthday}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email Address</label>
                        <p className="text-gray-800 flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {memberData.email}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Phone Number</label>
                        <p className="text-gray-800 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {memberData.phone}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Address</label>
                        <p className="text-gray-800 flex items-start">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                          {memberData.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Stethoscope className="w-5 h-5 mr-2" />
                    Professional Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Specialty</label>
                        <p className="text-gray-800">{memberData.specialty}</p>
                      </div>
                      {memberData.subspecialty && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Subspecialty</label>
                          <p className="text-gray-800">{memberData.subspecialty}</p>
                        </div>
                      )}
                      <div>
                        <label className="text-sm font-medium text-gray-600">PMA Number</label>
                        <p className="text-gray-800">{memberData.pmaNumber}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">License Number</label>
                        <p className="text-gray-800">{memberData.licenseNumber}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Hospital Affiliation</label>
                        <p className="text-gray-800 flex items-center">
                          <Building className="w-4 h-4 mr-2 text-gray-400" />
                          {memberData.hospital}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Clinic Hours</label>
                        <p className="text-gray-800 flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          {memberData.clinicHours}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Clinic Address</label>
                        <p className="text-gray-800">{memberData.clinicAddress}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Clinic Phone</label>
                        <p className="text-gray-800 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {memberData.clinicPhone}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Name</label>
                      <p className="text-gray-800">{memberData.emergencyContact.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Relationship</label>
                      <p className="text-gray-800">{memberData.emergencyContact.relationship}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone Number</label>
                      <p className="text-gray-800 flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {memberData.emergencyContact.phone}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Membership Type</label>
                        <p className="text-gray-800">{memberData.membershipType}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Join Date</label>
                        <p className="text-gray-800">{memberData.joinDate}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Last Login</label>
                        <p className="text-gray-800">{memberData.lastLogin}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Account Status</label>
                        <Badge className="bg-green-100 text-green-700">
                          Active
                        </Badge>
                      </div>
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