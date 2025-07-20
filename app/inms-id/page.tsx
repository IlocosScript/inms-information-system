"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  QrCode, 
  Download, 
  Share2, 
  ArrowLeft,
  Shield,
  Award,
  Calendar,
  Building,
  Stethoscope,
  Copy,
  Check
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function INMSIDPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const memberId = `INMS-${new Date().getFullYear()}-${user?.id || '001234'}`;
  const qrCodeData = JSON.stringify({
    memberId,
    name: user ? `${user.firstName} ${user.lastName}` : 'Dr. Juan Dela Cruz',
    email: user?.email || 'juan.delacruz@example.com',
    roles: user?.roles || ['Member'],
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
  });

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(memberId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownload = () => {
    // TODO: Implement PDF download functionality
    console.log('Downloading INMS ID card...');
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Sharing INMS ID...');
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar onDesktopToggle={setSidebarCollapsed} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={() => {}}
          title="My INMS ID"
          showSearch={false}
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6 pt-20">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/profile">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Profile
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My INMS ID</h1>
                <p className="text-gray-600">Your digital membership card with QR code</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* INMS ID Card */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <img 
                          src="https://static.wixstatic.com/media/d26da8_84af75d85a764d6284abc56355731316~mv2.png/v1/fill/w_214,h_206,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d26da8_84af75d85a764d6284abc56355731316~mv2.png"
                          alt="INMS Logo"
                          className="w-12 h-12 object-contain"
                        />
                        <div>
                          <h2 className="text-xl font-bold text-gray-800">Ilocos Norte Medical Society</h2>
                          <p className="text-sm text-gray-600">Digital Membership Card</p>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-600 text-white">
                      <Shield className="w-3 h-3 mr-1" />
                      ACTIVE
                    </Badge>
                  </div>

                  {/* Member Info */}
                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Member Name</label>
                        <p className="text-lg font-semibold text-gray-800">
                          {user ? `${user.firstName} ${user.lastName}` : 'Dr. Juan Dela Cruz'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Member ID</label>
                        <div className="flex items-center space-x-2">
                          <p className="text-lg font-mono text-gray-800">{memberId}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyId}
                            className="h-6 w-6 p-0"
                          >
                            {copied ? (
                              <Check className="w-3 h-3 text-green-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <p className="text-gray-800">{user?.email || 'juan.delacruz@example.com'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Member Since</label>
                        <p className="text-gray-800">
                          {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'January 15, 2020'}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Specialty</label>
                        <p className="text-gray-800">Internal Medicine</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Hospital</label>
                        <p className="text-gray-800">Ilocos Training Hospital</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">CME Points</label>
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-green-600" />
                          <span className="text-gray-800">45 points</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Valid Until</label>
                        <p className="text-gray-800">
                          {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="text-center">
                    <div className="inline-block p-4 bg-white rounded-lg border">
                      <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                        <QrCode className="w-24 h-24 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Scan to verify membership
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-6">
                <Button onClick={handleDownload} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button onClick={handleShare} variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Card
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Member Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Membership Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge className={user?.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                        {user?.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Type</span>
                      <span className="text-sm font-medium">Regular Member</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Dues Status</span>
                      <Badge className="bg-green-100 text-green-700">Paid</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Member Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">CME Points Tracking</p>
                        <p className="text-xs text-gray-600">Earn and track continuing education points</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Event Access</p>
                        <p className="text-xs text-gray-600">Priority registration for medical events</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Building className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Hospital Discounts</p>
                        <p className="text-xs text-gray-600">Special rates at partner hospitals</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Stethoscope className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Professional Network</p>
                        <p className="text-xs text-gray-600">Connect with fellow medical professionals</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="/profile" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                    </Link>
                    <Link href="/profile/edit" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </Link>
                    <Link href="/points" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Award className="w-4 h-4 mr-2" />
                        View Points
                      </Button>
                    </Link>
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