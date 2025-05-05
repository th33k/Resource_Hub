import React, { useState } from 'react';
import ProfileSection from '../components/Settings/ProfileSettings';
import AccountSection from '../components/Settings/AccountSettings';
import AdminLayout from '../layouts/Admin/AdminLayout'; 
import UserLayout from '../layouts/User/UserLayout'; 
import { Tabs, Tab, Box, Paper } from '@mui/material';

const Settings = () => {
  const userRole = localStorage.getItem("userRole");
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const renderContent = (
    <Paper elevation={2} sx={{ width: '100%', mx: 'auto', p: 4 }}>
      <h1 className="text-2xl font-bold mb-6 text-center">Settings</h1>
      <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
        <Tab label="Profile" />
        <Tab label="Account" />
      </Tabs>
      <Box>
        {tab === 0 && <ProfileSection />}
        {tab === 1 && <AccountSection />}
      </Box>
    </Paper>
  );

  // Conditional rendering based on role
  return (
    <>
      {userRole === "Admin" ? (
        <AdminLayout>{renderContent}</AdminLayout>
      ) : userRole === "User" ? (
        <UserLayout>{renderContent}</UserLayout>
      ) : (
        // Fallback for invalid or no role
        <div className="max-w-2xl mx-auto p-4">
          <p>Please log in to view this page.</p>
        </div>
      )}
    </>
  );
};

export default Settings;