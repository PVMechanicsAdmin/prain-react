import React, { useState } from 'react';
import '../styles/design-system.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('prayerReminder');
  const [selectedHour, setSelectedHour] = useState('09');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('am');

  const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
  const minutes = ['00', '15', '30', '45'];

  const handleTimeChange = (type, value) => {
    switch (type) {
      case 'hour':
        setSelectedHour(value);
        break;
      case 'minute':
        setSelectedMinute(value);
        break;
      case 'period':
        setSelectedPeriod(value);
        break;
      default:
        break;
    }
  };

  const formatTime = () => {
    return `${selectedHour}:${selectedMinute} ${selectedPeriod.toUpperCase()}`;
  };

  return (
    <div className="page-content">
      {/* Profile Information */}
      <div className="profile-info card">
        <div className="profile-header">
          <div className="profile-avatar">👨‍🦳</div>
          <div className="profile-details">
            <div className="profile-name">John Smith</div>
            <div className="profile-location">NY, USA</div>
          </div>
          <button className="edit-profile-button">✏️</button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-bar">
        <button 
          className={`tab ${activeTab === 'main' ? 'active' : ''}`}
          onClick={() => setActiveTab('main')}
        >
          Main
        </button>
        <button 
          className={`tab ${activeTab === 'section' ? 'active' : ''}`}
          onClick={() => setActiveTab('section')}
        >
          Section
        </button>
        <button 
          className={`tab ${activeTab === 'prayerReminder' ? 'active' : ''}`}
          onClick={() => setActiveTab('prayerReminder')}
        >
          Prayer Reminder
        </button>
      </div>

      {/* Main Content */}
      {activeTab === 'prayerReminder' && (
        <div className="prayer-reminder-section">
          <div className="reminder-header">
            <div className="reminder-icon">⏰</div>
            <h3>Set Prayer Reminder</h3>
          </div>
          
          {/* Enhanced Time Picker */}
          <div className="enhanced-time-picker">
            <div className="time-display">
              <span className="time-label">Selected Time:</span>
              <span className="time-value">{formatTime()}</span>
            </div>
            
            <div className="time-picker-container">
              <div className="time-column">
                <div className="time-column-header">Hour</div>
                <div className="time-options">
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className={`time-option ${selectedHour === hour ? 'selected' : ''}`}
                      onClick={() => handleTimeChange('hour', hour)}
                    >
                      {hour}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="time-separator">:</div>
              
              <div className="time-column">
                <div className="time-column-header">Minute</div>
                <div className="time-options">
                  {minutes.map((minute) => (
                    <div
                      key={minute}
                      className={`time-option ${selectedMinute === minute ? 'selected' : ''}`}
                      onClick={() => handleTimeChange('minute', minute)}
                    >
                      {minute}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="time-column">
                <div className="time-column-header">Period</div>
                <div className="time-options">
                  <div 
                    className={`time-option period-option ${selectedPeriod === 'am' ? 'selected' : ''}`}
                    onClick={() => handleTimeChange('period', 'am')}
                  >
                    AM
                  </div>
                  <div 
                    className={`time-option period-option ${selectedPeriod === 'pm' ? 'selected' : ''}`}
                    onClick={() => handleTimeChange('period', 'pm')}
                  >
                    PM
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Time Presets */}
            <div className="time-presets">
              <div className="presets-header">Quick Presets</div>
              <div className="presets-grid">
                <button 
                  className="preset-button"
                  onClick={() => {
                    setSelectedHour('06');
                    setSelectedMinute('00');
                    setSelectedPeriod('am');
                  }}
                >
                  6:00 AM
                </button>
                <button 
                  className="preset-button"
                  onClick={() => {
                    setSelectedHour('12');
                    setSelectedMinute('00');
                    setSelectedPeriod('pm');
                  }}
                >
                  12:00 PM
                </button>
                <button 
                  className="preset-button"
                  onClick={() => {
                    setSelectedHour('06');
                    setSelectedMinute('00');
                    setSelectedPeriod('pm');
                  }}
                >
                  6:00 PM
                </button>
                <button 
                  className="preset-button"
                  onClick={() => {
                    setSelectedHour('09');
                    setSelectedMinute('00');
                    setSelectedPeriod('pm');
                  }}
                >
                  9:00 PM
                </button>
              </div>
            </div>
          </div>

          <div className="reminder-actions">
            <button className="button button-primary add-reminder-button">
              <span className="reminder-icon-small">⏰</span>
              <span>Set Prayer Reminder for {formatTime()}</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'main' && (
        <div className="main-section">
          <h3>Main Profile Information</h3>
          <p>Main profile content goes here...</p>
        </div>
      )}

      {activeTab === 'section' && (
        <div className="section-content">
          <h3>Section Content</h3>
          <p>Section content goes here...</p>
        </div>
      )}

      {/* Save Profile Button */}
      <div className="save-profile-section">
        <button className="button button-primary save-profile-button">
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

