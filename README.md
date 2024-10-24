# Pokémon Viewer

A modern web application that allows users to browse, search, and filter Pokémon using the PokéAPI. Built with vanilla JavaScript and Vite.

## Features

- Search Pokémon by name
- Filter Pokémon by:
  - Color
  - Gender
  - Type
- View detailed information for each Pokémon
- Fully responsive design
- Keyboard accessibility support

## Technologies Used

- **Vite** - Next Generation Frontend Tooling
- **Less** - CSS Preprocessor
- **Vitest** - Unit Testing Framework
- **PokéAPI** - RESTful Pokémon API
- **JSDOM** - JavaScript-based DOM implementation

## Project Structure

```
├── assets/
│   └── css/
│       ├── aside.less       # Sidebar styles
│       ├── pokemon.less     # Pokémon card styles
│       ├── responsive.less  # Responsive styles
│       ├── scaffolding.less # Base styles
│       └── styles.less      # Main styles entry
├── js/
│   ├── utilities/
│   │   └── debounce/      # Debounce utility
│   ├── api                # API calls
│   ├── constants          # Constants for the app
│   ├── ui                 # Ui files to manage interactions
│   └── main.js              # App entry point
├── index.html             # Main HTML file
├── vite.config.ts         # Vite configuration
└── vitest.config.js       # Vitest configuration
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the provided local server URL

## Development

The project uses a modular architecture with separate concerns:

- `api`       - Files that handle all API calls to PokéAPI
- `ui`        - Tiles that contain UI-related functions
- `state.js`  - Manages application state
- `main.js`   - Initializes the application and sets up event listeners

### State Management

The application uses a simple state management system stored in `state.js`. The state object contains:

- Current Pokémon list
- Filter settings
- Search term
- Pagination information

### Styling

Styles are organized using Less with separate files for different components:

- `styles.less`         - Main entry point and global variables
- `pokemon.less`        - Styles for Pokémon cards
- `aside.less`          - Styles for the filter sidebar
- `responsive.less`     - Styles to handle page resize behavior
- `scaffolding.less`    - Base styles and layout

## Testing

Tests are written using Vitest and can be run using:

```bash
npm run test
```

The project currently includes tests for utility functions like the debounce implementation.

## Browser Support

The application supports all modern browsers and includes fallbacks for:

- CSS Custom Properties
- CSS Grid
- Flexbox
