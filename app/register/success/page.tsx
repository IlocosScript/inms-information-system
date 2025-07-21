"use client";

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Mail, 
  Clock, 
  ArrowRight,
  Home,
  Shield,
  Users,
  Calendar,
  Award
} from 'lucide-react';

export default function RegistrationSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://static.wixstatic.com/media/d26da8_84af75d85a764d6284abc56355731316~mv2.png/v1/fill/w_214,h_206,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d26da8_84af75d85a764d6284abc56355731316~mv2.png"
              alt="INMS Logo"
              className="w-16 h-16 mr-4 object-contain"
            />
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-800">Registration Successful!</h1>
              <p className="text-lg text-gray-600">Welcome to the Ilocos Norte Medical Society</p>
            </div>
          </div>
        </div>

        {/* Success Card */}
        <Card className="shadow-lg border-green-200">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Registration Submitted Successfully!
              </h2>
              <p className="text-gray-600">
                Thank you for applying to join the Ilocos Norte Medical Society.
              </p>
            </div>

            {/* Status Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Application Status: Pending Review</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Your application is currently under review by the INMS administration. 
                    This process typically takes 2-3 business days.
                  </p>
                </div>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">What happens next?</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-green-600">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Application Review</p>
                    <p className="text-sm text-gray-600">
                      Our administration team will review your application and verify your credentials.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-green-600">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Email Notification</p>
                    <p className="text-sm text-gray-600">
                      You&apos;ll receive an email notification once your account is approved and activated.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-green-600">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Account Access</p>
                    <p className="text-sm text-gray-600">
                      Once approved, you can log in and access all INMS member benefits and features.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Member Benefits Preview */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Member Benefits You&apos;ll Have Access To:</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="w-4 h-4 text-green-600" />
                  <span>Member Directory</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span>Events & CME</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Digital INMS ID</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Award className="w-4 h-4 text-green-600" />
                  <span>Points & Certification</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Questions about your application?</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Contact us at{' '}
                    <a href="mailto:admin@ilocosscript.com" className="text-green-600 hover:underline">
                      admin@ilocosscript.com
                    </a>
                    {' '}or call us at{' '}
                    <a href="tel:+639123456789" className="text-green-600 hover:underline">
                      +63 912 345 6789
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => router.push('/')}
                className="flex-1"
              >
                <Home className="w-4 h-4 mr-2" />
                Return to Login
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('mailto:admin@ilocosscript.com', '_blank')}
                className="flex-1"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            © 2024 Ilocos Norte Medical Society. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
} 