
interface User {
  userId: string,
  userName: string,
  email: string,
  password: string,
  roleId: string,
  active: boolean,
}

interface UserUpdate {
  userId: string,
  userName: string,
  email: string,
  roleId: string,
  active: boolean,

}



const users: User[] = [
  {
    userId: "1",
    userName: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    roleId: "101",
    active: true,
  },
  {
    userId: "2",
    userName: "Jane Smith",
    email: "jane.smith@example.com",
    password: "password456",
    roleId: "102",
    active: true,
  },
  {
    userId: "3",
    userName: "Bob Brown",
    email: "bob.brown@example.com",
    password: "password789",
    roleId: "103",
    active: false,
  },
];

export const LoginAPI = async (email: string, password: string) => {

  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {

    const { password, ...userData } = user;
    return {

      ...userData,
    };
  }
};

export const getAllUsers = async () => {

  return users.map(({ password, ...userData }) => userData);
};


export const getUserCount = async () => {

  const response = await getAllUsers();

  return response.length;
}

export const getUserById = async (Id: string) => {

  const user = users.find((user) => user.userId === Id);

  if (user) {

    const { password, ...userData } = user;
    return {

      ...userData,
    };
  }

}

export const addUser = async (newUser: User) => {

  if (!newUser.userId || !newUser.userName || !newUser.email || !newUser.password || !newUser.roleId) {
    throw new Error("Invalid user data. All fields are required.");
  }


  const userExists = users.some((user) => user.email === newUser.email || user.userId === newUser.userId);
  if (userExists) {
    throw new Error("User with this email or userId already exists.");
  }


  users.push(newUser);


  const { password, ...userData } = newUser;
  return userData;
};



export const updateUser = async (updatedUser: UserUpdate) => {

  const userIndex = users.findIndex(user => user.userId === updatedUser.userId);

  if (userIndex === -1) {
    throw new Error("User not found.");
  }


  const { userId, userName, email, roleId, active } = updatedUser;
  if (!userName || !email || !roleId) {
    throw new Error("All fields except password and userId are required.");
  }


  const updatedData = {
    userId,
    userName: userName || users[userIndex].userName,
    email: email || users[userIndex].email,
    roleId: roleId || users[userIndex].roleId,
    active: active ?? users[userIndex].active,

  };


  users[userIndex] = { ...users[userIndex], ...updatedData };


  const { ...userData } = users[userIndex];
  return userData;
};

export const deleteUser = async (Id:string) =>{

  const userIndex = users.findIndex((user) => user.userId === Id);

  if (userIndex === -1) {
    throw new Error("User not found.");
  }

  users.splice(userIndex, 1); 
  return { message: "User deleted successfully." };

};







