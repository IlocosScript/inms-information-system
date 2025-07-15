"use client";

import { useState, useEffect } from 'react';
import { Button } from './button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'bottom';
}

export function MobileDrawer({ isOpen, onClose, title, children, position = 'bottom' }: MobileDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const positionClasses = {
    left: 'left-0 top-0 h-full w-80 translate-x-full',
    right: 'right-0 top-0 h-full w-80 -translate-x-full',
    bottom: 'bottom-0 left-0 right-0 max-h-[80vh] translate-y-full rounded-t-lg'
  };

  const transformClasses = {
    left: isOpen ? 'translate-x-0' : '-translate-x-full',
    right: isOpen ? 'translate-x-0' : 'translate-x-full',
    bottom: isOpen ? 'translate-y-0' : 'translate-y-full'
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={cn(
        'fixed bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out',
        positionClasses[position],
        transformClasses[position]
      )}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-4 overflow-y-auto max-h-full">
          {children}
        </div>
      </div>
    </>
  );
}