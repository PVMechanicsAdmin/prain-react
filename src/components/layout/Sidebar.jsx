import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isCollapsed, onToggle, isMobileOpen, onMobileClose }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    {
      section: 'Main',
      items: [
        { path: '/', icon: '🏠', text: 'Home' },
        { path: '/prayer-list', icon: '🙏', text: 'Prayer List' },
        { path: '/new-prayer', icon: '➕', text: 'New Prayer' },
        { path: '/groups', icon: '📋', text: 'Groups' },
        { path: '/resources', icon: '📚', text: 'Resources' },
        { path: '/profile', icon: '👤', text: 'Profile' }
      ]
    },
    {
      section: 'Community',
      items: [
        { path: '/friends', icon: '👥', text: 'Connections' },
        { path: '/inspirations', icon: '⭐', text: 'Inspirations' },
        { path: '/events', icon: '📅', text: 'Events' },
        { path: '/messages', icon: '💬', text: 'Messages' }
      ]
    },
    {
      section: 'Resources',
      items: [
        { path: '/blogs', icon: '📖', text: 'Blog Articles' },
        { path: '/bible', icon: '📖', text: 'Bible Study' },
        { path: '/songs', icon: '🎵', text: 'Worship Songs' },
        { path: '/sermons', icon: '🎤', text: 'Sermons' },
        { path: '/books', icon: '📚', text: 'Books' }
      ]
    }
  ];

  const handleNavClick = () => {
    if (isMobile) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && (
        <div 
          className={`mobile-overlay ${isMobileOpen ? 'active' : ''}`}
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="sidebar-logo-text">PRAIN</span>
          </div>
          <button className="sidebar-toggle" onClick={onToggle}>
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="nav-section">
              <div className="nav-section-title">{section.section}</div>
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  to={item.path}
                  className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={handleNavClick}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.text}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
