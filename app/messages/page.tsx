"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Plus,
  User,
  Clock,
  CheckCircle,
  Paperclip,
  Phone,
  Video
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

interface Message {
  id: number;
  senderId: number;
  senderName: string;
  senderSpecialty: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type: 'text' | 'referral' | 'image';
  attachment?: string;
}

interface Conversation {
  id: number;
  participantId: number;
  participantName: string;
  participantSpecialty: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const conversations: Conversation[] = [
    {
      id: 1,
      participantId: 2,
      participantName: "Dr. Maria Santos",
      participantSpecialty: "Pediatrics",
      lastMessage: "Thank you for the referral. The patient is doing well.",
      lastMessageTime: "2024-01-20 14:30",
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: 1,
          senderId: 1,
          senderName: "Dr. Juan Dela Cruz",
          senderSpecialty: "Internal Medicine",
          content: "Hi Dr. Santos, I have a pediatric patient that needs your expertise.",
          timestamp: "2024-01-20 10:00",
          isRead: true,
          type: "text"
        },
        {
          id: 2,
          senderId: 2,
          senderName: "Dr. Maria Santos",
          senderSpecialty: "Pediatrics",
          content: "Of course! Please send me the patient details.",
          timestamp: "2024-01-20 10:15",
          isRead: true,
          type: "text"
        },
        {
          id: 3,
          senderId: 1,
          senderName: "Dr. Juan Dela Cruz",
          senderSpecialty: "Internal Medicine",
          content: "Patient referral: 8-year-old with recurring fever and rash. Please see attached medical records.",
          timestamp: "2024-01-20 10:30",
          isRead: true,
          type: "referral",
          attachment: "medical-records.pdf"
        },
        {
          id: 4,
          senderId: 2,
          senderName: "Dr. Maria Santos",
          senderSpecialty: "Pediatrics",
          content: "Thank you for the referral. The patient is doing well.",
          timestamp: "2024-01-20 14:30",
          isRead: false,
          type: "text"
        }
      ]
    },
    {
      id: 2,
      participantId: 3,
      participantName: "Dr. Roberto Aquino",
      participantSpecialty: "Orthopedics",
      lastMessage: "The surgery went well. Patient is recovering.",
      lastMessageTime: "2024-01-19 16:45",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: 5,
          senderId: 1,
          senderName: "Dr. Juan Dela Cruz",
          senderSpecialty: "Internal Medicine",
          content: "Good morning Dr. Aquino, how did the surgery go?",
          timestamp: "2024-01-19 08:00",
          isRead: true,
          type: "text"
        },
        {
          id: 6,
          senderId: 3,
          senderName: "Dr. Roberto Aquino",
          senderSpecialty: "Orthopedics",
          content: "The surgery went well. Patient is recovering.",
          timestamp: "2024-01-19 16:45",
          isRead: true,
          type: "text"
        }
      ]
    },
    {
      id: 3,
      participantId: 4,
      participantName: "Dr. Carmen Reyes",
      participantSpecialty: "OB-Gynecology",
      lastMessage: "Patient delivered safely. Thank you for the referral.",
      lastMessageTime: "2024-01-18 20:15",
      unreadCount: 1,
      isOnline: true,
      messages: [
        {
          id: 7,
          senderId: 4,
          senderName: "Dr. Carmen Reyes",
          senderSpecialty: "OB-Gynecology",
          content: "Patient delivered safely. Thank you for the referral.",
          timestamp: "2024-01-18 20:15",
          isRead: false,
          type: "text"
        }
      ]
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participantSpecialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // Simulate sending message
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'referral': return <User className="w-4 h-4 text-blue-600" />;
      case 'image': return <Paperclip className="w-4 h-4 text-green-600" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onDesktopToggle={setSidebarCollapsed} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={() => {}}
          title="Messages"
          showSearch={false}
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6 pt-20">
          <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Conversations
                    </CardTitle>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      New
                    </Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-0">
                  <div className="space-y-1">
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 border-b transition-colors ${
                          selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                        }`}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarFallback>
                                {conversation.participantName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {conversation.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-sm truncate">
                                {conversation.participantName}
                              </h3>
                              <div className="flex items-center space-x-2">
                                {conversation.unreadCount > 0 && (
                                  <Badge variant="destructive" className="text-xs px-2 py-0">
                                    {conversation.unreadCount}
                                  </Badge>
                                )}
                                <span className="text-xs text-gray-500">
                                  {new Date(conversation.lastMessageTime).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 mb-1">{conversation.participantSpecialty}</p>
                            <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              <Card className="h-full flex flex-col">
                {selectedConv ? (
                  <>
                    {/* Chat Header */}
                    <CardHeader className="pb-4 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarFallback>
                                {selectedConv.participantName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {selectedConv.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold">{selectedConv.participantName}</h3>
                            <p className="text-sm text-gray-600">{selectedConv.participantSpecialty}</p>
                            <p className="text-xs text-gray-500">
                              {selectedConv.isOnline ? 'Online' : 'Last seen recently'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Video className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    {/* Messages */}
                    <CardContent className="flex-1 overflow-y-auto p-4">
                      <div className="space-y-4">
                        {selectedConv.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.senderId === 1 ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-xs lg:max-w-md ${
                              message.senderId === 1 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-800'
                            } rounded-lg p-3`}>
                              {message.senderId !== 1 && (
                                <div className="flex items-center mb-1">
                                  <span className="text-xs font-medium">{message.senderName}</span>
                                  <span className="text-xs text-gray-500 ml-2">{message.senderSpecialty}</span>
                                </div>
                              )}
                              
                              <div className="flex items-start space-x-2">
                                {getMessageTypeIcon(message.type)}
                                <div className="flex-1">
                                  <p className="text-sm">{message.content}</p>
                                  {message.attachment && (
                                    <div className="mt-2 p-2 bg-white bg-opacity-20 rounded text-xs">
                                      <Paperclip className="w-3 h-3 inline mr-1" />
                                      {message.attachment}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs opacity-75">
                                  {new Date(message.timestamp).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                                {message.senderId === 1 && (
                                  <CheckCircle className={`w-3 h-3 ${
                                    message.isRead ? 'text-blue-200' : 'text-gray-400'
                                  }`} />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    {/* Message Input */}
                    <div className="p-4 border-t">
                      <div className="flex items-end space-x-2">
                        <Button size="sm" variant="outline">
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        <div className="flex-1">
                          <Textarea
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="min-h-[40px] max-h-32 resize-none"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                          />
                        </div>
                        <Button 
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <CardContent className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                      <p className="text-sm">Choose a conversation from the list to start messaging</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}