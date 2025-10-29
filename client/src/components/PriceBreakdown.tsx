interface PriceBreakdownProps {
  originalPrice: number;
  discount: number;
  promoCode?: string;
  quantity?: number;
}

export default function PriceBreakdown({
  originalPrice,
  discount,
  promoCode,
  quantity = 1,
}: PriceBreakdownProps) {
  const subtotal = originalPrice * quantity;
  const taxes = Math.round(subtotal * 0.059); // ~5.9% tax
  const finalPrice = subtotal + taxes - discount;

  return (
    <div className="bg-gray-100 rounded-lg p-6 space-y-3 mt-6">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Starts at</span>
        <span className="font-medium text-gray-900">₹{originalPrice}</span>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Quantity</span>
        <span className="font-medium text-gray-900">{quantity}</span>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Subtotal</span>
        <span className="font-medium text-gray-900">₹{subtotal}</span>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Taxes</span>
        <span className="font-medium text-gray-900">₹{taxes}</span>
      </div>

      {discount > 0 && (
        <div className="flex justify-between text-sm text-green-600">
          <span>Discount {promoCode && `(${promoCode})`}</span>
          <span className="font-medium">-₹{discount}</span>
        </div>
      )}

      <div className="border-t border-gray-300 pt-3 mt-3">
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>₹{finalPrice + taxes}</span>
        </div>
      </div>
    </div>
  );
}
