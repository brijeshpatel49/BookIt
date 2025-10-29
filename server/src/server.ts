import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import experiencesRouter from './routes/experiences';
import promoRouter from './routes/promo';
import bookingsRouter from './routes/bookings';
import authRouter from './routes/auth';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    success: true, 
    message: 'BookIt API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/experiences', experiencesRouter);
app.use('/api/promo', promoRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/auth', authRouter);

app.get('/api', (req: Request, res: Response) => {
  res.json({ 
    success: true, 
    message: 'BookIt API v1.0',
    endpoints: {
      experiences: '/api/experiences',
      bookings: '/api/bookings',
      promo: '/api/promo',
      auth: '/api/auth'
    }
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
