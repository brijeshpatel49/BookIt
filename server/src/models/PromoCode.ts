import mongoose, { Schema, Document } from 'mongoose';

// PromoCode interface
export interface IPromoCode extends Document {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  isActive: boolean;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  isValid(): boolean;
  calculateDiscount(originalPrice: number): number;
}

// PromoCode schema
const PromoCodeSchema = new Schema<IPromoCode>(
  {
    code: {
      type: String,
      required: [true, 'Promo code is required'],
      unique: true,
      trim: true,
      uppercase: true,
      maxlength: [50, 'Promo code cannot exceed 50 characters']
    },
    discountType: {
      type: String,
      required: [true, 'Discount type is required'],
      enum: {
        values: ['percentage', 'fixed'],
        message: 'Discount type must be either percentage or fixed'
      }
    },
    discountValue: {
      type: Number,
      required: [true, 'Discount value is required'],
      min: [0, 'Discount value cannot be negative'],
      validate: {
        validator: function(this: IPromoCode, value: number) {
          if (this.discountType === 'percentage') {
            return value >= 0 && value <= 100;
          }
          return value >= 0;
        },
        message: 'Percentage discount must be between 0 and 100'
      }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    expiresAt: {
      type: Date,
      validate: {
        validator: function(v: Date) {
          return !v || v > new Date();
        },
        message: 'Expiration date must be in the future'
      }
    }
  },
  {
    timestamps: true
  }
);

// Add indexes for frequently queried fields (code already has unique index)
PromoCodeSchema.index({ isActive: 1 });
PromoCodeSchema.index({ expiresAt: 1 });

// Method to check if promo code is valid
PromoCodeSchema.methods.isValid = function(): boolean {
  if (!this.isActive) {
    return false;
  }
  if (this.expiresAt && this.expiresAt < new Date()) {
    return false;
  }
  return true;
};

// Method to calculate discount amount
PromoCodeSchema.methods.calculateDiscount = function(originalPrice: number): number {
  if (!this.isValid()) {
    return 0;
  }
  
  if (this.discountType === 'percentage') {
    return Math.round((originalPrice * this.discountValue / 100) * 100) / 100;
  } else {
    return Math.min(this.discountValue, originalPrice);
  }
};

export default mongoose.model<IPromoCode>('PromoCode', PromoCodeSchema);
