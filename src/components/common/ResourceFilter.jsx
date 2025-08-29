import React, { useState, useEffect } from 'react';

const ResourceFilter = ({ resources, onFilteredResources }) => {
  const [userTopics, setUserTopics] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [showOnlyRelevant, setShowOnlyRelevant] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Load user topics from localStorage
  useEffect(() => {
    const loadUserTopics = () => {
      try {
        const savedTopics = localStorage.getItem('prainUserTopics');
        if (savedTopics) {
          const topics = JSON.parse(savedTopics);
          setUserTopics(topics);
          
          // Get unique categories for filtering
          const categories = [...new Set(topics.map(topic => topic.category))];
          setSelectedCategories(categories);
        }
      } catch (error) {
        console.error('Error loading user topics:', error);
      }
    };

    loadUserTopics();
  }, []);

  // Filter resources based on user topics and selected categories
  useEffect(() => {
    if (!resources || resources.length === 0) {
      setFilteredResources([]);
      return;
    }

    let filtered = resources;

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(resource => 
        resource.categories && resource.categories.some(cat => 
          selectedCategories.includes(cat.category)
        )
      );
    }

    // Filter by relevance to user topics
    if (showOnlyRelevant) {
      filtered = filtered.filter(resource => 
        resource.categories && resource.categories.some(resourceCategory => 
          userTopics.some(userTopic => 
            userTopic.category === resourceCategory.category && 
            userTopic.subcategory === resourceCategory.subcategory
          )
        )
      );
    }

    setFilteredResources(filtered);
    
    // Notify parent component of filtered results
    if (onFilteredResources) {
      onFilteredResources(filtered);
    }
  }, [resources, userTopics, selectedCategories, showOnlyRelevant, onFilteredResources]);

  // Toggle category selection
  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  // Select all categories
  const selectAllCategories = () => {
    const allCategories = [...new Set(userTopics.map(topic => topic.category))];
    setSelectedCategories(allCategories);
  };

  // Clear all categories
  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  // Get relevance score for a resource
  const getRelevanceScore = (resource) => {
    if (!resource.categories || !userTopics.length) return 0;
    
    let matches = 0;
    resource.categories.forEach(resourceCategory => {
      userTopics.forEach(userTopic => {
        if (userTopic.category === resourceCategory.category && 
            userTopic.subcategory === resourceCategory.subcategory) {
          matches++;
        }
      });
    });
    
    return matches;
  };

  // Sort resources by relevance
  const sortByRelevance = () => {
    const sorted = [...filteredResources].sort((a, b) => {
      const scoreA = getRelevanceScore(a);
      const scoreB = getRelevanceScore(b);
      return scoreB - scoreA;
    });
    setFilteredResources(sorted);
  };

  if (userTopics.length === 0) {
    return (
      <div className="resource-filter-empty">
        <p>No topics selected. Please add topics to your profile to filter resources.</p>
      </div>
    );
  }

  return (
    <div className="resource-filter">
      <div className="filter-header">
        <h3>Filter Resources</h3>
        <div className="filter-controls">
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={showOnlyRelevant}
              onChange={(e) => setShowOnlyRelevant(e.target.checked)}
            />
            Show only relevant to my topics
          </label>
        </div>
      </div>

      <div className="category-filters">
        <div className="category-header">
          <h4>Categories</h4>
          <div className="category-actions">
            <button onClick={selectAllCategories} className="filter-button small">
              Select All
            </button>
            <button onClick={clearAllCategories} className="filter-button small">
              Clear All
            </button>
          </div>
        </div>
        
        <div className="category-list">
          {[...new Set(userTopics.map(topic => topic.category))].map(category => (
            <label key={category} className="category-checkbox">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
              <span className="category-name">{category}</span>
              <span className="topic-count">
                ({userTopics.filter(topic => topic.category === category).length})
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-actions">
        <button onClick={sortByRelevance} className="filter-button">
          Sort by Relevance
        </button>
        <div className="filter-stats">
          <span>Showing {filteredResources.length} of {resources?.length || 0} resources</span>
        </div>
      </div>

      <div className="filtered-results">
        {filteredResources.map((resource, index) => (
          <div key={resource.id || index} className="resource-item">
            <div className="resource-header">
              <h4>{resource.title}</h4>
              <span className="relevance-score">
                Relevance: {getRelevanceScore(resource)}
              </span>
            </div>
            <div className="resource-content">
              {resource.content}
            </div>
            <div className="resource-categories">
              {resource.categories?.map((cat, catIndex) => (
                <span key={catIndex} className="category-tag">
                  {cat.category}: {cat.subcategory}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceFilter;



