import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = ({ onMobileMenuToggle, onAddClick, pageTitle }) => {
  const location = useLocation();

  const getPageTitle = () => {
    if (pageTitle) return pageTitle;
    
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/prayer-list':
        return 'Prayer List';
      case '/new-prayer':
        return 'New Prayer';
      case '/groups':
        return 'Groups';
      case '/profile':
        return 'Profile';
      default:
        return 'PRAIN Network';
    }
  };

  const shouldShowAddButton = () => {
    return ['/', '/prayer-list'].includes(location.pathname);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="header-button mobile-menu-toggle"
          onClick={onMobileMenuToggle}
        >
          ☰
        </button>
        <h1 className="page-title">{getPageTitle()}</h1>
      </div>
      
      <div className="header-actions">
        {shouldShowAddButton() && (
          <button 
            className="header-button"
            onClick={onAddClick}
            title="Add New"
          >
            +
          </button>
        )}
        <button className="header-button" title="Notifications">
          🔔
        </button>
        <button className="header-button" title="Settings">
          ⚙️
        </button>
      </div>
    </header>
  );
};

export default Header;

