import React, { useState } from 'react';
import Header from '../Shared/Header';
import Button from '../../../../components/Common/Button';
import '../../styles/Feedback.css';

const FeedbackRatings = () => {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      department: 'Dentistry',
      rating: 5,
      comment: 'Excellent service! Very professional staff and clean facility.',
      date: '2025-01-08',
      replied: false,
      sentiment: 'positive'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      department: 'Haircut',
      rating: 4,
      comment: 'Good service but had to wait longer than expected.',
      date: '2025-01-07',
      replied: true,
      reply: 'Thank you for your feedback. We are working on reducing wait times.',
      sentiment: 'neutral'
    },
    {
      id: 3,
      customerName: 'Mike Johnson',
      department: 'Banking',
      rating: 3,
      comment: 'Average experience. Staff could be more helpful.',
      date: '2025-01-06',
      replied: false,
      sentiment: 'negative'
    },
    {
      id: 4,
      customerName: 'Sarah Williams',
      department: 'Dentistry',
      rating: 5,
      comment: 'Amazing! Dr. Smith was very gentle and explained everything clearly.',
      date: '2025-01-05',
      replied: true,
      reply: 'Thank you for your kind words! We appreciate your feedback.',
      sentiment: 'positive'
    }
  ]);

  const [departmentStats, setDepartmentStats] = useState([
    { name: 'Dentistry', avgRating: 4.8, totalReviews: 145, positive: 92 },
    { name: 'Haircut', avgRating: 4.5, totalReviews: 98, positive: 82 },
    { name: 'Banking', avgRating: 4.2, totalReviews: 67, positive: 75 }
  ]);

  const [filterRating, setFilterRating] = useState('all');
  const [filterDept, setFilterDept] = useState('all');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [replyText, setReplyText] = useState('');

  const overallRating = 4.6;
  const totalReviews = feedbacks.length;
  const sentimentData = {
    positive: feedbacks.filter(f => f.sentiment === 'positive').length,
    neutral: feedbacks.filter(f => f.sentiment === 'neutral').length,
    negative: feedbacks.filter(f => f.sentiment === 'negative').length
  };

  const handleReply = (feedback) => {
    setSelectedFeedback(feedback);
    setReplyText('');
    setShowReplyModal(true);
  };

  const submitReply = () => {
    if (!replyText.trim()) {
      alert('Please enter a reply');
      return;
    }
    
    setFeedbacks(feedbacks.map(f => 
      f.id === selectedFeedback.id 
        ? { ...f, replied: true, reply: replyText }
        : f
    ));
    
    setShowReplyModal(false);
    alert('Reply sent successfully!');
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const filteredFeedbacks = feedbacks.filter(f => {
    const ratingMatch = filterRating === 'all' || f.rating === parseInt(filterRating);
    const deptMatch = filterDept === 'all' || f.department === filterDept;
    return ratingMatch && deptMatch;
  });

  return (
    <div className="bp-feedback">
      <Header 
        title="Feedback & Ratings"
        subtitle="View and respond to customer feedback"
      />

      {/* Overall Stats */}
      <div className="bp-feedback-stats">
        <div className="bp-feedback-stat-card primary">
          <div className="bp-stat-icon">⭐</div>
          <div className="bp-stat-info">
            <div className="bp-stat-value">{overallRating}/5.0</div>
            <div className="bp-stat-label">Overall Rating</div>
          </div>
        </div>

        <div className="bp-feedback-stat-card">
          <div className="bp-stat-icon">💬</div>
          <div className="bp-stat-info">
            <div className="bp-stat-value">{totalReviews}</div>
            <div className="bp-stat-label">Total Reviews</div>
          </div>
        </div>

        <div className="bp-feedback-stat-card positive">
          <div className="bp-stat-icon">😊</div>
          <div className="bp-stat-info">
            <div className="bp-stat-value">{sentimentData.positive}</div>
            <div className="bp-stat-label">Positive</div>
          </div>
        </div>

        <div className="bp-feedback-stat-card neutral">
          <div className="bp-stat-icon">😐</div>
          <div className="bp-stat-info">
            <div className="bp-stat-value">{sentimentData.neutral}</div>
            <div className="bp-stat-label">Neutral</div>
          </div>
        </div>

        <div className="bp-feedback-stat-card negative">
          <div className="bp-stat-icon">😟</div>
          <div className="bp-stat-info">
            <div className="bp-stat-value">{sentimentData.negative}</div>
            <div className="bp-stat-label">Negative</div>
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="bp-feedback-section">
        <h3>📊 Department Performance</h3>
        <div className="bp-dept-ratings">
          {departmentStats.map((dept, index) => (
            <div key={index} className="bp-dept-rating-card">
              <div className="bp-dept-rating-header">
                <h4>{dept.name}</h4>
                <span className="bp-dept-avg-rating">⭐ {dept.avgRating}</span>
              </div>
              <div className="bp-dept-rating-bar">
                <div 
                  className="bp-dept-rating-fill"
                  style={{ width: `${(dept.avgRating / 5) * 100}%` }}
                />
              </div>
              <div className="bp-dept-rating-stats">
                <span>{dept.totalReviews} reviews</span>
                <span className="positive">{dept.positive}% positive</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bp-feedback-filters">
        <div className="bp-filter-group">
          <label>Rating:</label>
          <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
        <div className="bp-filter-group">
          <label>Department:</label>
          <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
            <option value="all">All Departments</option>
            {departmentStats.map(dept => (
              <option key={dept.name} value={dept.name}>{dept.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bp-feedback-section">
        <h3>💬 Customer Reviews ({filteredFeedbacks.length})</h3>
        <div className="bp-feedback-list">
          {filteredFeedbacks.map(feedback => (
            <div key={feedback.id} className={`bp-feedback-card sentiment-${feedback.sentiment}`}>
              <div className="bp-feedback-header">
                <div className="bp-feedback-customer">
                  <div className="bp-customer-avatar">
                    {feedback.customerName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4>{feedback.customerName}</h4>
                    <p className="bp-feedback-meta">
                      {feedback.department} • {new Date(feedback.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="bp-feedback-rating">
                  <span className="stars">{renderStars(feedback.rating)}</span>
                  <span className="rating-value">{feedback.rating}/5</span>
                </div>
              </div>

              <div className="bp-feedback-comment">
                <p>{feedback.comment}</p>
              </div>

              <div className="bp-feedback-sentiment">
                <span className={`sentiment-badge ${feedback.sentiment}`}>
                  {feedback.sentiment === 'positive' ? '😊 Positive' : 
                   feedback.sentiment === 'neutral' ? '😐 Neutral' : '😟 Negative'}
                </span>
              </div>

              {feedback.replied ? (
                <div className="bp-feedback-reply">
                  <div className="bp-reply-header">
                    <strong>Your Reply:</strong>
                  </div>
                  <p>{feedback.reply}</p>
                </div>
              ) : (
                <div className="bp-feedback-actions">
                  <button 
                    className="bp-reply-btn"
                    onClick={() => handleReply(feedback)}
                  >
                    💬 Reply to Customer
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFeedbacks.length === 0 && (
          <div className="bp-empty-state">
            <p>No feedback matching the selected filters</p>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedFeedback && (
        <div className="bp-modal-overlay" onClick={() => setShowReplyModal(false)}>
          <div className="bp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bp-modal-header">
              <h2>Reply to {selectedFeedback.customerName}</h2>
              <button className="bp-modal-close" onClick={() => setShowReplyModal(false)}>×</button>
            </div>
            <div className="bp-modal-body">
              <div className="bp-reply-context">
                <p><strong>Rating:</strong> {renderStars(selectedFeedback.rating)} ({selectedFeedback.rating}/5)</p>
                <p><strong>Comment:</strong> {selectedFeedback.comment}</p>
              </div>
              <div className="bp-form-group">
                <label>Your Reply</label>
                <textarea 
                  rows="5"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a professional and helpful response..."
                />
              </div>
            </div>
            <div className="bp-modal-footer">
              <Button variant="secondary" onClick={() => setShowReplyModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={submitReply}>Send Reply</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackRatings;
