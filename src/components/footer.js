import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} CS330 - AI Labs. All rights reserved.</p>
      <p>
        Designed by <a href="mailto:harshchy2210@gmail.com" className="footer-link">Harsh Choudhary</a>
      </p>
    </footer>
  );
};

export default Footer;
