import React, { useState } from 'react';
import Header from '../Shared/Header';
import Button from '../../../../components/Common/Button';
import '../../styles/Staff.css';

const StaffList = () => {
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Smith',
      email: 'sarah@clinic.com',
      role: 'manager',
      department: 'Dentistry',
      status: 'active',
      avatar: 'SS',
      serviced: 45,
      rating: 4.8
    },
    {
      id: 2,
      name: 'John Anderson',
      email: 'john@salon.com',
      role: 'queue_handler',
      department: 'Haircut',
      status: 'active',
      avatar: 'JA',
      serviced: 38,
      rating: 4.6
    },
    {
      id: 3,
      name: 'Emily Johnson',
      email: 'emily@bank.com',
      role: 'view_only',
      department: 'Banking',
      status: 'inactive',
      avatar: 'EJ',
      serviced: 12,
      rating: 4.5
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddStaff = () => {
    setShowAddModal(true);
  };

  const toggleStaffStatus = (id) => {
    setStaff(staff.map(s => 
      s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s
    ));
  };

  const deleteStaff = (id) => {
    if (window.confirm('Are you sure you want to remove this staff member?')) {
      setStaff(staff.filter(s => s.id !== id));
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      manager: { icon: '👨‍💼', label: 'Manager', class: 'manager' },
      queue_handler: { icon: '🎯', label: 'Queue Handler', class: 'handler' },
      view_only: { icon: '👁️', label: 'View Only', class: 'viewer' }
    };
    return badges[role];
  };

  return (
    <div className="bp-staff">
      <Header 
        title="Staff Management"
        subtitle="Manage your team members and their permissions"
        actions={
          <Button variant="primary" onClick={handleAddStaff}>
            ➕ Add Staff Member
          </Button>
        }
      />

      {/* Staff Grid */}
      <div className="bp-staff-grid">
        {staff.map(member => {
          const roleBadge = getRoleBadge(member.role);
          return (
            <div key={member.id} className={`bp-staff-card ${member.status}`}>
              <div className="bp-staff-avatar">{member.avatar}</div>
              <div className="bp-staff-info">
                <h3>{member.name}</h3>
                <p className="bp-staff-email">{member.email}</p>
                <div className="bp-staff-meta">
                  <span className={`bp-role-badge ${roleBadge.class}`}>
                    {roleBadge.icon} {roleBadge.label}
                  </span>
                  <span className="bp-dept-tag">{member.department}</span>
                </div>
              </div>

              <div className="bp-staff-stats">
                <div className="bp-staff-stat">
                  <span className="value">{member.serviced}</span>
                  <span className="label">Customers Served</span>
                </div>
                <div className="bp-staff-stat">
                  <span className="value">⭐ {member.rating}</span>
                  <span className="label">Rating</span>
                </div>
              </div>

              <div className="bp-staff-status">
                <span className={`bp-status-indicator ${member.status}`}>
                  {member.status === 'active' ? '🟢 Active' : '⚫ Inactive'}
                </span>
              </div>

              <div className="bp-staff-actions">
                <button className="bp-staff-btn edit">✏️ Edit</button>
                <button 
                  className="bp-staff-btn toggle"
                  onClick={() => toggleStaffStatus(member.id)}
                >
                  {member.status === 'active' ? '⏸️ Disable' : '▶️ Enable'}
                </button>
                <button 
                  className="bp-staff-btn delete"
                  onClick={() => deleteStaff(member.id)}
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="bp-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="bp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bp-modal-header">
              <h2>Add New Staff Member</h2>
              <button className="bp-modal-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="bp-modal-body">
              <div className="bp-form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter staff name" />
              </div>
              <div className="bp-form-group">
                <label>Email</label>
                <input type="email" placeholder="staff@email.com" />
              </div>
              <div className="bp-form-group">
                <label>Role</label>
                <select>
                  <option value="view_only">View Only</option>
                  <option value="queue_handler">Queue Handler</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              <div className="bp-form-group">
                <label>Department</label>
                <select>
                  <option value="dentistry">Dentistry</option>
                  <option value="haircut">Haircut</option>
                  <option value="banking">Banking</option>
                </select>
              </div>
            </div>
            <div className="bp-modal-footer">
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button variant="primary">Add Staff Member</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffList;
