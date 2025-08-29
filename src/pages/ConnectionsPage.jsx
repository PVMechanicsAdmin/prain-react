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

const ConnectionCard = styled.div`
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

const ConnectionStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-end;
`;

const StatusBadge = styled.span`
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  
  ${props => {
    switch (props.status) {
      case 'friend':
        return 'background: #e8f5e8; color: #2e7d32;';
      case 'family':
        return 'background: #fff3e0; color: #f57c00;';
      case 'organization':
        return 'background: #f3e5f5; color: #7b1fa2;';
      case 'acquaintance':
        return 'background: #e0f2f1; color: #00695c;';
      default:
        return 'background: #f5f5f5; color: #666;';
    }
  }}
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

const ConnectButton = styled(Button)`
  background: #1da1f2;
  color: white;
  
  &:hover {
    background: #1991db;
  }
`;

const AcceptButton = styled(Button)`
  background: #17bf63;
  color: white;
  
  &:hover {
    background: #15a052;
  }
`;

const DeclineButton = styled(Button)`
  background: #e74c3c;
  color: white;
  
  &:hover {
    background: #c0392b;
  }
`;

const VisitPageButton = styled(Button)`
  background: #9b59b6;
  color: white;
  
  &:hover {
    background: #8e44ad;
  }
`;

const NoSelection = styled.div`
  text-align: center;
  color: #657786;
  padding: 40px 20px;
`;

// Mock data for connections
const mockConnections = [
  {
    id: 1,
    name: "Elena Rodriguez",
    type: "Friends",
    status: "friend",
    photo: "/images/people/user1.jpg",
    details: {
      hometown: "BARCELONA",
      country: "SPAIN",
      age: "29 years",
      zodiac: "Libra",
      mbti: "ENFJ",
      mutualFriends: 12
    }
  },
  {
    id: 2,
    name: "Marcus Chen",
    type: "Family",
    status: "family",
    photo: "/images/people/user2.jpg",
    details: {
      hometown: "SINGAPORE",
      country: "SINGAPORE",
      age: "34 years",
      zodiac: "Taurus",
      mbti: "INFJ",
      relationship: "Cousin"
    }
  },
  {
    id: 3,
    name: "Grace Community Church",
    type: "Organization",
    status: "organization",
    photo: "/images/orgs/org1.jpg",
    details: {
      hometown: "MELBOURNE",
      country: "AUSTRALIA",
      type: "Church",
      members: "450+",
      founded: "2010"
    }
  },
  {
    id: 4,
    name: "Ahmed Hassan",
    type: "Acquaintance",
    status: "acquaintance",
    photo: "/images/people/user4.jpg",
    details: {
      hometown: "CAIRO",
      country: "EGYPT",
      age: "31 years",
      zodiac: "Scorpio",
      mbti: "INTJ",
      mutualFriends: 3
    }
  },
  {
    id: 5,
    name: "Isabella Santos",
    type: "Friends",
    status: "friend",
    photo: "/images/people/user5.jpg",
    details: {
      hometown: "RIO DE JANEIRO",
      country: "BRAZIL",
      age: "28 years",
      zodiac: "Leo",
      mbti: "ESFP",
      mutualFriends: 8
    }
  },
  {
    id: 6,
    name: "Lucas Anderson",
    type: "Acquaintance",
    status: "acquaintance",
    photo: "/images/people/user6.jpg",
    details: {
      hometown: "STOCKHOLM",
      country: "SWEDEN",
      age: "33 years",
      zodiac: "Capricorn",
      mbti: "ISTJ",
      mutualFriends: 5
    }
  },
  {
    id: 7,
    name: "Aisha Patel",
    type: "Family",
    status: "family",
    photo: "/images/people/user7.jpg",
    details: {
      hometown: "MUMBAI",
      country: "INDIA",
      age: "27 years",
      zodiac: "Virgo",
      mbti: "ISFJ",
      relationship: "Sister"
    }
  },
  {
    id: 8,
    name: "New Life Fellowship",
    type: "Organization",
    status: "organization",
    photo: "/images/orgs/org1.jpg",
    details: {
      hometown: "MEXICO CITY",
      country: "MEXICO",
      type: "Church",
      members: "320+",
      founded: "2015"
    }
  },
  {
    id: 9,
    name: "Emma Thompson",
    type: "Friends",
    status: "friend",
    photo: "/images/people/user9.jpg",
    details: {
      hometown: "LONDON",
      country: "UK",
      age: "30 years",
      zodiac: "Gemini",
      mbti: "ENFP",
      mutualFriends: 15
    }
  },
  {
    id: 10,
    name: "Kenji Tanaka",
    type: "Acquaintance",
    status: "acquaintance",
    photo: "/images/people/user10.jpg",
    details: {
      hometown: "TOKYO",
      country: "JAPAN",
      age: "32 years",
      zodiac: "Sagittarius",
      mbti: "INFJ",
      mutualFriends: 2
    }
  },
  {
    id: 11,
    name: "Natalia Ivanova",
    type: "Family",
    status: "family",
    photo: "/images/people/user11.jpg",
    details: {
      hometown: "MOSCOW",
      country: "RUSSIA",
      age: "25 years",
      zodiac: "Pisces",
      mbti: "ISFP",
      relationship: "Aunt"
    }
  },
  {
    id: 12,
    name: "David O'Connor",
    type: "Friends",
    status: "friend",
    photo: "/images/people/user12.jpg",
    details: {
      hometown: "DUBLIN",
      country: "IRELAND",
      age: "36 years",
      zodiac: "Aries",
      mbti: "ENTJ",
      mutualFriends: 7
    }
  },
  {
    id: 13,
    name: "Zara Al-Zahra",
    type: "Acquaintance",
    status: "acquaintance",
    photo: "/images/people/user13.jpg",
    details: {
      hometown: "DUBAI",
      country: "UAE",
      age: "24 years",
      zodiac: "Taurus",
      mbti: "ESFJ",
      mutualFriends: 4
    }
  },
  {
    id: 14,
    name: "Alexander Schmidt",
    type: "Friends",
    status: "friend",
    photo: "/images/people/user14.jpg",
    details: {
      hometown: "BERLIN",
      country: "GERMANY",
      age: "37 years",
      zodiac: "Capricorn",
      mbti: "ISTP",
      mutualFriends: 11
    }
  },
  {
    id: 15,
    name: "Maria Garcia",
    type: "Family",
    status: "family",
    photo: "/images/people/user15.jpg",
    details: {
      hometown: "MADRID",
      country: "SPAIN",
      age: "23 years",
      zodiac: "Sagittarius",
      mbti: "ENFP",
      relationship: "Cousin"
    }
  },
  {
    id: 16,
    name: "James Wilson",
    type: "Acquaintance",
    status: "acquaintance",
    photo: "/images/people/user16.jpg",
    details: {
      hometown: "NEW YORK",
      country: "USA",
      age: "29 years",
      zodiac: "Libra",
      mbti: "ESFJ",
      mutualFriends: 6
    }
  },
  {
    id: 17,
    name: "Yuki Nakamura",
    type: "Friends",
    status: "friend",
    photo: "/images/people/user17.jpg",
    details: {
      hometown: "OSAKA",
      country: "JAPAN",
      age: "31 years",
      zodiac: "Cancer",
      mbti: "ENTP",
      mutualFriends: 9
    }
  },
  {
    id: 18,
    name: "Sarah Johnson",
    type: "Family",
    status: "family",
    photo: "/images/people/user18.jpg",
    details: {
      hometown: "TORONTO",
      country: "CANADA",
      age: "26 years",
      zodiac: "Virgo",
      mbti: "ISFP",
      relationship: "Sister"
    }
  },
  {
    id: 19,
    name: "Carlos Rodriguez",
    type: "Friends",
    status: "friend",
    photo: "/images/people/user19.jpg",
    details: {
      hometown: "BUENOS AIRES",
      country: "ARGENTINA",
      age: "38 years",
      zodiac: "Pisces",
      mbti: "INFJ",
      mutualFriends: 13
    }
  },
  {
    id: 20,
    name: "Lisa Chen",
    type: "Acquaintance",
    status: "acquaintance",
    photo: "/images/people/user20.jpg",
    details: {
      hometown: "VANCOUVER",
      country: "CANADA",
      age: "33 years",
      zodiac: "Aries",
      mbti: "ENTJ",
      mutualFriends: 1
    }
  }
];

const connectionTypes = ["All", "Acquaintance", "Friends", "Family", "Organization", "People Only"];

const ConnectionsPage = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [filteredConnections, setFilteredConnections] = useState(mockConnections);
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let filtered = mockConnections;
    
    // Filter by type
    if (selectedType !== "All") {
      if (selectedType === "People Only") {
        filtered = filtered.filter(conn => conn.type !== "Organization");
      } else {
        filtered = filtered.filter(conn => conn.type === selectedType);
      }
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(conn => 
        conn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conn.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredConnections(filtered);
  }, [selectedType, searchQuery]);

  const handleCardClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleConnect = () => {
    if (selectedProfile) {
      alert(`Connection request sent to ${selectedProfile.name}`);
    }
  };

  const handleAccept = () => {
    if (selectedProfile) {
      alert(`Accepted connection request from ${selectedProfile.name}`);
    }
  };

  const handleDecline = () => {
    if (selectedProfile) {
      alert(`Declined connection request from ${selectedProfile.name}`);
    }
  };

  const handleVisitPage = () => {
    if (selectedProfile) {
      alert(`Visiting ${selectedProfile.name}'s page`);
    }
  };

  const getActionButtons = () => {
    if (!selectedProfile) return null;

    switch (selectedProfile.status) {
      case 'friend':
        return (
          <>
            <VisitPageButton onClick={handleVisitPage}>
              Visit Page
            </VisitPageButton>
          </>
        );
      case 'family':
        return (
          <>
            <VisitPageButton onClick={handleVisitPage}>
              Visit Page
            </VisitPageButton>
          </>
        );
      case 'organization':
        return (
          <>
            <VisitPageButton onClick={handleVisitPage}>
              Visit Organization
            </VisitPageButton>
          </>
        );
      case 'acquaintance':
        return (
          <>
            <ConnectButton onClick={handleConnect}>
              Connect
            </ConnectButton>
            <AcceptButton onClick={handleAccept}>
              Accept Request
            </AcceptButton>
            <DeclineButton onClick={handleDecline}>
              Decline
            </DeclineButton>
          </>
        );
      default:
        return (
          <ConnectButton onClick={handleConnect}>
            Connect
          </ConnectButton>
        );
    }
  };

  const getProfileDetails = () => {
    if (!selectedProfile) return null;

    const details = [];
    
    if (selectedProfile.type === "Organization") {
      details.push(
        { label: "Name", value: selectedProfile.name },
        { label: "Type", value: selectedProfile.type },
        { label: "Hometown", value: selectedProfile.details.hometown },
        { label: "Country", value: selectedProfile.details.country },
        { label: "Members", value: selectedProfile.details.members },
        { label: "Founded", value: selectedProfile.details.founded }
      );
    } else {
      details.push(
        { label: "Name", value: selectedProfile.name },
        { label: "Type", value: selectedProfile.type },
        { label: "Hometown", value: selectedProfile.details.hometown },
        { label: "Country", value: selectedProfile.details.country },
        { label: "Age", value: selectedProfile.details.age },
        { label: "Zodiac", value: selectedProfile.details.zodiac },
        { label: "MBTI", value: selectedProfile.details.mbti }
      );
      
      if (selectedProfile.details.relationship) {
        details.push({ label: "Relationship", value: selectedProfile.details.relationship });
      }
      if (selectedProfile.details.mutualFriends) {
        details.push({ label: "Mutual Friends", value: selectedProfile.details.mutualFriends });
      }
    }

    return details;
  };

  return (
    <PageContainer>
      <LeftPanel>
        <FilterBar>
          <FilterSelect 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {connectionTypes.map(type => (
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
          {filteredConnections.map(connection => (
            <ConnectionCard
              key={connection.id}
              selected={selectedProfile?.id === connection.id}
              onClick={() => handleCardClick(connection)}
            >
              <CardPhoto 
                src={connection.photo} 
                alt={connection.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/50x50/cccccc/666666?text=" + connection.name.charAt(0);
                }}
              />
              <CardInfo>
                <CardName>{connection.name}</CardName>
                <CardType>{connection.type}</CardType>
              </CardInfo>
              <ConnectionStatus>
                <StatusBadge status={connection.status}>
                  {connection.status}
                </StatusBadge>
              </ConnectionStatus>
            </ConnectionCard>
          ))}
          
          {filteredConnections.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#657786' }}>
              No connections found matching your criteria.
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
              {getProfileDetails().map((detail, index) => (
                <DetailRow key={index}>
                  <DetailLabel>{detail.label}:</DetailLabel>
                  <DetailValue>{detail.value}</DetailValue>
                </DetailRow>
              ))}
            </ProfileDetails>
            
            <ActionButtons>
              {getActionButtons()}
            </ActionButtons>
          </ProfilePreview>
        ) : (
          <NoSelection>
            <h3>Select a connection</h3>
            <p>Click on any card from the left panel to view the profile preview</p>
          </NoSelection>
        )}
      </RightPanel>
    </PageContainer>
  );
};

export default ConnectionsPage;
