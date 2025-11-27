# SubmittalBook

SubmittalBook enables trade contractors on construction sites to quickly find approved submittals for products. Without needing to understand Construction CSI specification formatting, project buyout details, or subcontractor information, users can simply ask questions like "What toilet are we installing in this bathroom?" and instantly see the approved submittal.

## Features

- **Natural Language Search**: Search for products using everyday terms
- **Approved Submittals Only**: Shows only approved submittals, so you know what to install
- **Comprehensive Product Information**: View manufacturer, model number, CSI section, approval date, and location
- **Mobile-Friendly**: Responsive design works on any device

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
# Install dependencies
npm install

# Start both server and client in development mode
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- API: http://localhost:3001

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
npm start
```

## API Endpoints

- `GET /api/submittals/search?q=<query>` - Search for submittals
- `GET /api/submittals/:id` - Get a specific submittal by ID
- `GET /api/submittals` - List all approved submittals
- `GET /api/health` - Health check endpoint

## Project Structure

```
├── client/           # React frontend
│   ├── src/
│   │   ├── App.jsx           # Main application component
│   │   ├── useSubmittalSearch.js  # Search hook
│   │   └── index.css         # Styles
│   └── public/
├── server/           # Express backend
│   └── src/
│       ├── index.js          # API server
│       ├── submittalService.js  # Search logic
│       └── data.js           # Sample submittal data
└── package.json      # Root workspace config
```

## Usage Examples

Search for products using terms like:
- "toilet" - Find water closet submittals
- "light" - Find lighting fixtures
- "ceiling tile" - Find acoustical ceiling submittals
- "paint" - Find interior paint submittals
- "door hardware" - Find lockset submittals

## License

MIT