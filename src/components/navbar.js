// src/components/NavBar.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css'; // Import the CSS file for styling

const BREAKPOINT = 768;

const NavBar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const navbarRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    if (window.innerWidth > BREAKPOINT) { // Use the constant here
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      setNavbarVisible(true); // Show navbar
    } else {
      setNavbarVisible(false); // Hide navbar
    }
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  const scrollToSection = (sectionId) => {
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView();
      }
    }, 0);
    // setIsOpen(false); // Close the mobile menu, if open
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]); // Now handleScroll is in the dependency array

  // Automatically collapse the navbar on route change
  useEffect(() => {
    setIsOpen(false); // Close the menu when the route changes
  }, [location]);

  return (
    <nav className={`navbar ${navbarVisible ? 'visible' : 'hidden'}`} ref={navbarRef}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={(e) => scrollToSection('top')}>CS330 - AI Labs</Link>
        </div>

        <div className={`menu-icon ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={(e) => scrollToSection('projects')}>Projects</Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={(e) => scrollToSection('contact')}>Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
