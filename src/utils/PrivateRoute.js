// /src/utils/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('users'); // Check authentication

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
