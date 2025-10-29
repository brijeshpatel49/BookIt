import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createBooking, validatePromoCode, ApiRequestError } from "../lib/api";
import type { PromoValidationResponse, BookingFormData } from "../types";
import CheckoutForm from "../components/CheckoutForm";
import PriceBreakdown from "../components/PriceBreakdown";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Retrieve experience and slot data from URL params
  const experienceId = searchParams.get("experienceId");
  const slotId = searchParams.get("slotId");
  const experienceTitle = searchParams.get("experienceTitle");
  const priceStr = searchParams.get("price");
  const quantityStr = searchParams.get("quantity");
  const slotDate = searchParams.get("slotDate");
  const slotTime = searchParams.get("slotTime");

  const originalPrice = priceStr ? parseFloat(priceStr) : 0;
  const quantity = quantityStr ? parseInt(quantityStr) : 1;

  // State management
  const [discount, setDiscount] = useState(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | undefined>();
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Check if user is logged in and get their info
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const email = localStorage.getItem("userEmail") || "";
      const name = localStorage.getItem("userName") || "";
      setUserEmail(email);
      setUserName(name);
    }
  }, []);

  // Validate required params on mount
  useEffect(() => {
    if (
      !experienceId ||
      !slotId ||
      !experienceTitle ||
      !priceStr ||
      !slotDate ||
      !slotTime
    ) {
      setError("Missing booking information. Please select an experience and slot.");
    }
  }, [experienceId, slotId, experienceTitle, priceStr, slotDate, slotTime]);

  // Handle promo code validation
  const handlePromoCodeApply = async (code: string) => {
    if (!code.trim()) return;

    setIsValidatingPromo(true);
    setPromoError(null);
    setPromoSuccess(null);

    try {
      const promoData: PromoValidationResponse = await validatePromoCode({
        code: code.trim(),
        originalPrice,
      });

      // Apply discount
      setDiscount(promoData.discountAmount);
      setAppliedPromoCode(code.trim());
      setPromoSuccess(
        `Promo code applied! You saved ₹${promoData.discountAmount.toFixed(2)}`
      );
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setPromoError(err.message || "Invalid or expired promo code");
      } else {
        setPromoError("Failed to validate promo code. Please try again.");
      }
      setDiscount(0);
      setAppliedPromoCode(undefined);
    } finally {
      setIsValidatingPromo(false);
    }
  };

  // Handle form submission to create booking
  const handleFormSubmit = async (formData: BookingFormData) => {
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    if (!experienceId || !slotId) {
      setError("Missing booking information");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const bookingResponse = await createBooking({
        experienceId,
        slotId,
        userName: formData.name,
        userEmail: formData.email,
        promoCode: appliedPromoCode,
      });

      // Navigate to result page with booking data
      const resultParams = new URLSearchParams({
        success: "true",
        confirmationNumber: bookingResponse.confirmationNumber,
        experienceTitle: experienceTitle || "",
        slotDate: slotDate || "",
        slotTime: slotTime || "",
        userName: formData.name,
        userEmail: formData.email,
        originalPrice: originalPrice.toString(),
        discount: discount.toString(),
        finalPrice: (originalPrice - discount).toString(),
        promoCode: appliedPromoCode || "",
      });

      // Use replace instead of push to prevent back button issues
      navigate(`/result?${resultParams.toString()}`, { replace: true });
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setError(err.message || "Failed to create booking. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setIsSubmitting(false);
    }
  };

  // Show error if missing required data
  if (error && (!experienceId || !slotId)) {
    return (
      <div className="min-h-screen bg-gray-50">
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
                Invalid Checkout
              </h2>
              <p className="text-red-700">{error}</p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-primary transition-colors"
            disabled={isSubmitting}
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
            Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Checkout Form */}
          <div>
            <div className="bg-gray-100 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Checkout
              </h2>

              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">Experience</div>
                  <div className="text-lg font-medium text-gray-900">
                    {experienceTitle}
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="text-sm text-gray-600 mb-2">Selected Slot</div>
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-gray-500 mt-0.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <div className="font-medium text-gray-900">
                        {new Date(slotDate || "").toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-sm text-gray-600">{slotTime}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <PriceBreakdown
              originalPrice={originalPrice}
              discount={discount}
              promoCode={appliedPromoCode}
              quantity={quantity}
            />
          </div>

          {/* Right Column - Checkout Form */}
          <div className="relative">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Your Information
              </h2>

              {/* Promo code feedback messages */}
              {promoSuccess && (
                <div className="mb-4 bg-green-50 border border-green-200 rounded-md p-3">
                  <p className="text-sm text-green-800 flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {promoSuccess}
                  </p>
                </div>
              )}

              {promoError && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-800 flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {promoError}
                  </p>
                </div>
              )}

              {/* Booking error message */}
              {error && experienceId && slotId && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-800 flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
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

              <CheckoutForm
                onSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
                onPromoCodeApply={handlePromoCodeApply}
                isValidatingPromo={isValidatingPromo}
                initialName={userName}
                initialEmail={userEmail}
                isReadOnly={isLoggedIn}
              />
            </div>

            {/* Loading overlay during submission */}
            {isSubmitting && (
              <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <LoadingSpinner
                    size="lg"
                    message="Processing your booking..."
                  />
                  <p className="mt-4 text-sm text-gray-600">
                    Please do not close this page or press back button
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
