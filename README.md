# Prince Kumar - Portfolio Website

A modern, responsive portfolio website built with React.js and Node.js/Express.js, showcasing Prince Kumar's technical skills, projects, and professional experience.

## Project Structure

```
portfolio/
├── frontend/          # React.js frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── data/         # Constants and data models
│   │   ├── services/     # API service functions
│   │   └── utils/        # Utility functions
│   └── package.json
├── backend/           # Node.js/Express.js backend API
│   ├── models/           # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── config/         # Configuration files
│   └── package.json
└── README.md
```

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Animations**: Smooth transitions with Framer Motion
- **Contact Form**: Database-integrated contact form with validation
- **Project Showcase**: Interactive project cards with filtering
- **Skills Display**: Categorized technical skills with visual indicators
- **Professional Timeline**: Experience and education sections

## Tech Stack

### Frontend
- React.js with functional components and hooks
- Tailwind CSS for styling
- Framer Motion for animations
- React Icons for iconography
- Vite for build tooling

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- Express-validator for input validation
- Helmet.js and CORS for security
- Rate limiting for API protection

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the values according to your setup

### Development

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/contact` - Submit contact form

## License

MIT License - see LICENSE file for details

## Author

Prince Kumar - Associate Software Developer
- Email: princesansaraj@gmail.com
- LinkedIn: [princekumar](https://linkedin.com/in/princekumar)
- GitHub: [prins-krai](https://github.com/prins-krai)