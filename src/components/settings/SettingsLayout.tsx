import React from 'react';
import { Toaster } from 'react-hot-toast';

interface SettingsLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>
      <div className="p-6">{children}</div>
      <Toaster position="top-right" />
    </div>
  );
};