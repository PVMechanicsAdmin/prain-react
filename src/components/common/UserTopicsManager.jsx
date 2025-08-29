import React, { useState, useEffect } from 'react';

const UserTopicsManager = () => {
  const [userTopics, setUserTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load user topics from localStorage
  useEffect(() => {
    const loadUserTopics = () => {
      try {
        const savedTopics = localStorage.getItem('prainUserTopics');
        if (savedTopics) {
          setUserTopics(JSON.parse(savedTopics));
        }
      } catch (error) {
        console.error('Error loading user topics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserTopics();

    // Listen for changes in localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'prainUserTopics') {
        loadUserTopics();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Function to get user's topics
  const getUserTopics = () => {
    return userTopics;
  };

  // Function to check if a resource matches user's topics
  const checkResourceRelevance = (resource) => {
    if (!resource.categories || resource.categories.length === 0) return false;
    
    return resource.categories.some(resourceCategory => 
      userTopics.some(userTopic => 
        userTopic.category === resourceCategory.category && 
        userTopic.subcategory === resourceCategory.subcategory
      )
    );
  };

  // Function to get topics by category
  const getTopicsByCategory = (category) => {
    return userTopics.filter(topic => topic.category === category);
  };

  // Function to get all unique categories
  const getUniqueCategories = () => {
    return [...new Set(userTopics.map(topic => topic.category))];
  };

  // Function to export topics for sharing
  const exportTopics = () => {
    const topicsData = {
      topics: userTopics,
      exportDate: new Date().toISOString(),
      totalTopics: userTopics.length
    };
    
    const blob = new Blob([JSON.stringify(topicsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prain-user-topics.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Function to import topics
  const importTopics = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          if (importedData.topics && Array.isArray(importedData.topics)) {
            setUserTopics(importedData.topics);
            localStorage.setItem('prainUserTopics', JSON.stringify(importedData.topics));
            alert(`Successfully imported ${importedData.topics.length} topics!`);
          }
        } catch (error) {
          alert('Error importing topics. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  if (isLoading) {
    return <div>Loading topics...</div>;
  }

  return {
    userTopics,
    getUserTopics,
    checkResourceRelevance,
    getTopicsByCategory,
    getUniqueCategories,
    exportTopics,
    importTopics
  };
};

export default UserTopicsManager;



