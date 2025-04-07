import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

const Navbar: React.FC = () => {
  const { query, setQuery } = useSearch();
  const [searchBarVisible, setSearchBarVisible] = useState(false); // State to control visibility of search bar
  const [navItemsVisible, setNavItemsVisible] = useState(true); // State to control visibility of nav items

  const toggleSearchBar = () => {
    setSearchBarVisible(!searchBarVisible);
    setNavItemsVisible(!navItemsVisible); // Toggle nav items visibility when search bar is toggled
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">PggsVentures</Link>
      </div>

      <ul className={`navbar-menu ${navItemsVisible ? '' : 'hidden'}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/admin/login">Admin</Link></li>
        {/* Add more nav items and icons as needed */}
      </ul>

      {/* Search Icon that appears on small screens */}
      <div className="search-icon" onClick={toggleSearchBar}>
      <span className="material-symbols-outlined">
search
</span> {/* You can use any icon, like FontAwesome */}
      </div>

      {/* Search Bar that slides down when the search icon is clicked */}
      <div className={`navbar-search-bar ${searchBarVisible ? 'search-bar-visible' : ''}`}>
        <input
          type="text"
          placeholder="Search products..."
          className="navbar-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
