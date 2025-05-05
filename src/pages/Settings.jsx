import React from 'react';
import ProfileSection from '../components/Settings/ProfileSettings';
import AccountSection from '../components/Settings/AccountSettings';
import AdminLayout from '../layouts/Admin/AdminLayout'; 
import UserLayout from '../layouts/User/UserLayout'; 

const Settings = () => {

  const userRole = localStorage.getItem("userRole");


  const renderContent = (
    <div className="">
      <h1 className="text-2xl font-bold mb-6 text-center">Settings</h1>
      <ProfileSection />
      <AccountSection />
    </div>
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