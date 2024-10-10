import React from 'react';
import './contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2>Contact</h2>
      <p>If you have any questions, feedback, or would just like to get in touch, feel free to reach out to us. We’re here to help and would love to hear from you.</p>
      <div className="contact-details">
        <p><strong>Phone:</strong> <a href="tel:+1234567890" className="contact-link"> +123-456-7890</a></p>
        <p><strong>Email:</strong> <a href="mailto:contact@example.com?subject=Inquiry%20from%20Website" className="contact-link"> contact@example.com</a></p>
      </div>
    </section>
  );
};

export default Contact;