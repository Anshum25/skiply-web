import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/Common/InputField';
import Button from '../components/Common/Button';
import '../css/pages/profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessCategory: '',
    address: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setFormData({
      name: parsedUser.name || '',
      email: parsedUser.email || '',
      phone: parsedUser.phone || '',
      businessName: parsedUser.businessName || '',
      businessCategory: parsedUser.businessCategory || '',
      address: parsedUser.address || ''
    });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // TODO: Replace with actual API call
    const updatedUser = {
      ...user,
      ...formData
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    
    // Show success message (you can replace with a toast notification)
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Reset form data to original user data
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      businessName: user.businessName || '',
      businessCategory: user.businessCategory || '',
      address: user.address || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-large">
            {user.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p className="user-role">
              {user.role === 'business_owner' ? '🏢 Business Owner' : '👤 Customer'}
            </p>
            <p className="user-email">{user.email}</p>
          </div>
          <Button 
            variant={isEditing ? 'secondary' : 'primary'}
            onClick={isEditing ? handleCancel : () => setIsEditing(true)}
          >
            {isEditing ? '❌ Cancel' : '✏️ Edit Profile'}
          </Button>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>Personal Information</h2>
            <div className="form-grid">
              {isEditing ? (
                <>
                  <InputField
                    type="text"
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleChange({ target: { name: 'name', value: e.target.value } })}
                    icon="👤"
                  />
                  <InputField
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleChange({ target: { name: 'email', value: e.target.value } })}
                    icon="📧"
                  />
                  <InputField
                    type="tel"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleChange({ target: { name: 'phone', value: e.target.value } })}
                    icon="📱"
                  />
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label>Full Name</label>
                    <p className="form-value">{user.name || 'Not provided'}</p>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <p className="form-value">{user.email || 'Not provided'}</p>
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <p className="form-value">{user.phone || 'Not provided'}</p>
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Account Type</label>
                <p className="form-value role-badge">
                  {user.role === 'business_owner' ? '🏢 Business Owner' : '👤 Customer'}
                </p>
              </div>
            </div>
          </div>

          {user.role === 'business_owner' && (
            <div className="profile-section">
              <h2>Business Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Business Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Enter your business name"
                    />
                  ) : (
                    <p className="form-value">{user.businessName || 'Not provided'}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Business Category</label>
                  {isEditing ? (
                    <select
                      name="businessCategory"
                      value={formData.businessCategory}
                      onChange={handleChange}
                    >
                      <option value="">Select category</option>
                      <option value="hospital">Hospital/Clinic</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="salon">Salon/Spa</option>
                      <option value="bank">Bank</option>
                      <option value="government">Government Office</option>
                      <option value="retail">Retail Store</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p className="form-value">
                      {user.businessCategory ? 
                        user.businessCategory.charAt(0).toUpperCase() + user.businessCategory.slice(1) 
                        : 'Not provided'
                      }
                    </p>
                  )}
                </div>

                <div className="form-group full-width">
                  <label>Business Address</label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your business address"
                      rows="3"
                    />
                  ) : (
                    <p className="form-value">{user.address || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {isEditing && (
            <div className="profile-actions">
              <Button variant="primary" onClick={handleSave}>
                💾 Save Changes
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                ❌ Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Quick Stats for Business Owners */}
        {user.role === 'business_owner' && (
          <div className="profile-section">
            <h2>Quick Stats</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <h3>Total Bookings</h3>
                  <p className="stat-number">127</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <h3>Average Rating</h3>
                  <p className="stat-number">4.5</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>Current Queue</h3>
                  <p className="stat-number">8</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;