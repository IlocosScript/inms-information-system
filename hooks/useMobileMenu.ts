import { useState, useEffect } from 'react';

export function useMobileMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  console.log('useMobileMenu - Current state:', isMobileMenuOpen);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Expose toggle function globally for fallback
  useEffect(() => {
    (window as any).toggleMobileSidebar = () => setIsMobileMenuOpen(prev => !prev);
    return () => {
      delete (window as any).toggleMobileSidebar;
    };
  }, [setIsMobileMenuOpen]);

  return {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    openMobileMenu: () => setIsMobileMenuOpen(true),
    closeMobileMenu: () => setIsMobileMenuOpen(false),
    toggleMobileMenu: () => setIsMobileMenuOpen(prev => !prev)
  };
} 