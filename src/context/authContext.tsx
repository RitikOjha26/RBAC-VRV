import React, { createContext, useState, useContext, ReactNode } from 'react';
import { LoginAPI , getAllUsers } from '../api/users';

interface User {
  userId: string;
  userName: string;
  email: string;
  roleId: string;
  active: boolean;
  
}




interface AuthContextType {
  user: User | null ; 
  userList: User[];
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  fetchUserList: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType | null>(null);


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userList, setUserList] = useState<User[]>([]);

  const login = async (email: string, password: string) => {
    try {
      const response = await LoginAPI(email, password);
  
      if (!response || !response.userId || !response.roleId) {
        throw new Error('Invalid API response structure.');
      }
  
      setUser(response);
      localStorage.setItem('user', JSON.stringify(response));
      return response; 
    } catch (error) {
      console.error('Login Failed:', error);
      throw error;
    }
  };

  const fetchUserList = async () => {
    try {
      const users = await getAllUsers();
      setUserList(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  

  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user,userList, login , logout,fetchUserList }}>
      {children}
    </AuthContext.Provider>
  );
};
