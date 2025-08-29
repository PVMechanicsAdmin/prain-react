# PRAIN Developer Notes

## Project Overview
- **PRAIN Network**: Christian social networking and prayer app
- **Frontend**: React with styled-components, responsive design
- **Backend**: Planned Supabase integration (PostgreSQL + real-time)
- **Design**: Mobile-first, modern UI with prayer-focused features

## Current Development Status

### ✅ Completed Pages
- **HomePage** - Prayer requests, user topics, dashboard
- **InspirationsPage** - Filter system, inspiration profiles, mobile responsive
- **ConnectionsPage** - Social networking, friend requests, organizations
- **PrayerListPage** - Prayer request browsing
- **NewPrayerPage** - Prayer creation form
- **GroupsPage** - Community groups
- **ProfilePage** - User profiles
- **ResourcesPage** - Resource library

### 🔄 In Progress
- **Routing**: All pages properly connected in App.js
- **Responsive Design**: Mobile-first approach implemented
- **Mock Data**: Comprehensive sample data for testing

### �� Remaining Pages to Build
- **EventsPage** - Community events, calendar, RSVPs
- **MessagesPage** - Chat interface, notifications
- **BlogArticlesPage** - Content management system
- **Bible Study Page** - Bible resources and tools
- **Worship Songs Page** - Music library
- **Sermons Page** - Sermon archives
- **Books Page** - Christian literature

## Data Models Identified

### Core Entities
- **Users**: Profiles, relationships, preferences, topics
- **Prayers**: Requests, answers, categories, status
- **Connections**: Friends, family, organizations, acquaintance status
- **Inspirations**: Content, types (Actor, Artist, Author, etc.), authors
- **Events**: Calendar, RSVPs, locations, categories
- **Messages**: Chat threads, notifications, real-time updates
- **Resources**: Bible study, songs, sermons, books, categories

### Relationship Types
- **Friends**: Mutual connections, mutual friends count
- **Family**: Relationships (sister, cousin, aunt, etc.)
- **Organizations**: Churches, member counts, founding dates
- **Acquaintances**: Potential connections, friend-of-friend

## Technical Implementation

### Frontend Architecture
- **React 18** with functional components and hooks
- **Styled-components** for CSS-in-JS styling
- **React Router v6** for navigation
- **Responsive design** with mobile-first approach
- **Component structure**: Layout, Pages, Components

### Current Styling
- **Design System**: `src/styles/design-system.css`
- **CSS Variables**: Colors, typography, spacing, shadows
- **Responsive Breakpoints**: Mobile (≤767px), Tablet (768-1023px), Desktop (≥1024px)

## Supabase Integration Plan

### Phase 1: Database Schema Design
- Design tables based on completed mockups
- Plan relationships and foreign keys
- Design authentication schema

### Phase 2: Backend Implementation
- **Authentication**: Supabase Auth with user management
- **Database**: PostgreSQL tables for all entities
- **Real-time**: Live updates for prayers, messages, events
- **Storage**: File uploads for images, documents

### Phase 3: Frontend Integration
- Replace mock data with API calls
- Implement real-time subscriptions
- Add authentication flows
- Error handling and loading states

## Development Notes

### Responsive Design Implementation
- Mobile: Stacked layout (left panel above right panel)
- Tablet: Side-by-side with adjusted spacing
- Desktop: Full side-by-side layout
- All pages tested for mobile usability

### Mock Data Strategy
- **User Images**: `/images/people/user1.jpg` through `user20.jpg`
- **Organization Images**: `/images/orgs/org1.jpg`
- **Sample Data**: 20+ profiles with realistic information
- **Geographic Diversity**: Multiple countries and cultures

### Component Patterns
- **Filter + Search**: Dropdown + text input combination
- **Card Lists**: Scrollable containers with selection
- **Profile Previews**: Right panel with detailed information
- **Action Buttons**: Context-aware buttons based on status

## Next Steps Priority

1. **Complete remaining pages** (Events, Messages, Blog, Resources)
2. **Finalize data models** based on all page requirements
3. **Design Supabase schema** with proper relationships
4. **Implement authentication** system
5. **Replace mock data** with real database calls
6. **Add real-time features** for live updates

## File 

prain-react/
├── DEVELOPER_NOTES.md ← This file
├── README.md
├── package.json
├── src/
│ ├── components/ ← Reusable UI components
│ ├── pages/ ← Main page components
│ ├── styles/ ← CSS and design system
│ └── App.js ← Main app with routing
└── public/
├── images/ ← User and org images
└── index.

## Notes
- All pages follow consistent design patterns
- Mobile responsiveness is priority
- Mock data provides realistic testing scenarios
- Ready for Supabase integration once pages are complete
--- ===============================================================
SUPABASE
https://supabase.com/dashboard/project/mhosdetydtaykozpvfvh

URL: https://mhosdetydtaykozpvfvh.supabase.co

API Key: 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ob3NkZXR5ZHRheWtvenB2ZnZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxOTkzMzQsImV4cCI6MjA3MTc3NTMzNH0.UAcH2rgBQMAOKjWNrSwWB-kFK0nMqbERrwhJlBCJ590

Sample JS Code:

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mhosdetydtaykozpvfvh.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
---
*Last Updated: [Current Date]*
*Developer: [Brent]*

##############################################################

UNSPLASH ACCOUNT
App ID:  797053

Access Key:  MTWqthWWjaFnqjcnkrSgjfcPXs28F4D1U_m1uQMYDvo
Secret Key:  VUGEbEEu7lksFgIAvVssrphBUnnHizsLxyU0FPuIrM8


#################################################################
Demo - selected randomly
BIBLE VERSES IMAGES
D:\PRAINETWORK\COMPLETE_C-DRIVE_PRAINETWORK\PRAIN-BIBLE-VERSES\QUOTES_DONE