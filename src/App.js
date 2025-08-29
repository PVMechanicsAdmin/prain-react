import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage.jsx';
import PrayerListPage from './pages/PrayerListPage.jsx';
import NewPrayerPage from './pages/NewPrayerPage.jsx';
import GroupsPage from './pages/GroupsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ResourcesPage from './pages/ResourcesPage.jsx';
import BlogArticlesPage from './pages/BlogArticlesPage.jsx';
import BlogArticleDetailPage from './pages/BlogArticleDetailPage.jsx';
import InspirationsPage from './pages/InspirationsPage.jsx';
import ConnectionsPage from './pages/ConnectionsPage.jsx';
import PINCreationPage from './pages/PINCreationPage.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';
import './App.css';
import './styles/design-system.css';

const AppContent = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleAddClick = () => {
    navigate('/new-prayer');
  };

  return (
    <div className="app-container">
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={handleMobileMenuClose}
      />
      
      <div className={`main-content-wrapper ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header 
          onMobileMenuToggle={handleMobileMenuToggle}
          onAddClick={handleAddClick}
        />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prayer-list" element={<PrayerListPage />} />
          <Route path="/create-pin" element={<PINCreationPage />} />
          <Route path="/new-prayer" element={<NewPrayerPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/blogs" element={<BlogArticlesPage />} />
          <Route path="/blog/:articleId" element={<BlogArticleDetailPage />} />
          
          {/* Community Routes */}
          <Route path="/friends" element={<ConnectionsPage />} />
          <Route path="/inspirations" element={<InspirationsPage />} />
          <Route path="/events" element={<PlaceholderPage title="Events" description="Community events and gatherings" icon="📅" />} />
          <Route path="/messages" element={<PlaceholderPage title="Messages" description="Private messages and conversations" icon="💬" />} />
          
          {/* Additional Resource Routes */}
          <Route path="/bible" element={<PlaceholderPage title="Bible Study" description="Bible study resources and tools" icon="📖" />} />
          <Route path="/songs" element={<PlaceholderPage title="Worship Songs" description="Worship music and lyrics" icon="🎵" />} />
          <Route path="/sermons" element={<PlaceholderPage title="Sermons" description="Sermon archives and recordings" icon="🎤" />} />
          <Route path="/books" element={<PlaceholderPage title="Books" description="Christian literature and resources" icon="📚" />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
