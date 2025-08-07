import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: number[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!user?.email;
  const role = user?.role;

  if (!isLoggedIn) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    
    return <Navigate to="/unauthorized" replace />;
  }


  return <Outlet />;
};


export const Unauthorized: React.FC = () => (
  <div>
    <h2>Acceso denegado</h2>
    <img src="../assets/images/accesDenied.jpg" alt="" />
  </div>
);



