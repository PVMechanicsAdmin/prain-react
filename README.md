# PRAIN Network - React Application

This is the React version of the PRAIN Network social platform, converted from the original HTML/CSS/JavaScript implementation.

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, main layout components
│   ├── sidebar/         # Left navigation sidebar
│   ├── posts/           # Post creation and display components
│   ├── user/            # User profile and management components
│   └── common/          # Shared components (search, notifications, etc.)
├── pages/               # Main page components
├── styles/              # CSS files (converted from original)
├── assets/              # JavaScript files and other assets
├── hooks/               # Custom React hooks
└── utils/               # Utility functions
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation
1. Navigate to the project directory:
   ```bash
   cd prain-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## Conversion Status

### Phase 1: Project Setup & Structure ✅
- [x] React project initialized
- [x] Project structure created
- [x] Basic layout components implemented
- [x] Routing configured
- [x] Assets migrated (images, CSS, JS)

### Phase 2: Component Breakdown (Next)
- [ ] Header/Navigation components
- [ ] Sidebar components
- [ ] Post system components
- [ ] User management components

### Phase 3: Asset Migration (In Progress)
- [x] Images copied
- [x] CSS files copied
- [x] JavaScript files copied

### Phase 4: Functionality Migration (Planned)
- [ ] Replace jQuery functionality
- [ ] Implement React state management
- [ ] Convert forms and interactions

## Features

- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Modern UI**: Clean, intuitive interface using styled-components
- **Routing**: Client-side routing with React Router
- **Component Architecture**: Modular, reusable components
- **Asset Integration**: Seamless integration with existing CSS and images

## Contributing

This project follows the incremental migration approach:
1. Maintain existing functionality while building React components
2. Test each component individually
3. Gradually replace HTML sections with React components
4. Ensure feature parity throughout the conversion process

## License

© PRAIN Network 2024. All rights reserved.
