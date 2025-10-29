import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExperienceById } from '../lib/api';
import type { Experience } from '../types';
import SlotSelector from '../components/SlotSelector';
import LoadingSpinner from '../components/LoadingSpinner';
import Navbar from '../components/Navbar';

export default function ExperienceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const experienceId = id as string;

  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExperience() {
      try {
        setLoading(true);
        setError(null);
        const data = await getExperienceById(experienceId);
        setExperience(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load experience details. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    }

    if (experienceId) {
      fetchExperience();
    }
  }, [experienceId]);

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlotId(slotId);
  };

  const handleProceedToCheckout = () => {
    if (!experience || !selectedSlotId) return;

    // Navigate to checkout with experience and slot data in URL params
    const selectedSlot = experience.slots.find(slot => slot._id === selectedSlotId);
    if (!selectedSlot) return;

    // Check if requested quantity exceeds available spots
    if (quantity > selectedSlot.availableSpots) {
      setError(`Only ${selectedSlot.availableSpots} spot(s) available for this time slot. Please reduce quantity.`);
      return;
    }

    const checkoutParams = new URLSearchParams({
      experienceId: experience._id,
      slotId: selectedSlotId,
      experienceTitle: experience.title,
      price: experience.price.toString(),
      quantity: quantity.toString(),
      slotDate: selectedSlot.date,
      slotTime: `${selectedSlot.startTime} - ${selectedSlot.endTime}`,
    });

    navigate(`/checkout?${checkoutParams.toString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center min-h-[600px]">
          <LoadingSpinner size="lg" message="Loading experience details..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                Unable to load experience
              </h2>
              <p className="text-red-700">{error}</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Experience not found
            </h2>
            <button
              onClick={() => navigate('/')}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * 0.059);
  const total = subtotal + taxes;

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Details
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Experience Details */}
          <div className="lg:col-span-2">
            {/* Experience Image */}
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6">
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title and Location */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {experience.title}
            </h1>
            
            {/* Location */}
            <div className="flex items-center text-gray-600 mb-4">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-sm font-medium">{experience.location}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {experience.description}
            </p>

            {/* Slot Selection */}
            <div id="slot-selection" className="mb-6">
              <SlotSelector
                slots={experience.slots}
                selectedSlotId={selectedSlotId}
                onSlotSelect={handleSlotSelect}
              />
            </div>

            {/* About Section */}
            {experience.longDescription && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {experience.longDescription}
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Pricing Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 rounded-lg p-6 sticky top-24">
              {/* Error message */}
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-800 flex items-start gap-2">
                    <svg
                      className="w-5 h-5 shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {/* Starts at */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Starts at</span>
                  <span className="font-medium text-gray-900">₹{experience.price}</span>
                </div>

                {/* Quantity */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-md bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span className="font-medium text-gray-900 w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => {
                        const selectedSlot = experience?.slots.find(slot => slot._id === selectedSlotId);
                        const maxQuantity = selectedSlot?.availableSpots || 10;
                        setQuantity(Math.min(quantity + 1, maxQuantity));
                      }}
                      className="w-8 h-8 rounded-md bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={(() => {
                        const selectedSlot = experience?.slots.find(slot => slot._id === selectedSlotId);
                        return selectedSlot ? quantity >= selectedSlot.availableSpots : false;
                      })()}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Available spots indicator */}
                {selectedSlotId && (() => {
                  const selectedSlot = experience?.slots.find(slot => slot._id === selectedSlotId);
                  if (selectedSlot && selectedSlot.availableSpots <= 5) {
                    return (
                      <div className="text-xs text-orange-600 bg-orange-50 px-3 py-2 rounded-md">
                        Only {selectedSlot.availableSpots} spot(s) left!
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">₹{subtotal}</span>
                </div>

                {/* Taxes */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium text-gray-900">₹{taxes}</span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-300">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">₹{total}</span>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={handleProceedToCheckout}
                  disabled={!selectedSlotId}
                  className={`w-full py-3 rounded-md font-semibold transition-colors ${
                    selectedSlotId
                      ? 'bg-primary text-gray-900 hover:bg-primary-dark'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
