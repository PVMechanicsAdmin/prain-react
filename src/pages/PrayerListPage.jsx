import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/design-system.css';

const PrayerListPage = () => {
  const navigate = useNavigate();
  const [pins, setPins] = useState([]);
  
  const prayerRequests = [
    {
      id: 1,
      name: 'Sarah Johnson',
      time: '2 hours ago',
      category: 'HEALTH',
      subcategory: 'Surgery',
      description: 'Praying for successful knee replacement surgery tomorrow and a smooth recovery process.',
      isUrgent: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      time: '4 hours ago',
      category: 'EDUCATION',
      subcategory: 'Get accepted',
      description: 'Seeking prayers for my daughter\'s college applications - she applied to Stanford, MIT, and UCLA.',
      isUrgent: false
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      time: '6 hours ago',
      category: 'EMPLOYMENT',
      subcategory: 'Get promoted',
      description: 'Need prayers for a big presentation at work tomorrow that could lead to a promotion.',
      isUrgent: true
    },
    {
      id: 4,
      name: 'David Thompson',
      time: '8 hours ago',
      category: 'SPIRITUALITY',
      subcategory: 'Faith',
      description: 'Praying for deeper faith and understanding of God\'s plan for my life during this season of uncertainty.',
      isUrgent: false
    },
    {
      id: 5,
      name: 'Lisa Wang',
      time: '1 day ago',
      category: 'LOVE',
      subcategory: 'Great relationship',
      description: 'Seeking prayers for reconciliation with my sister after our argument last week.',
      isUrgent: false
    },
    {
      id: 6,
      name: 'James Wilson',
      time: '1 day ago',
      category: 'FINANCES',
      subcategory: 'Debt',
      description: 'Praying for God\'s provision to pay off medical bills and wisdom in managing our family budget.',
      isUrgent: true
    },
    {
      id: 7,
      name: 'Maria Garcia',
      time: '2 days ago',
      category: 'EDUCATION',
      subcategory: 'Get good grades',
      description: 'Seeking prayers for my son\'s learning difficulties - he has ADHD and is struggling in math.',
      isUrgent: false
    },
    {
      id: 8,
      name: 'Robert Kim',
      time: '2 days ago',
      category: 'EMPLOYMENT',
      subcategory: 'Get hired',
      description: 'Need prayers for a job opportunity at Google that aligns with my values and provides for my family.',
      isUrgent: true
    },
    {
      id: 9,
      name: 'Jennifer Lee',
      time: '3 days ago',
      category: 'ELIMINATIONS',
      subcategory: 'Anxiety',
      description: 'Praying for peace and healing from anxiety attacks, and strength to overcome daily struggles.',
      isUrgent: false
    },
    {
      id: 10,
      name: 'Thomas Brown',
      time: '3 days ago',
      category: 'PEOPLE GROUPS',
      subcategory: 'Church',
      description: 'Seeking prayers for our neighborhood outreach program and unity among local churches.',
      isUrgent: false
    },
    {
      id: 11,
      name: 'Amanda Foster',
      time: '4 days ago',
      category: 'HEALTH',
      subcategory: 'Pregnancy',
      description: 'Praying for a healthy pregnancy and safe delivery of our first child.',
      isUrgent: false
    },
    {
      id: 12,
      name: 'Carlos Martinez',
      time: '5 days ago',
      category: 'ADDICTIONS',
      subcategory: 'Alcoholism',
      description: 'Seeking prayers for strength to overcome alcohol addiction and rebuild my life.',
      isUrgent: true
    },
    {
      id: 13,
      name: 'Rachel Green',
      time: '1 week ago',
      category: 'PROTECTION',
      subcategory: 'Travel safety',
      description: 'Praying for safe travel to Europe next month and protection during our mission trip.',
      isUrgent: false
    },
    {
      id: 14,
      name: 'Daniel Park',
      time: '1 week ago',
      category: 'IMPROVEMENTS',
      subcategory: 'Relationships',
      description: 'Need prayers for better communication with my wife and healing in our marriage.',
      isUrgent: false
    },
    {
      id: 15,
      name: 'Sophie Turner',
      time: '2 weeks ago',
      category: 'BLESSINGS',
      subcategory: 'Home and shelter',
      description: 'Praying for God\'s provision to find affordable housing in this expensive market.',
      isUrgent: true
    }
  ];

  const handleCreatePIN = (pinData) => {
    const selectedPrayer = prayerRequests.find(req => req.id === selectedPrayerId);
    const newPIN = {
      id: Date.now(),
      ...pinData,
      timestamp: new Date().toISOString(),
      author: 'Kevin Hall',
      prayerResponse: selectedPrayer ? {
        id: selectedPrayer.id,
        name: selectedPrayer.name,
        category: selectedPrayer.category,
        subcategory: selectedPrayer.subcategory
      } : null
    };
    setPins([newPIN, ...pins]);
    setSelectedPrayerId(null);
  };

  const openPINCreationPage = (prayerId) => {
    const selectedPrayer = prayerRequests.find(req => req.id === prayerId);
    navigate('/create-pin', { 
      state: { prayerContext: selectedPrayer } 
    });
  };

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Prayer Requests</h1>
      </div>

      {/* PINs Section */}
      {pins.length > 0 && (
        <div className="pins-section" style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '15px', color: '#14171a' }}>Recent PINs</h3>
          <div className="pins-grid" style={{ display: 'grid', gap: '15px' }}>
            {pins.map((pin) => (
              <div key={pin.id} className="pin-card card" style={{ padding: '20px' }}>
                <div className="pin-header" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <div className="pin-type-icon" style={{ fontSize: '24px' }}>
                    {pin.pinType === 'Note' && '📝'}
                    {pin.pinType === 'Prayer' && '🙏'}
                    {pin.pinType === 'Audio' && '🎵'}
                    {pin.pinType === 'Verse' && '📖'}
                    {pin.pinType === 'Meme' && '😄'}
                    {pin.pinType === 'Quote' && '💬'}
                    {pin.pinType === 'Image' && '🖼️'}
                    {pin.pinType === 'Video' && '🎬'}
                  </div>
                  <div className="pin-info">
                    <div className="pin-type" style={{ fontWeight: '600', color: '#1976d2' }}>{pin.pinType}</div>
                    <div className="pin-author" style={{ fontSize: '14px', color: '#666' }}>{pin.author}</div>
                  </div>
                </div>
                <div className="pin-content" style={{ marginBottom: '15px' }}>
                  {pin.content}
                  {pin.prayerResponse && (
                    <div style={{ 
                      marginTop: '10px', 
                      padding: '8px 12px', 
                      background: '#f0f8ff', 
                      border: '1px solid #e3f2fd', 
                      borderRadius: '6px',
                      fontSize: '14px',
                      color: '#1976d2'
                    }}>
                      <strong>Responding to:</strong> {pin.prayerResponse.name}'s {pin.prayerResponse.category} → {pin.prayerResponse.subcategory} prayer
                    </div>
                  )}
                </div>
                {pin.image && (
                  <div className="pin-media" style={{ marginBottom: '15px' }}>
                    <img 
                      src={URL.createObjectURL(pin.image)} 
                      alt="PIN content" 
                      style={{ width: '100%', borderRadius: '8px', maxHeight: '200px', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="pin-timestamp" style={{ fontSize: '12px', color: '#999' }}>
                  {new Date(pin.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prayer Requests Section */}
      <div className="prayer-requests">
        <h3 style={{ marginBottom: '15px', color: '#14171a' }}>Prayer Requests</h3>
        {prayerRequests.map((request) => (
          <div key={request.id} className="prayer-card card">
            <div className="prayer-header">
              <div className="user-info">
                <div className="user-avatar">👤</div>
                <div className="user-details">
                  <div className="user-name">{request.name}</div>
                  <div className="prayer-time">{request.time}</div>
                </div>
              </div>
              <div className="prayer-actions">
                <button 
                  className="button button-primary"
                  onClick={() => openPINCreationPage(request.id)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    padding: '8px 12px',
                    fontSize: '14px'
                  }}
                  title="Respond with a PIN"
                >
                  <span>📌</span>
                  <span>PIN</span>
                </button>
                <div className="prayer-arrow">→</div>
              </div>
            </div>
            <div className="prayer-category">
              <span className={`category-tag ${request.isUrgent ? 'urgent' : 'normal'}`}>
                {request.category} → {request.subcategory}
              </span>
            </div>
            <div className="prayer-description">
              {request.description}
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="prayer-action">
        <button className="button button-primary prayer-all-button">
          <span className="prayer-icon">🙏</span>
          <span>I Prayed For All</span>
        </button>
      </div>


    </div>
  );
};

export default PrayerListPage;
