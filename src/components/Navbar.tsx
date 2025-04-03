import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">PggsVentures</Link>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/admin/login">Admin</Link></li>
        {/* Add more nav items and icons as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
