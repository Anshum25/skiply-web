import React, { useState, useEffect } from 'react';
import Header from '../Shared/Header';
import StatCard from '../Shared/StatCard';
import Button from '../../../../components/Common/Button';
import '../../styles/Dashboard.css';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    currentQueue: 0,
    avgWaitTime: 0,
    satisfaction: 0
  });

  const [todayActivity, setTodayActivity] = useState([]);
  const [quickStats, setQuickStats] = useState({});

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Mock data - replace with API calls
    setStats({
      totalBookings: 247,
      currentQueue: 12,
      avgWaitTime: 18,
      satisfaction: 4.6
    });

    setTodayActivity([
      { time: '09:30 AM', action: 'Queue started - Dentistry', type: 'success' },
      { time: '10:15 AM', action: 'New booking - John Doe', type: 'info' },
      { time: '11:00 AM', action: 'Queue paused - Haircut', type: 'warning' },
      { time: '12:30 PM', action: 'Peak hours started', type: 'info' }
    ]);

    setQuickStats({
      departmentsActive: 5,
      staffOnline: 8,
      pendingBookings: 23,
      completedToday: 156
    });
  };

  const handleQuickAction = (action) => {
    console.log('Quick action:', action);
    // Implement action handlers
  };

  return (
    <div className="bp-dashboard">
      <Header 
        title="Dashboard Overview"
        subtitle={`Today's Summary - ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
        actions={
          <Button variant="primary" onClick={() => handleQuickAction('refresh')}>
            🔄 Refresh Data
          </Button>
        }
      />

      {/* Today's Summary Cards */}
      <div className="bp-stats-grid">
        <StatCard
          icon="📅"
          title="Total Bookings Today"
          value={stats.totalBookings}
          change="+12% from yesterday"
          changeType="positive"
        />
        <StatCard
          icon="👥"
          title="Current Queue Length"
          value={stats.currentQueue}
          change="3 departments active"
          changeType="neutral"
        />
        <StatCard
          icon="⏱️"
          title="Avg Wait Time"
          value={`${stats.avgWaitTime} min`}
          change="-5 min from average"
          changeType="positive"
        />
        <StatCard
          icon="⭐"
          title="Customer Satisfaction"
          value={`${stats.satisfaction}/5.0`}
          change="+0.3 this week"
          changeType="positive"
        />
      </div>

      {/* Quick Actions Bar */}
      <div className="bp-quick-actions">
        <h2>Quick Actions</h2>
        <div className="bp-action-buttons">
          <button className="bp-action-btn primary" onClick={() => handleQuickAction('start-queue')}>
            ▶️ Start Queue
          </button>
          <button className="bp-action-btn warning" onClick={() => handleQuickAction('pause-queue')}>
            ⏸️ Pause Queue
          </button>
          <button className="bp-action-btn success" onClick={() => handleQuickAction('add-department')}>
            ➕ Add Department
          </button>
          <button className="bp-action-btn info" onClick={() => handleQuickAction('add-walkin')}>
            🚶 Add Walk-in
          </button>
          <button className="bp-action-btn secondary" onClick={() => handleQuickAction('view-reports')}>
            📊 View Reports
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="bp-dashboard-grid">
        {/* Traffic Graph */}
        <div className="bp-dashboard-card traffic-chart">
          <h3>Today's Traffic</h3>
          <div className="bp-chart-container">
            <div className="bp-bar-chart">
              {[45, 72, 68, 85, 92, 78, 65, 88, 75, 60, 45, 30].map((height, index) => (
                <div key={index} className="bp-bar-wrapper">
                  <div className="bp-bar" style={{ height: `${height}%` }}>
                    <span className="bp-bar-value">{Math.floor(height * 2.5)}</span>
                  </div>
                  <span className="bp-bar-label">{index + 9}:00</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bp-dashboard-card activity-feed">
          <h3>Recent Activity</h3>
          <div className="bp-activity-list">
            {todayActivity.map((activity, index) => (
              <div key={index} className={`bp-activity-item ${activity.type}`}>
                <span className="bp-activity-time">{activity.time}</span>
                <span className="bp-activity-action">{activity.action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="bp-additional-stats">
        <div className="bp-stat-item">
          <div className="bp-stat-icon-small">🏢</div>
          <div>
            <div className="bp-stat-number">{quickStats.departmentsActive}</div>
            <div className="bp-stat-label">Active Departments</div>
          </div>
        </div>
        <div className="bp-stat-item">
          <div className="bp-stat-icon-small">👨‍💼</div>
          <div>
            <div className="bp-stat-number">{quickStats.staffOnline}</div>
            <div className="bp-stat-label">Staff Online</div>
          </div>
        </div>
        <div className="bp-stat-item">
          <div className="bp-stat-icon-small">⏳</div>
          <div>
            <div className="bp-stat-number">{quickStats.pendingBookings}</div>
            <div className="bp-stat-label">Pending Bookings</div>
          </div>
        </div>
        <div className="bp-stat-item">
          <div className="bp-stat-icon-small">✅</div>
          <div>
            <div className="bp-stat-number">{quickStats.completedToday}</div>
            <div className="bp-stat-label">Completed Today</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
