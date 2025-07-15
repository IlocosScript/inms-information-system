"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Search, 
  Download, 
  Calendar,
  Scale,
  Users,
  Gavel,
  BookOpen,
  Eye
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

interface ConstitutionSection {
  id: string;
  title: string;
  content: string;
  lastUpdated: string;
  articles?: ConstitutionArticle[];
}

interface ConstitutionArticle {
  id: string;
  title: string;
  sections: {
    id: string;
    title: string;
    content: string;
  }[];
}

export default function ConstitutionPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('preamble');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const constitutionData: ConstitutionSection[] = [
    {
      id: 'preamble',
      title: 'Preamble',
      content: `We, the physicians of Ilocos Norte, in order to promote the highest standards of medical practice, foster professional development, advance medical knowledge, and serve the healthcare needs of our communities, do hereby establish this Constitution and By-laws for the Ilocos Norte Medical Society (INMS).

This organization shall be guided by the principles of medical ethics, professional excellence, continuing education, and service to humanity. We commit ourselves to the advancement of medical science, the improvement of healthcare delivery, and the welfare of our fellow physicians and the communities we serve.`,
      lastUpdated: '2024-01-01'
    },
    {
      id: 'articles',
      title: 'Articles',
      content: 'The Constitution is organized into the following articles:',
      lastUpdated: '2024-01-01',
      articles: [
        {
          id: 'article-1',
          title: 'Article I - Name and Purpose',
          sections: [
            {
              id: 'section-1-1',
              title: 'Section 1: Name',
              content: 'This organization shall be known as the Ilocos Norte Medical Society, hereinafter referred to as "INMS" or "the Society".'
            },
            {
              id: 'section-1-2',
              title: 'Section 2: Purpose',
              content: 'The purpose of INMS shall be to: (a) Promote the highest standards of medical practice and professional ethics; (b) Foster continuing medical education and professional development; (c) Advance medical knowledge through research and scientific exchange; (d) Serve the healthcare needs of Ilocos Norte and surrounding communities; (e) Advocate for healthcare policy improvements and physician welfare.'
            }
          ]
        },
        {
          id: 'article-2',
          title: 'Article II - Membership',
          sections: [
            {
              id: 'section-2-1',
              title: 'Section 1: Eligibility',
              content: 'Membership in INMS shall be open to all licensed physicians practicing in Ilocos Norte or those who have significant professional ties to the province. Applicants must be members in good standing of the Philippine Medical Association (PMA).'
            },
            {
              id: 'section-2-2',
              title: 'Section 2: Categories of Membership',
              content: 'The Society shall have the following categories of membership: (a) Regular Members - Licensed physicians actively practicing in Ilocos Norte; (b) Associate Members - Licensed physicians with professional ties to Ilocos Norte but practicing elsewhere; (c) Senior Members - Regular members who have reached the age of 65 and have been members for at least 10 years; (d) Emeritus Members - Distinguished members who have made significant contributions to the Society and the medical profession.'
            },
            {
              id: 'section-2-3',
              title: 'Section 3: Rights and Privileges',
              content: 'All members in good standing shall have the right to: (a) Participate in all Society activities and programs; (b) Vote in elections and on matters brought before the membership; (c) Hold office in the Society; (d) Receive Society publications and communications; (e) Access continuing medical education programs at member rates.'
            },
            {
              id: 'section-2-4',
              title: 'Section 4: Obligations',
              content: 'All members shall: (a) Pay annual dues as determined by the Board of Directors; (b) Abide by the Constitution, By-laws, and Code of Ethics; (c) Maintain their medical license and PMA membership in good standing; (d) Participate in Society activities when possible; (e) Uphold the reputation and interests of the Society.'
            }
          ]
        },
        {
          id: 'article-3',
          title: 'Article III - Officers and Board of Directors',
          sections: [
            {
              id: 'section-3-1',
              title: 'Section 1: Officers',
              content: 'The officers of the Society shall be: President, Vice President, Secretary, Treasurer, Auditor, and Public Relations Officer (PRO). All officers must be Regular or Senior members in good standing.'
            },
            {
              id: 'section-3-2',
              title: 'Section 2: Board of Directors',
              content: 'The Board of Directors shall consist of the six (6) officers and three (3) directors-at-large elected by the membership. The immediate past president shall serve as an ex-officio member of the Board.'
            },
            {
              id: 'section-3-3',
              title: 'Section 3: Terms of Office',
              content: 'All officers and directors shall serve for a term of two (2) years and may be re-elected for one (1) consecutive term. No person shall hold the same office for more than two (2) consecutive terms.'
            }
          ]
        },
        {
          id: 'article-4',
          title: 'Article IV - Meetings',
          sections: [
            {
              id: 'section-4-1',
              title: 'Section 1: Regular Meetings',
              content: 'The Society shall hold regular meetings at least quarterly. The Board of Directors shall determine the schedule and venue of regular meetings.'
            },
            {
              id: 'section-4-2',
              title: 'Section 2: Annual Meeting',
              content: 'The Annual Meeting shall be held during the first quarter of each year for the purpose of receiving reports, electing officers, and conducting other business as may properly come before the membership.'
            },
            {
              id: 'section-4-3',
              title: 'Section 3: Special Meetings',
              content: 'Special meetings may be called by the President, the Board of Directors, or upon written request of at least twenty-five percent (25%) of the membership in good standing.'
            }
          ]
        },
        {
          id: 'article-5',
          title: 'Article V - Amendments',
          sections: [
            {
              id: 'section-5-1',
              title: 'Section 1: Proposal of Amendments',
              content: 'Amendments to this Constitution may be proposed by the Board of Directors or by petition signed by at least twenty-five percent (25%) of the membership in good standing.'
            },
            {
              id: 'section-5-2',
              title: 'Section 2: Adoption of Amendments',
              content: 'Proposed amendments must be submitted to the membership at least thirty (30) days before the meeting at which they will be considered. Amendments shall be adopted by a two-thirds (2/3) majority vote of the members present and voting at a regular or special meeting.'
            }
          ]
        }
      ]
    },
    {
      id: 'bylaws',
      title: 'By-laws',
      content: `The By-laws provide detailed procedures and regulations for the implementation of the Constitution. These include specific procedures for membership application, dues collection, meeting conduct, election processes, and disciplinary actions.

Key provisions include:
- Membership application procedures and requirements
- Annual dues structure and payment schedules
- Meeting procedures and quorum requirements
- Election processes and voting procedures
- Committee structures and responsibilities
- Disciplinary procedures and appeals process
- Financial management and audit requirements`,
      lastUpdated: '2024-01-01'
    },
    {
      id: 'code-of-ethics',
      title: 'Code of Ethics',
      content: `The INMS Code of Ethics is based on the principles of medical professionalism and the Hippocratic Oath. All members are expected to:

1. Provide competent medical care with compassion and respect for human dignity
2. Maintain patient confidentiality and privacy
3. Continue professional development through lifelong learning
4. Practice evidence-based medicine and maintain clinical competence
5. Collaborate respectfully with colleagues and healthcare professionals
6. Advocate for patient welfare and public health
7. Maintain integrity in professional and business relationships
8. Avoid conflicts of interest that may compromise patient care
9. Respect the rights and autonomy of patients
10. Contribute to the advancement of medical knowledge and practice

Violations of this Code of Ethics may result in disciplinary action as outlined in the By-laws.`,
      lastUpdated: '2024-01-01'
    },
    {
      id: 'amendments',
      title: 'Recent Amendments',
      content: `Recent amendments to the INMS Constitution and By-laws:

Amendment 2024-01 (Effective January 1, 2024):
- Updated membership categories to include Associate and Emeritus members
- Revised dues structure to reflect current economic conditions
- Added provisions for digital meetings and electronic voting
- Enhanced disciplinary procedures with appeals process

Amendment 2023-02 (Effective July 1, 2023):
- Established continuing medical education requirements for members
- Created digital platform governance provisions
- Updated officer responsibilities and Board composition

Amendment 2023-01 (Effective January 1, 2023):
- Added Public Relations Officer position
- Revised meeting frequency requirements
- Updated amendment procedures for greater member participation`,
      lastUpdated: '2024-01-01'
    }
  ];

  const filteredSections = constitutionData.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedSectionData = constitutionData.find(section => section.id === selectedSection);

  const handleDownload = () => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'INMS-Constitution-and-Bylaws.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onDesktopToggle={setSidebarCollapsed} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={() => {}}
          title="Constitution & By-laws"
          showSearch={false}
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-600">Official governing documents of the Ilocos Norte Medical Society</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                Last Updated: January 1, 2024
              </Badge>
              <Button onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Contents
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search sections..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 text-sm"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {filteredSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setSelectedSection(section.id)}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 border-l-4 transition-colors ${
                          selectedSection === section.id
                            ? 'border-l-blue-500 bg-blue-50 text-blue-700 font-medium'
                            : 'border-l-transparent text-gray-700'
                        }`}
                      >
                        <div className="flex items-center">
                          {section.id === 'preamble' && <Scale className="w-4 h-4 mr-2" />}
                          {section.id === 'articles' && <FileText className="w-4 h-4 mr-2" />}
                          {section.id === 'bylaws' && <Gavel className="w-4 h-4 mr-2" />}
                          {section.id === 'code-of-ethics' && <Users className="w-4 h-4 mr-2" />}
                          {section.id === 'amendments' && <Calendar className="w-4 h-4 mr-2" />}
                          {section.title}
                        </div>
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {selectedSectionData && (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl mb-2">{selectedSectionData.title}</CardTitle>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          Last updated: {selectedSectionData.lastUpdated}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Print Section
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line mb-8">
                        {selectedSectionData.content}
                      </div>

                      {/* Articles Detail */}
                      {selectedSectionData.articles && (
                        <div className="space-y-8">
                          {selectedSectionData.articles.map((article) => (
                            <div key={article.id} className="border-l-4 border-blue-500 pl-6">
                              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                {article.title}
                              </h3>
                              <div className="space-y-6">
                                {article.sections.map((section) => (
                                  <div key={section.id}>
                                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                                      {section.title}
                                    </h4>
                                    <p className="text-gray-700 leading-relaxed">
                                      {section.content}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Document Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Document Type:</span>
                    <span className="font-medium">Constitution & By-laws</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Version:</span>
                    <span className="font-medium">2024.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Effective Date:</span>
                    <span className="font-medium">January 1, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Review:</span>
                    <span className="font-medium">January 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Approved By:</span>
                    <span className="font-medium">INMS General Assembly</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gavel className="w-5 h-5 mr-2" />
                  Legal Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-700 space-y-3">
                  <p>
                    This Constitution and By-laws document is the official governing 
                    document of the Ilocos Norte Medical Society (INMS).
                  </p>
                  <p>
                    All members are bound by the provisions contained herein. 
                    Any conflicts between this document and other Society materials 
                    shall be resolved in favor of this Constitution and By-laws.
                  </p>
                  <p>
                    For questions regarding interpretation or application of these 
                    provisions, please contact the INMS Board of Directors.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}