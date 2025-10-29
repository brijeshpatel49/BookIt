import { Router } from 'express';
import { createBooking, getUserBookings, cancelBooking } from '../controllers/bookingsController';

const router = Router();

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking
 * @access  Public
 */
router.post('/', createBooking);

/**
 * @route   GET /api/bookings
 * @desc    Get bookings by user email
 * @access  Public
 */
router.get('/', getUserBookings);

/**
 * @route   PATCH /api/bookings/:id/cancel
 * @desc    Cancel a booking
 * @access  Public
 */
router.patch('/:id/cancel', cancelBooking);

export default router;
