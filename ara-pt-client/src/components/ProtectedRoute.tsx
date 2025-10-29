import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCookie } from '../hooks';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/login' }) => {
  const hasAccessToken = useCookie('username'); // cannot Check for 'access-token' cookie as httpOnly cookies are not accessible via JS

  if (!hasAccessToken) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;