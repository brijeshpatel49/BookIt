import { useState, useEffect, useRef } from "react";
import type { FormEvent } from "react";
import type { BookingFormData } from "../types";

interface CheckoutFormProps {
  onSubmit: (data: BookingFormData) => void;
  isSubmitting: boolean;
  onPromoCodeApply?: (code: string) => void;
  isValidatingPromo?: boolean;
  initialName?: string;
  initialEmail?: string;
  isReadOnly?: boolean;
}

export default function CheckoutForm({
  onSubmit,
  isSubmitting,
  onPromoCodeApply,
  isValidatingPromo = false,
  initialName = "",
  initialEmail = "",
  isReadOnly = false,
}: CheckoutFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: initialName,
    email: initialEmail,
    promoCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPromoInfo, setShowPromoInfo] = useState(false);
  const promoInfoRef = useRef<HTMLDivElement>(null);

  // Update form data when initial values change
  useEffect(() => {
    if (initialName || initialEmail) {
      setFormData((prev) => ({
        ...prev,
        name: initialName,
        email: initialEmail,
      }));
    }
  }, [initialName, initialEmail]);

  // Close promo info popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        promoInfoRef.current &&
        !promoInfoRef.current.contains(event.target as Node)
      ) {
        setShowPromoInfo(false);
      }
    };

    if (showPromoInfo) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPromoInfo]);

  const validateName = (name: string): string => {
    if (!name.trim()) {
      return "Name is required";
    }
    return "";
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });

    let error = "";
    if (field === "name") {
      error = validateName(formData.name);
    } else if (field === "email") {
      error = validateEmail(formData.email);
    }

    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData({ ...formData, [field]: value });

    // Clear error when user starts typing
    if (touched[field]) {
      let error = "";
      if (field === "name") {
        error = validateName(value);
      } else if (field === "email") {
        error = validateEmail(value);
      }
      setErrors({ ...errors, [field]: error });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);

    if (nameError || emailError) {
      setErrors({
        name: nameError,
        email: emailError,
      });
      setTouched({ name: true, email: true });
      return;
    }

    onSubmit(formData);
  };

  const handlePromoApply = () => {
    if (formData.promoCode && onPromoCodeApply) {
      onPromoCodeApply(formData.promoCode);
      setShowPromoInfo(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm text-gray-600 mb-1">
            Full name{" "}
            {isReadOnly && (
              <span className="text-xs text-gray-500">(Auto-filled)</span>
            )}
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            className={`
              w-full px-4 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary
              ${isReadOnly ? "bg-gray-200 cursor-not-allowed" : "bg-gray-100"}
              ${errors.name && touched.name ? "ring-2 ring-red-500" : ""}
            `}
            placeholder="Your name"
            disabled={isSubmitting || isReadOnly}
            readOnly={isReadOnly}
          />
          {errors.name && touched.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
            Email{" "}
            {isReadOnly && (
              <span className="text-xs text-gray-500">(Auto-filled)</span>
            )}
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={`
              w-full px-4 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary
              ${isReadOnly ? "bg-gray-200 cursor-not-allowed" : "bg-gray-100"}
              ${errors.email && touched.email ? "ring-2 ring-red-500" : ""}
            `}
            placeholder="your@email.com"
            disabled={isSubmitting || isReadOnly}
            readOnly={isReadOnly}
          />
          {errors.email && touched.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="promoCode" className="block text-sm text-gray-600">
            Promo code
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPromoInfo(!showPromoInfo)}
              className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center hover:bg-blue-600 transition-colors"
              title="View demo promo codes"
            >
              i
            </button>
            {showPromoInfo && (
              <div
                ref={promoInfoRef}
                className="absolute left-0 top-7 z-10 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-64"
              >
                <div className="text-xs text-gray-700 space-y-2">
                  <p className="font-semibold text-gray-900 mb-2">
                    Demo Promo Codes:
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                        SAVE10
                      </span>
                      <span className="text-gray-600">10% off</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                        SAVE20
                      </span>
                      <span className="text-gray-600">20% off</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                        FLAT50
                      </span>
                      <span className="text-gray-600">₹50 off</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                        FLAT100
                      </span>
                      <span className="text-gray-600">₹100 off</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPromoInfo(false)}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-700"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            id="promoCode"
            value={formData.promoCode}
            onChange={(e) =>
              handleChange("promoCode", e.target.value.toUpperCase())
            }
            className="flex-1 px-4 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter promo code"
            disabled={isSubmitting || isValidatingPromo}
          />
          <button
            type="button"
            onClick={handlePromoApply}
            disabled={!formData.promoCode || isSubmitting || isValidatingPromo}
            className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isValidatingPromo ? "Applying..." : "Apply"}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="terms"
          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
          required
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          I agree to the terms and safety policy
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-primary text-gray-900 font-semibold rounded-md hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting && (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {isSubmitting ? "Processing Payment..." : "Pay and Confirm"}
      </button>
    </form>
  );
}
