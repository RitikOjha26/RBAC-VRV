interface Feature {
    featureName: string;
    access: "WRITE" | "READ" | "NO_ACCESS";
  }
  
  interface Role {
    roleId: string;
    roleName: string;
    features: Feature[];
  }
  
  interface RolesDatabase {
    roles: Role[];
  }
  
  const rolesData: RolesDatabase = {
    roles: [
      {
        roleId: "101",
        roleName: "ADMIN",
        features: [
          { featureName: "Roles Page", access: "WRITE" },
          { featureName: "User Management", access: "WRITE" },
          
        ],
      },
      {
        roleId: "102",
        roleName: "MANAGER",
        features: [
          { featureName: "Roles Page", access: "READ" },
          { featureName: "User Management", access: "WRITE" },
          
        ],
      },
      {
        roleId: "103",
        roleName: "USER",
        features: [
          { featureName: "Roles Page", access: "NO_ACCESS" },
          { featureName: "User Management", access: "NO_ACCESS" },
          
        ],
      },
    ],
  };
  
  export const userPermissionsAPI = async (roleId: string): Promise<{roleId: string; roleName: string; features: Feature[] }> => {
   
    const role = rolesData.roles.find((role) => role.roleId === roleId);
    
    if (!role) {
      throw new Error(`Role with ID ${roleId} not found`);
    }
  
    return {
      roleId: role.roleId,
      roleName: role.roleName,
      features: role.features,
    };
};

export const getAllRoles = async () => {
    return rolesData.roles.map(({...role}) => role);
  };

export const getRolesCount = async () =>{

    return rolesData.roles.length;;
}
  
export const getRolesById = async (Id:string) =>{

  const role = rolesData.roles.find((role)=> role.roleId === Id);

  if(role)
  {
    return role;
  }
}

export const addRole = async (newRole :Role) =>{

  if (!newRole.roleId || !newRole.roleName ||  !newRole.features) {
    throw new Error("Invalid user data. All fields are required.");
  }


  const RoleExists = rolesData.roles.some((role) => role.roleName === newRole.roleName);
  if (RoleExists) {
    throw new Error("User with this email or userId already exists.");
  }

  rolesData.roles.push(newRole);


}

export const updateRole = async (updatedRole: Role) => {
  const userIndex = rolesData.roles.findIndex(role => role.roleId === updatedRole.roleId);

  if (userIndex === -1) {
    throw new Error("Role not found.");
  }

  
  const updatedData = {
    roleId: updatedRole.roleId,
    roleName: updatedRole.roleName || rolesData.roles[userIndex].roleName,
    features: updatedRole.features || rolesData.roles[userIndex].features,
  };

  rolesData.roles[userIndex] = { ...rolesData.roles[userIndex], ...updatedData };

  return rolesData.roles[userIndex]; 
};

export const deleteRole = async (Id: string) => {
  const roleIndex = rolesData.roles.findIndex(role => role.roleId === Id);

  if (roleIndex === -1) {
    throw new Error("Role not found.");
  }

  rolesData.roles.splice(roleIndex, 1);
  return { message: "Role deleted successfully." };
};



  