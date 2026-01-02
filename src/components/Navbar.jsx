import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-bg-image"></div>
      <div className="navbar-bg-overlay"></div>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Building2 className="brand-icon" size={50} />
          <div className="brand-content">
            <h1 className="brand-title">
              <span className="title-property">Property</span>
              <span className="title-pulse">Pulse</span>
            </h1>
            <p className="brand-tagline">Find Your Dream Home Today</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;