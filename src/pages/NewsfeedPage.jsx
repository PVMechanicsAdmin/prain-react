import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 90px 20px 80px 80px;
  min-height: 100vh;
  background: #f5f8fa;
`;

const PageTitle = styled.h1`
  color: #14171a;
  font-size: 32px;
  margin-bottom: 20px;
`;

const ComingSoon = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const NewsfeedPage = () => {
  return (
    <PageContainer>
      <PageTitle>Newsfeed</PageTitle>
      <ComingSoon>
        <h2>Coming Soon!</h2>
        <p>This page will contain the newsfeed functionality with posts, comments, and social interactions.</p>
        <p>It will be developed in Phase 2 of the conversion process.</p>
      </ComingSoon>
    </PageContainer>
  );
};

export default NewsfeedPage;

