import mongoose, { Schema, Document } from 'mongoose';

// Slot interface
export interface ISlot {
  _id?: mongoose.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  totalSpots: number;
  bookedSpots: number;
}

// Slot schema with computed fields
const SlotSchema = new Schema<ISlot>({
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: 'Start time must be in HH:MM format'
    }
  },
  endTime: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: 'End time must be in HH:MM format'
    }
  },
  totalSpots: {
    type: Number,
    required: true,
    min: [1, 'Total spots must be at least 1']
  },
  bookedSpots: {
    type: Number,
    default: 0,
    min: [0, 'Booked spots cannot be negative']
  }
});

// Add computed fields to slot schema
SlotSchema.virtual('availableSpots').get(function() {
  return this.totalSpots - this.bookedSpots;
});

SlotSchema.virtual('isSoldOut').get(function() {
  return this.bookedSpots >= this.totalSpots;
});

// Ensure virtuals are included in JSON output
SlotSchema.set('toJSON', { virtuals: true });
SlotSchema.set('toObject', { virtuals: true });

// Experience interface
export interface IExperience extends Document {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  price: number;
  duration: string;
  location: string;
  category: string;
  highlights: string[];
  included: string[];
  slots: ISlot[];
  createdAt: Date;
  updatedAt: Date;
}

// Experience schema
const ExperienceSchema = new Schema<IExperience>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    longDescription: {
      type: String,
      required: [true, 'Long description is required'],
      trim: true
    },
    image: {
      type: String,
      required: [true, 'Image URL is required']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    duration: {
      type: String,
      required: [true, 'Duration is required']
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    highlights: {
      type: [String],
      default: []
    },
    included: {
      type: [String],
      default: []
    },
    slots: {
      type: [SlotSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

// Add indexes for frequently queried fields
ExperienceSchema.index({ category: 1 });
ExperienceSchema.index({ location: 1 });
ExperienceSchema.index({ price: 1 });

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
