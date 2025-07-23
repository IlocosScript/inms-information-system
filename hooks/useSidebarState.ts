import { useState } from 'react';

export function useSidebarState() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return {
    sidebarCollapsed,
    setSidebarCollapsed,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    openMobileMenu: () => setIsMobileMenuOpen(true),
    closeMobileMenu: () => setIsMobileMenuOpen(false),
    toggleMobileMenu: () => setIsMobileMenuOpen(prev => !prev)
  };
} 