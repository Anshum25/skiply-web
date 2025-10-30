import React, { useState } from 'react';
import InputField from '../components/Common/InputField';
import Button from '../components/Common/Button';
import '../css/pages/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <h3>Email</h3>
                <p>support@skiply.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div>
                <h3>Phone</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <h3>Address</h3>
                <p>123 Tech Park, Bangalore, Karnataka 560001</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <InputField
                  type="text"
                  label="Name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleChange({ target: { name: 'name', value: e.target.value } })}
                  icon="👤"
                  required
                />
                <InputField
                  type="email"
                  label="Email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={(e) => handleChange({ target: { name: 'email', value: e.target.value } })}
                  icon="📧"
                  required
                />
              </div>
              
              <InputField
                type="text"
                label="Subject"
                placeholder="What is this about?"
                value={formData.subject}
                onChange={(e) => handleChange({ target: { name: 'subject', value: e.target.value } })}
                icon="📝"
                required
              />
              
              <InputField
                type="textarea"
                label="Message"
                placeholder="Tell us more about your inquiry..."
                value={formData.message}
                onChange={(e) => handleChange({ target: { name: 'message', value: e.target.value } })}
                rows="5"
                required
              />

              <Button type="submit" variant="primary" className="submit-btn">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
