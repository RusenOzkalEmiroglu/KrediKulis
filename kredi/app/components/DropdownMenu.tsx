'use client';

import React from 'react';
import Link from 'next/link';

interface SubmenuItem {
  name: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

interface MenuCategory {
  title: string;
  items: SubmenuItem[];
}

interface DropdownMenuProps {
  isOpen: boolean;
  categories: MenuCategory[];
  onClose: () => void;
  title: string;
}

export default function DropdownMenu({ isOpen, categories, onClose, title }: DropdownMenuProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute left-0 right-0 top-16 bg-white shadow-md border-t border-gray-200 z-50"
      onMouseEnter={(e) => e.stopPropagation()}
      onMouseLeave={onClose}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 pb-2 border-b">
          <h2 className="text-lg font-medium text-gray-800">{title}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.title} className="space-y-6">
              {category.items.map((item) => (
                <div key={item.name} className="group">
                  <Link href={item.href}>
                    <div className="flex items-start space-x-3">
                      {item.icon && (
                        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-orange-50 text-primary">
                          {item.icon}
                        </div>
                      )}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">{item.name}</h3>
                        {item.description && (
                          <p className="mt-1 text-xs text-gray-500">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 