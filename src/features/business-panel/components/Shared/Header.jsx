import React from 'react';
import '../../styles/Header.css';

const Header = ({ title, actions, subtitle }) => {
  return (
    <div className="bp-header">
      <div className="bp-header-content">
        <h1 className="bp-header-title">{title}</h1>
        {subtitle && <p className="bp-header-subtitle">{subtitle}</p>}
      </div>
      {actions && (
        <div className="bp-header-actions">
          {actions}
        </div>
      )}
    </div>
  );
};

export default Header;
