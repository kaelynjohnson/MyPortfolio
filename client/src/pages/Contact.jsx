// Contact.jsx - contact page with a contact info panel and a form that saves messages to the database
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api.js';

function Contact() {
  const navigate = useNavigate();

  // Holds whatever the visitor types into each form field
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    message: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Updates the matching field in formData each time the visitor types
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Sends the message to the backend, then redirects the visitor back to the Home page
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await apiRequest('/api/contacts', 'POST', formData);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="contact">
      <h1>Contact Me</h1>

      <div className="contact-layout">
        <aside className="contact-panel">
          <h2>Contact Information</h2>
          <p><strong>Name:</strong> Kaelyn Johnson</p>
          <p><strong>Phone:</strong> 000-000-0000</p>
          <p><strong>Email:</strong> kjohn124@my.centennialcollege.ca</p>
          <p>
            You can reach me by phone between 9:00 AM and 5:00 PM. Email is
            welcome anytime.
          </p>
        </aside>

        <form className="contact-form" onSubmit={handleSubmit}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Contact Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="button">Send Message</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;