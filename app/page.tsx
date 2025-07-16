"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Users, 
  Calendar, 
  Bell, 
  CreditCard, 
  Award,
  LogIn,
  Eye,
  EyeOff,
  Stethoscope,
  Shield,
  QrCode,
  FileText
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, check if it's admin credentials
      if (email.includes('admin') || email === 'admin@inms.org') {
        // Redirect to admin dashboard
        router.push('/admin');
      } else {
        // Redirect to member dashboard
        router.push('/dashboard');
      }
    } catch (error) {
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Users,
      title: "Member Directory",
      description: "Connect with fellow medical professionals across Ilocos Norte",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Calendar,
      title: "Events & CME",
      description: "Stay updated with medical conferences and continuing education",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: QrCode,
      title: "Digital INMS ID",
      description: "QR-enabled membership ID with discount privileges",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Award,
      title: "Points & Certification",
      description: "Track CME points and request Certificate of Good Standing",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: CreditCard,
      title: "Digital Payments",
      description: "Pay annual dues and fees securely online with multiple options",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    },
    {
      icon: Bell,
      title: "Real-time Notifications",
      description: "Instant alerts for events, announcements, and important updates",
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      icon: FileText,
      title: "E-Library & Resources",
      description: "Access medical references, constitution, and educational materials",
      color: "text-teal-600",
      bgColor: "bg-teal-100"
    },
    {
      icon: Stethoscope,
      title: "Professional Network",
      description: "Refer patients and collaborate with colleagues seamlessly",
      color: "text-pink-600",
      bgColor: "bg-pink-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-inms-light via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-start justify-center mb-6">
            <img 
              src="https://static.wixstatic.com/media/d26da8_84af75d85a764d6284abc56355731316~mv2.png/v1/fill/w_214,h_206,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d26da8_84af75d85a764d6284abc56355731316~mv2.png"
              alt="INMS Logo"
              className="w-16 h-16 mr-4 object-contain flex-shrink-0"
            />
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Ilocos Norte Medical Society</h1>
              <p className="text-lg text-gray-600">Connect, collaborate, and advance healthcare together in the digital age</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Left Side - Features */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Empowering Medical Excellence
              </h2>
              <p className="text-gray-600 text-lg">
                Join the premier digital platform designed specifically for medical professionals 
                in Ilocos Norte. Access exclusive features that enhance your practice and 
                professional development.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border border-gray-100 shadow-sm bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <feature.icon className="w-6 h-6 text-inms-primary" />
                      </div>
                      <CardTitle className="text-lg text-gray-800">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Secure & Professional</h3>
                  <p className="text-gray-600 text-sm">
                    Built with enterprise-grade security and designed specifically for healthcare 
                    professionals. Your data is protected with industry-standard encryption and 
                    privacy measures.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border border-green-100 bg-white">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Welcome Back
                </CardTitle>
                <p className="text-gray-600">
                  Sign in to access your INMS account
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="doctor@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 h-11"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full h-11 text-base font-medium" 
                  onClick={handleLogin}
                  disabled={isLoading || !email || !password}
                 type="button"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>

                <div className="text-center space-y-3">
                  <button className="text-green-600 hover:underline text-sm font-medium">
                    Forgot your password?
                  </button>
                  
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-3">
                      Don't have an account?
                    </p>
                    <Button variant="outline" className="w-full h-11">
                      <User className="w-4 h-4 mr-2" />
                      Request Membership
                    </Button>
                  </div>
                </div>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs font-medium text-gray-700 mb-2">Demo Credentials:</p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p><strong>Member:</strong> member@inms.org / password123</p>
                    <p><strong>Admin:</strong> admin@inms.org / admin123</p>
                  </div>
                  <div className="mt-2 space-x-2">
                    <button 
                      type="button"
                      onClick={() => {
                        setEmail('member@inms.org');
                        setPassword('password123');
                      }}
                      className="text-xs text-green-600 hover:underline"
                    >
                      Use Member
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setEmail('admin@inms.org');
                        setPassword('admin123');
                      }}
                      className="text-xs text-green-600 hover:underline"
                    >
                      Use Admin
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Registration Notice */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Bell className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    New Member Registration
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Registration requests are reviewed and your account is activated by the INMS administration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <span>© 2024 Ilocos Norte Medical Society</span>
            <span>•</span>
            <button className="hover:text-inms-primary">Privacy Policy</button>
            <span>•</span>
            <button className="hover:text-inms-primary">Terms of Service</button>
            <span>•</span>
            <button className="hover:text-inms-primary">Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}