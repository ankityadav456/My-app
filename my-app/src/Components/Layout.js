import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Import your Header component
import Footer from './Footer'; // Import your Footer component

const Layout = ({ logout }) => {
  return (
    <div>
      <Header /> {/* Include Header */}
      
      <main>
        <Outlet /> {/* The content of the routed page will be rendered here */}
      </main>

      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default Layout;
