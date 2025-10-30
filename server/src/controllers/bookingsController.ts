import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Booking from '../models/Booking';
import Experience from '../models/Experience';
import PromoCode from '../models/PromoCode';

/**
 * Get user bookings by email
 * GET /api/bookings?email=user@example.com
 */
export const getUserBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.query;

    // Validate email parameter
    if (!email || typeof email !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Email parameter is required'
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
      return;
    }

    // Find all bookings for this email
    const bookings = await Booking.find({ 
      userEmail: email.trim().toLowerCase() 
    }).sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({
      success: true,
      data: bookings,
      message: `Found ${bookings.length} booking(s)`
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
};

/**
 * Create a new booking
 * POST /api/bookings
 */
export const createBooking = async (req: Request, res: Response): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { experienceId, slotId, userName, userEmail, promoCode } = req.body;

    // Validate required fields
    if (!experienceId || !slotId || !userName || !userEmail) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields: experienceId, slotId, userName, and userEmail are required'
      });
      await session.abortTransaction();
      return;
    }

    // Validate MongoDB ObjectId formats
    if (!mongoose.Types.ObjectId.isValid(experienceId)) {
      res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
      await session.abortTransaction();
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(slotId)) {
      res.status(404).json({
        success: false,
        message: 'Slot not found'
      });
      await session.abortTransaction();
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
      await session.abortTransaction();
      return;
    }

    // Validate name is not empty
    if (!userName.trim()) {
      res.status(400).json({
        success: false,
        message: 'User name cannot be empty'
      });
      await session.abortTransaction();
      return;
    }

    // Find the experience
    const experience = await Experience.findById(experienceId).session(session);
    
    if (!experience) {
      res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
      await session.abortTransaction();
      return;
    }

    // Find the specific slot
    const slot = experience.slots.find(s => s._id.toString() === slotId);
    
    if (!slot) {
      res.status(404).json({
        success: false,
        message: 'Slot not found'
      });
      await session.abortTransaction();
      return;
    }

    // Check slot availability
    const availableSpots = slot.totalSpots - slot.bookedSpots;
    if (availableSpots <= 0) {
      res.status(400).json({
        success: false,
        message: 'Selected slot is no longer available'
      });
      await session.abortTransaction();
      return;
    }

    // Calculate pricing
    let originalPrice = experience.price;
    let discount = 0;
    let appliedPromoCode = '';

    // Apply promo code if provided
    if (promoCode && promoCode.trim()) {
      const promo = await PromoCode.findOne({ 
        code: promoCode.trim().toUpperCase() 
      }).session(session);

      if (promo && promo.isValid()) {
        discount = promo.calculateDiscount(originalPrice);
        appliedPromoCode = promo.code;
      }
    }

    const finalPrice = Math.max(0, originalPrice - discount);

    // Atomically increment bookedSpots to prevent double-booking
    const updateResult = await Experience.findOneAndUpdate(
      {
        _id: experienceId,
        'slots._id': slotId,
        'slots.bookedSpots': { $lt: slot.totalSpots } // Ensure still available
      },
      {
        $inc: { 'slots.$.bookedSpots': 1 }
      },
      {
        new: true,
        session
      }
    );

    if (!updateResult) {
      res.status(400).json({
        success: false,
        message: 'Selected slot is no longer available'
      });
      await session.abortTransaction();
      return;
    }

    // Create the booking
    const booking = new Booking({
      experienceId,
      slotId,
      userName: userName.trim(),
      userEmail: userEmail.trim().toLowerCase(),
      originalPrice,
      discount,
      finalPrice,
      promoCode: appliedPromoCode || undefined,
      status: 'confirmed'
    });

    await booking.save({ session });

    // Commit the transaction
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      data: {
        confirmationNumber: booking.confirmationNumber,
        booking: {
          _id: booking._id,
          confirmationNumber: booking.confirmationNumber,
          experienceId: booking.experienceId,
          slotId: booking.slotId,
          userName: booking.userName,
          userEmail: booking.userEmail,
          originalPrice: booking.originalPrice,
          discount: booking.discount,
          finalPrice: booking.finalPrice,
          promoCode: booking.promoCode,
          status: booking.status,
          createdAt: booking.createdAt
        }
      },
      message: 'Booking created successfully'
    });

  } catch (error) {
    await session.abortTransaction();
    
    // Handle validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: error.message
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create booking'
    });
  } finally {
    session.endSession();
  }
};

/**
 * Cancel a booking
 * PATCH /api/bookings/:id/cancel
 */
export const cancelBooking = async (req: Request, res: Response): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    // Validate booking ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
      await session.abortTransaction();
      return;
    }

    // Find the booking
    const booking = await Booking.findById(id).session(session);
    
    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
      await session.abortTransaction();
      return;
    }

    // Check if already cancelled
    if (booking.status === 'cancelled') {
      res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
      await session.abortTransaction();
      return;
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save({ session });

    // Decrement the booked spots for the slot
    await Experience.findOneAndUpdate(
      {
        _id: booking.experienceId,
        'slots._id': booking.slotId
      },
      {
        $inc: { 'slots.$.bookedSpots': -1 }
      },
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();

    res.status(200).json({
      success: true,
      data: booking,
      message: 'Booking cancelled successfully'
    });

  } catch (error) {
    await session.abortTransaction();
    
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking'
    });
  } finally {
    session.endSession();
  }
};
