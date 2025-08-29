import React, { useState, useEffect } from 'react';

const ResourceSender = ({ recipientUserId, onResourceSent }) => {
  const [userTopics, setUserTopics] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [resourceData, setResourceData] = useState({
    title: '',
    content: '',
    type: 'meme', // meme, poem, bible-verse, video, article, etc.
    categories: []
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load recipient's topics
  useEffect(() => {
    const loadRecipientTopics = async () => {
      try {
        // In a real app, this would fetch from the backend
        // For now, we'll simulate loading topics
        setIsLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For demo purposes, we'll use some sample topics
        const sampleTopics = [
          { category: 'ADDICTIONS', subcategory: 'shopping' },
          { category: 'FINANCES', subcategory: 'earnings' },
          { category: 'HEALTH', subcategory: 'exercise' },
          { category: 'SPIRITUALITY', subcategory: 'faith' }
        ];
        
        setUserTopics(sampleTopics);
        setSelectedCategories(sampleTopics.map(topic => topic.category));
      } catch (error) {
        console.error('Error loading recipient topics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (recipientUserId) {
      loadRecipientTopics();
    }
  }, [recipientUserId]);

  // Handle category selection
  const handleCategoryToggle = (category, subcategory) => {
    const newCategories = [...resourceData.categories];
    const existingIndex = newCategories.findIndex(
      cat => cat.category === category && cat.subcategory === subcategory
    );

    if (existingIndex >= 0) {
      newCategories.splice(existingIndex, 1);
    } else {
      newCategories.push({ category, subcategory });
    }

    setResourceData(prev => ({ ...prev, categories: newCategories }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!resourceData.title.trim() || !resourceData.content.trim() || resourceData.categories.length === 0) {
      alert('Please fill in all fields and select at least one category.');
      return;
    }

    try {
      setIsLoading(true);
      
      // In a real app, this would send to the backend
      const resourceToSend = {
        ...resourceData,
        id: Date.now(),
        senderId: 'current-user-id', // Would come from auth context
        recipientId: recipientUserId,
        timestamp: new Date().toISOString(),
        status: 'pending' // pending, approved, rejected
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage for demo purposes
      const existingResources = JSON.parse(localStorage.getItem('prainResources') || '[]');
      existingResources.push(resourceToSend);
      localStorage.setItem('prainResources', JSON.stringify(existingResources));

      // Reset form
      setResourceData({
        title: '',
        content: '',
        type: 'meme',
        categories: []
      });

      if (onResourceSent) {
        onResourceSent(resourceToSend);
      }

      alert('Resource sent successfully! It will be reviewed and delivered to the recipient.');
    } catch (error) {
      console.error('Error sending resource:', error);
      alert('Error sending resource. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && userTopics.length === 0) {
    return <div>Loading recipient's topics...</div>;
  }

  return (
    <div className="resource-sender">
      <div className="sender-header">
        <h3>Send Resource to Friend</h3>
        <p>Choose categories that match your friend's prayer topics to ensure relevance.</p>
      </div>

      <form onSubmit={handleSubmit} className="resource-form">
        <div className="form-group">
          <label htmlFor="resource-title">Resource Title *</label>
          <input
            id="resource-title"
            type="text"
            value={resourceData.title}
            onChange={(e) => setResourceData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter a descriptive title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="resource-type">Resource Type *</label>
          <select
            id="resource-type"
            value={resourceData.type}
            onChange={(e) => setResourceData(prev => ({ ...prev, type: e.target.value }))}
            required
          >
            <option value="meme">Meme</option>
            <option value="poem">Poem</option>
            <option value="bible-verse">Bible Verse</option>
            <option value="video">Video</option>
            <option value="article">Article</option>
            <option value="song">Song</option>
            <option value="quote">Quote</option>
            <option value="prayer">Prayer</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="resource-content">Content *</label>
          <textarea
            id="resource-content"
            value={resourceData.content}
            onChange={(e) => setResourceData(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Enter your resource content, URL, or description"
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label>Select Relevant Categories *</label>
          <div className="category-selection">
            {userTopics.map((topic, index) => (
              <label key={index} className="category-option">
                <input
                  type="checkbox"
                  checked={resourceData.categories.some(
                    cat => cat.category === topic.category && cat.subcategory === topic.subcategory
                  )}
                  onChange={() => handleCategoryToggle(topic.category, topic.subcategory)}
                />
                <span className="category-label">
                  {topic.category}: {topic.subcategory}
                </span>
              </label>
            ))}
          </div>
          <small>Select categories that best describe your resource</small>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="send-resource-button"
            disabled={isLoading || resourceData.categories.length === 0}
          >
            {isLoading ? 'Sending...' : 'Send Resource'}
          </button>
        </div>
      </form>

      <div className="sender-info">
        <h4>How it works:</h4>
        <ol>
          <li>Your resource will be reviewed for appropriateness</li>
          <li>If approved, it will be delivered to your friend</li>
          <li>They'll see it filtered by their selected topics</li>
          <li>Resources are prioritized by relevance to their needs</li>
        </ol>
      </div>
    </div>
  );
};

export default ResourceSender;



