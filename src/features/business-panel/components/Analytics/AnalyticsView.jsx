import React, { useState } from 'react';
import Header from '../Shared/Header';
import Button from '../../../../components/Common/Button';
import '../../styles/Analytics.css';

const AnalyticsView = () => {
  const [timeRange, setTimeRange] = useState('week');

  const analyticsData = {
    totalBookings: { today: 247, week: 1589, month: 6234 },
    avgWaitTime: { today: 18, week: 22, month: 20 },
    peakHours: ['10:00 AM', '2:00 PM', '4:00 PM'],
    topDepartments: [
      { name: 'Dentistry', bookings: 456, rating: 4.8 },
      { name: 'Haircut', bookings: 389, rating: 4.6 },
      { name: 'Banking', bookings: 234, rating: 4.5 }
    ],
    satisfactionRating: 4.6,
    completionRate: 94.5
  };

  const weeklyData = [
    { day: 'Mon', bookings: 180 },
    { day: 'Tue', bookings: 220 },
    { day: 'Wed', bookings: 195 },
    { day: 'Thu', bookings: 245 },
    { day: 'Fri', bookings: 280 },
    { day: 'Sat', bookings: 310 },
    { day: 'Sun', bookings: 159 }
  ];

  const handleExport = (format) => {
    alert(`Exporting analytics as ${format.toUpperCase()}...`);
    // Implement export functionality
  };

  return (
    <div className="bp-analytics">
      <Header 
        title="Analytics & Insights"
        subtitle="Track your business performance and trends"
        actions={
          <>
            <Button variant="secondary" onClick={() => handleExport('csv')}>
              📊 Export CSV
            </Button>
            <Button variant="primary" onClick={() => handleExport('pdf')}>
              📄 Export PDF
            </Button>
          </>
        }
      />

      {/* Time Range Selector */}
      <div className="bp-time-selector">
        {['today', 'week', 'month'].map(range => (
          <button
            key={range}
            className={`bp-time-btn ${timeRange === range ? 'active' : ''}`}
            onClick={() => setTimeRange(range)}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="bp-analytics-grid">
        <div className="bp-analytics-card">
          <h3>📅 Total Bookings</h3>
          <div className="bp-metric-value">{analyticsData.totalBookings[timeRange]}</div>
          <div className="bp-metric-trend positive">↑ 12.5% from last {timeRange}</div>
        </div>
        <div className="bp-analytics-card">
          <h3>⏱️ Avg Wait Time</h3>
          <div className="bp-metric-value">{analyticsData.avgWaitTime[timeRange]} min</div>
          <div className="bp-metric-trend positive">↓ 3 min improvement</div>
        </div>
        <div className="bp-analytics-card">
          <h3>⭐ Satisfaction Rating</h3>
          <div className="bp-metric-value">{analyticsData.satisfactionRating}/5.0</div>
          <div className="bp-metric-trend positive">↑ 0.2 from last {timeRange}</div>
        </div>
        <div className="bp-analytics-card">
          <h3>✅ Completion Rate</h3>
          <div className="bp-metric-value">{analyticsData.completionRate}%</div>
          <div className="bp-metric-trend positive">↑ 2.3% improvement</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bp-charts-section">
        {/* Bookings Trend Chart */}
        <div className="bp-chart-card">
          <h3>Weekly Bookings Trend</h3>
          <div className="bp-bar-chart-container">
            {weeklyData.map((data, index) => (
              <div key={index} className="bp-chart-bar-wrapper">
                <div className="bp-chart-bar" style={{ height: `${(data.bookings / 310) * 100}%` }}>
                  <span className="bp-bar-tooltip">{data.bookings}</span>
                </div>
                <span className="bp-chart-label">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Performance */}
        <div className="bp-chart-card">
          <h3>Department Performance</h3>
          <div className="bp-dept-performance">
            {analyticsData.topDepartments.map((dept, index) => (
              <div key={index} className="bp-dept-perf-item">
                <div className="bp-dept-perf-header">
                  <span className="bp-dept-name">{dept.name}</span>
                  <span className="bp-dept-rating">⭐ {dept.rating}</span>
                </div>
                <div className="bp-dept-perf-bar">
                  <div 
                    className="bp-dept-perf-fill" 
                    style={{ width: `${(dept.bookings / 456) * 100}%` }}
                  />
                </div>
                <span className="bp-dept-bookings">{dept.bookings} bookings</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Peak Hours & Additional Insights */}
      <div className="bp-insights-grid">
        <div className="bp-insight-card">
          <h3>🕐 Peak Hours</h3>
          <div className="bp-peak-hours">
            {analyticsData.peakHours.map((hour, index) => (
              <div key={index} className="bp-peak-hour-item">
                <span className="bp-peak-icon">📈</span>
                <span className="bp-peak-time">{hour}</span>
              </div>
            ))}
          </div>
          <p className="bp-insight-tip">💡 Consider adding more staff during these hours</p>
        </div>

        <div className="bp-insight-card">
          <h3>🎯 Customer Insights</h3>
          <ul className="bp-insights-list">
            <li>📱 65% bookings via mobile app</li>
            <li>👥 Average 23 customers per day</li>
            <li>🔄 18% are returning customers</li>
            <li>⏰ Peak time: 2-4 PM</li>
          </ul>
        </div>

        <div className="bp-insight-card">
          <h3>📊 Quick Stats</h3>
          <div className="bp-quick-stats-list">
            <div className="bp-quick-stat">
              <span className="label">No-show rate:</span>
              <span className="value">5.5%</span>
            </div>
            <div className="bp-quick-stat">
              <span className="label">Cancellation rate:</span>
              <span className="value">7.2%</span>
            </div>
            <div className="bp-quick-stat">
              <span className="label">Avg rating:</span>
              <span className="value">4.6/5.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
