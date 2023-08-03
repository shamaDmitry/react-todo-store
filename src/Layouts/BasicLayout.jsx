import React from 'react';
import { Outlet } from 'react-router-dom';

const BasicLayout = ({ children }) => {
  return (
    <main className="flex flex-col min-h-screen ">
      <Outlet />
    </main>
  );
}

export default BasicLayout;
