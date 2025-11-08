import React, { useState } from 'react';
import Header from '../Shared/Header';
import Button from '../../../../components/Common/Button';
import '../../styles/Queue.css';

const QueueView = () => {
  const [selectedDept, setSelectedDept] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [queueItems, setQueueItems] = useState([
    {
      id: 1,
      tokenNumber: 'D001',
      customerName: 'John Doe',
      department: 'Dentistry',
      status: 'in-progress',
      bookingType: 'online',
      estimatedTime: '10 min',
      arrivalTime: '09:30 AM',
      staff: 'Dr. Smith'
    },
    {
      id: 2,
      tokenNumber: 'D002',
      customerName: 'Jane Smith',
      department: 'Dentistry',
      status: 'waiting',
      bookingType: 'walk-in',
      estimatedTime: '25 min',
      arrivalTime: '10:00 AM',
      staff: '-'
    },
    {
      id: 3,
      tokenNumber: 'H001',
      customerName: 'Mike Johnson',
      department: 'Haircut',
      status: 'waiting',
      bookingType: 'online',
      estimatedTime: '15 min',
      arrivalTime: '10:15 AM',
      staff: '-'
    },
    {
      id: 4,
      tokenNumber: 'D003',
      customerName: 'Sarah Williams',
      department: 'Dentistry',
      status: 'pending',
      bookingType: 'online',
      estimatedTime: '40 min',
      arrivalTime: '-',
      staff: '-'
    }
  ]);

  const departments = ['all', 'Dentistry', 'Haircut', 'Banking'];

  const handleAddWalkIn = () => {
    const newToken = {
      id: queueItems.length + 1,
      tokenNumber: `W${String(queueItems.length + 1).padStart(3, '0')}`,
      customerName: prompt('Enter customer name:'),
      department: selectedDept === 'all' ? 'Dentistry' : selectedDept,
      status: 'waiting',
      bookingType: 'walk-in',
      estimatedTime: '-',
      arrivalTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      staff: '-'
    };
    if (newToken.customerName) {
      setQueueItems([...queueItems, newToken]);
    }
  };

  const handleApproveBooking = (id) => {
    setQueueItems(queueItems.map(item => 
      item.id === id ? { ...item, status: 'waiting' } : item
    ));
  };

  const handleRejectBooking = (id) => {
    if (window.confirm('Reject this booking?')) {
      setQueueItems(queueItems.filter(item => item.id !== id));
    }
  };

  const handleStartService = (id) => {
    setQueueItems(queueItems.map(item => 
      item.id === id ? { ...item, status: 'in-progress' } : item
    ));
  };

  const handleCompleteService = (id) => {
    setQueueItems(queueItems.filter(item => item.id !== id));
  };

  const filteredQueue = queueItems.filter(item => {
    const deptMatch = selectedDept === 'all' || item.department === selectedDept;
    const statusMatch = filterStatus === 'all' || item.status === filterStatus;
    return deptMatch && statusMatch;
  });

  return (
    <div className="bp-queue">
      <Header 
        title="Queue Management"
        subtitle="Monitor and manage customer queues in real-time"
        actions={
          <>
            <Button variant="secondary" onClick={handleAddWalkIn}>
              🚶 Add Walk-in
            </Button>
            <Button variant="primary" onClick={() => window.location.reload()}>
              🔄 Refresh Queue
            </Button>
          </>
        }
      />

      {/* Filters */}
      <div className="bp-queue-filters">
        <div className="bp-filter-group">
          <label>Department:</label>
          <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept === 'all' ? 'All Departments' : dept}</option>
            ))}
          </select>
        </div>
        <div className="bp-filter-group">
          <label>Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="waiting">Waiting</option>
            <option value="in-progress">In Progress</option>
          </select>
        </div>
      </div>

      {/* Queue Stats */}
      <div className="bp-queue-summary">
        <div className="bp-queue-stat-item">
          <span className="icon">⏳</span>
          <span className="value">{queueItems.filter(i => i.status === 'pending').length}</span>
          <span className="label">Pending</span>
        </div>
        <div className="bp-queue-stat-item">
          <span className="icon">🕐</span>
          <span className="value">{queueItems.filter(i => i.status === 'waiting').length}</span>
          <span className="label">Waiting</span>
        </div>
        <div className="bp-queue-stat-item">
          <span className="icon">▶️</span>
          <span className="value">{queueItems.filter(i => i.status === 'in-progress').length}</span>
          <span className="label">In Progress</span>
        </div>
      </div>

      {/* Queue Table */}
      <div className="bp-queue-table-container">
        <table className="bp-queue-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Customer</th>
              <th>Department</th>
              <th>Type</th>
              <th>Status</th>
              <th>Arrival</th>
              <th>Est. Time</th>
              <th>Staff</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQueue.map(item => (
              <tr key={item.id} className={`status-${item.status}`}>
                <td><strong>{item.tokenNumber}</strong></td>
                <td>{item.customerName}</td>
                <td>{item.department}</td>
                <td>
                  <span className={`bp-type-badge ${item.bookingType}`}>
                    {item.bookingType === 'online' ? '🌐' : '🚶'} {item.bookingType}
                  </span>
                </td>
                <td>
                  <span className={`bp-status-badge ${item.status}`}>
                    {item.status.replace('-', ' ')}
                  </span>
                </td>
                <td>{item.arrivalTime}</td>
                <td>{item.estimatedTime}</td>
                <td>{item.staff}</td>
                <td>
                  <div className="bp-queue-actions">
                    {item.status === 'pending' && (
                      <>
                        <button className="bp-action-btn-sm approve" onClick={() => handleApproveBooking(item.id)}>✓</button>
                        <button className="bp-action-btn-sm reject" onClick={() => handleRejectBooking(item.id)}>✗</button>
                      </>
                    )}
                    {item.status === 'waiting' && (
                      <button className="bp-action-btn-sm start" onClick={() => handleStartService(item.id)}>▶️</button>
                    )}
                    {item.status === 'in-progress' && (
                      <button className="bp-action-btn-sm complete" onClick={() => handleCompleteService(item.id)}>✅</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredQueue.length === 0 && (
          <div className="bp-empty-state">
            <p>📭 No items in queue</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueueView;
