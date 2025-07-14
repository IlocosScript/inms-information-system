"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Menu,
  X,
  Users,
  Calendar,
  CreditCard,
  Award,
  FileText,
  MessageSquare,
  Home,
  Shield,
  Bell,
  BookOpen,
  Phone,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Building,
  QrCode
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [notificationCount] = useState(3);

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Members', href: '/members', icon: Users },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'INMS ID', href: '/inms-id', icon: QrCode },
    { name: 'Dues', href: '/dues', icon: CreditCard },
    { name: 'Points', href: '/points', icon: Award },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Announcements', href: '/announcements', icon: Bell },
    { name: 'Gallery', href: '/gallery', icon: FileText },
    { name: 'Constitution', href: '/constitution', icon: BookOpen },
    { name: 'E-Library', href: '/e-library', icon: BookOpen },
    { name: 'About Us', href: '/about', icon: Building },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  const adminItems = [
    { name: 'Admin Panel', href: '/admin', icon: Shield },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
        isCollapsed ? "-translate-x-full lg:w-16" : "w-64",
        "lg:translate-x-0",
        className
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-gray-800">INMS</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors",
                  isCollapsed && "justify-center"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
                {!isCollapsed && item.name === 'Messages' && notificationCount > 0 && (
                  <Badge variant="destructive" className="ml-auto text-xs">
                    {notificationCount}
                  </Badge>
                )}
              </Link>
            ))}
          </div>

          {/* Admin Section */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            {!isCollapsed && (
              <p className="px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Administration
              </p>
            )}
            <div className="space-y-1 px-2">
              {adminItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors",
                    isCollapsed && "justify-center"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Collapse Toggle for Desktop */}
        <div className="hidden lg:block p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full justify-center"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsCollapsed(false)}
        className={cn(
          "fixed top-4 left-4 z-40 lg:hidden",
          !isCollapsed && "hidden"
        )}
      >
        <Menu className="w-5 h-5" />
      </Button>
    </>
  );
}