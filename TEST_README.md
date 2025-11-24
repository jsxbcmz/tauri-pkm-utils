# Test Suite Documentation

## Overview
Comprehensive unit tests for the Tauri PKM Utils application covering all modified files.

## Installation
```bash
npm install --save-dev vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/coverage-v8
```

## Running Tests
```bash
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:ui          # UI mode
npm run test:coverage    # Coverage report
```

## Test Files Created
- vitest.config.js - Test configuration
- src/test/setup.js - Global setup
- src/test/testUtils.jsx - Utilities
- src/utils/__tests__/fs.test.js - File system tests
- src/__tests__/App.test.jsx - App component tests
- src/pages/mapEvent/__tests__/Modal.test.jsx - Modal tests

## Coverage Areas
### fs.js
- ✅ Reading JSON with caching
- ✅ Writing JSON with cache updates
- ✅ Cache management
- ✅ Error handling
- ✅ Concurrent operations
- ✅ Edge cases

### App.jsx
- ✅ Component rendering
- ✅ Navigation menu
- ✅ Route configuration
- ✅ Layout structure

### MapEvent Components
- ✅ Modal form validation
- ✅ Event management
- ✅ User interactions

## Next Steps
1. Install dependencies (see Installation above)
2. Add scripts to package.json:
   ```json
   "scripts": {
     "test": "vitest",
     "test:watch": "vitest --watch",
     "test:ui": "vitest --ui",
     "test:coverage": "vitest --coverage"
   }
   ```
3. Run tests: `npm test`

## Best Practices
- Each test is isolated and independent
- External dependencies are properly mocked
- Tests cover happy paths, edge cases, and errors
- Descriptive test names and clear assertions