"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Bell, 
  Menu,
  RefreshCw,
  User,
  Settings,
  QrCode,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useSecurityContext } from '@/components/SecurityProvider';
import { useAuth } from '@/contexts/AuthContext';

interface TopBarProps {
  onMenuClick?: () => void;
  title?: string;
  showSearch?: boolean;
  sidebarCollapsed?: boolean;
}

export default function TopBar({ onMenuClick, title = "Dashboard", showSearch = true, sidebarCollapsed = false }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount] = useState(3);
  const [refreshing, setRefreshing] = useState(false);
  const isOnline = useOnlineStatus();
  const { lastActivity } = useSecurityContext();
  const { logout } = useAuth();
  
  // Generate unique ID for this TopBar instance
  const topBarId = React.useId();

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleMobileMenuClick = () => {
    console.log(`TopBar [${topBarId}] - Menu button clicked`);
    if (onMenuClick) {
      console.log(`TopBar [${topBarId}] - Using onMenuClick prop`);
      onMenuClick();
    } else {
      console.log(`TopBar [${topBarId}] - Using global fallback`);
      // Fallback to global function
      if (typeof window !== 'undefined' && (window as any).toggleMobileSidebar) {
        (window as any).toggleMobileSidebar();
      }
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 fixed top-0 left-0 right-0 z-30 transition-all duration-300" 
         style={{ 
           marginLeft: typeof window !== 'undefined' && window.innerWidth >= 1024 
             ? (sidebarCollapsed ? '64px' : '256px') 
             : '0px' 
         }}>
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMobileMenuClick}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>

        {/* Center Section - Search */}
        {showSearch && (
          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search members, events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search Button */}
          {showSearch && (
            <Button variant="ghost" size="sm" className="sm:hidden">
              <Search className="w-4 h-4" />
            </Button>
          )}
          
          {/* Online Status Indicator */}
          <div className="hidden sm:flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs text-gray-600">{isOnline ? 'Online' : 'Offline'}</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="hidden sm:flex"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2">
                <h4 className="font-semibold mb-2">Notifications</h4>
                <div className="space-y-2">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium">New Event: Cardiology Symposium</p>
                    <p className="text-xs text-gray-600">Registration is now open</p>
                  </div>
                  <div className="p-2 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-medium">Dues Reminder</p>
                    <p className="text-xs text-gray-600">Annual dues payment due soon</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium">Points Updated</p>
                    <p className="text-xs text-gray-600">You earned 5 points from last event</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Last activity: {lastActivity.toLocaleTimeString()}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hidden lg:flex items-center space-x-2 px-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-600 text-white text-sm">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium">Dr. Juan Dela Cruz</p>
                  <p className="text-xs text-gray-600">Internal Medicine</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                <Link href="/profile">View Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                <Link href="/profile/edit">Edit Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <QrCode className="w-4 h-4 mr-2" />
                <Link href="/inms-id">My INMS ID</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}