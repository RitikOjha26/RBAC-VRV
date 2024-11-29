import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { userPermissionsAPI , getAllRoles } from '../api/roles';
import { useAuth } from '../context/authContext'; 

interface Feature {
  featureName: string;
  access: "WRITE" | "READ" | "NO_ACCESS";
}

interface Role {
  roleId:string;
  roleName: string;
  features: Feature[];
}

interface RolesContextType {
  role: Role | null;
  rolesList: Role[]|null;
  getPermission: (roleID: string) => Promise<Role | null>;
  fetchRolesList: () => Promise<void>;
}

const RoleContext = createContext<RolesContextType | null>(null);

export const useRole = () => {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error("useRole must be used within RoleProvider");
  }

  return context;
};

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const { user } = useAuth(); 
  const [role, setRole] = useState<Role | null>(null);
  const [rolesList , setRolesList] = useState<Role[]|null>(null);
  

  
  const getPermission = async (roleId: string) => {
    try {
      const response = await userPermissionsAPI(roleId);
      console.log(response)
      if (!response) {
        throw new Error("Error Fetching Specific Roles");
      }

      setRole(response);
      return response;
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  };

  const fetchRolesList = async () =>{
    const response = await getAllRoles();
    setRolesList(response);
  }
  
  
  useEffect(() => {
    if (user && user.roleId) {
        getPermission(user.roleId);
    }
  }, [user]); 

  return (
    <RoleContext.Provider value={{ role ,rolesList, getPermission , fetchRolesList }}>
      {children}
    </RoleContext.Provider>
  );
};
