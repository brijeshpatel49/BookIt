# BookIt Backend API

Express.js backend API for the BookIt booking system.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` with your MongoDB connection string

3. Start development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `CORS_ORIGIN` - Allowed CORS origin (default: http://localhost:3000)
- `NODE_ENV` - Environment (development/production)

## API Endpoints

- `GET /health` - Health check
- `GET /api` - API information
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience by ID
- `POST /api/bookings` - Create booking
- `POST /api/promo/validate` - Validate promo code
