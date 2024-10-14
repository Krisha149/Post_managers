// /src/components/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Auth.css'; // Optional shared styles with SignIn

const SignUp = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '', repeatPassword: '' });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, repeatPassword } = user;

    // Basic validation
    if (!name || !email || !password || !repeatPassword) {
      setError('All fields are required!');
      return;
    }

    if (password !== repeatPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the terms of service!');
      return;
    }

    // Mock registration (you can replace this with an actual API call)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find((u) => u.email === email)) {
      setError('Email already registered!');
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please sign in.');
    navigate('/'); // Redirect to Sign In page
  };

  return (
    <div className="auth-container">
      <header>
        <h2>Sign Up</h2>
      </header>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* <label htmlFor="name">Name</label> */}
          <div className="input-wrapper">
            <i className="fas fa-user"></i> {/* User icon */}
            <input
              type="text"
              id="name"
              name="name"
              placeholder='Enter Name'
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          {/* <label htmlFor="email">Email</label> */}
          <div className="input-wrapper">
            <i className="fas fa-envelope"></i> {/* Email icon */}
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Enter Email'
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          {/* <label htmlFor="password">Password</label> */}
          <div className="input-wrapper">
            <i className="fas fa-lock"></i> {/* Password icon */}
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Enter Password'
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          {/* <label htmlFor="repeatPassword">Repeat Password</label> */}
          <div className="input-wrapper">
            <i className="fas fa-lock"></i> {/* Repeat password icon */}
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder='Enter Repeat Password'
              value={user.repeatPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
               />{' '}I agree to all statements in the Link terms of service
          </label>
        </div>

        <button type="submit" className="register-button" style={{backgroundColor:'blue',color:"white"}}>Register</button>
      </form>

      <p>
        Already have an account? <Link to="/">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;

