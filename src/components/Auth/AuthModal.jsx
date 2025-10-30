import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../Common/Popup';
import InputField from '../Common/InputField';
import '../../css/Auth/auth-modal.css';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    businessName: '',
    businessType: '',
    businessAddress: '',
    businessDescription: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        // Validation
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock user data
      const userData = {
        id: Date.now(),
        name: formData.name || 'User',
        email: formData.email,
        role: role,
        businessName: role === 'business_owner' ? formData.businessName : null,
        businessType: role === 'business_owner' ? formData.businessType : null
      };

      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', 'mock-jwt-token-' + Date.now());

      // Close modal and redirect
      onClose();
      navigate('/');
      
      // Refresh page to update navbar
      window.location.reload();

    } catch (error) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      businessName: '',
      businessType: '',
      businessAddress: '',
      businessDescription: ''
    });
  };

  const businessTypeOptions = [
    { value: 'restaurant', label: '🍽️ Restaurant' },
    { value: 'hospital', label: '🏥 Hospital/Clinic' },
    { value: 'salon', label: '💇 Salon/Spa' },
    { value: 'bank', label: '🏦 Bank' },
    { value: 'government', label: '🏛️ Government Office' },
    { value: 'retail', label: '🛍️ Retail Store' },
    { value: 'other', label: '🏢 Other' }
  ];

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'login' ? 'Welcome Back' : 'Join Skiply'}
      size="medium"
      className="auth-modal"
    >
      <div className="auth-modal-content">
        <p className="auth-subtitle">
          {mode === 'login' 
            ? 'Sign in to your account to continue' 
            : 'Create your account and start skipping queues'
          }
        </p>

        {/* Role Selector for Signup */}
        {mode === 'signup' && (
          <div className="role-selector">
            <button
              type="button"
              className={`role-btn ${role === 'customer' ? 'active' : ''}`}
              onClick={() => setRole('customer')}
            >
              👤 Customer
            </button>
            <button
              type="button"
              className={`role-btn ${role === 'business_owner' ? 'active' : ''}`}
              onClick={() => setRole('business_owner')}
            >
              🏢 Business Owner
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Name field for signup */}
          {mode === 'signup' && (
            <InputField
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              icon="👤"
              required
            />
          )}

          {/* Email field */}
          <InputField
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            icon="📧"
            required
          />

          {/* Password field */}
          <InputField
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            icon="🔒"
            required
          />

          {/* Confirm Password for signup */}
          {mode === 'signup' && (
            <InputField
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              icon="🔒"
              required
            />
          )}

          {/* Phone for signup */}
          {mode === 'signup' && (
            <InputField
              type="tel"
              label="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              icon="📱"
              required
            />
          )}

          {/* Business fields for business owners */}
          {mode === 'signup' && role === 'business_owner' && (
            <div className="business-section">
              <h3>Business Information</h3>
              
              <InputField
                type="text"
                label="Business Name"
                placeholder="Enter your business name"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                icon="🏢"
                required
              />

              <InputField
                type="select"
                label="Business Type"
                placeholder="Select business type"
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                options={businessTypeOptions}
                icon="🏷️"
                required
              />

              <InputField
                type="text"
                label="Business Address"
                placeholder="Enter your business address"
                value={formData.businessAddress}
                onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                icon="📍"
                required
              />

              <InputField
                type="textarea"
                label="Business Description"
                placeholder="Brief description of your business"
                value={formData.businessDescription}
                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                rows="3"
              />
            </div>
          )}

          {/* Error message */}
          {error && <div className="error-message">{error}</div>}

          {/* Submit button */}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? '⏳ Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        {/* Switch mode */}
        <div className="auth-footer">
          <p>
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button type="button" className="auth-link" onClick={switchMode}>
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </Popup>
  );
};

export default AuthModal;
