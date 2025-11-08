import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Shared/Sidebar';
import DashboardOverview from '../components/Dashboard/DashboardOverview';
import DepartmentList from '../components/DepartmentManagement/DepartmentList';
import QueueView from '../components/QueueManagement/QueueView';
import AnalyticsView from '../components/Analytics/AnalyticsView';
import NotificationCenter from '../components/Notifications/NotificationCenter';
import StaffList from '../components/StaffManagement/StaffList';
import ScheduleAvailability from '../components/Profile/ScheduleAvailability';
import BusinessProfile from '../components/Profile/BusinessProfile';
import FeedbackRatings from '../components/Feedback/FeedbackRatings';
import ReportsExport from '../components/Reports/ReportsExport';
import '../styles/BusinessPanel.css';

const BusinessPanel = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication and load user data
    const userData = localStorage.getItem('user');
    
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } else {
      // Create demo user for testing
      const mockUser = {
        name: 'Demo Business Owner',
        email: 'demo@business.com',
        role: 'business_owner',
        businessName: 'Skiply Demo Business',
        businessCategory: 'Multi-Service'
      };
      setUser(mockUser);
    }
    
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="bp-loading">
        <div className="bp-spinner"></div>
        <p>Loading Business Panel...</p>
      </div>
    );
  }

  return (
    <div className="business-panel">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <main className="bp-main-content">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/queue" element={<QueueView />} />
          <Route path="/analytics" element={<AnalyticsView />} />
          <Route path="/notifications" element={<NotificationCenter />} />
          <Route path="/staff" element={<StaffList />} />
          <Route path="/schedule" element={<ScheduleAvailability />} />
          <Route path="/profile" element={<BusinessProfile />} />
          <Route path="/feedback" element={<FeedbackRatings />} />
          <Route path="/reports" element={<ReportsExport />} />
        </Routes>
      </main>
    </div>
  );
};

export default BusinessPanel;
