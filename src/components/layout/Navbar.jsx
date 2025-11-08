import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthModal from "../Auth/AuthModal";
import LocationModal from "../Common/LocationModal";
import Button from "../Common/Button";
import "../../css/Common/common.css";
import "../../css/Common/globals.css";
import "../../css/Layout/navbar.css";

const Navbar = ({ onSearch, searchQuery, setSearchQuery, location, setLocation }) => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const navigate = useNavigate();
  const currentLocation = useLocation();

  useEffect(() => {
    // Check for logged in user
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setShowDropdown(false);
    navigate('/');
    window.location.reload(); // Refresh to update navbar
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery, location);
    }
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const openLocationModal = () => {
    setShowLocationModal(true);
  };

  const closeLocationModal = () => {
    setShowLocationModal(false);
  };

  const handleLocationSelect = (selectedLocation) => {
    if (setLocation) {
      setLocation(selectedLocation);
    }
  };

  const handleBusinessPanelClick = () => {
    console.log('Business Panel button clicked!');
    console.log('Navigating to /business-panel');
    navigate('/business-panel');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="brand-wordmark">SKIPLY</span>
        </Link>
        
        <button className="location-selector" onClick={openLocationModal}>
          <span className="location-icon">📍</span>
          <span className="location-text">
            {location || 'Current Location'}
          </span>
          <span className="dropdown-arrow">▼</span>
        </button>

        {/* Search Bar */}
        <div className="nav-search">
          <form className="search-bar" onSubmit={handleSearch}>
            <div className="search-input-group">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
        </div>

        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={currentLocation.pathname === '/' ? 'active' : ''}
            >
              For you
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={currentLocation.pathname === '/about' ? 'active' : ''}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={currentLocation.pathname === '/contact' ? 'active' : ''}
            >
              Contact
            </Link>
          </li>
         
          
          {!user ? (
            // Not logged in - show Sign In/Sign Up
            <li className="auth-buttons">
              <Button 
                variant="secondary"
                onClick={() => openAuthModal('login')}
              >
                Sign In
              </Button>
              <Button 
                variant="primary"
                onClick={() => openAuthModal('signup')}
              >
                Sign Up
              </Button>
               <Button 
                variant="secondary"
                onClick={handleBusinessPanelClick}
              >
                Business Panel
              </Button>
            </li>
          ) : (
            // Logged in - show profile dropdown
            <li className="profile-dropdown">
              <button 
                className="profile-btn"
                onClick={toggleDropdown}
              >
                <div className="profile-avatar">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="profile-name">{user.name}</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <p className="user-name">{user.name}</p>
                    <p className="user-role">
                      {user.role === 'business_owner' ? '🏢 Business Owner' : '👤 Customer'}
                    </p>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link 
                    to="/profile" 
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    👤 Profile
                  </Link>
                  {user.role === 'business_owner' && (
                    <Link 
                      to="/admin" 
                      className="dropdown-item"
                      onClick={() => setShowDropdown(false)}
                    >
                      📊 Dashboard
                    </Link>
                  )}
                  <div className="dropdown-divider"></div>
                  <button 
                    className="dropdown-item logout-btn"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Mobile menu button - TODO: Implement mobile menu */}
        <button className="mobile-menu-btn">
          ☰
        </button>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={closeAuthModal}
        initialMode={authMode}
      />

      {/* Location Modal */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={closeLocationModal}
        onLocationSelect={handleLocationSelect}
        currentLocation={location}
      />
    </nav>
  );
};

export default Navbar;
