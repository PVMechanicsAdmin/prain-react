import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 90px 20px 80px 80px;
  min-height: 100vh;
  background: #f5f8fa;
  display: flex;
  gap: 20px;
  
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 90px 15px 80px 15px;
    gap: 15px;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
  
  @media (max-width: 767px) {
    flex: none;
    width: 100%;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 20px;
  
  @media (max-width: 767px) {
    flex: none;
    width: 100%;
    padding: 15px;
  }
`;

const FilterBar = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e1e8ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 15px;
  }
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  background: white;
  font-size: 14px;
  min-width: 120px;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  background: white;
  font-size: 14px;
  flex: 1;
  max-width: 300px;
  
  &::placeholder {
    color: #657786;
  }
  
  @media (max-width: 767px) {
    max-width: none;
  }
`;

const CardsContainer = styled.div`
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  padding: 20px;
  
  @media (max-width: 767px) {
    max-height: 300px;
    padding: 15px;
  }
`;

const InspirationCard = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  
  &:hover {
    background: #f7f9fa;
  }
  
  ${props => props.selected && `
    background: #fff3cd;
    border-color: #ffc107;
    box-shadow: 0 2px 8px rgba(255, 193, 7, 0.3);
  `}
`;

const CardPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const CardInfo = styled.div`
  flex: 1;
`;

const CardName = styled.h3`
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #14171a;
`;

const CardType = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

const ProfilePreview = styled.div`
  text-align: center;
`;

const PreviewTitle = styled.h2`
  color: #14171a;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: left;
`;

const LargePhoto = styled.img`
  width: 100%;
  max-width: 300px;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
  
  @media (max-width: 767px) {
    max-width: 100%;
    height: 250px;
  }
`;

const ProfileDetails = styled.div`
  text-align: left;
  margin-bottom: 25px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #657786;
`;

const DetailValue = styled.span`
  color: #14171a;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  
  @media (max-width: 767px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const FollowButton = styled(Button)`
  background: #1da1f2;
  color: white;
  
  &:hover {
    background: #1991db;
  }
`;

const VisitPageButton = styled(Button)`
  background: #17bf63;
  color: white;
  
  &:hover {
    background: #15a052;
  }
`;

const NoSelection = styled.div`
  text-align: center;
  color: #657786;
  padding: 40px 20px;
`;

// Mock data for inspiration profiles using actual images
const mockInspirations = [
  {
    id: 1,
    name: "Elena Rodriguez",
    type: "Actor",
    photo: "/images/people/user1.jpg",
    details: {
      hometown: "BARCELONA",
      country: "SPAIN",
      age: "29 years",
      zodiac: "Libra",
      mbti: "ENFJ",
      height: "168cm"
    }
  },
  {
    id: 2,
    name: "Marcus Chen",
    type: "Artist",
    photo: "/images/people/user2.jpg",
    details: {
      hometown: "SINGAPORE",
      country: "SINGAPORE",
      age: "34 years",
      zodiac: "Taurus",
      mbti: "INFJ",
      height: "175cm"
    }
  },
  {
    id: 3,
    name: "Sophia Williams",
    type: "Author",
    photo: "/images/people/user3.jpg",
    details: {
      hometown: "MELBOURNE",
      country: "AUSTRALIA",
      age: "26 years",
      zodiac: "Cancer",
      mbti: "ENFP",
      height: "165cm"
    }
  },
  {
    id: 4,
    name: "Ahmed Hassan",
    type: "Blogger",
    photo: "/images/people/user4.jpg",
    details: {
      hometown: "CAIRO",
      country: "EGYPT",
      age: "31 years",
      zodiac: "Scorpio",
      mbti: "INTJ",
      height: "180cm"
    }
  },
  {
    id: 5,
    name: "Isabella Santos",
    type: "Celebrity",
    photo: "/images/people/user5.jpg",
    details: {
      hometown: "RIO DE JANEIRO",
      country: "BRAZIL",
      age: "28 years",
      zodiac: "Leo",
      mbti: "ESFP",
      height: "170cm"
    }
  },
  {
    id: 6,
    name: "Lucas Anderson",
    type: "Comedian",
    photo: "/images/people/user6.jpg",
    details: {
      hometown: "STOCKHOLM",
      country: "SWEDEN",
      age: "33 years",
      zodiac: "Capricorn",
      mbti: "ISTJ",
      height: "182cm"
    }
  },
  {
    id: 7,
    name: "Aisha Patel",
    type: "Musician",
    photo: "/images/people/user7.jpg",
    details: {
      hometown: "MUMBAI",
      country: "INDIA",
      age: "27 years",
      zodiac: "Virgo",
      mbti: "ISFJ",
      height: "163cm"
    }
  },
  {
    id: 8,
    name: "Gabriel Martinez",
    type: "Pastor",
    photo: "/images/people/user8.jpg",
    details: {
      hometown: "MEXICO CITY",
      country: "MEXICO",
      age: "35 years",
      zodiac: "Aquarius",
      mbti: "ENTP",
      height: "178cm"
    }
  },
  {
    id: 9,
    name: "Emma Thompson",
    type: "Preacher",
    photo: "/images/people/user9.jpg",
    details: {
      hometown: "LONDON",
      country: "UK",
      age: "30 years",
      zodiac: "Gemini",
      mbti: "ENFP",
      height: "167cm"
    }
  },
  {
    id: 10,
    name: "Kenji Tanaka",
    type: "Singer",
    photo: "/images/people/user10.jpg",
    details: {
      hometown: "TOKYO",
      country: "JAPAN",
      age: "32 years",
      zodiac: "Sagittarius",
      mbti: "INFJ",
      height: "173cm"
    }
  },
  {
    id: 11,
    name: "Natalia Ivanova",
    type: "Speaker",
    photo: "/images/people/user11.jpg",
    details: {
      hometown: "MOSCOW",
      country: "RUSSIA",
      age: "25 years",
      zodiac: "Pisces",
      mbti: "ISFP",
      height: "169cm"
    }
  },
  {
    id: 12,
    name: "David O'Connor",
    type: "Actor",
    photo: "/images/people/user12.jpg",
    details: {
      hometown: "DUBLIN",
      country: "IRELAND",
      age: "36 years",
      zodiac: "Aries",
      mbti: "ENTJ",
      height: "185cm"
    }
  },
  {
    id: 13,
    name: "Zara Al-Zahra",
    type: "Artist",
    photo: "/images/people/user13.jpg",
    details: {
      hometown: "DUBAI",
      country: "UAE",
      age: "24 years",
      zodiac: "Taurus",
      mbti: "ESFJ",
      height: "166cm"
    }
  },
  {
    id: 14,
    name: "Alexander Schmidt",
    type: "Author",
    photo: "/images/people/user14.jpg",
    details: {
      hometown: "BERLIN",
      country: "GERMANY",
      age: "37 years",
      zodiac: "Capricorn",
      mbti: "ISTP",
      height: "179cm"
    }
  },
  {
    id: 15,
    name: "Maria Garcia",
    type: "Blogger",
    photo: "/images/people/user15.jpg",
    details: {
      hometown: "MADRID",
      country: "SPAIN",
      age: "23 years",
      zodiac: "Sagittarius",
      mbti: "ENFP",
      height: "162cm"
    }
  },
  {
    id: 16,
    name: "James Wilson",
    type: "Celebrity",
    photo: "/images/people/user16.jpg",
    details: {
      hometown: "NEW YORK",
      country: "USA",
      age: "29 years",
      zodiac: "Libra",
      mbti: "ESFJ",
      height: "183cm"
    }
  },
  {
    id: 17,
    name: "Yuki Nakamura",
    type: "Comedian",
    photo: "/images/people/user17.jpg",
    details: {
      hometown: "OSAKA",
      country: "JAPAN",
      age: "31 years",
      zodiac: "Cancer",
      mbti: "ENTP",
      height: "170cm"
    }
  },
  {
    id: 18,
    name: "Sarah Johnson",
    type: "Musician",
    photo: "/images/people/user18.jpg",
    details: {
      hometown: "TORONTO",
      country: "CANADA",
      age: "26 years",
      zodiac: "Virgo",
      mbti: "ISFP",
      height: "165cm"
    }
  },
  {
    id: 19,
    name: "Carlos Rodriguez",
    type: "Pastor",
    photo: "/images/people/user19.jpg",
    details: {
      hometown: "BUENOS AIRES",
      country: "ARGENTINA",
      age: "38 years",
      zodiac: "Pisces",
      mbti: "INFJ",
      height: "177cm"
    }
  },
  {
    id: 20,
    name: "Lisa Chen",
    type: "Preacher",
    photo: "/images/people/user20.jpg",
    details: {
      hometown: "VANCOUVER",
      country: "CANADA",
      age: "33 years",
      zodiac: "Aries",
      mbti: "ENTJ",
      height: "168cm"
    }
  }
];

const inspirationTypes = ["All", "Actor", "Artist", "Author", "Blogger", "Celebrity", "Comedian", "Musician", "Pastor", "Preacher", "Singer", "Speaker"];

const InspirationsPage = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [filteredInspirations, setFilteredInspirations] = useState(mockInspirations);
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let filtered = mockInspirations;
    
    // Filter by type
    if (selectedType !== "All") {
      filtered = filtered.filter(insp => insp.type === selectedType);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(insp => 
        insp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        insp.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredInspirations(filtered);
  }, [selectedType, searchQuery]);

  const handleCardClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleFollow = () => {
    if (selectedProfile) {
      alert(`Following ${selectedProfile.name}`);
    }
  };

  const handleVisitPage = () => {
    if (selectedProfile) {
      alert(`Visiting ${selectedProfile.name}'s page`);
    }
  };

  return (
    <PageContainer>
      <LeftPanel>
        <FilterBar>
          <FilterSelect 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {inspirationTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </FilterSelect>
          <SearchInput
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </FilterBar>
        
        <CardsContainer>
          {filteredInspirations.map(inspiration => (
            <InspirationCard
              key={inspiration.id}
              selected={selectedProfile?.id === inspiration.id}
              onClick={() => handleCardClick(inspiration)}
            >
              <CardPhoto 
                src={inspiration.photo} 
                alt={inspiration.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/50x50/cccccc/666666?text=" + inspiration.name.charAt(0);
                }}
              />
              <CardInfo>
                <CardName>{inspiration.name}</CardName>
                <CardType>{inspiration.type}</CardType>
              </CardInfo>
            </InspirationCard>
          ))}
          
          {filteredInspirations.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#657786' }}>
              No inspirations found matching your criteria.
            </div>
          )}
        </CardsContainer>
      </LeftPanel>

      <RightPanel>
        {selectedProfile ? (
          <ProfilePreview>
            <PreviewTitle>Profile Preview</PreviewTitle>
            <LargePhoto 
              src={selectedProfile.photo} 
              alt={selectedProfile.name}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x400/cccccc/666666?text=" + selectedProfile.name.charAt(0);
              }}
            />
            
            <ProfileDetails>
              <DetailRow>
                <DetailLabel>Name:</DetailLabel>
                <DetailValue>{selectedProfile.name}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Type:</DetailLabel>
                <DetailValue>{selectedProfile.type}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Hometown:</DetailLabel>
                <DetailValue>{selectedProfile.details.hometown}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Country:</DetailLabel>
                <DetailValue>{selectedProfile.details.country}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Age:</DetailLabel>
                <DetailValue>{selectedProfile.details.age}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Zodiac:</DetailLabel>
                <DetailValue>{selectedProfile.details.zodiac}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>MBTI:</DetailLabel>
                <DetailValue>{selectedProfile.details.mbti}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Height:</DetailLabel>
                <DetailValue>{selectedProfile.details.height}</DetailValue>
              </DetailRow>
            </ProfileDetails>
            
            <ActionButtons>
              <FollowButton onClick={handleFollow}>
                Follow
              </FollowButton>
              <VisitPageButton onClick={handleVisitPage}>
                Visit Page
              </VisitPageButton>
            </ActionButtons>
          </ProfilePreview>
        ) : (
          <NoSelection>
            <h3>Select an inspiration</h3>
            <p>Click on any card from the left panel to view the profile preview</p>
          </NoSelection>
        )}
      </RightPanel>
    </PageContainer>
  );
};

export default InspirationsPage;



