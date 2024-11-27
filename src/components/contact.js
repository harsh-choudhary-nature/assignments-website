import React from 'react';
import './contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2>Contact</h2>
      <p>If you have any questions, feedback, or would just like to get in touch, feel free to reach out to us. We’re here to help and would love to hear from you.</p>
      <div className="contact-details">
        <p><strong>Email:</strong> <a href="mailto:harsh.choudhary.21031@iitgoa.ac.in?subject=Inquiry%20from%20CS330%20Website" className="contact-link"> harsh.choudhary.21031@iitgoa.ac.in</a></p>
      </div>
    </section>
  );
};

export default Contact;