"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  QrCode, 
  Download, 
  User, 
  Calendar, 
  MapPin, 
  Shield,
  Store,
  Percent,
  CheckCircle,
  XCircle,
  Smartphone,
  Wifi,
  WifiOff
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

interface Discount {
  id: number;
  establishment: string;
  category: string;
  discount: string;
  description: string;
  location: string;
  contact: string;
  validUntil: string;
  terms: string;
}

export default function INMSIDPage() {
  const [isOffline, setIsOffline] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const memberData = {
    id: "INMS-2024-001234",
    name: "Dr. Juan Dela Cruz",
    age: 45,
    birthday: "1979-03-15",
    address: "123 Rizal Street, Laoag City, Ilocos Norte",
    membershipStatus: "Active",
    pmaNumber: "PMA-12345678",
    validity: "2024-12-31",
    photo: "/api/placeholder/150/150",
    qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiI+UVIgQ29kZTwvdGV4dD4KPC9zdmc+"
  };

  const discounts: Discount[] = [
    {
      id: 1,
      establishment: "Mercury Drug Store",
      category: "Pharmacy",
      discount: "10% off",
      description: "Discount on prescription medicines and health products",
      location: "All branches in Ilocos Norte",
      contact: "(077) 123-4567",
      validUntil: "2024-12-31",
      terms: "Valid for INMS members only. Present ID before purchase."
    },
    {
      id: 2,
      establishment: "Laoag Eye Center",
      category: "Medical Services",
      discount: "15% off",
      description: "Discount on eye examinations and optical services",
      location: "Laoag City",
      contact: "(077) 234-5678",
      validUntil: "2024-12-31",
      terms: "Not applicable to surgical procedures. Appointment required."
    },
    {
      id: 3,
      establishment: "Healthy Options",
      category: "Health & Wellness",
      discount: "12% off",
      description: "Discount on vitamins, supplements, and organic products",
      location: "SM City Laoag",
      contact: "(077) 345-6789",
      validUntil: "2024-12-31",
      terms: "Minimum purchase of ₱500. Cannot be combined with other promos."
    },
    {
      id: 4,
      establishment: "Java Hotel",
      category: "Accommodation",
      discount: "20% off",
      description: "Discount on room rates and conference facilities",
      location: "Laoag City",
      contact: "(077) 456-7890",
      validUntil: "2024-12-31",
      terms: "Subject to room availability. Advance booking required."
    },
    {
      id: 5,
      establishment: "Saramsam Ylocano Restaurant",
      category: "Dining",
      discount: "8% off",
      description: "Discount on food and beverages",
      location: "Laoag City",
      contact: "(077) 567-8901",
      validUntil: "2024-12-31",
      terms: "Dine-in only. Not valid on special occasions and holidays."
    }
  ];

  const handleDownloadID = () => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'INMS-ID-Juan-Dela-Cruz.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar onDesktopToggle={setSidebarCollapsed} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={() => {}}
          title="INMS Digital ID"
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6 pt-20">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-600">Your official INMS membership identification</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setIsOffline(!isOffline)} variant="outline" size="sm">
                {isOffline ? <WifiOff className="w-4 h-4 mr-2" /> : <Wifi className="w-4 h-4 mr-2" />}
                {isOffline ? 'Go Online' : 'Test Offline'}
              </Button>
              <Badge variant={memberData.membershipStatus === 'Active' ? 'default' : 'secondary'} 
                     className={memberData.membershipStatus === 'Active' ? 'bg-green-100 text-green-700' : ''}>
                {memberData.membershipStatus}
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Digital ID Card */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-white p-2 rounded-full">
                      <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold">ILOCOS NORTE MEDICAL SOCIETY</h2>
                  <p className="text-blue-100 text-sm">Official Member ID</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Member Photo */}
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                      <User className="w-16 h-16 text-blue-600" />
                    </div>
                  </div>

                  {/* Member Information */}
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold">{memberData.name}</h3>
                    <div className="text-sm text-blue-100 space-y-1">
                      <p>ID: {memberData.id}</p>
                      <p>Age: {memberData.age}</p>
                      <p>Birthday: {memberData.birthday}</p>
                      <p>PMA: {memberData.pmaNumber}</p>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="flex justify-center">
                    <div className="bg-white p-3 rounded-lg">
                      <QrCode className="w-20 h-20 text-black" />
                    </div>
                  </div>

                  {/* Validity */}
                  <div className="text-center">
                    <p className="text-xs text-blue-100">Valid until: {memberData.validity}</p>
                    <div className="flex items-center justify-center mt-2">
                      {memberData.membershipStatus === 'Active' ? (
                        <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 mr-1" />
                      )}
                      <span className="text-xs">{memberData.membershipStatus}</span>
                    </div>
                  </div>

                  {/* Download Button */}
                  <Button 
                    onClick={handleDownloadID}
                    className="w-full bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download ID
                  </Button>
                </CardContent>
              </Card>

              {/* Offline Access Notice */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-sm">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Offline Access
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      {isOffline ? (
                        <WifiOff className="w-4 h-4 text-red-500 mr-2" />
                      ) : (
                        <Wifi className="w-4 h-4 text-green-500 mr-2" />
                      )}
                      <span className={isOffline ? 'text-red-600' : 'text-green-600'}>
                        {isOffline ? 'Offline Mode' : 'Online Mode'}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      Your INMS ID can be accessed even without internet connection after downloading.
                    </p>
                    {memberData.membershipStatus !== 'Active' && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-xs">
                          ⚠️ QR code is deactivated due to inactive membership status. 
                          Please settle your dues to reactivate.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Discounts and Benefits */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Store className="w-5 h-5 mr-2" />
                    Member Discounts & Benefits
                  </CardTitle>
                  <p className="text-gray-600 text-sm">
                    Show your INMS ID to avail these exclusive discounts
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {discounts.map((discount) => (
                      <div key={discount.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{discount.establishment}</h3>
                            <Badge variant="outline" className="text-xs mt-1">
                              {discount.category}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-green-600 font-semibold">
                              <Percent className="w-4 h-4 mr-1" />
                              {discount.discount}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{discount.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            {discount.location}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            Valid until: {discount.validUntil}
                          </div>
                        </div>
                        
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600">
                            <strong>Terms:</strong> {discount.terms}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Usage Instructions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <QrCode className="w-5 h-5 mr-2" />
                    How to Use Your INMS ID
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">For Discounts:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                        <li>Present your INMS ID before making a purchase</li>
                        <li>Allow the establishment to scan your QR code</li>
                        <li>Verify your membership status</li>
                        <li>Enjoy your discount!</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">For Events:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                        <li>Register for INMS events online</li>
                        <li>Bring your INMS ID to the event</li>
                        <li>Scan QR code for attendance confirmation</li>
                        <li>Earn CME points automatically</li>
                      </ol>
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