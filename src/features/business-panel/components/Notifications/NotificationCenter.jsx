import React, { useState } from 'react';
import Header from '../Shared/Header';
import Button from '../../../../components/Common/Button';
import '../../styles/Notifications.css';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      title: 'New Booking Received',
      message: 'John Doe booked for Dentistry at 2:30 PM',
      time: '2 minutes ago',
      read: false,
      icon: '📅'
    },
    {
      id: 2,
      type: 'queue',
      title: 'Queue Completed',
      message: 'Token D045 service completed by Dr. Smith',
      time: '15 minutes ago',
      read: false,
      icon: '✅'
    },
    {
      id: 3,
      type: 'cancellation',
      title: 'Booking Cancelled',
      message: 'Sarah Williams cancelled haircut appointment',
      time: '1 hour ago',
      read: true,
      icon: '❌'
    },
    {
      id: 4,
      type: 'system',
      title: 'Queue Paused',
      message: 'Banking department queue paused for lunch break',
      time: '2 hours ago',
      read: true,
      icon: '⏸️'
    },
    {
      id: 5,
      type: 'feedback',
      title: 'New Review',
      message: 'Mike Johnson rated your service 5 stars',
      time: '3 hours ago',
      read: true,
      icon: '⭐'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => 
    filter === 'all' || (filter === 'unread' && !n.read)
  );

  return (
    <div className="bp-notifications">
      <Header 
        title="Notification Center"
        subtitle={`${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
        actions={
          <Button variant="secondary" onClick={markAllAsRead}>
            ✓ Mark All as Read
          </Button>
        }
      />

      {/* Filter Tabs */}
      <div className="bp-notif-filters">
        <button 
          className={`bp-notif-filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({notifications.length})
        </button>
        <button 
          className={`bp-notif-filter-btn ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="bp-notif-list">
        {filteredNotifications.map(notif => (
          <div key={notif.id} className={`bp-notif-item ${notif.read ? 'read' : 'unread'}`}>
            <div className="bp-notif-icon">{notif.icon}</div>
            <div className="bp-notif-content">
              <h4>{notif.title}</h4>
              <p>{notif.message}</p>
              <span className="bp-notif-time">{notif.time}</span>
            </div>
            <div className="bp-notif-actions">
              {!notif.read && (
                <button className="bp-notif-btn" onClick={() => markAsRead(notif.id)}>
                  ✓
                </button>
              )}
              <button className="bp-notif-btn delete" onClick={() => deleteNotification(notif.id)}>
                🗑️
              </button>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="bp-empty-state">
            <p>🔔 No notifications</p>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="bp-notif-settings">
        <h3>Notification Preferences</h3>
        <div className="bp-notif-preferences">
          <label className="bp-preference-item">
            <input type="checkbox" defaultChecked />
            <span>Email notifications for new bookings</span>
          </label>
          <label className="bp-preference-item">
            <input type="checkbox" defaultChecked />
            <span>Push notifications for queue updates</span>
          </label>
          <label className="bp-preference-item">
            <input type="checkbox" />
            <span>SMS alerts for cancellations</span>
          </label>
          <label className="bp-preference-item">
            <input type="checkbox" defaultChecked />
            <span>Daily summary reports</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
