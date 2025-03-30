import React from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { AccountSettings } from '../components/settings/AccountSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { PrivacySettings } from '../components/settings/PrivacySettings';
import { DisplaySettings } from '../components/settings/DisplaySettings';
import { SecuritySettings } from '../components/settings/SecuritySettings';

const settingsNavItems = [
  { path: 'account', label: 'Account' },
  { path: 'notifications', label: 'Notifications' },
  { path: 'privacy', label: 'Privacy' },
  { path: 'display', label: 'Display' },
  { path: 'security', label: 'Security' },
];

export const Settings = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <nav className="flex space-x-4 border-b border-gray-200">
          {settingsNavItems.map((item) => (
            <Link
              key={item.path}
              to={`/settings/${item.path}`}
              className={`px-4 py-2 text-sm font-medium ${
                currentPath === item.path
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/settings/account" replace />} />
        <Route path="account" element={<AccountSettings />} />
        <Route path="notifications" element={<NotificationSettings />} />
        <Route path="privacy" element={<PrivacySettings />} />
        <Route path="display" element={<DisplaySettings />} />
        <Route path="security" element={<SecuritySettings />} />
      </Routes>
    </div>
  );
};