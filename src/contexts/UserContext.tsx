import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Define UserData interface locally since we'll remove types.ts
export interface UserData {
  name: string;
  role: string;
  avatar: string;
  email?: string;
  profilePicture?: string;
}

interface UserContextType {
  isAdmin: boolean;
  toggleAdminMode: () => void;
  userData: UserData;
  refreshUserData: () => void;
  isAdminView: boolean; // Add isAdminView to the type
}

// Fallback user data
const defaultUser: UserData = {
  name: 'Guest User',
  role: 'User',
  avatar: 'GU',
};

const UserContext = createContext<UserContextType>({
  isAdmin: false,
  toggleAdminMode: () => {},
  userData: defaultUser,
  refreshUserData: () => {},
  isAdminView: false,
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get user data from localStorage immediately on first render
  const initialUserData = (() => {
    const username = localStorage.getItem('Username');
    const userRole = localStorage.getItem('userRole');
    const profilePicture = localStorage.getItem('Profile_picture');
    const email = localStorage.getItem('Email');
    
    if (username && userRole) {
      // Get initials for avatar if no profile picture
      const initials = username.charAt(0).toUpperCase();
      
      return {
        name: username,
        role: userRole,
        avatar: initials,
        email: email || '',
        profilePicture: profilePicture || '',
      };
    }
    
    return defaultUser;
  })();
  
  const [userData, setUserData] = useState<UserData>(initialUserData);

  // Get user data from localStorage
  const getUserDataFromStorage = useCallback(() => {
    const username = localStorage.getItem('Username');
    const userRole = localStorage.getItem('userRole');
    const profilePicture = localStorage.getItem('Profile_picture');
    const email = localStorage.getItem('Email');
    
    if (username && userRole) {
      // Get initials for avatar if no profile picture
      const initials = username.charAt(0).toUpperCase();
      
      return {
        name: username,
        role: userRole,
        avatar: initials,
        email: email || '',
        profilePicture: profilePicture || '',
      };
    }
    
    return defaultUser;
  }, []);
  
  // Function to refresh user data (can be called after login/logout)
  const refreshUserData = useCallback(() => {
    setUserData(getUserDataFromStorage());
  }, [getUserDataFromStorage]);

  // Load user data on mount and when localStorage changes
  useEffect(() => {
    // Add event listener for storage changes
    const handleStorageChange = () => {
      refreshUserData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Initial refresh
    refreshUserData();
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [refreshUserData]);

  // Check if user is an admin based on the role in userData
  const isUserAdmin = useMemo(() => 
    userData.role === 'Admin' || userData.role === 'admin',
  [userData.role]);

  // Compute isAdminView based on current location
  const isAdminView = useMemo(() => 
    location.pathname.startsWith('/admin'),
  [location.pathname]);

  // Toggle between admin and user views
  const toggleAdminMode = useCallback(() => {
    navigate(isAdminView ? '/user-dashboarduser' : '/admin-dashboardadmin');
  }, [isAdminView, navigate]);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      isAdmin: isUserAdmin,
      toggleAdminMode,
      userData,
      refreshUserData,
      isAdminView, // Provide isAdminView in the context value
    }),
    [isUserAdmin, toggleAdminMode, userData, refreshUserData, isAdminView] // Add isAdminView dependency
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};