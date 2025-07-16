"use client";

import { useState, useEffect } from 'react';
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
  QrCode,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

interface SidebarProps {
  className?: string;
  onMobileToggle?: (isOpen: boolean) => void;
  onDesktopToggle?: (isCollapsed: boolean) => void;
}

export default function Sidebar({ className, onMobileToggle, onDesktopToggle }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [notificationCount] = useState(3);
  const isOnline = useOnlineStatus();

  // Notify parent component of mobile state changes
  useEffect(() => {
    onMobileToggle?.(isMobileOpen);
  }, [isMobileOpen, onMobileToggle]);

  // Notify parent of desktop collapse state changes
  useEffect(() => {
    onDesktopToggle?.(isDesktopCollapsed);
  }, [isDesktopCollapsed, onDesktopToggle]);

  // Close mobile menu when clicking outside or on navigation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Expose mobile toggle function
  useEffect(() => {
    (window as any).toggleMobileSidebar = () => setIsMobileOpen(prev => !prev);
  }, []);

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

  const handleMobileNavClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col shadow-lg lg:shadow-sm",
        // Mobile styles
        "lg:translate-x-0",
        isMobileOpen ? "translate-x-0 w-80" : "-translate-x-full w-80",
        // Desktop styles
        "lg:z-40",
        isDesktopCollapsed ? "lg:w-16" : "lg:w-64",
        className
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          {(!isDesktopCollapsed || isMobileOpen) && (
            <Link href="/dashboard" className="flex items-center space-x-2" onClick={handleMobileNavClick}>
              <div className="bg-inms-primary text-white p-2 rounded-lg flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-gray-800">INMS</span>
            </Link>
          )}
          
          {isDesktopCollapsed && !isMobileOpen && (
            <Link href="/dashboard" className="flex items-center justify-center">
              <div className="bg-inms-primary text-white p-2 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
            </Link>
          )}
          
          {/* Mobile Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Desktop Collapse Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
            className="hidden lg:block"
          >
            {isDesktopCollapsed ? <ChevronRight className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation Items - Scrollable */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleMobileNavClick}
                className={cn(
                 "flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-inms-light hover:text-inms-primary transition-colors group",
                  isDesktopCollapsed && "lg:justify-center lg:px-2"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {(!isDesktopCollapsed || isMobileOpen) && (
                  <>
                    <span className="text-sm font-medium flex-1">{item.name}</span>
                    {item.name === 'Messages' && notificationCount > 0 && (
                      <Badge variant="destructive" className="text-xs px-2 py-0">
                        {notificationCount}
                      </Badge>
                    )}
                    {!isOnline && item.name === 'Events' && (
                      <Badge variant="secondary" className="text-xs px-1 py-0">
                        Offline
                      </Badge>
                    )}
                  </>
                )}
                
                {/* Tooltip for collapsed desktop view */}
                {isDesktopCollapsed && !isMobileOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* Admin Section */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            {(!isDesktopCollapsed || isMobileOpen) && (
              <p className="px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Administration
              </p>
            )}
            <div className="space-y-1 px-2">
              {adminItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleMobileNavClick}
                  className={cn(
                   "flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-inms-yellow-light hover:text-inms-secondary transition-colors group",
                    isDesktopCollapsed && "lg:justify-center lg:px-2"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {(!isDesktopCollapsed || isMobileOpen) && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}
                  
                  {/* Tooltip for collapsed desktop view */}
                  {isDesktopCollapsed && !isMobileOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer - User Profile (Mobile Only) */}
        {(!isDesktopCollapsed || isMobileOpen) && (
          <div className="p-4 border-t border-gray-200 flex-shrink-0 lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-inms-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                      JD
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">Dr. Juan Dela Cruz</p>
                      <p className="text-xs text-gray-600">Internal Medicine</p>
                      <div className="flex items-center mt-1">
                        <div className={`w-2 h-2 rounded-full mr-1 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-xs text-gray-500">{isOnline ? 'Online' : 'Offline'}</span>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleMobileNavClick}>
                  <User className="w-4 h-4 mr-2" />
                  <Link href="/profile">View Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleMobileNavClick}>
                  <Settings className="w-4 h-4 mr-2" />
                  <Link href="/profile/edit">Edit Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleMobileNavClick}>
                  <QrCode className="w-4 h-4 mr-2" />
                  <Link href="/inms-id">My INMS ID</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </>
  );
}