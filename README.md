# Pascal - React + Express.js Project

A full-stack web application with React frontend and Express.js backend.

## Project Structure

```
pascal/
├── frontend/          # React application with Tailwind CSS
└── backend/           # Express.js API server
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Getting Started

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The React app will be available at `http://localhost:3002`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` (if provided)

4. Start the development server:
   ```bash
   npm run dev
   ```

The Express API will be available at `http://localhost:5000`

## Available Scripts

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Backend
- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server
- `npm test` - Run tests

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api` - API information

## Technologies Used

### Frontend
- React 19
- Tailwind CSS 4
- Create React App

### Backend
- Express.js 5
- CORS
- Express Validator
- dotenv

## Development

Both frontend and backend are set up with hot reloading for development. Make sure to run both servers simultaneously for full functionality.

## License

ISC