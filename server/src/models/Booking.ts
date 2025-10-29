import mongoose, { Schema, Document } from 'mongoose';

// Booking interface
export interface IBooking extends Document {
  confirmationNumber: string;
  experienceId: mongoose.Types.ObjectId;
  slotId: mongoose.Types.ObjectId;
  userName: string;
  userEmail: string;
  originalPrice: number;
  discount: number;
  finalPrice: number;
  promoCode?: string;
  status: 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Function to generate unique confirmation number
function generateConfirmationNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `BK-${timestamp}-${random}`;
}

// Booking schema
const BookingSchema = new Schema<IBooking>(
  {
    confirmationNumber: {
      type: String,
      required: true,
      unique: true,
      default: generateConfirmationNumber
    },
    experienceId: {
      type: Schema.Types.ObjectId,
      ref: 'Experience',
      required: [true, 'Experience ID is required']
    },
    slotId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Slot ID is required']
    },
    userName: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    userEmail: {
      type: String,
      required: [true, 'User email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function(v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please provide a valid email address'
      }
    },
    originalPrice: {
      type: Number,
      required: [true, 'Original price is required'],
      min: [0, 'Original price cannot be negative']
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative']
    },
    finalPrice: {
      type: Number,
      required: [true, 'Final price is required'],
      min: [0, 'Final price cannot be negative']
    },
    promoCode: {
      type: String,
      trim: true,
      uppercase: true
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed'
    }
  },
  {
    timestamps: true
  }
);

// Add indexes for frequently queried fields (confirmationNumber already has unique index)
BookingSchema.index({ userEmail: 1 });
BookingSchema.index({ experienceId: 1 });
BookingSchema.index({ createdAt: -1 });

export default mongoose.model<IBooking>('Booking', BookingSchema);
