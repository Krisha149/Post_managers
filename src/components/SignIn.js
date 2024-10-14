// /src/components/SignIn.js

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { Link, useNavigate } from 'react-router-dom'; 

const SignIn = () => {
  const { login } = useAuth(); // Destructure the login function from the Auth context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // New state for "Remember Me"
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(email, password);
    if (success) {
      navigate('/dashboard'); // Navigate to dashboard on success
    } else {
      alert('Invalid credentials'); // Show alert if login fails
    }
  };

  return (
    <div className="auth-container max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div>
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;

