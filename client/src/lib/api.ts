// API client functions for BookIt application

import type {
  Experience,
  Booking,
  ApiResponse,
  ApiError,
  CreateBookingRequest,
  ValidatePromoRequest,
  PromoValidationResponse,
  BookingResponse,
} from '../types';

// Base API URL - can be configured via environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Custom error class for API errors
export class ApiRequestError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: ApiError
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

/**
 * Error handling wrapper for fetch requests
 * Provides type-safe response parsing and consistent error handling
 */
async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    // Parse JSON response
    const data = await response.json();

    // Handle non-2xx responses
    if (!response.ok) {
      const errorMessage = data.message || `HTTP error! status: ${response.status}`;
      throw new ApiRequestError(errorMessage, response.status, data);
    }

    return data;
  } catch (error) {
    // Handle network errors
    if (error instanceof ApiRequestError) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw new ApiRequestError('Unable to connect. Please check your internet connection.');
    }

    throw new ApiRequestError('An unexpected error occurred. Please try again.');
  }
}

/**
 * Fetch all available experiences
 * GET /api/experiences
 */
export async function getExperiences(): Promise<Experience[]> {
  const response = await fetchWithErrorHandling<ApiResponse<Experience[]>>(
    `${API_BASE_URL}/experiences`
  );
  return response.data;
}

/**
 * Fetch details for a specific experience including slots
 * GET /api/experiences/:id
 */
export async function getExperienceById(id: string): Promise<Experience> {
  const response = await fetchWithErrorHandling<ApiResponse<Experience>>(
    `${API_BASE_URL}/experiences/${id}`
  );
  return response.data;
}

/**
 * Create a new booking
 * POST /api/bookings
 */
export async function createBooking(
  bookingData: CreateBookingRequest
): Promise<BookingResponse> {
  const response = await fetchWithErrorHandling<ApiResponse<BookingResponse>>(
    `${API_BASE_URL}/bookings`,
    {
      method: 'POST',
      body: JSON.stringify(bookingData),
    }
  );
  return response.data;
}

/**
 * Validate a promo code and return discount information
 * POST /api/promo/validate
 */
export async function validatePromoCode(
  promoData: ValidatePromoRequest
): Promise<PromoValidationResponse> {
  const response = await fetchWithErrorHandling<ApiResponse<PromoValidationResponse>>(
    `${API_BASE_URL}/promo/validate`,
    {
      method: 'POST',
      body: JSON.stringify(promoData),
    }
  );
  return response.data;
}

/**
 * Register a new user
 * POST /api/auth/register
 */
export async function registerUser(userData: {
  name: string;
  email: string;
  password: string;
}): Promise<{ _id: string; name: string; email: string }> {
  const response = await fetchWithErrorHandling<ApiResponse<{ _id: string; name: string; email: string }>>(
    `${API_BASE_URL}/auth/register`,
    {
      method: 'POST',
      body: JSON.stringify(userData),
    }
  );
  return response.data;
}

/**
 * Login user
 * POST /api/auth/login
 */
export async function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<{ _id: string; name: string; email: string }> {
  const response = await fetchWithErrorHandling<ApiResponse<{ _id: string; name: string; email: string }>>(
    `${API_BASE_URL}/auth/login`,
    {
      method: 'POST',
      body: JSON.stringify(credentials),
    }
  );
  return response.data;
}

/**
 * Get user by email
 * GET /api/auth/user?email=user@example.com
 */
export async function getUserByEmail(email: string): Promise<{ _id: string; name: string; email: string }> {
  const response = await fetchWithErrorHandling<ApiResponse<{ _id: string; name: string; email: string }>>(
    `${API_BASE_URL}/auth/user?email=${encodeURIComponent(email)}`
  );
  return response.data;
}

/**
 * Get user bookings by email
 * GET /api/bookings?email=user@example.com
 */
export async function getUserBookings(email: string): Promise<Booking[]> {
  const response = await fetchWithErrorHandling<ApiResponse<Booking[]>>(
    `${API_BASE_URL}/bookings?email=${encodeURIComponent(email)}`
  );
  return response.data;
}

/**
 * Cancel a booking
 * PATCH /api/bookings/:id/cancel
 */
export async function cancelBooking(bookingId: string): Promise<Booking> {
  const response = await fetchWithErrorHandling<ApiResponse<Booking>>(
    `${API_BASE_URL}/bookings/${bookingId}/cancel`,
    {
      method: 'PATCH',
    }
  );
  return response.data;
}
