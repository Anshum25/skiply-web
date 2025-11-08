import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/Sidebar.css';

const Sidebar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', path: '/business-panel' },
    { id: 'departments', icon: '🏢', label: 'Departments', path: '/business-panel/departments' },
    { id: 'queue', icon: '👥', label: 'Queue Management', path: '/business-panel/queue' },
    { id: 'schedule', icon: '🗓️', label: 'Schedule', path: '/business-panel/schedule' },
    { id: 'analytics', icon: '📈', label: 'Analytics', path: '/business-panel/analytics' },
    { id: 'notifications', icon: '🔔', label: 'Notifications', path: '/business-panel/notifications' },
    { id: 'profile', icon: '🏪', label: 'Business Profile', path: '/business-panel/profile' },
    { id: 'staff', icon: '🧑‍💼', label: 'Staff Management', path: '/business-panel/staff' },
    { id: 'feedback', icon: '💬', label: 'Feedback & Ratings', path: '/business-panel/feedback' },
    { id: 'reports', icon: '🧾', label: 'Reports', path: '/business-panel/reports' }
  ];

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'BP';
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className="bp-sidebar">
      {/* Logo Section */}
      <div className="bp-sidebar-header">
        <div className="bp-logo">
          <span className="bp-logo-text">SKIPLY</span>
          <span className="bp-logo-subtitle">Business Panel</span>
        </div>
      </div>

      {/* User Info */}
      <div className="bp-user-section">
        <div className="bp-user-avatar">
          {getInitials(user?.businessName || user?.name)}
        </div>
        <div className="bp-user-details">
          <h3>{user?.businessName || 'Demo Business'}</h3>
          <p>{user?.email || 'demo@business.com'}</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bp-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`bp-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => handleNavigation(item.path)}
          >
            <span className="bp-nav-icon">{item.icon}</span>
            <span className="bp-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="bp-sidebar-footer">
        <button className="bp-footer-btn" onClick={() => navigate('/')}>
          <span>🏠</span> Home
        </button>
        <button className="bp-footer-btn" onClick={onLogout}>
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
