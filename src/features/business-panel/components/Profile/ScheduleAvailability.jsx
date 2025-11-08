import React, { useState } from 'react';
import Header from '../Shared/Header';
import Button from '../../../../components/Common/Button';
import '../../styles/Schedule.css';

const ScheduleAvailability = () => {
  const [businessHours, setBusinessHours] = useState({
    Monday: { open: '09:00', close: '18:00', isOpen: true },
    Tuesday: { open: '09:00', close: '18:00', isOpen: true },
    Wednesday: { open: '09:00', close: '18:00', isOpen: true },
    Thursday: { open: '09:00', close: '18:00', isOpen: true },
    Friday: { open: '09:00', close: '18:00', isOpen: true },
    Saturday: { open: '10:00', close: '16:00', isOpen: true },
    Sunday: { open: '10:00', close: '16:00', isOpen: false }
  });

  const [holidays, setHolidays] = useState([
    { id: 1, name: 'New Year 2025', date: '2025-01-01', type: 'holiday' },
    { id: 2, name: 'Republic Day', date: '2025-01-26', type: 'holiday' },
    { id: 3, name: 'Lunch Break', startTime: '13:00', endTime: '14:00', type: 'break', recurring: true }
  ]);

  const [slots] = useState([
    { id: 1, time: '09:00 - 09:30', capacity: 10, booked: 7 },
    { id: 2, time: '09:30 - 10:00', capacity: 10, booked: 10 },
    { id: 3, time: '10:00 - 10:30', capacity: 10, booked: 5 },
    { id: 4, time: '10:30 - 11:00', capacity: 10, booked: 3 }
  ]);

  const [showAddHoliday, setShowAddHoliday] = useState(false);
  const [bookingEnabled, setBookingEnabled] = useState(true);

  const handleHoursChange = (day, field, value) => {
    setBusinessHours({
      ...businessHours,
      [day]: {
        ...businessHours[day],
        [field]: value
      }
    });
  };

  const toggleDay = (day) => {
    setBusinessHours({
      ...businessHours,
      [day]: {
        ...businessHours[day],
        isOpen: !businessHours[day].isOpen
      }
    });
  };

  const handleAddHoliday = () => {
    const newHoliday = {
      id: holidays.length + 1,
      name: 'New Holiday',
      date: new Date().toISOString().split('T')[0],
      type: 'holiday'
    };
    setHolidays([...holidays, newHoliday]);
    setShowAddHoliday(false);
  };

  const deleteHoliday = (id) => {
    if (window.confirm('Delete this holiday/break?')) {
      setHolidays(holidays.filter(h => h.id !== id));
    }
  };

  const handleSave = () => {
    alert('Schedule settings saved successfully!');
    console.log('Saved:', { businessHours, holidays, bookingEnabled });
  };

  return (
    <div className="bp-schedule">
      <Header 
        title="Schedule & Availability"
        subtitle="Manage business hours, holidays, and booking slots"
        actions={
          <Button variant="primary" onClick={handleSave}>
            💾 Save Schedule
          </Button>
        }
      />

      {/* Booking Toggle */}
      <div className="bp-schedule-toggle">
        <div className="bp-toggle-card">
          <div className="bp-toggle-info">
            <h3>Online Booking Status</h3>
            <p>Enable or disable online booking for customers</p>
          </div>
          <label className="bp-switch">
            <input 
              type="checkbox" 
              checked={bookingEnabled}
              onChange={(e) => setBookingEnabled(e.target.checked)}
            />
            <span className="bp-slider"></span>
          </label>
        </div>
        {!bookingEnabled && (
          <div className="bp-booking-disabled-alert">
            ⚠️ Online booking is currently disabled. Customers cannot make new bookings.
          </div>
        )}
      </div>

      {/* Business Hours */}
      <div className="bp-schedule-section">
        <h3>📅 Weekly Business Hours</h3>
        <div className="bp-hours-list">
          {Object.keys(businessHours).map(day => (
            <div key={day} className={`bp-hours-row ${!businessHours[day].isOpen ? 'closed' : ''}`}>
              <div className="bp-day-name">
                <label className="bp-checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={businessHours[day].isOpen}
                    onChange={() => toggleDay(day)}
                  />
                  <span>{day}</span>
                </label>
              </div>
              
              {businessHours[day].isOpen ? (
                <div className="bp-time-inputs">
                  <input 
                    type="time" 
                    value={businessHours[day].open}
                    onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                  />
                  <span>to</span>
                  <input 
                    type="time" 
                    value={businessHours[day].close}
                    onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                  />
                </div>
              ) : (
                <span className="bp-closed-label">Closed</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Holidays & Breaks */}
      <div className="bp-schedule-section">
        <div className="bp-section-header">
          <h3>🗓️ Holidays & Breaks</h3>
          <Button variant="secondary" onClick={() => setShowAddHoliday(true)}>
            ➕ Add Holiday/Break
          </Button>
        </div>

        <div className="bp-holidays-list">
          {holidays.map(holiday => (
            <div key={holiday.id} className={`bp-holiday-item ${holiday.type}`}>
              <div className="bp-holiday-icon">
                {holiday.type === 'holiday' ? '🏖️' : '☕'}
              </div>
              <div className="bp-holiday-details">
                <h4>{holiday.name}</h4>
                {holiday.type === 'holiday' ? (
                  <p>📅 {new Date(holiday.date).toLocaleDateString('en-US', { 
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                  })}</p>
                ) : (
                  <p>⏰ {holiday.startTime} - {holiday.endTime} {holiday.recurring && '(Daily)'}</p>
                )}
              </div>
              <button 
                className="bp-holiday-delete"
                onClick={() => deleteHoliday(holiday.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {holidays.length === 0 && (
          <div className="bp-empty-state">
            <p>No holidays or breaks scheduled</p>
          </div>
        )}
      </div>

      {/* Time Slots */}
      <div className="bp-schedule-section">
        <div className="bp-section-header">
          <h3>⏰ Booking Time Slots</h3>
          <Button variant="secondary">⚙️ Configure Slots</Button>
        </div>

        <div className="bp-slots-grid">
          {slots.map(slot => {
            const percentage = (slot.booked / slot.capacity) * 100;
            const status = percentage >= 100 ? 'full' : percentage >= 70 ? 'filling' : 'available';
            
            return (
              <div key={slot.id} className={`bp-slot-card ${status}`}>
                <div className="bp-slot-time">{slot.time}</div>
                <div className="bp-slot-capacity">
                  <span className="booked">{slot.booked}</span>
                  <span className="separator">/</span>
                  <span className="total">{slot.capacity}</span>
                </div>
                <div className="bp-slot-bar">
                  <div 
                    className="bp-slot-fill" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="bp-slot-status">
                  {status === 'full' ? '🔴 Full' : status === 'filling' ? '🟡 Filling Fast' : '🟢 Available'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Holiday Modal */}
      {showAddHoliday && (
        <div className="bp-modal-overlay" onClick={() => setShowAddHoliday(false)}>
          <div className="bp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bp-modal-header">
              <h2>Add Holiday / Break</h2>
              <button className="bp-modal-close" onClick={() => setShowAddHoliday(false)}>×</button>
            </div>
            <div className="bp-modal-body">
              <div className="bp-form-group">
                <label>Type</label>
                <select>
                  <option value="holiday">Holiday (Full Day)</option>
                  <option value="break">Break (Time Range)</option>
                </select>
              </div>
              <div className="bp-form-group">
                <label>Name</label>
                <input type="text" placeholder="e.g., Christmas Day" />
              </div>
              <div className="bp-form-group">
                <label>Date</label>
                <input type="date" />
              </div>
              <div className="bp-form-group">
                <label>
                  <input type="checkbox" />
                  <span>Disable booking on this day</span>
                </label>
              </div>
            </div>
            <div className="bp-modal-footer">
              <Button variant="secondary" onClick={() => setShowAddHoliday(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleAddHoliday}>Add</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleAvailability;
