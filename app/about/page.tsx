"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  Eye, 
  Award, 
  Calendar,
  MapPin,
  Mail,
  Phone,
  Building
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

interface Officer {
  id: number;
  name: string;
  position: string;
  specialty: string;
  hospital: string;
  term: string;
  image?: string;
}

interface PastPresident {
  id: number;
  name: string;
  term: string;
  specialty: string;
  achievements: string[];
}

export default function AboutPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const currentOfficers: Officer[] = [
    {
      id: 1,
      name: "Dr. Maria Elena Santos",
      position: "President",
      specialty: "Internal Medicine",
      hospital: "Ilocos Training Hospital",
      term: "2024-2025"
    },
    {
      id: 2,
      name: "Dr. Roberto C. Aquino",
      position: "Vice President",
      specialty: "Orthopedic Surgery",
      hospital: "Mariano Marcos Memorial Hospital",
      term: "2024-2025"
    },
    {
      id: 3,
      name: "Dr. Carmen R. Reyes",
      position: "Secretary",
      specialty: "Obstetrics & Gynecology",
      hospital: "Don Mariano Marcos Memorial Hospital",
      term: "2024-2025"
    },
    {
      id: 4,
      name: "Dr. Juan P. Dela Cruz",
      position: "Treasurer",
      specialty: "Family Medicine",
      hospital: "Laoag City General Hospital",
      term: "2024-2025"
    },
    {
      id: 5,
      name: "Dr. Ana Marie Gonzales",
      position: "Auditor",
      specialty: "Pediatrics",
      hospital: "Ilocos Training Hospital",
      term: "2024-2025"
    },
    {
      id: 6,
      name: "Dr. Eduardo F. Fernandez",
      position: "PRO",
      specialty: "Dermatology",
      hospital: "Private Practice",
      term: "2024-2025"
    }
  ];

  const pastPresidents: PastPresident[] = [
    {
      id: 1,
      name: "Dr. Benjamin R. Valdez",
      term: "2022-2023",
      specialty: "Cardiology",
      achievements: [
        "Established the INMS Digital Platform",
        "Launched the CME Point Tracking System",
        "Organized the first Virtual Medical Conference"
      ]
    },
    {
      id: 2,
      name: "Dr. Rosario M. Castro",
      term: "2020-2021",
      specialty: "Pediatrics",
      achievements: [
        "Led COVID-19 Response Initiative",
        "Implemented Telemedicine Guidelines",
        "Strengthened Community Health Programs"
      ]
    },
    {
      id: 3,
      name: "Dr. Antonio L. Ramos",
      term: "2018-2019",
      specialty: "Surgery",
      achievements: [
        "Modernized INMS Constitution",
        "Established Research Committee",
        "Launched Medical Mission Programs"
      ]
    },
    {
      id: 4,
      name: "Dr. Luz P. Mendoza",
      term: "2016-2017",
      specialty: "Internal Medicine",
      achievements: [
        "Founded INMS E-Library",
        "Initiated Continuing Education Programs",
        "Strengthened Inter-hospital Collaborations"
      ]
    }
  ];

  const regionalDirectors = [
    {
      name: "Dr. Jose M. Rivera",
      region: "Region I Director",
      specialty: "Neurology",
      hospital: "Baguio General Hospital"
    },
    {
      name: "Dr. Patricia S. Lim",
      region: "PMA Ilocos Norte Chapter President",
      specialty: "Ophthalmology",
      hospital: "Laoag Eye Center"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onDesktopToggle={setSidebarCollapsed} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={() => {}}
          title="About INMS"
          showSearch={false}
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6 pt-20">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-600 text-white p-4 rounded-full mr-4">
                <Users className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">INMS</h1>
                <p className="text-xl text-blue-600 font-medium">Ilocos Norte Medical Society</p>
              </div>
            </div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Advancing healthcare excellence in Ilocos Norte through professional collaboration, 
              continuing education, and community service since 1975.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* History & Mission */}
            <div className="lg:col-span-2 space-y-8">
              {/* History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Our History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      The Ilocos Norte Medical Society (INMS) was founded in 1975 by a group of 
                      dedicated physicians who recognized the need for a unified medical organization 
                      in the province. What started as a small gathering of 15 doctors has grown 
                      into a robust professional society with over 200 active members.
                    </p>
                    <p>
                      Throughout its history, INMS has been at the forefront of medical advancement 
                      in Northern Luzon, organizing continuing medical education programs, advocating 
                      for healthcare policy reforms, and providing medical assistance during natural 
                      disasters and health emergencies.
                    </p>
                    <p>
                      In 2020, INMS adapted to the digital age by launching its comprehensive online 
                      platform, making it one of the first provincial medical societies in the 
                      Philippines to fully embrace digital transformation for member services and 
                      professional development.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Mission & Vision */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Our Mission
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      To promote the highest standards of medical practice, foster professional 
                      development through continuing education, and serve the healthcare needs 
                      of Ilocos Norte through collaborative medical excellence and community 
                      outreach programs.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="w-5 h-5 mr-2" />
                      Our Vision
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      To be the leading medical society in Northern Luzon, recognized for 
                      innovation in healthcare delivery, excellence in medical education, 
                      and unwavering commitment to improving the health and well-being of 
                      our communities.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Current Officers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Current Officers (2024-2025)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {currentOfficers.map((officer) => (
                      <div key={officer.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-lg font-medium text-blue-600">
                              {officer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{officer.name}</h3>
                            <Badge variant="outline" className="mb-2">
                              {officer.position}
                            </Badge>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p>{officer.specialty}</p>
                              <p>{officer.hospital}</p>
                              <p className="text-blue-600">Term: {officer.term}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Past Presidents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Past Presidents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {pastPresidents.map((president) => (
                      <div key={president.id} className="border-l-4 border-inms-primary pl-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{president.name}</h3>
                            <p className="text-gray-600">{president.specialty}</p>
                          </div>
                          <Badge variant="outline">{president.term}</Badge>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Key Achievements:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {president.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Regional Directors */}
              <Card>
                <CardHeader>
                  <CardTitle>Regional Directors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {regionalDirectors.map((director, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0">
                        <h3 className="font-semibold">{director.name}</h3>
                        <p className="text-sm text-blue-600 font-medium">{director.region}</p>
                        <p className="text-sm text-gray-600">{director.specialty}</p>
                        <p className="text-sm text-gray-600">{director.hospital}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">INMS Secretariat</p>
                        <p className="text-gray-600">
                          2nd Floor, Medical Arts Building<br />
                          Ilocos Training Hospital<br />
                          Laoag City, Ilocos Norte 2900
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-gray-600">(077) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">secretariat@inms.org</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>INMS at a Glance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Founded</span>
                      <span className="font-medium">1975</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Members</span>
                      <span className="font-medium">200+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Specialties</span>
                      <span className="font-medium">25+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Partner Hospitals</span>
                      <span className="font-medium">15</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Annual CME Events</span>
                      <span className="font-medium">50+</span>
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