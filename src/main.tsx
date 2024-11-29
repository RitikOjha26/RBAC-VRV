import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './context/authContext'; 
import { RoleProvider } from './context/rolescontext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RoleProvider>
      <BrowserRouter> 
        <App />
      </BrowserRouter>
      </RoleProvider>
    </AuthProvider>
  </StrictMode>
);
