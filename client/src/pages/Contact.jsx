// Contact.jsx - contact page with a contact info panel and a message form
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();

  // Holds whatever the visitor types into each form field
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    message: '',
  });

  // Updates the matching field in formData each time the visitor types
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Captures the form data, then redirects the visitor back to the Home page
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/');
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
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <label htmlFor="phoneNumber">Contact Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <label htmlFor="emailAddress">Email Address</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={formData.emailAddress}
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