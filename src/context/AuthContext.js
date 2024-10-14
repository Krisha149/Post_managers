// /src/context/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider to wrap the app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (matchedUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
      setIsAuthenticated(true);
      setUser(matchedUser);
      navigate('/dashboard');
      console.log('Logged in user:', matchedUser); 
      return true; 
    } else {
      alert('Invalid credentials');
    console.log('Invalid credentials for:', email); 
    return false; 
    }
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
