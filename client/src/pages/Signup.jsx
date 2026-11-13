// Signup.jsx - sign up form; keeps the typed values in state and creates a new user account
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api.js';

function Signup() {
  const navigate = useNavigate();

  // Holds whatever the visitor types into each form field
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  // Updates the matching field each time the visitor types
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Sends the new account to the backend; on success, goes to the Sign In page
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await apiRequest('/api/users', 'POST', formData);
      navigate('/signin');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="auth-page">
      <h1>Sign Up</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="button">Sign Up</button>
      </form>
    </section>
  );
}

export default Signup;