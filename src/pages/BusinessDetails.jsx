import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button';
import Popup from '../components/Common/Popup';
import '../css/pages/business-details.css';

const BusinessDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const business = location.state?.business;
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [bookingType, setBookingType] = useState('live'); // 'live' or 'advance'
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userRating, setUserRating] = useState(0);

  if (!business) {
    return (
      <div className="biz-details-page">
        <div className="biz-container">
          <div className="biz-error-message">
            <h2>Business not found</h2>
            <p>The business you're looking for could not be found.</p>
            <Button variant="primary" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Mock business images for carousel
  const businessImages = [
    'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=400&fit=crop'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % businessImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + businessImages.length) % businessImages.length);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: business.name,
        text: `Check out ${business.name} - ${business.category}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleRating = (rating) => {
    setUserRating(rating);
    alert(`Thank you for rating ${business.name} ${rating} stars!`);
  };

  // Mock business descriptions based on category
  const getBusinessDescription = (category, name) => {
    const descriptions = {
      hospital: `${name} is a leading healthcare facility providing comprehensive medical services with state-of-the-art equipment and experienced medical professionals. We offer 24/7 emergency services, specialized treatments, and patient-centered care in a comfortable environment.`,
      restaurant: `${name} offers an exceptional dining experience with carefully crafted dishes made from the finest ingredients. Our chefs create memorable culinary experiences in a warm, welcoming atmosphere perfect for any occasion.`,
      salon: `${name} is your premier destination for beauty and wellness services. Our skilled professionals use the latest techniques and premium products to help you look and feel your best with personalized treatments.`,
      bank: `${name} provides comprehensive banking solutions with a focus on customer service excellence. We offer modern banking facilities, expert financial advice, and secure transactions to meet all your financial needs.`
    };
    return descriptions[category] || `${name} provides excellent services with a commitment to quality and customer satisfaction.`;
  };

  // Generate available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      const displayDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      
      dates.push({
        value: dateString,
        display: displayDate,
        isToday: i === 0
      });
    }
    return dates;
  };

  // Mock time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleBookNow = () => {
    if (!selectedDepartment) {
      alert('Please select a department first');
      return;
    }
    
    if (bookingType === 'advance' && (!selectedDate || !selectedTimeSlot)) {
      if (!selectedDate) {
        alert('Please select a date for advance booking');
        return;
      }
      if (!selectedTimeSlot) {
        alert('Please select a time slot for advance booking');
        return;
      }
    }
    
    if (bookingType === 'live') {
      const queuePosition = business.queueLength + 1;
      const estimatedTime = new Date();
      estimatedTime.setMinutes(estimatedTime.getMinutes() + parseInt(business.waitTime.split('-')[0]));
      
      alert(`Live Booking Confirmed! 🎉\n\nBusiness: ${business.name}\nDepartment: ${selectedDepartment}\nQueue Position: #${queuePosition}\nEstimated Service Time: ${estimatedTime.toLocaleTimeString()}\n\nYou will receive notifications about your queue status.`);
    } else {
      const selectedDateObj = new Date(selectedDate);
      const formattedDate = selectedDateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      alert(`Advance Booking Confirmed! 📅\n\nBusiness: ${business.name}\nDepartment: ${selectedDepartment}\nDate: ${formattedDate}\nTime: ${selectedTimeSlot}\n\nPlease arrive 10 minutes before your scheduled time.`);
    }
  };

  const themeClass = (() => {
    const cat = (business.category || '').toLowerCase();
    if (cat.includes('hospital') || cat.includes('clinic')) return 'theme-hospital';
    if (cat.includes('restaurant') || cat.includes('hotel') || cat.includes('dining')) return 'theme-restaurant';
    if (cat.includes('salon') || cat.includes('spa')) return 'theme-salon';
    if (cat.includes('bank')) return 'theme-bank';
    return '';
  })();

  return (
    <div className={`biz-details-page ${themeClass}`}>
      {/* Back Button (no header wrapper) */}
      <Button variant="secondary" className="biz-back-button" onClick={() => navigate(-1)}>
        ← Back to Results
      </Button>

      {/* Two Column Layout */}
      <div className="biz-two-column-layout">
        {/* Left Column - Content */}
        <div className="biz-left-column">
          {/* Image Carousel */}
          <div className="biz-carousel-container">
            <div className="biz-carousel">
              <img 
                src={businessImages[currentImageIndex]} 
                alt={`${business.name} - Image ${currentImageIndex + 1}`}
                className="biz-carousel-image"
              />
              <button className="biz-carousel-btn biz-carousel-prev" onClick={prevImage}>
                ‹
              </button>
              <button className="biz-carousel-btn biz-carousel-next" onClick={nextImage}>
                ›
              </button>
              <div className="biz-carousel-indicators">
                {businessImages.map((_, index) => (
                  <button
                    key={index}
                    className={`biz-carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Business Header */}
          <div className="biz-content-header">
            <div className="biz-header-main">
              <div className="biz-icon">{business.image}</div>
              <div className="biz-header-info">
                <h1 className="biz-name">{business.name}</h1>
                <p className="biz-category">{business.category}</p>
                <p className="biz-address">{business.address}</p>
                <div className="biz-meta">
                  <span className="biz-distance">📍 {business.distance} km</span>
                  <span className={`biz-status ${business.isOpen ? 'open' : 'closed'}`}>
                    {business.isOpen ? 'Open' : 'Closed'}
                  </span>
                  <button className="biz-share-btn-small" onClick={handleShare}>
                    📤 Share
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="biz-content-section">
            <h2 className="biz-section-title">About {business.name}</h2>
            <p className="biz-description">{getBusinessDescription(business.category, business.name)}</p>
          </div>

          {/* Gallery Section */}
          <div className="biz-content-section">
            <h2 className="biz-section-title">Gallery</h2>
            <div className="biz-gallery-grid">
              {businessImages.map((image, index) => (
                <div key={index} className="biz-gallery-item" onClick={() => setCurrentImageIndex(index)}>
                  <img src={image} alt={`Gallery ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Rating Section */}
          <div className="biz-content-section">
            <h2 className="biz-section-title">Ratings & Reviews</h2>
            <div className="biz-rating-content">
              <div className="biz-rating-overview">
                <div className="biz-rating-score">
                  <span className="biz-rating-number">{business.rating}</span>
                  <div className="biz-rating-stars">
                    {'⭐'.repeat(Math.floor(business.rating))}
                    {business.rating % 1 !== 0 && '⭐'}
                  </div>
                  <span className="biz-rating-count">(248 reviews)</span>
                </div>
                <div className="biz-rating-breakdown">
                  <div className="biz-rating-bar">
                    <span>5 ⭐</span>
                    <div className="biz-bar"><div className="biz-bar-fill" style={{width: '70%'}}></div></div>
                    <span>174</span>
                  </div>
                  <div className="biz-rating-bar">
                    <span>4 ⭐</span>
                    <div className="biz-bar"><div className="biz-bar-fill" style={{width: '20%'}}></div></div>
                    <span>50</span>
                  </div>
                  <div className="biz-rating-bar">
                    <span>3 ⭐</span>
                    <div className="biz-bar"><div className="biz-bar-fill" style={{width: '7%'}}></div></div>
                    <span>17</span>
                  </div>
                  <div className="biz-rating-bar">
                    <span>2 ⭐</span>
                    <div className="biz-bar"><div className="biz-bar-fill" style={{width: '2%'}}></div></div>
                    <span>5</span>
                  </div>
                  <div className="biz-rating-bar">
                    <span>1 ⭐</span>
                    <div className="biz-bar"><div className="biz-bar-fill" style={{width: '1%'}}></div></div>
                    <span>2</span>
                  </div>
                </div>
              </div>
              <div className="biz-rating-actions">
                <h3>Rate this business</h3>
                <div className="biz-rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`biz-star-btn ${userRating >= star ? 'active' : ''}`}
                      onClick={() => handleRating(star)}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Departments Section */}
          <div className="biz-content-section">
            <h2 className="biz-section-title">Available Departments</h2>
            <div className="biz-departments-list">
              {business.departments.map((dept, index) => (
                <div key={index} className="biz-department-item">
                  <span className="biz-dept-name">{dept}</span>
                  <span className="biz-dept-status">Available</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Booking */}
        <div className="biz-right-column">
          <div className="biz-booking-sticky">
            {/* Quick Info */}
            <div className="biz-booking-header">
              <div className="biz-booking-price">
                <span className="biz-price-from">Starting from</span>
                <span className="biz-price-amount">{business.priceRange || '₹100 - ₹500'}</span>
              </div>
              <div className="biz-booking-rating">
                <span className="biz-rating-score-small">⭐ {business.rating}</span>
                <span className="biz-rating-count-small">(248 reviews)</span>
              </div>
            </div>

            {/* Live Queue Status */}
            <div className="biz-live-status">
              <h3>🔴 Live Queue Status</h3>
              <div className="biz-queue-stats">
                <div className="biz-stat-item">
                  <span className="biz-stat-label">Wait Time</span>
                  <span className="biz-stat-value">{business.waitTime}</span>
                </div>
                <div className="biz-stat-item">
                  <span className="biz-stat-label">Queue Length</span>
                  <span className="biz-stat-value">{business.queueLength} people</span>
                </div>
                <div className="biz-stat-item">
                  <span className="biz-stat-label">Next Available</span>
                  <span className="biz-stat-value">In 15 min</span>
                </div>
              </div>
            </div>

            {/* Booking Options */}
            <div className="biz-booking-options">
              <div className="biz-booking-tabs">
                <button 
                  className={`biz-tab ${bookingType === 'live' ? 'active' : ''}`}
                  onClick={() => setBookingType('live')}
                >
                  🔴 Join Live Queue
                </button>
                <button 
                  className={`biz-tab ${bookingType === 'advance' ? 'active' : ''}`}
                  onClick={() => setBookingType('advance')}
                >
                  📅 Book in Advance
                </button>
              </div>

              {bookingType === 'live' ? (
                <div className="biz-live-booking">
                  <div className="biz-department-select">
                    <label>Select Department</label>
                    <select 
                      value={selectedDepartment} 
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="biz-select"
                    >
                      <option value="">Choose department...</option>
                      {business.departments.map((dept, index) => (
                        <option key={index} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="biz-live-info">
                    <div className="biz-live-benefit">
                      <span className="biz-benefit-icon">⚡</span>
                      <span>Get real-time queue updates</span>
                    </div>
                    <div className="biz-live-benefit">
                      <span className="biz-benefit-icon">📱</span>
                      <span>Track your position live</span>
                    </div>
                    <div className="biz-live-benefit">
                      <span className="biz-benefit-icon">🔔</span>
                      <span>Get notified when it's your turn</span>
                    </div>
                  </div>

                  <Button 
                    variant="primary" 
                    className="biz-book-now-btn"
                    onClick={() => setShowBookingPopup(true)}
                    disabled={!selectedDepartment}
                  >
                    🚀 Join Queue Now
                  </Button>
                </div>
              ) : (
                <div className="biz-advance-booking">
                  <div className="biz-date-select">
                    <label>Select Date</label>
                    <input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="biz-date-input"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="biz-time-slots">
                    <label>Available Time Slots</label>
                    <div className="biz-time-grid">
                      {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time) => (
                        <button
                          key={time}
                          className={`biz-time-slot ${selectedTimeSlot === time ? 'selected' : ''}`}
                          onClick={() => setSelectedTimeSlot(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="biz-department-select">
                    <label>Select Department</label>
                    <select 
                      value={selectedDepartment} 
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="biz-select"
                    >
                      <option value="">Choose department...</option>
                      {business.departments.map((dept, index) => (
                        <option key={index} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <Button 
                    variant="primary" 
                    className="biz-book-now-btn"
                    onClick={() => setShowBookingPopup(true)}
                    disabled={!selectedDate || !selectedTimeSlot || !selectedDepartment}
                  >
                    📅 Book Appointment
                  </Button>
                </div>
              )}
            </div>

            {/* Operating Hours */}
            <div className="biz-hours-section">
              <h3>Operating Hours</h3>
              <div className="biz-hours-compact">
                <div className="biz-hours-item">
                  <span>Mon - Fri</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="biz-hours-item">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="biz-hours-item">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Popup */}
      {showBookingPopup && (
        <Popup onClose={() => setShowBookingPopup(false)} title="Book Your Appointment">
          <div className="biz-booking-popup">
            {/* Booking Type Selector */}
            <div className="biz-form-group">
              <label>Choose Booking Type</label>
              <div className="biz-booking-type-selector">
                <button
                  className={`biz-booking-type-option ${bookingType === 'live' ? 'selected' : ''}`}
                  onClick={() => {
                    setBookingType('live');
                    setSelectedTimeSlot('');
                    setSelectedDate('');
                  }}
                >
                  <div className="biz-booking-type-icon">🚀</div>
                  <div className="biz-booking-type-info">
                    <h4>Live Booking</h4>
                    <p>Join current queue • Get served today</p>
                    <span className="biz-queue-info">Queue Position: #{business.queueLength + 1}</span>
                  </div>
                </button>
                <button
                  className={`biz-booking-type-option ${bookingType === 'advance' ? 'selected' : ''}`}
                  onClick={() => setBookingType('advance')}
                >
                  <div className="biz-booking-type-icon">📅</div>
                  <div className="biz-booking-type-info">
                    <h4>Advance Booking</h4>
                    <p>Schedule for later • Skip the queue</p>
                    <span className="biz-queue-info">Book up to 7 days ahead</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Department Selection */}
            <div className="biz-form-group">
              <label>Select Department</label>
              <div className="biz-department-selector">
                {business.departments.map((dept, index) => (
                  <button
                    key={index}
                    className={`biz-department-option ${selectedDepartment === dept ? 'selected' : ''}`}
                    onClick={() => setSelectedDepartment(dept)}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection - Only for Advance Booking */}
            {bookingType === 'advance' && (
              <div className="biz-form-group">
                <label>Select Date</label>
                <div className="biz-date-selector">
                  {getAvailableDates().map((date, index) => (
                    <button
                      key={index}
                      className={`biz-date-option ${selectedDate === date.value ? 'selected' : ''} ${date.isToday ? 'today' : ''}`}
                      onClick={() => setSelectedDate(date.value)}
                    >
                      <span className="biz-date-display">{date.display}</span>
                      {date.isToday && <span className="biz-today-label">Today</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Time Slot Selection - Only for Advance Booking */}
            {bookingType === 'advance' && (
              <div className="biz-form-group">
                <label>Select Time Slot</label>
                <div className="biz-time-selector">
                  {timeSlots.map((time, index) => (
                    <button
                      key={index}
                      className={`biz-time-option ${selectedTimeSlot === time ? 'selected' : ''}`}
                      onClick={() => setSelectedTimeSlot(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Live Booking Info */}
            {bookingType === 'live' && selectedDepartment && (
              <div className="biz-live-booking-info">
                <div className="biz-live-info-card">
                  <h4>🚀 Live Booking Details</h4>
                  <div className="biz-live-info-grid">
                    <div className="biz-live-info-item">
                      <span className="biz-label">Current Queue Position</span>
                      <span className="biz-value">#{business.queueLength + 1}</span>
                    </div>
                    <div className="biz-live-info-item">
                      <span className="biz-label">Estimated Wait Time</span>
                      <span className="biz-value">{business.waitTime}</span>
                    </div>
                    <div className="biz-live-info-item">
                      <span className="biz-label">Estimated Service Time</span>
                      <span className="biz-value">
                        {new Date(Date.now() + parseInt(business.waitTime.split('-')[0]) * 60000).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="biz-live-info-item">
                      <span className="biz-label">Queue Status</span>
                      <span className="biz-value biz-status-active">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Booking Summary */}
            <div className="biz-booking-summary">
              {selectedDepartment && (bookingType === 'live' || (selectedDate && selectedTimeSlot)) && (
                <div className="biz-summary-card">
                  <h4>Booking Summary</h4>
                  <div className="biz-summary-item">
                    <span>Business:</span>
                    <span>{business.name}</span>
                  </div>
                  <div className="biz-summary-item">
                    <span>Department:</span>
                    <span>{selectedDepartment}</span>
                  </div>
                  <div className="biz-summary-item">
                    <span>Booking Type:</span>
                    <span>{bookingType === 'live' ? 'Live Booking' : 'Advance Booking'}</span>
                  </div>
                  {bookingType === 'live' ? (
                    <>
                      <div className="biz-summary-item">
                        <span>Queue Position:</span>
                        <span>#{business.queueLength + 1}</span>
                      </div>
                      <div className="biz-summary-item">
                        <span>Estimated Wait:</span>
                        <span>{business.waitTime}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="biz-summary-item">
                        <span>Scheduled Date:</span>
                        <span>{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="biz-summary-item">
                        <span>Scheduled Time:</span>
                        <span>{selectedTimeSlot}</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="biz-booking-actions">
              {business.isOpen ? (
                <Button 
                  variant="primary" 
                  size="large"
                  onClick={handleBookNow}
                  className="biz-book-button"
                >
                  {bookingType === 'live' ? '🚀 Join Queue Now' : '📅 Schedule Appointment'}
                </Button>
              ) : (
                <Button variant="primary" size="large" disabled className="biz-book-button">
                  Currently Closed
                </Button>
              )}
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default BusinessDetails;
