import React from 'react';
import './Contact.css';

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <div className="contact-methods">
        <div className="contact-method">
          <h3>Email</h3>
          <p>support@example.com</p>
        </div>
        <div className="contact-method">
          <h3>Phone</h3>
          <p>(123) 456-7890</p>
        </div>
        <div className="contact-method">
          <h3>Live Chat</h3>
          <p><a href="/chat">Start a chat</a></p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
