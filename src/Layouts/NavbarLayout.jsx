import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const NavbarLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="container relative p-3 mx-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default NavbarLayout;
