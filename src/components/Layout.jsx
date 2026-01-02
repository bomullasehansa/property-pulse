import React from 'react';
import { Outlet } from 'react-router-dom';
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
        <p>© {new Date().getFullYear()} Property Pulse. All rights reserved.</p>
        <p>Created by Sehansa.</p>
      </footer>
    </div>
  );
};

export default Layout;