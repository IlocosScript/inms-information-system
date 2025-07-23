"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { useSidebarState } from '@/hooks/useSidebarState';

export default function TestMobilePage() {
  const { sidebarCollapsed, setSidebarCollapsed, isMobileMenuOpen, setIsMobileMenuOpen, openMobileMenu } = useSidebarState();

  console.log('TestMobilePage [test] - Mobile menu state:', isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-white">
      <Sidebar 
        isMobileOpen={isMobileMenuOpen}
        onMobileToggle={setIsMobileMenuOpen}
        onDesktopToggle={setSidebarCollapsed}
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={() => {
            console.log('TestMobilePage [test] - Menu button clicked');
            openMobileMenu();
          }}
          title="Mobile Menu Test"
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6 pt-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Mobile Menu Test</h1>
            <p className="mb-4">This page tests the mobile menu functionality.</p>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold">Current State:</h3>
                <p>Mobile Menu Open: {isMobileMenuOpen ? 'Yes' : 'No'}</p>
                <p>Sidebar Collapsed: {sidebarCollapsed ? 'Yes' : 'No'}</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold">Instructions:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Resize your browser to mobile width (or use dev tools)</li>
                  <li>Click the hamburger menu button in the top-left</li>
                  <li>The sidebar should slide in from the left</li>
                  <li>Click outside or the X button to close</li>
                </ol>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold">Debug Info:</h3>
                <p className="text-sm">Check the browser console for debug logs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 