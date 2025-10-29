import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import Navbar from '../components/Navbar';

interface BookingData {
  success: boolean;
  confirmationNumber: string;
  experienceTitle: string;
  slotDate: string;
  slotTime: string;
  userName: string;
  userEmail: string;
  originalPrice: number;
  discount: number;
  finalPrice: number;
  promoCode?: string;
}

export default function ResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    // Retrieve booking data from URL params
    const success = searchParams.get('success') === 'true';
    const confirmationNumber = searchParams.get('confirmationNumber');
    const experienceTitle = searchParams.get('experienceTitle');
    const slotDate = searchParams.get('slotDate');
    const slotTime = searchParams.get('slotTime');
    const userName = searchParams.get('userName');
    const userEmail = searchParams.get('userEmail');
    const originalPrice = searchParams.get('originalPrice');
    const discount = searchParams.get('discount');
    const finalPrice = searchParams.get('finalPrice');
    const promoCode = searchParams.get('promoCode');

    if (success && confirmationNumber) {
      setBookingData({
        success: true,
        confirmationNumber,
        experienceTitle: experienceTitle || '',
        slotDate: slotDate || '',
        slotTime: slotTime || '',
        userName: userName || '',
        userEmail: userEmail || '',
        originalPrice: parseFloat(originalPrice || '0'),
        discount: parseFloat(discount || '0'),
        finalPrice: parseFloat(finalPrice || '0'),
        promoCode: promoCode || undefined,
      });
      // Show success toast only once
      if (!toastShown) {
        toast.success('Booking confirmed successfully!');
        setToastShown(true);
      }
    } else {
      setBookingData({
        success: false,
        confirmationNumber: '',
        experienceTitle: '',
        slotDate: '',
        slotTime: '',
        userName: '',
        userEmail: '',
        originalPrice: 0,
        discount: 0,
        finalPrice: 0,
      });
      // Show error toast only once
      if (!toastShown) {
        toast.error('Booking failed. Please try again.');
        setToastShown(true);
      }
    }

    setLoading(false);
  }, [searchParams, toastShown]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[600px]">
          <LoadingSpinner size="lg" message="Loading..." />
        </div>
      </div>
    );
  }

  // Display error message if booking failed
  if (!bookingData?.success) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        {/* Error Content */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Booking Failed
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We couldn't complete your booking. This may be because the slot is no longer available or there was a technical issue.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-primary text-gray-900 rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                Return to Home
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Display success message with confirmation number
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      {/* Success Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed
          </h1>
          <p className="text-gray-600 mb-6">
            Ref ID: <span className="font-medium">{bookingData.confirmationNumber}</span>
          </p>
          
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}
