import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const NavbarLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="container relative flex-1 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default NavbarLayout;
