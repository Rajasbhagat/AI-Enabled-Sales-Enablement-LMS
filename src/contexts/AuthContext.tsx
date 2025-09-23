import React, { useEffect, useState, createContext, useContext } from 'react';
type User = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SALES_MANAGER';
  department?: string;
  profileImage?: string;
};
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (token: string, password: string) => Promise<void>;
  logout: () => void;
  completeProfileSetup: (data: Partial<User>) => Promise<void>;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock response - in a real app this would come from your backend
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email,
        // For demo, determine role based on email
        role: email.includes('admin') ? 'ADMIN' : 'SALES_MANAGER' as 'ADMIN' | 'SALES_MANAGER',
        department: email.includes('admin') ? 'HR' : 'Sales'
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const register = async (token: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call to validate token and create account
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock response - in a real app this would verify the token
      const mockUser = {
        id: '2',
        name: '',
        email: 'new.user@example.com',
        role: 'SALES_MANAGER' as 'SALES_MANAGER',
        department: 'Sales'
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const completeProfileSetup = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (user) {
        const updatedUser = {
          ...user,
          ...data
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Profile setup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    completeProfileSetup
  }}>
      {children}
    </AuthContext.Provider>;
};