import React, { useState } from 'react';
import Header from '../Shared/Header';
import Button from '../../../../components/Common/Button';
import '../../styles/Profile.css';

const BusinessProfile = () => {
  const [businessData, setBusinessData] = useState({
    name: 'Skiply Demo Business',
    category: 'Multi-Service',
    email: 'demo@business.com',
    phone: '+91 9876543210',
    address: '123 Business Street, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    website: 'www.business.com',
    description: 'A comprehensive multi-service business providing quality services to customers.',
    openTime: '09:00',
    closeTime: '18:00',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  });

  const [branches, setBranches] = useState([
    {
      id: 1,
      name: 'Main Branch',
      address: '123 Business Street, Mumbai',
      phone: '+91 9876543210',
      isMain: true
    },
    {
      id: 2,
      name: 'Branch 2',
      address: '456 Market Road, Pune',
      phone: '+91 9876543211',
      isMain: false
    }
  ]);

  const [showAddBranch, setShowAddBranch] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  const categories = [
    'Restaurant', 'Salon & Spa', 'Healthcare', 'Banking', 
    'Retail', 'Education', 'Government', 'Multi-Service'
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusinessData({ ...businessData, [name]: value });
  };

  const handleDayToggle = (day) => {
    const currentDays = businessData.workingDays;
    if (currentDays.includes(day)) {
      setBusinessData({
        ...businessData,
        workingDays: currentDays.filter(d => d !== day)
      });
    } else {
      setBusinessData({
        ...businessData,
        workingDays: [...currentDays, day]
      });
    }
  };

  const handleSave = () => {
    alert('Business profile updated successfully!');
    console.log('Saved data:', businessData);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Logo uploaded:', file.name);
      alert('Logo uploaded: ' + file.name);
    }
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Cover uploaded:', file.name);
      alert('Cover uploaded: ' + file.name);
    }
  };

  const handleAddBranch = () => {
    const newBranch = {
      id: branches.length + 1,
      name: `Branch ${branches.length + 1}`,
      address: '',
      phone: '',
      isMain: false
    };
    setBranches([...branches, newBranch]);
    setShowAddBranch(false);
  };

  const handleDeleteBranch = (id) => {
    if (window.confirm('Delete this branch?')) {
      setBranches(branches.filter(b => b.id !== id));
    }
  };

  return (
    <div className="bp-business-profile">
      <Header 
        title="Business Profile"
        subtitle="Manage your business information and settings"
        actions={
          <Button variant="primary" onClick={handleSave}>
            💾 Save Changes
          </Button>
        }
      />

      {/* Tab Navigation */}
      <div className="bp-profile-tabs">
        <button 
          className={`bp-tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          📋 Basic Info
        </button>
        <button 
          className={`bp-tab ${activeTab === 'hours' ? 'active' : ''}`}
          onClick={() => setActiveTab('hours')}
        >
          🕐 Business Hours
        </button>
        <button 
          className={`bp-tab ${activeTab === 'branches' ? 'active' : ''}`}
          onClick={() => setActiveTab('branches')}
        >
          🏢 Branches
        </button>
        <button 
          className={`bp-tab ${activeTab === 'media' ? 'active' : ''}`}
          onClick={() => setActiveTab('media')}
        >
          🖼️ Images
        </button>
      </div>

      {/* Basic Info Tab */}
      {activeTab === 'info' && (
        <div className="bp-profile-section">
          <div className="bp-profile-card">
            <h3>Business Information</h3>
            <div className="bp-form-grid">
              <div className="bp-form-group">
                <label>Business Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={businessData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="bp-form-group">
                <label>Category *</label>
                <select 
                  name="category" 
                  value={businessData.category}
                  onChange={handleInputChange}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="bp-form-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={businessData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="bp-form-group">
                <label>Phone *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={businessData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="bp-form-group full-width">
                <label>Address *</label>
                <input 
                  type="text" 
                  name="address" 
                  value={businessData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="bp-form-group">
                <label>City *</label>
                <input 
                  type="text" 
                  name="city" 
                  value={businessData.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="bp-form-group">
                <label>State *</label>
                <input 
                  type="text" 
                  name="state" 
                  value={businessData.state}
                  onChange={handleInputChange}
                />
              </div>

              <div className="bp-form-group">
                <label>Pincode *</label>
                <input 
                  type="text" 
                  name="pincode" 
                  value={businessData.pincode}
                  onChange={handleInputChange}
                />
              </div>

              <div className="bp-form-group">
                <label>Website</label>
                <input 
                  type="text" 
                  name="website" 
                  value={businessData.website}
                  onChange={handleInputChange}
                />
              </div>

              <div className="bp-form-group full-width">
                <label>Description</label>
                <textarea 
                  name="description" 
                  rows="4"
                  value={businessData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Business Hours Tab */}
      {activeTab === 'hours' && (
        <div className="bp-profile-section">
          <div className="bp-profile-card">
            <h3>Operating Hours</h3>
            
            <div className="bp-hours-settings">
              <div className="bp-hours-time">
                <div className="bp-form-group">
                  <label>Opening Time</label>
                  <input 
                    type="time" 
                    name="openTime" 
                    value={businessData.openTime}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="bp-form-group">
                  <label>Closing Time</label>
                  <input 
                    type="time" 
                    name="closeTime" 
                    value={businessData.closeTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="bp-working-days">
                <label>Working Days</label>
                <div className="bp-days-grid">
                  {weekDays.map(day => (
                    <label key={day} className="bp-day-checkbox">
                      <input 
                        type="checkbox" 
                        checked={businessData.workingDays.includes(day)}
                        onChange={() => handleDayToggle(day)}
                      />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bp-hours-summary">
                <h4>Summary</h4>
                <p>
                  <strong>Operating Hours:</strong> {businessData.openTime} - {businessData.closeTime}
                </p>
                <p>
                  <strong>Working Days:</strong> {businessData.workingDays.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Branches Tab */}
      {activeTab === 'branches' && (
        <div className="bp-profile-section">
          <div className="bp-branches-header">
            <h3>Branch Locations</h3>
            <Button variant="primary" onClick={() => setShowAddBranch(true)}>
              ➕ Add Branch
            </Button>
          </div>

          <div className="bp-branches-grid">
            {branches.map(branch => (
              <div key={branch.id} className="bp-branch-card">
                {branch.isMain && <span className="bp-main-badge">Main Branch</span>}
                <h4>{branch.name}</h4>
                <p>📍 {branch.address || 'Address not set'}</p>
                <p>📞 {branch.phone || 'Phone not set'}</p>
                <div className="bp-branch-actions">
                  <button className="bp-branch-btn edit">✏️ Edit</button>
                  {!branch.isMain && (
                    <button 
                      className="bp-branch-btn delete"
                      onClick={() => handleDeleteBranch(branch.id)}
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {showAddBranch && (
            <div className="bp-modal-overlay" onClick={() => setShowAddBranch(false)}>
              <div className="bp-modal" onClick={(e) => e.stopPropagation()}>
                <div className="bp-modal-header">
                  <h2>Add New Branch</h2>
                  <button className="bp-modal-close" onClick={() => setShowAddBranch(false)}>×</button>
                </div>
                <div className="bp-modal-body">
                  <div className="bp-form-group">
                    <label>Branch Name</label>
                    <input type="text" placeholder="e.g., Downtown Branch" />
                  </div>
                  <div className="bp-form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Full address" />
                  </div>
                  <div className="bp-form-group">
                    <label>Phone</label>
                    <input type="tel" placeholder="+91 1234567890" />
                  </div>
                </div>
                <div className="bp-modal-footer">
                  <Button variant="secondary" onClick={() => setShowAddBranch(false)}>Cancel</Button>
                  <Button variant="primary" onClick={handleAddBranch}>Add Branch</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Media Tab */}
      {activeTab === 'media' && (
        <div className="bp-profile-section">
          <div className="bp-profile-card">
            <h3>Business Images</h3>
            
            <div className="bp-media-upload">
              <div className="bp-upload-section">
                <label className="bp-upload-label">Business Logo</label>
                <div className="bp-upload-area">
                  <div className="bp-upload-preview">
                    <span className="bp-upload-icon">🏪</span>
                    <p>Upload Logo</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleLogoUpload}
                    style={{ display: 'none' }}
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" className="bp-upload-btn">
                    📁 Choose File
                  </label>
                </div>
                <p className="bp-upload-hint">Recommended: Square image, min 200x200px</p>
              </div>

              <div className="bp-upload-section">
                <label className="bp-upload-label">Cover Image</label>
                <div className="bp-upload-area wide">
                  <div className="bp-upload-preview">
                    <span className="bp-upload-icon">🖼️</span>
                    <p>Upload Cover Image</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleCoverUpload}
                    style={{ display: 'none' }}
                    id="cover-upload"
                  />
                  <label htmlFor="cover-upload" className="bp-upload-btn">
                    📁 Choose File
                  </label>
                </div>
                <p className="bp-upload-hint">Recommended: 1200x400px, max 2MB</p>
              </div>

              <div className="bp-upload-section">
                <label className="bp-upload-label">Gallery Images</label>
                <div className="bp-gallery-grid">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bp-gallery-slot">
                      <span>+</span>
                      <p>Add Image</p>
                    </div>
                  ))}
                </div>
                <p className="bp-upload-hint">Upload up to 10 images to showcase your business</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessProfile;
