import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URLS } from '../services/api/config';

// User data interface
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
  isAdminView: boolean;
}

// Default user fallback
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

// API fetch for user data
const getUserDataFromAPI = async (): Promise<UserData> => {
  try {
    const userId = localStorage.getItem('Userid');
    const role = localStorage.getItem('userRole') || '';
    if (!userId) throw new Error('User ID not found');

    const response = await axios.get(`${BASE_URLS.settings}/details/${userId}`);
    const profile = response.data[0];

    return {
      name: profile.username || 'Guest User',
      role,
      avatar: profile.username
        ? profile.username.charAt(0).toUpperCase()
        : 'GU',
      email: profile.email || '',
      profilePicture: profile.profile_picture_url || '',
    };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return defaultUser;
  }
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState<UserData>(defaultUser);

  const refreshUserData = useCallback(async () => {
    const data = await getUserDataFromAPI();
    setUserData(data);
  }, []);

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const isUserAdmin = useMemo(
    () => userData.role.toLowerCase() === 'admin',
    [userData.role]
  );

  const isAdminView = useMemo(
    () => location.pathname.startsWith('/admin'),
    [location.pathname]
  );

  const toggleAdminMode = useCallback(() => {
    navigate(isAdminView ? '/user-dashboarduser' : '/admin-dashboardadmin');
  }, [isAdminView, navigate]);

  const value = useMemo(
    () => ({
      isAdmin: isUserAdmin,
      toggleAdminMode,
      userData,
      refreshUserData,
      isAdminView,
    }),
    [isUserAdmin, toggleAdminMode, userData, refreshUserData, isAdminView]
  );

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};
