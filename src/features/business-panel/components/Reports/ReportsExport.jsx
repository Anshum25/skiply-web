import React, { useState } from 'react';
import Header from '../Shared/Header';
import Button from '../../../../components/Common/Button';
import '../../styles/Reports.css';

const ReportsExport = () => {
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const reportData = {
    daily: {
      date: 'January 8, 2025',
      totalBookings: 247,
      completedBookings: 234,
      cancelledBookings: 13,
      noShows: 5,
      avgWaitTime: 18,
      avgServiceTime: 25,
      peakHour: '2:00 PM - 3:00 PM',
      revenue: '₹45,600',
      customerSatisfaction: 4.6
    },
    weekly: {
      period: 'Jan 1 - Jan 7, 2025',
      totalBookings: 1589,
      completedBookings: 1498,
      cancelledBookings: 91,
      noShows: 32,
      avgWaitTime: 22,
      avgServiceTime: 26,
      busyDay: 'Saturday',
      revenue: '₹2,89,450',
      customerSatisfaction: 4.5
    },
    monthly: {
      period: 'December 2024',
      totalBookings: 6234,
      completedBookings: 5890,
      cancelledBookings: 344,
      noShows: 128,
      avgWaitTime: 20,
      avgServiceTime: 24,
      busyDay: 'Saturdays',
      revenue: '₹11,23,780',
      customerSatisfaction: 4.6
    }
  };

  const departments = ['All Departments', 'Dentistry', 'Haircut', 'Banking'];

  const quickReports = [
    { id: 1, name: 'Today\'s Summary', icon: '📅', type: 'daily' },
    { id: 2, name: 'This Week', icon: '📊', type: 'weekly' },
    { id: 3, name: 'This Month', icon: '📈', type: 'monthly' },
    { id: 4, name: 'Queue Performance', icon: '👥', type: 'queue' },
    { id: 5, name: 'Staff Performance', icon: '👨‍💼', type: 'staff' },
    { id: 6, name: 'Revenue Report', icon: '💰', type: 'revenue' }
  ];

  const currentData = reportData[reportType] || reportData.daily;

  const handleExport = (format) => {
    alert(`Exporting ${reportType} report as ${format.toUpperCase()}...`);
    console.log('Export:', { reportType, format, dateRange, department: selectedDepartment });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmailReport = () => {
    const email = prompt('Enter email address:');
    if (email) {
      alert(`Report will be sent to ${email}`);
    }
  };

  return (
    <div className="bp-reports">
      <Header 
        title="Reports & Data Export"
        subtitle="Generate comprehensive business reports"
        actions={
          <>
            <Button variant="secondary" onClick={handlePrint}>
              🖨️ Print
            </Button>
            <Button variant="secondary" onClick={handleEmailReport}>
              📧 Email
            </Button>
            <Button variant="primary" onClick={() => handleExport('pdf')}>
              📄 Export PDF
            </Button>
          </>
        }
      />

      {/* Quick Reports */}
      <div className="bp-quick-reports">
        <h3>Quick Reports</h3>
        <div className="bp-quick-reports-grid">
          {quickReports.map(report => (
            <button
              key={report.id}
              className={`bp-quick-report-btn ${reportType === report.type ? 'active' : ''}`}
              onClick={() => setReportType(report.type)}
            >
              <span className="icon">{report.icon}</span>
              <span className="label">{report.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Report Filters */}
      <div className="bp-report-filters">
        <div className="bp-filter-group">
          <label>Report Type:</label>
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="daily">Daily Report</option>
            <option value="weekly">Weekly Report</option>
            <option value="monthly">Monthly Report</option>
            <option value="custom">Custom Date Range</option>
          </select>
        </div>

        <div className="bp-filter-group">
          <label>Department:</label>
          <select 
            value={selectedDepartment} 
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            {departments.map(dept => (
              <option key={dept} value={dept.toLowerCase().replace(' ', '-')}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {reportType === 'custom' && (
          <>
            <div className="bp-filter-group">
              <label>Start Date:</label>
              <input 
                type="date" 
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
            </div>
            <div className="bp-filter-group">
              <label>End Date:</label>
              <input 
                type="date" 
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
          </>
        )}
      </div>

      {/* Report Summary */}
      <div className="bp-report-summary">
        <div className="bp-report-header">
          <h2>
            {reportType === 'daily' && `Daily Report - ${currentData.date}`}
            {reportType === 'weekly' && `Weekly Report - ${currentData.period}`}
            {reportType === 'monthly' && `Monthly Report - ${currentData.period}`}
          </h2>
          <p className="bp-report-generated">
            Generated on {new Date().toLocaleString()}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="bp-report-metrics">
          <div className="bp-metric-card">
            <div className="metric-icon">📅</div>
            <div className="metric-value">{currentData.totalBookings}</div>
            <div className="metric-label">Total Bookings</div>
          </div>

          <div className="bp-metric-card success">
            <div className="metric-icon">✅</div>
            <div className="metric-value">{currentData.completedBookings}</div>
            <div className="metric-label">Completed</div>
          </div>

          <div className="bp-metric-card warning">
            <div className="metric-icon">❌</div>
            <div className="metric-value">{currentData.cancelledBookings}</div>
            <div className="metric-label">Cancelled</div>
          </div>

          <div className="bp-metric-card error">
            <div className="metric-icon">⚠️</div>
            <div className="metric-value">{currentData.noShows}</div>
            <div className="metric-label">No Shows</div>
          </div>

          <div className="bp-metric-card">
            <div className="metric-icon">⏱️</div>
            <div className="metric-value">{currentData.avgWaitTime} min</div>
            <div className="metric-label">Avg Wait Time</div>
          </div>

          <div className="bp-metric-card">
            <div className="metric-icon">⏰</div>
            <div className="metric-value">{currentData.avgServiceTime} min</div>
            <div className="metric-label">Avg Service Time</div>
          </div>

          <div className="bp-metric-card success">
            <div className="metric-icon">⭐</div>
            <div className="metric-value">{currentData.customerSatisfaction}/5</div>
            <div className="metric-label">Satisfaction</div>
          </div>

          <div className="bp-metric-card primary">
            <div className="metric-icon">💰</div>
            <div className="metric-value">{currentData.revenue}</div>
            <div className="metric-label">Revenue</div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="bp-report-insights">
          <h3>📊 Key Insights</h3>
          <div className="bp-insights-grid">
            <div className="bp-insight-item">
              <span className="insight-icon">🔥</span>
              <div>
                <strong>Busiest Period:</strong>
                <p>{currentData.peakHour || currentData.busyDay}</p>
              </div>
            </div>
            <div className="bp-insight-item">
              <span className="insight-icon">📈</span>
              <div>
                <strong>Completion Rate:</strong>
                <p>{((currentData.completedBookings / currentData.totalBookings) * 100).toFixed(1)}%</p>
              </div>
            </div>
            <div className="bp-insight-item">
              <span className="insight-icon">📉</span>
              <div>
                <strong>Cancellation Rate:</strong>
                <p>{((currentData.cancelledBookings / currentData.totalBookings) * 100).toFixed(1)}%</p>
              </div>
            </div>
            <div className="bp-insight-item">
              <span className="insight-icon">⚡</span>
              <div>
                <strong>No-Show Rate:</strong>
                <p>{((currentData.noShows / currentData.totalBookings) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="bp-report-table-section">
          <h3>🏢 Department Breakdown</h3>
          <table className="bp-report-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Bookings</th>
                <th>Completed</th>
                <th>Avg Wait</th>
                <th>Rating</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dentistry</td>
                <td>98</td>
                <td>92</td>
                <td>15 min</td>
                <td>⭐ 4.8</td>
                <td>₹18,500</td>
              </tr>
              <tr>
                <td>Haircut</td>
                <td>85</td>
                <td>82</td>
                <td>20 min</td>
                <td>⭐ 4.5</td>
                <td>₹15,300</td>
              </tr>
              <tr>
                <td>Banking</td>
                <td>64</td>
                <td>60</td>
                <td>18 min</td>
                <td>⭐ 4.2</td>
                <td>₹11,800</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Options */}
      <div className="bp-export-section">
        <h3>📦 Export Options</h3>
        <div className="bp-export-buttons">
          <button className="bp-export-btn pdf" onClick={() => handleExport('pdf')}>
            <span className="icon">📄</span>
            <span className="label">Export as PDF</span>
          </button>
          <button className="bp-export-btn excel" onClick={() => handleExport('csv')}>
            <span className="icon">📊</span>
            <span className="label">Export as CSV</span>
          </button>
          <button className="bp-export-btn print" onClick={handlePrint}>
            <span className="icon">🖨️</span>
            <span className="label">Print Report</span>
          </button>
          <button className="bp-export-btn email" onClick={handleEmailReport}>
            <span className="icon">📧</span>
            <span className="label">Email Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsExport;
