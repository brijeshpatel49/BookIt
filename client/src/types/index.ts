// TypeScript interfaces for BookIt application

export interface Slot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  totalSpots: number;
  bookedSpots: number;
  availableSpots: number;
  isSoldOut: boolean;
}

export interface Experience {
  _id: string;
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
  slots: Slot[];
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  _id: string;
  confirmationNumber: string;
  experienceId: string;
  slotId: string;
  userName: string;
  userEmail: string;
  originalPrice: number;
  discount: number;
  finalPrice: number;
  promoCode?: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface PromoCode {
  _id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  isActive: boolean;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
}

// Request types
export interface CreateBookingRequest {
  experienceId: string;
  slotId: string;
  userName: string;
  userEmail: string;
  promoCode?: string;
}

export interface ValidatePromoRequest {
  code: string;
  originalPrice: number;
}

export interface PromoValidationResponse {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  discountAmount: number;
}

export interface BookingResponse {
  confirmationNumber: string;
  booking: Booking;
}

export interface BookingFormData {
  name: string;
  email: string;
  promoCode?: string;
}
