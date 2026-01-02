import React from 'react';
import { Outlet } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Navbar from './Navbar';
import './Layout.css';

const Layout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="app-footer">
        <div className="footer-contact">
        <div className="contact-item">
          <MapPin size={18} />
          <span>London, United Kingdom</span>
        </div>
        <div className="contact-item">
            <Phone size={18} />
            <span>0740589656</span>
        </div>
        <div className="contact-item">
            <Mail size={18} />
            <span>info@propertypulse.com</span>
        </div>
        </div>
        <div className="footer-credits">
        <p>© {new Date().getFullYear()} Property Pulse. All rights reserved.</p>
        <p>Created by Sehansa.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;