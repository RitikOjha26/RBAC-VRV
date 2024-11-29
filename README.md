

# RBAC Project (Role-Based Access Control)

This is a **Role-Based Access Control (RBAC)** system built using **React**, **Material-UI (MUI)**, and **React Context API**. The project implements user authentication, authorization, and role management, allowing administrators to manage users and roles efficiently.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [APIs](#apis)
- [Database Schema](#database-schema)
- [Setup Instructions](#setup-instructions)
- [Login Credentials](#login-credentials)

---

## Features

1. **Authentication**
   - Login system that verifies user credentials.
   - Logout functionality to clear user session.

2. **Authorization**
   - Protected Routes ensuring access only for logged-in users.
   - Role-based feature permissions (e.g., Admin has full access, Manager has limited write access).

3. **User Management**
   - Add, update, delete, and view users.
   - View user details and roles.

4. **Role Management**
   - Add, update, delete, and view roles.
   - Assign permissions to roles.

5. **Interactive Dashboard**
   - View statistics with interactive charts.
   - Access detailed user and role information.

6. **Reusable Components**
   - Forms for adding/editing users and roles.
   - Side navigation, profile display, and particles effect for enhanced UI.

---

## Tech Stack

- **Frontend**: React, Material-UI (MUI), React Context API
- **Build Tool**: Vite
- **Styling**: CSS
- **Data Management**: Context API

---

## Folder Structure

```plaintext
src/
│
├── api/                  # API calls for users and roles
│   ├── users.ts          # User-related API calls
│   ├── roles.ts          # Role-related API calls
│
├── assets/               # Static files and assets
├── components/           # Reusable components
│   ├── addUserForm.tsx   # Form to add users
│   ├── addRoleForm.tsx   # Form to add roles
│   ├── editUserForm.tsx  # Form to edit users
│   ├── editRoleForm.tsx  # Form to edit roles
│   ├── ProtectedRoutes.tsx # Protect routes based on authentication
│   ├── sideNav.tsx       # Sidebar navigation
│   ├── charts.tsx        # Interactive charts
│   └── Profile.tsx       # User profile display
│
├── context/              # React Context for state management
│   ├── authContext.tsx   # Authentication context
│   ├── userContext.tsx   # Context for managing user data
│   ├── roleContext.tsx   # Context for managing role data
│
├── pages/                # Page components
│   ├── LoginPage.tsx     # Login page
│   ├── DashboardPage.tsx # Dashboard page
│   ├── UsersPage.tsx     # User management page
│   ├── RolesPage.tsx     # Role management page
│
├── styles/               # CSS files for styling
│
├── App.tsx               # Main App component
├── main.tsx              # Entry point
└── vite-env.d.ts         # TypeScript environment config
```

---

## APIs

### Users API
1. **`login(email, password)`**  
   Authenticate user credentials.

2. **`getAllUsers()`**  
   Fetch all users.

3. **`getUserById(id)`**  
   Fetch a specific user by their ID.

4. **`getUserCount()`**  
   Get the total number of users.

5. **`addUser(userData)`**  
   Add a new user.

6. **`updateUser(id, userData)`**  
   Update an existing user.

7. **`deleteUser(id)`**  
   Delete a user by ID.

### Roles API
1. **`usePermissionAPI()`**  
   Fetch permissions for the logged-in user.

2. **`getAllRoles()`**  
   Fetch all roles.

3. **`getRolesCount()`**  
   Get the total number of roles.

4. **`getRolesById(id)`**  
   Fetch a specific role by its ID.

5. **`addRole(roleData)`**  
   Add a new role.

6. **`updateRole(id, roleData)`**  
   Update an existing role.

7. **`deleteRole(id)`**  
   Delete a role by ID.

---

## Database Schema

### Users
```javascript
const users = [
  {
    userId: "1",
    userName: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    roleId: "101",
    active: true,
  },
  // ...
];
```

### Roles
```javascript
const rolesData = {
  roles: [
    {
      roleId: "101",
      roleName: "ADMIN",
      features: [
        { featureName: "Roles Page", access: "WRITE" },
        { featureName: "User Management", access: "WRITE" },
      ],
    },
    // ...
  ],
};
```

---
---

## Setup Instructions

Follow these steps to set up the project on your local system:

### Prerequisites

Make sure you have the following installed on your system:

1. **Node.js**: [Download and Install Node.js](https://nodejs.org/)
2. **Git**: [Download and Install Git](https://git-scm.com/)
3. **Code Editor**: [VS Code](https://code.visualstudio.com/) is recommended.

---

### 1. Clone the Repository

Use the following command to clone the repository:

```bash
git clone https://github.com/RitikOjha26/RBAC-VRV.git
```

Navigate to the project directory:

```bash
cd RBAC-VRV
```

---

### 2. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

---

### 3. Start the Development Server

To start the development server, run:

```bash
npm run dev
```

The app will be accessible at `http://localhost:5173/`.

---


## Scripts

Here are some useful npm scripts:

- **Start Development Server**: `npm run dev`
- **Build Production Files**: `npm run build`
- **Lint Code**: `npm run lint`


---

## Login Credentials

| Role     | Email                     | Password     |
|----------|---------------------------|--------------|
| Admin    | john.doe@example.com      | password123  |
| Manager  | jane.smith@example.com    | password456  |
| User     | bob.brown@example.com     | password789  |

---

## Notes


- Protected routes ensure only authorized users can access specific pages.

Feel free to fork or contribute to this project. Happy coding!

--- 