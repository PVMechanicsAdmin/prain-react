import React, { useState } from 'react';
import '../../styles/sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (menuId) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  return (
    <div 
      className={`sidebar-container ${isOpen ? 'open' : ''}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Mini Sidebar with Icons */}
      <div className="sidebar-mini">
        <ul>
          <li>
            <a href="#" title="Menu" onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}>
              ☰
            </a>
          </li>
          <li>
            <a href="/newsfeed" title="Newsfeed">
              📰
            </a>
          </li>
          <li>
            <a href="/forum" title="Forum">
              💬
            </a>
          </li>
          <li>
            <a href="/friends" title="Friends">
              👥
            </a>
          </li>
          <li>
            <a href="/favorites" title="Favorites">
              ⭐
            </a>
          </li>
          <li>
            <a href="/messages" title="Messages">
              💌
            </a>
          </li>
          <li>
            <a href="/notifications" title="Notifications">
              🔔
            </a>
          </li>
          <li>
            <a href="/statistics" title="Statistics">
              📊
            </a>
          </li>
          <li>
            <a href="/help" title="Help">
              ❓
            </a>
          </li>
          <li>
            <a href="/faq" title="FAQ">
              💡
            </a>
          </li>
        </ul>
      </div>

      {/* Full Sidebar Menu */}
      <div className="sidebar-full">
        <div className="sidebar-title">PRAIN Menu</div>
        <ul className="menu-slide">
          <li>
            <a href="#" className="closd-f-menu" onClick={(e) => { e.preventDefault(); setIsOpen(false); }}>
              ✕ Close Menu
            </a>
          </li>
          
          <li className="menu-item-has-children">
            <a href="#" onClick={(e) => { e.preventDefault(); toggleSubmenu('home'); }}>
              🏠 Home Pages
            </a>
            <ul className={`submenu ${openSubmenus.home ? 'open' : ''}`}>
              <li><a href="/">PRAIN Default</a></li>
              <li><a href="/company-landing">Company Landing</a></li>
              <li><a href="/pitrest">Pitrest</a></li>
              <li><a href="/redpit">Redpit</a></li>
              <li><a href="/redpit-category">Redpit Category</a></li>
              <li><a href="/soundnik">Soundnik</a></li>
              <li><a href="/soundnik-detail">Soundnik Single</a></li>
              <li><a href="/career">Pitjob</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/classified">Classified</a></li>
              <li><a href="/pitpoint">PitPoint</a></li>
              <li><a href="/pittube">Pittube</a></li>
              <li><a href="/messenger">Messenger</a></li>
            </ul>
          </li>
          
          <li className="menu-item-has-children">
            <a href="#" onClick={(e) => { e.preventDefault(); toggleSubmenu('pittube'); }}>
              🎬 Pittube
            </a>
            <ul className={`submenu ${openSubmenus.pittube ? 'open' : ''}`}>
              <li><a href="/pittube">Pittube</a></li>
              <li><a href="/pittube-detail">Pittube Single</a></li>
              <li><a href="/pittube-category">Pittube Category</a></li>
              <li><a href="/pittube-channel">Pittube Channel</a></li>
              <li><a href="/pittube-search">Pittube Search</a></li>
            </ul>
          </li>
          
          <li className="menu-item-has-children">
            <a href="#" onClick={(e) => { e.preventDefault(); toggleSubmenu('pitpoint'); }}>
              📍 PitPoint
            </a>
            <ul className={`submenu ${openSubmenus.pitpoint ? 'open' : ''}`}>
              <li><a href="/pitpoint">PitPoint</a></li>
              <li><a href="/pitpoint-detail">Pitpoint Detail</a></li>
              <li><a href="/pitpoint-list">Pitpoint List</a></li>
              <li><a href="/pitpoint-without-banner">Without Banner</a></li>
              <li><a href="/pitpoint-search">Pitpoint Search</a></li>
            </ul>
          </li>
          
          <li className="menu-item-has-children">
            <a href="#" onClick={(e) => { e.preventDefault(); toggleSubmenu('pitjob'); }}>
              🎓 Pitjob
            </a>
            <ul className={`submenu ${openSubmenus.pitjob ? 'open' : ''}`}>
              <li><a href="/career">Pitjob</a></li>
              <li><a href="/career-detail">Pitjob Detail</a></li>
              <li><a href="/career-search">Job Search</a></li>
              <li><a href="/social-post-detail">Social Post</a></li>
            </ul>
          </li>
          
          <li className="menu-item-has-children">
            <a href="#" onClick={(e) => { e.preventDefault(); toggleSubmenu('timeline'); }}>
              ⏰ Timeline
            </a>
            <ul className={`submenu ${openSubmenus.timeline ? 'open' : ''}`}>
              <li><a href="/timeline">Timeline</a></li>
              <li><a href="/timeline-photos">Timeline Photos</a></li>
              <li><a href="/timeline-videos">Timeline Videos</a></li>
              <li><a href="/timeline-groups">Timeline Groups</a></li>
              <li><a href="/timeline-friends">Timeline Friends</a></li>
              <li><a href="/newsfeed">Newsfeed</a></li>
              <li><a href="/search-result">Search Result</a></li>
              <li><a href="/library">Library</a></li>
              <li><a href="/ad-center">Ad Center</a></li>
            </ul>
          </li>
          
          <li className="menu-item-has-children">
            <a href="#" onClick={(e) => { e.preventDefault(); toggleSubmenu('favorites'); }}>
              ❤️ Favorites
            </a>
            <ul className={`submenu ${openSubmenus.favorites ? 'open' : ''}`}>
              <li><a href="/fav-page">Favorites Page</a></li>
              <li><a href="/fav-favers">Page Likers</a></li>
              <li><a href="/fav-events">Fav Events</a></li>
              <li><a href="/fav-event-invitations">Event Invitations</a></li>
              <li><a href="/event-calendar">Event Calendar</a></li>
              <li><a href="/fav-page-create">Create New Page</a></li>
              <li><a href="/price-plans">Price Plans</a></li>
            </ul>
          </li>
          
          <li className="menu-item-has-children">
            <a href="#" onClick={(e) => { e.preventDefault(); toggleSubmenu('forum'); }}>
              💬 Forum
            </a>
            <ul className={`submenu ${openSubmenus.forum ? 'open' : ''}`}>
              <li><a href="/forum">Forum</a></li>
              <li><a href="/forum-create-topic">Create Topic</a></li>
              <li><a href="/forum-open-topic">Open Topic</a></li>
              <li><a href="/forums-category">Forum Category</a></li>
            </ul>
          </li>
          
          <li className="menu-item-has-children">
            <a href="#" onClick={(e) => { e.preventDefault(); toggleSubmenu('account'); }}>
              ⚙️ Account
            </a>
            <ul className={`submenu ${openSubmenus.account ? 'open' : ''}`}>
              <li><a href="/setting">Settings</a></li>
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/support-help">Support & Help</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/logout">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
