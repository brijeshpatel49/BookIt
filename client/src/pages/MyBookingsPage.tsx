import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { getUserBookings, getExperienceById, cancelBooking } from '../lib/api';
import type { Booking } from '../types';

interface BookingWithDetails extends Booking {
  experienceTitle?: string;
  experienceImage?: string;
  location?: string;
  slotDate?: string;
  slotTime?: string;
}

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'cancelled'>('all');
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Fetch bookings from server
    async function fetchBookings() {
      try {
        setLoading(true);
        setError(null);
        
        // Get user email from localStorage
        const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
        
        const bookingsData = await getUserBookings(userEmail);
        
        // Fetch experience details for each booking
        const bookingsWithDetails = await Promise.all(
          bookingsData.map(async (booking) => {
            try {
              const experience = await getExperienceById(booking.experienceId);
              const slot = experience.slots.find(s => s._id === booking.slotId);
              
              return {
                ...booking,
                experienceTitle: experience.title,
                experienceImage: experience.image,
                location: experience.location,
                slotDate: slot?.date,
                slotTime: `${slot?.startTime} - ${slot?.endTime}`,
              };
            } catch (err) {
              // If experience fetch fails, return booking without details
              return booking;
            }
          })
        );
        
        setBookings(bookingsWithDetails);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load bookings. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [navigate]);

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setCancellingId(bookingId);
    try {
      await cancelBooking(bookingId);
      
      // Update local state
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === bookingId
            ? { ...booking, status: 'cancelled' as const }
            : booking
        )
      );
      
      toast.success('Booking cancelled successfully!');
    } catch (err) {
      toast.error('Failed to cancel booking. Please try again.');
      console.error('Cancel booking error:', err);
    } finally {
      setCancellingId(null);
    }
  };

  const handleViewDetails = (booking: BookingWithDetails) => {
    if (booking.experienceId) {
      navigate(`/experiences/${booking.experienceId}`);
    } else {
      toast.error('Experience details not available');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage and view all your travel experiences</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Bookings
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'confirmed'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'cancelled'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Cancelled
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
              <svg
                className="w-12 h-12 text-red-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-lg font-semibold text-red-900 mb-2">
                Oops! Something went wrong
              </h2>
              <p className="text-red-700">{error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-semibold"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Bookings List */}
        {!loading && !error && filteredBookings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h2>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? "You haven't made any bookings yet" 
                : `No ${filter} bookings`}
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-semibold"
            >
              Explore Experiences
            </button>
          </div>
        )}

        {!loading && !error && filteredBookings.length > 0 && (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-48 h-48 md:h-auto relative bg-gray-200">
                    {booking.experienceImage ? (
                      <img
                        src={booking.experienceImage}
                        alt={booking.experienceTitle || 'Experience'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {booking.experienceTitle || 'Experience'}
                        </h3>
                        <p className="text-gray-600 text-sm flex items-center mb-1">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {booking.location || 'Location not available'}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Confirmation: {booking.confirmationNumber}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Date</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {booking.slotDate ? new Date(booking.slotDate).toLocaleDateString('en-IN') : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Time</p>
                        <p className="text-sm font-semibold text-gray-900">{booking.slotTime || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Original Price</p>
                        <p className="text-sm font-semibold text-gray-900">₹{booking.originalPrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Final Price</p>
                        <p className="text-sm font-semibold text-green-600">₹{booking.finalPrice}</p>
                      </div>
                    </div>

                    {booking.discount > 0 && (
                      <div className="mb-4 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                          <span className="font-semibold">Discount Applied:</span> ₹{booking.discount}
                          {booking.promoCode && <span className="ml-2">({booking.promoCode})</span>}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => handleViewDetails(booking)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        View Details
                      </button>
                      {booking.status === 'confirmed' && (
                        <button 
                          onClick={() => handleCancelBooking(booking._id)}
                          disabled={cancellingId === booking._id}
                          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {cancellingId === booking._id ? 'Cancelling...' : 'Cancel Booking'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
