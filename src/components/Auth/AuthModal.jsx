import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../Common/Popup';
import InputField from '../Common/InputField';
import Button from '../Common/Button';
import '../../css/Auth/auth-modal.css';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [errors, setErrors] = useState({});
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

  const [boStep, setBoStep] = useState(0); // 0: Account, 1: Biz Info, 2: Departments, 3: Hours, 4: Images
  const totalBoSteps = 5;
  const [departments, setDepartments] = useState(['General Service']);
  const defaultHours = [
    { day: 'Mon', open: '09:00', close: '17:00', closed: false },
    { day: 'Tue', open: '09:00', close: '17:00', closed: false },
    { day: 'Wed', open: '09:00', close: '17:00', closed: false },
    { day: 'Thu', open: '09:00', close: '17:00', closed: false },
    { day: 'Fri', open: '09:00', close: '17:00', closed: false },
    { day: 'Sat', open: '09:00', close: '17:00', closed: false },
    { day: 'Sun', open: '09:00', close: '17:00', closed: true }
  ];
  const [operatingHours, setOperatingHours] = useState(defaultHours);
  const [businessImages, setBusinessImages] = useState([]);

  const handleInputChange = (field, value) => {
    // Restrict phone number to 10 digits
    if (field === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 10) {
        setFormData(prev => ({
          ...prev,
          [field]: digitsOnly
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    setFormError('');
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // Validation function for step 0
  const validateStep0 = () => {
    const nextErrors = {};
    if (!formData.name.trim()) {
      nextErrors.name = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      nextErrors.email = 'Email Address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        nextErrors.email = 'Please enter a valid email address';
      }
    }
    if (!formData.password) {
      nextErrors.password = 'Password is required';
    } else {
      // Strong password: 8+ chars, upper, lower, number, special
      const strongPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
      if (!strongPwd.test(formData.password)) {
        nextErrors.password = 'Use 8+ chars with upper, lower, number, special';
      }
    }
    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.phone) {
      nextErrors.phone = 'Phone Number is required';
    } else if (formData.phone.length !== 10) {
      nextErrors.phone = 'Phone Number must be exactly 10 digits';
    }
    setErrors(prev => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  // Validation function for step 1
  const validateStep1 = () => {
    const nextErrors = {};
    if (!formData.businessName.trim()) {
      nextErrors.businessName = 'Business Name is required';
    }
    if (!formData.businessType) {
      nextErrors.businessType = 'Business Type is required';
    }
    if (!formData.businessAddress.trim()) {
      nextErrors.businessAddress = 'Business Address is required';
    }
    setErrors(prev => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  // Validation function for step 2
  const validateStep2 = () => {
    const validDepartments = departments.filter(d => d.trim());
    if (validDepartments.length === 0) {
      setFormError('At least one department/service is required');
      return false;
    }
    if (departments.some(d => !d.trim())) {
      setFormError('Please fill in all department names or remove empty ones');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError('');
    setErrors({});

    try {
      if (mode === 'signup') {
        // Validation for customer signup
        if (role === 'customer') {
          if (!validateStep0()) { setLoading(false); return; }
        }
      } else if (mode === 'login') {
        // Login validation
        const nextErrors = {};
        if (!formData.email.trim()) nextErrors.email = 'Email Address is required';
        if (!formData.password) nextErrors.password = 'Password is required';
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) { setLoading(false); return; }
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
        businessType: role === 'business_owner' ? formData.businessType : null,
        departments: role === 'business_owner' ? departments.filter(d => d.trim()) : null,
        operatingHours: role === 'business_owner' ? operatingHours : null,
        imagesCount: role === 'business_owner' ? businessImages.length : 0
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
      setFormError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setFormError('');
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
    setBoStep(0);
    setDepartments(['General Service']);
    setOperatingHours(defaultHours);
    setBusinessImages([]);
    setErrors({});
  };

  const businessTypeOptions = [
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'hospital', label: 'Hospital/Clinic' },
    { value: 'salon', label: 'Salon/Spa' },
    { value: 'bank', label: 'Bank' },
    { value: 'government', label: 'Government Office' },
    { value: 'retail', label: 'Retail Store' },
    { value: 'other', label: 'Other' }
  ];

  const goNext = () => {
    if (mode === 'signup' && role === 'business_owner') {
      // Validate current step before proceeding
      if (boStep === 0) {
        if (!validateStep0()) return;
      } else if (boStep === 1) {
        if (!validateStep1()) return;
      } else if (boStep === 2) {
        if (!validateStep2()) return;
      }

      if (boStep < totalBoSteps - 1) setBoStep(boStep + 1);
    }
  };

  const goPrev = () => {
    if (mode === 'signup' && role === 'business_owner') {
      if (boStep > 0) {
        setFormError(''); // Clear error when going back
        setBoStep(boStep - 1);
      }
    }
  };

  const addDepartment = () => setDepartments([...departments, '']);
  const removeDepartment = (idx) => setDepartments(departments.filter((_, i) => i !== idx));
  const updateDepartment = (idx, val) => {
    const copy = [...departments];
    copy[idx] = val;
    setDepartments(copy);
    setFormError(''); // Clear error when typing
  };

  const updateHour = (idx, field, val) => {
    const copy = [...operatingHours];
    copy[idx] = { ...copy[idx], [field]: field === 'closed' ? val : val };
    setOperatingHours(copy);
  };

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setBusinessImages(files);
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'login' ? 'Welcome Back' : 'Join Skiply'}
      size="medium"
      className="auth-modal"
    >
      <div className="auth-modal-content">
        {/* Role Selector for Signup */}
        {mode === 'signup' && (
          <div className="role-selector">
            <button
              type="button"
              className={`role-btn ${role === 'customer' ? 'active' : ''}`}
              onClick={() => setRole('customer')}
            >
              Customer
            </button>
            <button
              type="button"
              className={`role-btn ${role === 'business_owner' ? 'active' : ''}`}
              onClick={() => setRole('business_owner')}
            >
              Business Owner
            </button>
          </div>
        )}

        {mode === 'signup' && role === 'business_owner' && (
          <div className="bo-progress">
            <div className="bo-progress__bar" style={{ width: `${(boStep / (totalBoSteps - 1)) * 100}%` }} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Name field for signup */}
          {mode === 'signup' && (role !== 'business_owner' || boStep === 0) && (
            <InputField
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={errors.name}
              required
            />
          )}

          {/* Email field */}
          {(mode === 'login' || role !== 'business_owner' || boStep === 0) && (
            <InputField
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              required
            />
          )}

          {/* Password field */}
          {(mode === 'login' || role !== 'business_owner' || boStep === 0) && (
            <InputField
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              required
            />
          )}

          {/* Confirm Password for signup */}
          {mode === 'signup' && (role !== 'business_owner' || boStep === 0) && (
            <InputField
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              required
            />
          )}

          {/* Phone for signup */}
          {mode === 'signup' && (role !== 'business_owner' || boStep === 0) && (
            <InputField
              type="tel"
              label="Phone Number"
              placeholder="Enter 10-digit phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={errors.phone}
              required
              maxLength={10}
            />
          )}

          {/* Business flow for business owners */}
          {mode === 'signup' && role === 'business_owner' && (
            <div className="business-section">

              {boStep === 0 && (
                <div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <Button type="button" variant="primary" onClick={goNext}>Next</Button>
                  </div>
                </div>
              )}

              {boStep === 1 && (
                <div className='business-div'>
                  <h3>Business Information</h3>
                  <InputField
                    type="text"
                    label="Business Name"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    error={errors.businessName}
                    required
                  />
                  <InputField
                    type="select"
                    label="Business Type"
                    placeholder="Select business type"
                    value={formData.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    options={businessTypeOptions}
                    error={errors.businessType}
                    required
                  />
                  <InputField
                    type="text"
                    label="Business Address"
                    placeholder="Enter your business address"
                    value={formData.businessAddress}
                    onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                    error={errors.businessAddress}
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
                  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <Button type="button" variant="primary" onClick={goPrev}>Previous</Button>
                    <Button type="button" variant="primary" onClick={goNext}>Next</Button>
                  </div>
                </div>
              )}

              {boStep === 2 && (
                <div>
                  <h3>Departments/Services</h3>
                  <div style={{ display: 'grid', gap: 8 }}>
                    {departments.map((dep, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <InputField
                          type="text"
                          placeholder="Department name"
                          value={dep}
                          onChange={(e) => updateDepartment(idx, e.target.value)}
                          required
                        />
                        <Button type="button" variant="secondary" size="small" onClick={() => removeDepartment(idx)}>Remove</Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="small" onClick={addDepartment}>+ Add Department</Button>
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                    <Button type="button" variant="primary" onClick={goPrev}>Previous</Button>
                    <Button type="button" variant="primary" onClick={goNext}>Next</Button>
                  </div>
                </div>
              )}

              {boStep === 3 && (
                <div>
                  <h3>Operating Hours</h3>
                  <div style={{ display: 'grid', gap: 10 }}>
                    {operatingHours.map((h, idx) => (
                      <div key={h.day} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 30px 1fr auto', gap: 8, alignItems: 'center' }}>
                        <div style={{ opacity: .9 }}>{h.day}</div>
                        <InputField type="time" value={h.open} onChange={(e) => updateHour(idx, 'open', e.target.value)} disabled={h.closed} />
                        <div style={{ textAlign: 'center' }}>to</div>
                        <InputField type="time" value={h.close} onChange={(e) => updateHour(idx, 'close', e.target.value)} disabled={h.closed} />
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <input type="checkbox" checked={h.closed} onChange={(e) => updateHour(idx, 'closed', e.target.checked)} /> Closed
                        </label>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                    <Button type="button" variant="secondary" onClick={goPrev}>Previous</Button>
                    <Button type="button" variant="primary" onClick={goNext}>Next</Button>
                  </div>
                </div>
              )}

              {boStep === 4 && (
                <div>
                  <h3>Upload Business Images</h3>
                  <p>Upload images of your business to showcase it to your customers.</p>
                  <div style={{ marginTop: 8 }}>
                    <label style={{ display: 'block', marginBottom: 6 }}>Business Images</label>
                    <input type="file" accept="image/*" multiple onChange={onImagesChange} />
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                    <Button type="button" variant="primary" onClick={goPrev}>Previous</Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error message */}
          {formError && <div className="error-message">{formError}</div>}

          {/* Submit / Next control */}
          {(mode === 'signup' && role === 'business_owner') ? (
            boStep === totalBoSteps - 1 ? (
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Please wait...' : 'Submit'}
              </Button>
            ) : (
              <></>
            )
          ) : (
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
            </Button>
          )}
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