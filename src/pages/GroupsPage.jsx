import React, { useState } from 'react';
import '../styles/design-system.css';

const GroupsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('myGroups');

  const groups = [
    {
      id: 1,
      name: 'Addictions',
      description: 'Learn to fight any addiction',
      icon: '🚫',
      category: 'Support'
    },
    {
      id: 2,
      name: 'Finances',
      description: 'Earnings Improvements & savings',
      icon: '💰',
      category: 'Financial'
    }
  ];

  const renderMyGroups = () => (
    <div className="groups-section">
      <h2 className="section-title">My Groups</h2>
      <div className="grid-container grid-2">
        {groups.map((group) => (
          <div key={group.id} className="group-item">
            <div className="group-icon">{group.icon}</div>
            <div className="group-info">
              <div className="group-name">{group.name}</div>
              <div className="group-description">{group.description}</div>
            </div>
            <div className="group-arrow">→</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAllGroups = () => (
    <div className="groups-section">
      <h2 className="section-title">All Groups</h2>
      <div className="grid-container grid-2">
        {groups.map((group) => (
          <div key={`all-${group.id}`} className="group-item">
            <div className="group-icon">{group.icon}</div>
            <div className="group-info">
              <div className="group-name">{group.name}</div>
              <div className="group-description">{group.description}</div>
            </div>
            <div className="group-arrow">→</div>
          </div>
        ))}
        {/* Duplicate items for demonstration */}
        {groups.map((group) => (
          <div key={`all-dup-${group.id}`} className="group-item">
            <div className="group-icon">{group.icon}</div>
            <div className="group-info">
              <div className="group-name">{group.name}</div>
              <div className="group-description">{group.description}</div>
            </div>
            <div className="group-arrow">→</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="page-content">
      {/* Search Bar */}
      <div className="search-section">
        <div className="search-bar">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            className="search-input"
            placeholder="Search Group"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-bar">
        <button 
          className={`tab ${activeTab === 'myGroups' ? 'active' : ''}`}
          onClick={() => setActiveTab('myGroups')}
        >
          My Groups
        </button>
        <button 
          className={`tab ${activeTab === 'allGroups' ? 'active' : ''}`}
          onClick={() => setActiveTab('allGroups')}
        >
          All Groups
        </button>
      </div>

      {/* Main Content */}
      {activeTab === 'myGroups' && renderMyGroups()}
      {activeTab === 'allGroups' && renderAllGroups()}
    </div>
  );
};

export default GroupsPage;
