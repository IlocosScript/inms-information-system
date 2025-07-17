"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Building,
  Users,
  Globe
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Message sent successfully! We will respond within 24-48 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "INMS Secretariat",
      details: [
        "2nd Floor, Medical Arts Building",
        "Ilocos Training Hospital",
        "Laoag City, Ilocos Norte 2900"
      ],
      color: "text-blue-600"
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "Main Office: (077) 123-4567",
        "Emergency: (077) 987-6543",
        "Mobile: +63 917 123 4567"
      ],
      color: "text-green-600"
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "General: secretariat@inms.org",
        "Membership: membership@inms.org",
        "Events: events@inms.org"
      ],
      color: "text-purple-600"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Friday: 8:00 AM - 5:00 PM",
        "Saturday: 8:00 AM - 12:00 PM",
        "Sunday: Closed"
      ],
      color: "text-orange-600"
    }
  ];

  const departments = [
    {
      name: "Membership Services",
      contact: "membership@inms.org",
      phone: "(077) 123-4567 ext. 101",
      description: "New member registration, membership renewals, and member benefits"
    },
    {
      name: "Events & CME",
      contact: "events@inms.org",
      phone: "(077) 123-4567 ext. 102",
      description: "Event registration, CME programs, and conference inquiries"
    },
    {
      name: "Finance & Dues",
      contact: "finance@inms.org",
      phone: "(077) 123-4567 ext. 103",
      description: "Dues payment, receipts, and financial inquiries"
    },
    {
      name: "Technical Support",
      contact: "support@inms.org",
      phone: "(077) 123-4567 ext. 104",
      description: "Website issues, login problems, and technical assistance"
    }
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://facebook.com/INMSOfficial",
      icon: Globe,
      color: "text-blue-600"
    },
    {
      name: "Website",
      url: "https://inms.org.ph",
      icon: Globe,
      color: "text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Sidebar onDesktopToggle={setSidebarCollapsed} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={() => {}}
          title="Contact Us"
          showSearch={false}
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6 pt-20">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help. Contact the INMS secretariat 
              or send us a message using the form below.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Send us a Message
                  </CardTitle>
                  <p className="text-gray-600 text-sm">
                    We typically respond within 24-48 hours during business days.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Dr. Juan Dela Cruz"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="juan.delacruz@example.com"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Membership inquiry, event registration, etc."
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please provide details about your inquiry..."
                        className="mt-1 min-h-[120px]"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Departments */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Department Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {departments.map((dept, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-2">{dept.name}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            <a href={`mailto:${dept.contact}`} className="text-blue-600 hover:underline">
                              {dept.contact}
                            </a>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            <a href={`tel:${dept.phone}`} className="text-blue-600 hover:underline">
                              {dept.phone}
                            </a>
                          </div>
                          <p className="text-gray-600 mt-2">{dept.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information Sidebar */}
            <div className="space-y-6">
              {/* Contact Info Cards */}
              {contactInfo.map((info, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg">
                      <info.icon className={`w-5 h-5 mr-2 ${info.color}`} />
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Follow Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <link.icon className={`w-5 h-5 mr-3 ${link.color}`} />
                        <span className="font-medium">{link.name}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-700 flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Emergency Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-red-700">
                    <p className="font-medium mb-2">For urgent medical society matters:</p>
                    <p>Emergency Hotline: <strong>(077) 987-6543</strong></p>
                    <p>Available 24/7 for critical issues</p>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time Notice */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-700 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-blue-700 space-y-2">
                    <p><strong>General Inquiries:</strong> 24-48 hours</p>
                    <p><strong>Membership Issues:</strong> 1-2 business days</p>
                    <p><strong>Technical Support:</strong> Same day</p>
                    <p><strong>Emergency Matters:</strong> Immediate</p>
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