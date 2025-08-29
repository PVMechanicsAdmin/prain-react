import React, { useState, useEffect } from 'react';
import '../styles/design-system.css';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  const [myTopics, setMyTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [prayerRequests, setPrayerRequests] = useState([]);

  // Load topics from localStorage on component mount
  useEffect(() => {
    const savedTopics = localStorage.getItem('prainUserTopics');
    if (savedTopics) {
      try {
        setMyTopics(JSON.parse(savedTopics));
      } catch (error) {
        console.error('Error loading saved topics:', error);
        // Set default topics if there's an error
        setMyTopics([
          { id: 1, category: 'ADDICTIONS', subcategory: 'shopping', icon: '🚫' },
          { id: 2, category: 'FINANCES', subcategory: 'earnings', icon: '💰' }
        ]);
      }
    } else {
      // Set default topics for new users
      setMyTopics([
        { id: 1, category: 'ADDICTIONS', subcategory: 'shopping', icon: '🚫' },
        { id: 2, category: 'FINANCES', subcategory: 'earnings', icon: '💰' }
      ]);
    }

    // Load prayer requests from localStorage
    const savedPrayers = localStorage.getItem('prainPrayerRequests');
    if (savedPrayers) {
      try {
        setPrayerRequests(JSON.parse(savedPrayers));
      } catch (error) {
        console.error('Error loading saved prayer requests:', error);
        setPrayerRequests([]);
      }
    }
  }, []);

  // Save topics to localStorage whenever myTopics changes
  useEffect(() => {
    localStorage.setItem('prainUserTopics', JSON.stringify(myTopics));
  }, [myTopics]);

  // Listen for changes in prayer requests
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'prainPrayerRequests') {
        try {
          const updatedPrayers = JSON.parse(e.newValue || '[]');
          setPrayerRequests(updatedPrayers);
        } catch (error) {
          console.error('Error loading updated prayer requests:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Function to get user's topics for external use (e.g., resource filtering)
  const getUserTopics = () => {
    return myTopics;
  };

  // Function to check if a resource matches user's topics
  const checkResourceRelevance = (resource) => {
    if (!resource.categories || resource.categories.length === 0) return false;
    
    return resource.categories.some(resourceCategory => 
      myTopics.some(userTopic => 
        userTopic.category === resourceCategory.category && 
        userTopic.subcategory === resourceCategory.subcategory
      )
    );
  };

  // Expose functions globally for external use
  useEffect(() => {
    window.prainUserTopics = {
      getUserTopics,
      checkResourceRelevance,
      addTopic: handleAddTopic,
      removeTopic: removeTopic
    };
  }, [myTopics]);

  // Complete comprehensive data from JSON
  const comprehensiveData = [
    {
      "CATEGORY": "ADDICTIONS",
      "SUBCATEGORY": "adultery",
      "SYNONYM": [
        "infidelity",
        "cheating",
        "unfaithfulness",
        "illicit affair",
        "extramarital"
      ]
    },
    {
      "CATEGORY": "ADDICTIONS",
      "SUBCATEGORY": "alcoholism",
      "SYNONYM": [
        "alcohol abuse",
        "drinking problem",
        "liquor addiction",
        "booze dependency",
        "heavy drinking"
      ]
    },
    {
      "CATEGORY": "ADDICTIONS",
      "SUBCATEGORY": "drugs",
      "SYNONYM": [
        "drug abuse",
        "narcotics addiction",
        "substance use",
        "opiate dependency",
        "illegal substances"
      ]
    },
    {
      "CATEGORY": "ADDICTIONS",
      "SUBCATEGORY": "food",
      "SYNONYM": [
        "binge eating",
        "food addiction",
        "overeating",
        "unhealthy diet",
        "eating disorder"
      ]
    },
    {
      "CATEGORY": "ADDICTIONS",
      "SUBCATEGORY": "gambling",
      "SYNONYM": [
        "betting addiction",
        "compulsive gambling",
        "gaming problem",
        "wagering",
        "risk taking"
      ]
    },
    {
      "CATEGORY": "ADDICTIONS",
      "SUBCATEGORY": "pornography",
      "SYNONYM": [
        "porn addiction",
        "lust",
        "erotic material dependency",
        "sexual addiction",
        "graphic content"
      ]
    },
    {
      "CATEGORY": "ADDICTIONS",
      "SUBCATEGORY": "sex",
      "SYNONYM": [
        "sexual addiction",
        "lustful thoughts",
        "promiscuity",
        "uncontrolled desires",
        "hypersexuality"
      ]
    },
    {
      "CATEGORY": "ADDICTIONS",
      "SUBCATEGORY": "shopping",
      "SYNONYM": [
        "compulsive buying",
        "shopping addiction",
        "retail therapy",
        "overspending",
        "materialism"
      ]
    },
    {
      "CATEGORY": "ADDICTIONS",
      "SUBCATEGORY": "smoking",
      "SYNONYM": [
        "nicotine addiction",
        "tobacco use",
        "cigarette habit",
        "vaping addiction",
        "quit smoking"
      ]
    },
    {
      "CATEGORY": "BLESSINGS",
      "SUBCATEGORY": "Church",
      "SYNONYM": [
        "place of worship",
        "fellowship",
        "congregation",
        "house of God",
        "spiritual community"
      ]
    },
    {
      "CATEGORY": "BLESSINGS",
      "SUBCATEGORY": "Employment/Career",
      "SYNONYM": [
        "job",
        "work",
        "livelihood",
        "vocation",
        "profession",
        "career path"
      ]
    },
    {
      "CATEGORY": "BLESSINGS",
      "SUBCATEGORY": "Family and Friends",
      "SYNONYM": [
        "loved ones",
        "relatives",
        "kin",
        "household",
        "companions",
        "social circle"
      ]
    },
    {
      "CATEGORY": "BLESSINGS",
      "SUBCATEGORY": "Food to eat",
      "SYNONYM": [
        "daily bread",
        "nourishment",
        "provisions",
        "meals",
        "sustenance"
      ]
    },
    {
      "CATEGORY": "BLESSINGS",
      "SUBCATEGORY": "For Life",
      "SYNONYM": [
        "health",
        "well-being",
        "long life",
        "purpose",
        "vitality"
      ]
    },
    {
      "CATEGORY": "BLESSINGS",
      "SUBCATEGORY": "Freedom",
      "SYNONYM": [
        "liberty",
        "autonomy",
        "release",
        "emancipation",
        "independence"
      ]
    },
    {
      "CATEGORY": "BLESSINGS",
      "SUBCATEGORY": "Home and shelter",
      "SYNONYM": [
        "house",
        "dwelling",
        "residence",
        "place to live",
        "housing"
      ]
    },
    {
      "CATEGORY": "BLESSINGS",
      "SUBCATEGORY": "Knowledge and Wisdom",
      "SYNONYM": [
        "understanding",
        "insight",
        "learning",
        "intellect",
        "spiritual wisdom"
      ]
    },
    {
      "CATEGORY": "BLESSINGS",
      "SUBCATEGORY": "Life Lessons",
      "SYNONYM": [
        "teachings",
        "experiences",
        "guidance",
        "growth",
        "epiphanies",
        "realizations"
      ]
    },
    {
      "CATEGORY": "BLESSINGS",
      "SUBCATEGORY": "Relationships",
      "SYNONYM": [
        "friendships",
        "connections",
        "bonds",
        "social ties",
        "family connections"
      ]
    },
    {
      "CATEGORY": "EDUCATION",
      "SUBCATEGORY": "Earn scholarship",
      "SYNONYM": [
        "get funding",
        "receive grant",
        "tuition assistance",
        "academic award",
        "financial aid"
      ]
    },
    {
      "CATEGORY": "EDUCATION",
      "SUBCATEGORY": "Gain knowledge",
      "SYNONYM": [
        "learn",
        "study",
        "educate myself",
        "acquire information",
        "understanding"
      ]
    },
    {
      "CATEGORY": "EDUCATION",
      "SUBCATEGORY": "Get accepted",
      "SYNONYM": [
        "college acceptance",
        "admission",
        "school entry",
        "get in",
        "be approved"
      ]
    },
    {
      "CATEGORY": "EDUCATION",
      "SUBCATEGORY": "Get good grades",
      "SYNONYM": [
        "academic success",
        "pass exams",
        "perform well",
        "high marks",
        "GPA"
      ]
    },
    {
      "CATEGORY": "EDUCATION",
      "SUBCATEGORY": "To graduate",
      "SYNONYM": [
        "complete studies",
        "finish school",
        "get a degree",
        "commencement",
        "finish program"
      ]
    },
    {
      "CATEGORY": "ELIMINATIONS",
      "SUBCATEGORY": "Anger",
      "SYNONYM": [
        "rage",
        "fury",
        "wrath",
        "resentment",
        "hostility"
      ]
    },
    {
      "CATEGORY": "ELIMINATIONS",
      "SUBCATEGORY": "Anxiety",
      "SYNONYM": [
        "fear",
        "worry",
        "stress",
        "nervousness",
        "panic attacks"
      ]
    },
    {
      "CATEGORY": "ELIMINATIONS",
      "SUBCATEGORY": "Bitterness",
      "SYNONYM": [
        "resentment",
        "grudge",
        "acrimony",
        "spite",
        "sourness"
      ]
    },
    {
      "CATEGORY": "ELIMINATIONS",
      "SUBCATEGORY": "Depression",
      "SYNONYM": [
        "sadness",
        "despair",
        "hopelessness",
        "mental illness",
        "grief"
      ]
    },
    {
      "CATEGORY": "ELIMINATIONS",
      "SUBCATEGORY": "Hate",
      "SYNONYM": [
        "hatred",
        "animosity",
        "loathing",
        "hostility",
        "enmity"
      ]
    },
    {
      "CATEGORY": "ELIMINATIONS",
      "SUBCATEGORY": "Jealousy",
      "SYNONYM": [
        "envy",
        "covetousness",
        "spite",
        "resentment",
        "insecurity"
      ]
    },
    {
      "CATEGORY": "ELIMINATIONS",
      "SUBCATEGORY": "Overcoming Fear",
      "SYNONYM": [
        "courage",
        "bravery",
        "conquering phobias",
        "facing fears",
        "boldness"
      ]
    },
    {
      "CATEGORY": "ELIMINATIONS",
      "SUBCATEGORY": "Profanity",
      "SYNONYM": [
        "swearing",
        "cursing",
        "foul language",
        "blasphemy",
        "obscenities"
      ]
    },
    {
      "CATEGORY": "ELIMINATIONS",
      "SUBCATEGORY": "Selfishness",
      "SYNONYM": [
        "egoism",
        "self-centeredness",
        "greed",
        "narcissism",
        "self-absorption"
      ]
    },
    {
      "CATEGORY": "ELIMINATIONS",
      "SUBCATEGORY": "Stress",
      "SYNONYM": [
        "pressure",
        "tension",
        "strain",
        "anxiety",
        "overwhelm"
      ]
    },
    {
      "CATEGORY": "ELIMINATIONS",
      "SUBCATEGORY": "Temptation",
      "SYNONYM": [
        "lure",
        "enticement",
        "seduction",
        "test",
        "trial"
      ]
    },
    {
      "CATEGORY": "ELIMINATIONS",
      "SUBCATEGORY": "Worry",
      "SYNONYM": [
        "concern",
        "anxiety",
        "fear",
        "unease",
        "trouble"
      ]
    },
    {
      "CATEGORY": "ELIMINATIONS",
      "SUBCATEGORY": "Sinful Nature",
      "SYNONYM": [
        "flesh",
        "evil desires",
        "moral weakness",
        "corruption",
        "fallen nature"
      ]
    },
    {
      "CATEGORY": "EMPLOYMENT",
      "SUBCATEGORY": "Career Enhancement",
      "SYNONYM": [
        "promotion",
        "career growth",
        "advancement",
        "professional development",
        "new skills"
      ]
    },
    {
      "CATEGORY": "EMPLOYMENT",
      "SUBCATEGORY": "Find a job",
      "SYNONYM": [
        "job search",
        "employment",
        "seeking work",
        "new position",
        "opportunity"
      ]
    },
    {
      "CATEGORY": "EMPLOYMENT",
      "SUBCATEGORY": "Maintain the Job",
      "SYNONYM": [
        "keep a job",
        "job security",
        "stay employed",
        "job retention",
        "avoid layoff"
      ]
    },
    {
      "CATEGORY": "EMPLOYMENT",
      "SUBCATEGORY": "New Job (do well)",
      "SYNONYM": [
        "succeed at work",
        "excel at new job",
        "perform well",
        "start a new role",
        "make a good impression"
      ]
    },
    {
      "CATEGORY": "FINANCES",
      "SUBCATEGORY": "Improve finances",
      "SYNONYM": [
        "financial stability",
        "prosperity",
        "budgeting",
        "wealth",
        "stewardship"
      ]
    },
    {
      "CATEGORY": "FINANCES",
      "SUBCATEGORY": "Obtain a loan",
      "SYNONYM": [
        "get credit",
        "borrow money",
        "secure financing",
        "loan approval",
        "funding"
      ]
    },
    {
      "CATEGORY": "FINANCES",
      "SUBCATEGORY": "Reduce debt",
      "SYNONYM": [
        "pay off debt",
        "debt free",
        "financial freedom",
        "loan repayment",
        "clear debts"
      ]
    },
    {
      "CATEGORY": "FINANCES",
      "SUBCATEGORY": "Save money",
      "SYNONYM": [
        "build savings",
        "financial security",
        "investing",
        "putting money aside",
        "frugality"
      ]
    },
    {
      "CATEGORY": "HEALTH",
      "SUBCATEGORY": "Battle sickness",
      "SYNONYM": [
        "fight illness",
        "disease",
        "struggle with health",
        "infirmity",
        "ailment"
      ]
    },
    {
      "CATEGORY": "HEALTH",
      "SUBCATEGORY": "Ease pain",
      "SYNONYM": [
        "pain relief",
        "alleviate suffering",
        "healing",
        "lessen pain",
        "comfort"
      ]
    },
    {
      "CATEGORY": "HEALTH",
      "SUBCATEGORY": "Eat healthy",
      "SYNONYM": [
        "healthy diet",
        "nutrition",
        "wholesome food",
        "good eating habits",
        "clean eating"
      ]
    },
    {
      "CATEGORY": "HEALTH",
      "SUBCATEGORY": "Exercise regularly",
      "SYNONYM": [
        "stay active",
        "workout routine",
        "fitness",
        "physical activity",
        "stay fit"
      ]
    },
    {
      "CATEGORY": "HEALTH",
      "SUBCATEGORY": "Delivery (Baby)",
      "SYNONYM": [
        "childbirth",
        "labor",
        "birth",
        "safe delivery",
        "new baby"
      ]
    },
    {
      "CATEGORY": "HEALTH",
      "SUBCATEGORY": "Get well",
      "SYNONYM": [
        "healing",
        "recovery",
        "restore health",
        "be restored",
        "recuperate"
      ]
    },
    {
      "CATEGORY": "HEALTH",
      "SUBCATEGORY": "Lose weight",
      "SYNONYM": [
        "shed pounds",
        "weight loss",
        "slimming down",
        "dieting",
        "get in shape"
      ]
    },
    {
      "CATEGORY": "HEALTH",
      "SUBCATEGORY": "Pregnancy",
      "SYNONYM": [
        "expecting a baby",
        "maternity",
        "conception",
        "safe pregnancy",
        "carrying a child"
      ]
    },
    {
      "CATEGORY": "HEALTH",
      "SUBCATEGORY": "Surgery",
      "SYNONYM": [
        "operation",
        "medical procedure",
        "surgical operation",
        "safe procedure",
        "pre-op"
      ]
    },
    {
      "CATEGORY": "IMPROVEMENTS",
      "SUBCATEGORY": "Appreciation",
      "SYNONYM": [
        "gratitude",
        "thankfulness",
        "being grateful",
        "recognize blessings",
        "show thanks"
      ]
    },
    {
      "CATEGORY": "IMPROVEMENTS",
      "SUBCATEGORY": "Attitude",
      "SYNONYM": [
        "mindset",
        "outlook",
        "perspective",
        "disposition",
        "positivity"
      ]
    },
    {
      "CATEGORY": "IMPROVEMENTS",
      "SUBCATEGORY": "Fellowship",
      "SYNONYM": [
        "community",
        "connection",
        "communion",
        "spiritual bond",
        "gathering"
      ]
    },
    {
      "CATEGORY": "IMPROVEMENTS",
      "SUBCATEGORY": "Focus and vision",
      "SYNONYM": [
        "clarity",
        "purpose",
        "direction",
        "goals",
        "concentration"
      ]
    },
    {
      "CATEGORY": "IMPROVEMENTS",
      "SUBCATEGORY": "Knowledge and understanding",
      "SYNONYM": [
        "wisdom",
        "insight",
        "awareness",
        "spiritual growth",
        "comprehension"
      ]
    },
    {
      "CATEGORY": "IMPROVEMENTS",
      "SUBCATEGORY": "Maturity",
      "SYNONYM": [
        "growth",
        "responsibility",
        "adulthood",
        "wisdom",
        "emotional maturity"
      ]
    },
    {
      "CATEGORY": "IMPROVEMENTS",
      "SUBCATEGORY": "Organization",
      "SYNONYM": [
        "order",
        "tidiness",
        "structure",
        "systematization",
        "planning"
      ]
    },
    {
      "CATEGORY": "IMPROVEMENTS",
      "SUBCATEGORY": "Patience",
      "SYNONYM": [
        "endurance",
        "forbearance",
        "tolerance",
        "calmness",
        "perseverance"
      ]
    },
    {
      "CATEGORY": "IMPROVEMENTS",
      "SUBCATEGORY": "Life (Quality)",
      "SYNONYM": [
        "well-being",
        "happiness",
        "fulfillment",
        "joy",
        "good life"
      ]
    },
    {
      "CATEGORY": "IMPROVEMENTS",
      "SUBCATEGORY": "Relationships",
      "SYNONYM": [
        "friendships",
        "family bonds",
        "connections",
        "social ties",
        "fellowship"
      ]
    },
    {
      "CATEGORY": "LOVE",
      "SUBCATEGORY": "Abstinence",
      "SYNONYM": [
        "celibacy",
        "chastity",
        "sexual purity",
        "waiting to marry",
        "no sex"
      ]
    },
    {
      "CATEGORY": "LOVE",
      "SUBCATEGORY": "Great Relationship",
      "SYNONYM": [
        "healthy relationship",
        "strong bond",
        "loving connection",
        "blessed relationship",
        "flourishing"
      ]
    },
    {
      "CATEGORY": "LOVE",
      "SUBCATEGORY": "God-first Marriage",
      "SYNONYM": [
        "spiritual marriage",
        "Christian marriage",
        "blessed union",
        "sacred bond",
        "holy matrimony"
      ]
    },
    {
      "CATEGORY": "LOVE",
      "SUBCATEGORY": "Infatuation Phase",
      "SYNONYM": [
        "crush",
        "puppy love",
        "lust",
        "obsession",
        "honeymoon phase"
      ]
    },
    {
      "CATEGORY": "LOVE",
      "SUBCATEGORY": "Faithfulness",
      "SYNONYM": [
        "loyalty",
        "fidelity",
        "devotion",
        "trustworthiness",
        "steadfastness"
      ]
    },
    {
      "CATEGORY": "LOVE",
      "SUBCATEGORY": "Protected Sex",
      "SYNONYM": [
        "safe sex",
        "birth control",
        "sexual health",
        "condom use",
        "prevent std"
      ]
    },
    {
      "CATEGORY": "LOVE",
      "SUBCATEGORY": "Mend Broken Heart",
      "SYNONYM": [
        "healing from heartbreak",
        "getting over someone",
        "recovery from loss",
        "emotional healing",
        "repair heart"
      ]
    },
    {
      "CATEGORY": "LOVE",
      "SUBCATEGORY": "Amicable Divorce",
      "SYNONYM": [
        "peaceful separation",
        "friendly divorce",
        "co-parenting",
        "respectful split",
        "mutual divorce"
      ]
    },
    {
      "CATEGORY": "PEOPLE GROUPS",
      "SUBCATEGORY": "Christians",
      "SYNONYM": [
        "believers",
        "disciples",
        "followers of Christ",
        "saints",
        "the church"
      ]
    },
    {
      "CATEGORY": "PEOPLE GROUPS",
      "SUBCATEGORY": "Enemies",
      "SYNONYM": [
        "adversaries",
        "opponents",
        "foes",
        "haters",
        "those who wish ill"
      ]
    },
    {
      "CATEGORY": "PEOPLE GROUPS",
      "SUBCATEGORY": "Non-believers",
      "SYNONYM": [
        "atheists",
        "unbelievers",
        "agnostics",
        "heathens",
        "the lost"
      ]
    },
    {
      "CATEGORY": "PEOPLE GROUPS",
      "SUBCATEGORY": "The government",
      "SYNONYM": [
        "leaders",
        "rulers",
        "authorities",
        "politicians",
        "government officials"
      ]
    },
    {
      "CATEGORY": "PEOPLE GROUPS",
      "SUBCATEGORY": "The homeless",
      "SYNONYM": [
        "destitute",
        "houseless",
        "vagrants",
        "rough sleepers",
        "street people"
      ]
    },
    {
      "CATEGORY": "PEOPLE GROUPS",
      "SUBCATEGORY": "The military",
      "SYNONYM": [
        "armed forces",
        "soldiers",
        "service members",
        "troops",
        "veterans"
      ]
    },
    {
      "CATEGORY": "PEOPLE GROUPS",
      "SUBCATEGORY": "The nation",
      "SYNONYM": [
        "country",
        "homeland",
        "citizens",
        "our people",
        "society"
      ]
    },
    {
      "CATEGORY": "PEOPLE GROUPS",
      "SUBCATEGORY": "Those in mourning",
      "SYNONYM": [
        "grieving",
        "bereaved",
        "suffering loss",
        "comfort the sad",
        "mourners"
      ]
    },
    {
      "CATEGORY": "PROTECTION",
      "SUBCATEGORY": "Family",
      "SYNONYM": [
        "household",
        "loved ones",
        "relatives",
        "kin",
        "nuclear family"
      ]
    },
    {
      "CATEGORY": "PROTECTION",
      "SUBCATEGORY": "Friends",
      "SYNONYM": [
        "companions",
        "buddies",
        "pals",
        "mates",
        "comrades"
      ]
    },
    {
      "CATEGORY": "PROTECTION",
      "SUBCATEGORY": "Loved ones",
      "SYNONYM": [
        "dear ones",
        "sweethearts",
        "family",
        "friends",
        "close relations"
      ]
    },
    {
      "CATEGORY": "PROTECTION",
      "SUBCATEGORY": "Home",
      "SYNONYM": [
        "house",
        "dwelling",
        "residence",
        "abode",
        "shelter"
      ]
    },
    {
      "CATEGORY": "PROTECTION",
      "SUBCATEGORY": "Property",
      "SYNONYM": [
        "assets",
        "belongings",
        "estate",
        "real estate",
        "land"
      ]
    },
    {
      "CATEGORY": "PROTECTION",
      "SUBCATEGORY": "Possesions",
      "SYNONYM": [
        "belongings",
        "valuables",
        "goods",
        "personal items",
        "property"
      ]
    },
    {
      "CATEGORY": "PROTECTION",
      "SUBCATEGORY": "Safe Travels",
      "SYNONYM": [
        "journey mercies",
        "safe journey",
        "trip safety",
        "travel protection",
        "blessed travel"
      ]
    },
    {
      "CATEGORY": "SPIRITUALITY",
      "SUBCATEGORY": "Believe in God",
      "SYNONYM": [
        "faith in God",
        "trust in the Lord",
        "know God",
        "have faith",
        "conversion"
      ]
    },
    {
      "CATEGORY": "SPIRITUALITY",
      "SUBCATEGORY": "Study the Bible",
      "SYNONYM": [
        "read scripture",
        "learn the word",
        "biblical knowledge",
        "devotions",
        "scripture study"
      ]
    },
    {
      "CATEGORY": "SPIRITUALITY",
      "SUBCATEGORY": "Expect Favor",
      "SYNONYM": [
        "divine favor",
        "blessings",
        "grace",
        "good fortune",
        "divine preference"
      ]
    },
    {
      "CATEGORY": "SPIRITUALITY",
      "SUBCATEGORY": "Faith",
      "SYNONYM": [
        "trust",
        "belief",
        "reliance on God",
        "confidence",
        "conviction"
      ]
    },
    {
      "CATEGORY": "SPIRITUALITY",
      "SUBCATEGORY": "Forgiveness",
      "SYNONYM": [
        "pardon",
        "mercy",
        "grace",
        "letting go",
        "reconciliation"
      ]
    },
    {
      "CATEGORY": "SPIRITUALITY",
      "SUBCATEGORY": "Grace and Mercy",
      "SYNONYM": [
        "divine favor",
        "unmerited favor",
        "compassion",
        "pardon",
        "kindness"
      ]
    },
    {
      "CATEGORY": "SPIRITUALITY",
      "SUBCATEGORY": "Humility",
      "SYNONYM": [
        "meekness",
        "modesty",
        "lowliness",
        "submissiveness",
        "unpretentious"
      ]
    },
    {
      "CATEGORY": "SPIRITUALITY",
      "SUBCATEGORY": "Know Your Purpose",
      "SYNONYM": [
        "life's purpose",
        "calling",
        "divine plan",
        "destiny",
        "mission"
      ]
    },
    {
      "CATEGORY": "SPIRITUALITY",
      "SUBCATEGORY": "Prayer Life",
      "SYNONYM": [
        "communion with God",
        "conversations with God",
        "praying regularly",
        "talking to God",
        "prayer habit"
      ]
    },
    {
      "CATEGORY": "SPIRITUALITY",
      "SUBCATEGORY": "Repent daily",
      "SYNONYM": [
        "confess sins",
        "turn from sin",
        "seek forgiveness",
        "daily repentance",
        "change of heart"
      ]
    },
    {
      "CATEGORY": "SPIRITUALITY",
      "SUBCATEGORY": "Seek Purity",
      "SYNONYM": [
        "holiness",
        "clean heart",
        "chastity",
        "sanctification",
        "innocence"
      ]
    },
    {
      "CATEGORY": "SPIRITUALITY",
      "SUBCATEGORY": "Seek Serenity",
      "SYNONYM": [
        "peace of mind",
        "calmness",
        "tranquility",
        "inner peace",
        "peacefulness"
      ]
    },
    {
      "CATEGORY": "SPIRITUALITY",
      "SUBCATEGORY": "Share Salvation",
      "SYNONYM": [
        "evangelize",
        "witness",
        "spread the gospel",
        "tell others",
        "ministry"
      ]
    },
    {
      "CATEGORY": "LOSS & SORROW",
      "SUBCATEGORY": "Death",
      "SYNONYM": [
        "passing",
        "demise",
        "dying",
        "loss",
        "bereavement",
        "fatality"
      ]
    }
  ];

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const results = [];
    comprehensiveData.forEach(item => {
      // Check if search query matches subcategory
      if (item.SUBCATEGORY.toLowerCase().includes(searchQuery.toLowerCase())) {
        results.push({
          category: item.CATEGORY,
          subcategory: item.SUBCATEGORY,
          matchType: 'subcategory'
        });
      }
      
      // Check if search query matches any synonym
      item.SYNONYM.forEach(synonym => {
        if (synonym.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push({
            category: item.CATEGORY,
            subcategory: item.SUBCATEGORY,
            matchType: 'synonym',
            matchedSynonym: synonym
          });
        }
      });
    });

    setSearchResults(results);
    setShowDropdown(results.length > 0);
  }, [searchQuery]);

  const handleAddTopic = (result) => {
    // Assign appropriate icon based on category
    const getIconForCategory = (category) => {
      switch (category) {
        case 'ADDICTIONS':
          return '🚫';
        case 'BLESSINGS':
          return '🙏';
        case 'EDUCATION':
          return '📚';
        case 'ELIMINATIONS':
          return '🧹';
        case 'EMPLOYMENT':
          return '💼';
        case 'FINANCES':
          return '💰';
        case 'HEALTH':
          return '🏥';
        case 'IMPROVEMENTS':
          return '⭐';
        case 'LOVE':
          return '❤️';
        case 'PEOPLE GROUPS':
          return '👥';
        case 'PROTECTION':
          return '🛡️';
        case 'SPIRITUALITY':
          return '✝️';
        case 'LOSS & SORROW':
          return '😢';
        default:
          return '📋';
      }
    };

    const newTopic = {
      id: Date.now(),
      category: result.category,
      subcategory: result.subcategory,
      icon: getIconForCategory(result.category)
    };
    
    setMyTopics(prev => [...prev, newTopic]);
    setSearchQuery('');
    setShowDropdown(false);
  };

  const removeTopic = (topicId) => {
    setMyTopics(prev => prev.filter(topic => topic.id !== topicId));
  };

  const renderFavoritesTab = () => (
    <div className="page-content">
      <div className="grid-container grid-3">
        <div className="card">
          <div className="section-header">
            <h3>Favorite Songs</h3>
            <button className="icon-button">⋮</button>
          </div>
          <div className="song-list">
            <div className="song-item">
              <div className="song-avatar">👤</div>
              <div className="song-info">
                <div className="song-title">Victory</div>
                <div className="song-artist">Yolanda Adams</div>
              </div>
              <button className="play-button">▶️</button>
            </div>
            <div className="song-item">
              <div className="song-avatar">👤</div>
              <div className="song-info">
                <div className="song-title">Victory</div>
                <div className="song-artist">Yolanda Adams</div>
              </div>
              <button className="play-button">▶️</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <h3>Favorite Bible Verses</h3>
            <button className="icon-button">⋮</button>
          </div>
          <div className="verse-list">
            <div className="verse-item">
              <div className="verse-icon">📖</div>
              <div className="verse-text">Romans 8:28</div>
              <button className="more-button">⋮</button>
            </div>
            <div className="verse-item">
              <div className="verse-icon">📖</div>
              <div className="verse-text">Romans 8:28</div>
              <button className="more-button">⋮</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <h3>Favorite Pastors</h3>
            <button className="icon-button">⋮</button>
          </div>
          <div className="pastor-list">
            <div className="pastor-item">
              <div className="pastor-avatar">👨‍🦳</div>
              <div className="pastor-info">
                <div className="pastor-name">Bishop John</div>
                <div className="pastor-church">Potters House</div>
              </div>
              <button className="more-button">⋮</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTopicsTab = () => (
    <div className="page-content">
      {/* Upper Pane - MY TOPICS */}
      <div className="topics-upper-pane">
        <h2 className="section-title">MY TOPICS</h2>
        <div className="my-topics-grid">
          {myTopics.map((topic) => (
            <div key={topic.id} className="my-topic-item">
              <div className="topic-icon">{topic.icon}</div>
              <div className="topic-info">
                <div className="topic-name">{topic.category}</div>
                <div className="topic-subtitle">{topic.subcategory}</div>
              </div>
              <button 
                className="remove-topic-button"
                onClick={() => removeTopic(topic.id)}
                title="Remove Topic"
              >
                ✕
              </button>
            </div>
          ))}
          {myTopics.length === 0 && (
            <div className="no-topics-message">
              <p>No topics added yet. Use the form below to add your first topic.</p>
            </div>
          )}
        </div>
      </div>

      {/* Lower Pane - ADD TOPIC */}
      <div className="topics-lower-pane">
        <h3 className="section-title">ADD TOPIC</h3>
        <div className="add-topic-form">
          <div className="search-container">
            <input
              type="text"
              className="topic-search-input"
              placeholder="Type to search (e.g., 'overspe' for overspending)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {/* Dropdown Results */}
            {showDropdown && (
              <div className="search-dropdown">
                {searchResults.map((result, index) => (
                  <div 
                    key={index} 
                    className="dropdown-item"
                    onClick={() => handleAddTopic(result)}
                  >
                    <div className="dropdown-category">{result.category}</div>
                    <div className="dropdown-subcategory">
                      → {result.subcategory}
                      {result.matchType === 'synonym' && (
                        <span className="synonym-match"> (via "{result.matchedSynonym}")</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button 
            className="add-topic-button"
            disabled={searchQuery.trim() === ''}
            onClick={() => {
              if (searchResults.length > 0) {
                handleAddTopic(searchResults[0]);
              }
            }}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );

  const renderPrayerRequestsTab = () => (
    <div className="page-content">
      <div className="feed-list">
        {prayerRequests.length === 0 ? (
          <div className="no-requests-message">
            <p>No prayer requests yet. Be the first to add one!</p>
          </div>
        ) : (
          prayerRequests.map((request, index) => (
            <div key={request.id || index} className="post-card card">
              <div className="post-header">
                <div className="user-info">
                  <div className="user-avatar">🙏</div>
                  <div className="user-details">
                    <div className="user-name">
                      {request.isAnonymous ? 'Anonymous' : 'Prayer Warrior'}
                    </div>
                    <div className="post-time">
                      {new Date(request.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="post-type">
                  {request.urgency === 'urgent' ? '🚨' : 
                   request.urgency === 'critical' ? '⚠️' : '🙏'}
                </div>
              </div>
              <div className="post-content">
                <div className="prayer-topic">
                  <strong>Topic:</strong> {request.topic}
                </div>
                <p>{request.description}</p>
                {request.urgency !== 'normal' && (
                  <div className={`urgency-badge ${request.urgency}`}>
                    {request.urgency.toUpperCase()}
                  </div>
                )}
              </div>
              <div className="post-actions">
                <div className="action-item">
                  <span className="action-icon">❤️</span>
                  <span className="action-count">0</span>
                </div>
                <div className="action-item">
                  <span className="action-icon">💬</span>
                  <span className="action-count">0</span>
                </div>
                <div className="action-item">
                  <span className="action-icon">📤</span>
                  <span className="action-count">0</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Tab Navigation */}
      <div className="tab-bar">
        <button
          className={`tab ${activeTab === 'prayer-requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('prayer-requests')}
        >
          Prayer Request
        </button>
        <button
          className={`tab ${activeTab === 'topics' ? 'active' : ''}`}
          onClick={() => setActiveTab('topics')}
        >
          Topics
        </button>
        <button
          className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites
        </button>
      </div>

      {/* Main Content */}
      {activeTab === 'favorites' && renderFavoritesTab()}
      {activeTab === 'topics' && renderTopicsTab()}
      {activeTab === 'prayer-requests' && renderPrayerRequestsTab()}
    </>
  );
};

export default HomePage;
