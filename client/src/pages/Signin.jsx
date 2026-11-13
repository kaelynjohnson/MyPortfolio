// Signin.jsx - sign in form; keeps the typed values in state and signs the user in
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Signin() {
  const navigate = useNavigate();
  const { signin } = useAuth();

  // Holds whatever the visitor types into each form field
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  // Updates the matching field each time the visitor types
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Sends the email and password to the backend; on success, goes to the Home page
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signin(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="auth-page">
      <h1>Sign In</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

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

        <button type="submit" className="button">Sign In</button>
      </form>
    </section>
  );
}

export default Signin;