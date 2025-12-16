'use client';

import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {description && <p className="text-lg opacity-90">{description}</p>}
      </div>
    </div>
  );
}
