import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import LoginPage from '../src/pages/login_page';
import Dashboard from './pages/dashboard';
import Users from './pages/users';
import Roles from './pages/roles';
import ProtectedRoute from './components/protectedRoutes';
import { useAuth } from './context/authContext';
import { useRole } from './context/rolescontext';


import './App.css'

const App: React.FC = () => {

  const { user } = useAuth();
  const { role } = useRole();
  console.log("This is the Role", role);
  console.log(user);
  return (


    <Routes>
      <Route path='/' element={<Navigate to="/login" />} />

      <Route path='/login' element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<Dashboard />} />}
      />
      <Route
        path="/users"
        element={<ProtectedRoute element={<Users />} />}
      />
      <Route
        path="/roles"
        element={<ProtectedRoute element={<Roles />} />}
      />
    </Routes>


  )
};

export default App
