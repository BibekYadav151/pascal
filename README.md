# Pascal Institute - Student Visa Consultancy Website

A comprehensive student visa consultancy website with React frontend and Express.js backend. The platform helps students achieve their dreams of studying abroad through expert guidance, test preparation, and international education consulting.

## Project Structure

```
pascal/
├── frontend/          # React application with Tailwind CSS
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Footer)
│   │   ├── pages/         # Public pages (Home, About, Classes, Courses, Contact)
│   │   ├── admin/         # Admin panel pages
│   │   ├── context/       # React Context for state management
│   │   ├── data/          # Initial data (classes, programs, universities)
│   │   └── utils/         # Utility functions
└── backend/           # Express.js API server
```

## Features

### User-Facing Pages

- **Home**: Hero section, services highlights, popular classes preview, why choose us section, partner universities
- **About Us**: Who we are, mission, vision, what we do, core values
- **Classes**: Available classes with time slots, Apply Now modal with inquiry form
- **Courses/Programs**: Searchable and filterable program listings from partner universities
- **Contact**: Contact form with message submission

### Admin Panel

- **Dashboard**: Overview with stats and recent inquiries/messages
- **Class Management**: Add, edit, delete classes with time slots
- **Class Inquiries**: Manage student class applications, export to CSV
- **Programs Management**: Full CRUD for university programs
- **Program Inquiries**: Manage program applications, export to CSV
- **Institute Classes**: Manage detailed class descriptions
- **University Management**: Manage partner universities
- **Contact Messages**: View and manage messages from contact form

## UI/Design

- **Primary Colors**: Blue (#0B5ED7) for headings, Orange (#F97316) for CTAs
- **Style**: White background, rounded cards, soft shadows, smooth hover effects
- **Responsive**: Mobile-first design with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Getting Started

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm start
   ```

The React app will be available at `http://localhost:3002`

### Backend Setup (Optional - for future API integration)

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` (if provided)

4. Start development server:
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

## Admin Login

**Demo Credentials:**
- Email: `admin@pascal.edu.np`
- Password: `admin123`

## API Endpoints (Future)

- `GET /health` - Health check endpoint
- `GET /api` - API information
- Future endpoints for classes, programs, inquiries, etc.

## Technologies Used

### Frontend
- React 19
- React Router DOM 6
- Tailwind CSS 3
- Create React App
- React Context API

### Backend
- Express.js 5
- CORS
- Express Validator
- dotenv

## Data Storage

Currently uses `localStorage` for data persistence. Future versions will integrate with a backend database for:
- Classes and programs
- Student inquiries
- Contact messages
- Admin authentication

## Development

Both frontend and backend are set up with hot reloading for development. Make sure to run both servers simultaneously for full functionality.

## Features in Detail

### Classes Page
- Grid layout showing available classes with time slots
- "Apply Now" button opens a modal with pre-filled class information
- Inquiry form with Gmail validation
- Institute classes section with detailed course information

### Courses/Programs Page
- Search by program name or university
- Filter by country, university, duration, IELTS requirement, language test, study level
- Expandable program cards with detailed information
- "Apply Inquiry" modal for program applications

### Admin Dashboard
- Real-time statistics (total inquiries, applications, active classes/programs)
- Recent inquiries overview
- Quick action buttons
- Sidebar navigation

## Future Enhancements

- Backend API integration
- Database (MongoDB/PostgreSQL)
- User authentication system
- File uploads for documents
- Email notifications
- Advanced analytics dashboard
- Payment integration

## License

ISC
