import React, { useState } from 'react';
import Header from '../Shared/Header';
import Button from '../../../../components/Common/Button';
import '../../styles/Departments.css';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'Dentistry',
      avgServiceTime: 30,
      maxQueueSize: 20,
      workingHours: '9:00 AM - 6:00 PM',
      status: 'active',
      currentQueue: 5,
      staff: 3
    },
    {
      id: 2,
      name: 'Haircut & Styling',
      avgServiceTime: 45,
      maxQueueSize: 15,
      workingHours: '10:00 AM - 8:00 PM',
      status: 'active',
      currentQueue: 8,
      staff: 4
    },
    {
      id: 3,
      name: 'Banking Services',
      avgServiceTime: 20,
      maxQueueSize: 30,
      workingHours: '9:00 AM - 5:00 PM',
      status: 'paused',
      currentQueue: 0,
      staff: 2
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDept, setEditingDept] = useState(null);

  const handleAddDepartment = () => {
    setEditingDept(null);
    setShowAddModal(true);
  };

  const handleEditDepartment = (dept) => {
    setEditingDept(dept);
    setShowAddModal(true);
  };

  const handleDeleteDepartment = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(d => d.id !== id));
    }
  };

  const toggleDepartmentStatus = (id) => {
    setDepartments(departments.map(d => 
      d.id === id ? { ...d, status: d.status === 'active' ? 'paused' : 'active' } : d
    ));
  };

  return (
    <div className="bp-departments">
      <Header 
        title="Department Management"
        subtitle="Manage your business departments and their settings"
        actions={
          <Button variant="primary" onClick={handleAddDepartment}>
            ➕ Add Department
          </Button>
        }
      />

      <div className="bp-departments-grid">
        {departments.map(dept => (
          <div key={dept.id} className={`bp-dept-card ${dept.status}`}>
            <div className="bp-dept-header">
              <h3>{dept.name}</h3>
              <span className={`bp-dept-status-badge ${dept.status}`}>
                {dept.status === 'active' ? '🟢 Active' : '⏸️ Paused'}
              </span>
            </div>

            <div className="bp-dept-stats">
              <div className="bp-dept-stat">
                <span className="label">Avg Service Time</span>
                <span className="value">{dept.avgServiceTime} min</span>
              </div>
              <div className="bp-dept-stat">
                <span className="label">Max Queue Size</span>
                <span className="value">{dept.maxQueueSize}</span>
              </div>
              <div className="bp-dept-stat">
                <span className="label">Current Queue</span>
                <span className="value">{dept.currentQueue}</span>
              </div>
              <div className="bp-dept-stat">
                <span className="label">Staff Assigned</span>
                <span className="value">{dept.staff}</span>
              </div>
            </div>

            <div className="bp-dept-info">
              <p>⏰ {dept.workingHours}</p>
            </div>

            <div className="bp-dept-actions">
              <button 
                className="bp-dept-btn edit" 
                onClick={() => handleEditDepartment(dept)}
              >
                ✏️ Edit
              </button>
              <button 
                className="bp-dept-btn toggle"
                onClick={() => toggleDepartmentStatus(dept.id)}
              >
                {dept.status === 'active' ? '⏸️ Pause' : '▶️ Start'}
              </button>
              <button 
                className="bp-dept-btn delete" 
                onClick={() => handleDeleteDepartment(dept.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="bp-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="bp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bp-modal-header">
              <h2>{editingDept ? 'Edit Department' : 'Add New Department'}</h2>
              <button className="bp-modal-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="bp-modal-body">
              <div className="bp-form-group">
                <label>Department Name</label>
                <input type="text" defaultValue={editingDept?.name} placeholder="e.g., Dentistry" />
              </div>
              <div className="bp-form-group">
                <label>Average Service Time (minutes)</label>
                <input type="number" defaultValue={editingDept?.avgServiceTime || 30} />
              </div>
              <div className="bp-form-group">
                <label>Maximum Queue Size</label>
                <input type="number" defaultValue={editingDept?.maxQueueSize || 20} />
              </div>
              <div className="bp-form-group">
                <label>Working Hours</label>
                <div className="bp-time-range">
                  <input type="time" defaultValue="09:00" />
                  <span>to</span>
                  <input type="time" defaultValue="18:00" />
                </div>
              </div>
            </div>
            <div className="bp-modal-footer">
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button variant="primary">Save Department</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
