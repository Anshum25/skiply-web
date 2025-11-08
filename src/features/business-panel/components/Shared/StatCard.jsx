import React from 'react';
import '../../styles/StatCard.css';

const StatCard = ({ icon, title, value, change, changeType }) => {
  return (
    <div className="bp-stat-card">
      <div className="bp-stat-icon">{icon}</div>
      <div className="bp-stat-details">
        <h3>{title}</h3>
        <div className="bp-stat-value">{value}</div>
        {change && (
          <div className={`bp-stat-change ${changeType}`}>
            {changeType === 'positive' ? '↑' : changeType === 'negative' ? '↓' : '→'} {change}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
