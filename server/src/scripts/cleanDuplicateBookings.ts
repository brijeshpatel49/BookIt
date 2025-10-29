import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import Booking from '../models/Booking';

// Load environment variables
dotenv.config();

/**
 * Script to clean up duplicate bookings
 * Keeps only the first booking for each user+experience+slot combination
 */
async function cleanDuplicateBookings() {
  try {
    console.log('🧹 Starting duplicate booking cleanup...');
    
    // Connect to database
    await connectDatabase();
    
    // Get all bookings
    const allBookings = await Booking.find().sort({ createdAt: 1 });
    console.log(`📊 Found ${allBookings.length} total bookings`);
    
    // Track unique combinations
    const seen = new Set<string>();
    const duplicates: string[] = [];
    
    for (const booking of allBookings) {
      const key = `${booking.userEmail}-${booking.experienceId}-${booking.slotId}`;
      
      if (seen.has(key)) {
        // This is a duplicate
        duplicates.push(booking._id as string);
      } else {
        seen.add(key);
      }
    }
    
    if (duplicates.length === 0) {
      console.log('✅ No duplicate bookings found!');
    } else {
      console.log(`🗑️  Found ${duplicates.length} duplicate bookings`);
      
      // Delete duplicates
      const result = await Booking.deleteMany({
        _id: { $in: duplicates }
      });
      
      console.log(`✅ Deleted ${result.deletedCount} duplicate bookings`);
    }
    
    // Show remaining bookings
    const remainingBookings = await Booking.find();
    console.log(`\n📊 Remaining bookings: ${remainingBookings.length}`);
    
    remainingBookings.forEach((booking, index) => {
      console.log(`  ${index + 1}. ${booking.userName} (${booking.userEmail}) - ${booking.confirmationNumber}`);
    });
    
    console.log('\n✨ Cleanup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Database connection closed');
  }
}

// Run the cleanup
cleanDuplicateBookings();
