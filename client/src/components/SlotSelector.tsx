import { useState, useEffect } from 'react';
import type { Slot } from '../types';

interface SlotSelectorProps {
  slots: Slot[];
  selectedSlotId: string | null;
  onSlotSelect: (slotId: string) => void;
}

export default function SlotSelector({
  slots,
  selectedSlotId,
  onSlotSelect,
}: SlotSelectorProps) {
  // Get unique dates for date selector
  const uniqueDates = Array.from(new Set(slots.map(slot => slot.date))).sort();
  
  // Track selected date separately
  const [selectedDate, setSelectedDate] = useState<string>(uniqueDates[0] || '');

  // Update selected date when a slot is selected
  useEffect(() => {
    if (selectedSlotId) {
      const selectedSlot = slots.find(slot => slot._id === selectedSlotId);
      if (selectedSlot) {
        setSelectedDate(selectedSlot.date);
      }
    }
  }, [selectedSlotId, slots]);

  // Filter slots by selected date
  const filteredSlots = slots.filter(slot => slot.date === selectedDate);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Choose date</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {uniqueDates.map((date) => {
            const dateObj = new Date(date);
            const formattedDate = dateObj.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            });
            const isSelected = selectedDate === date;

            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors
                  ${
                    isSelected
                      ? 'bg-primary text-gray-900'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {formattedDate}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Choose time</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {filteredSlots.map((slot) => {
            const isSelected = selectedSlotId === slot._id;
            const isSoldOut = slot.isSoldOut;

            return (
              <button
                key={slot._id}
                onClick={() => !isSoldOut && onSlotSelect(slot._id)}
                disabled={isSoldOut}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-all
                  ${
                    isSoldOut
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : isSelected
                      ? 'bg-primary text-gray-900'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                <div>{slot.startTime}</div>
                {isSoldOut && (
                  <div className="text-xs text-red-600 mt-1">Sold out</div>
                )}
                {!isSoldOut && slot.availableSpots <= 3 && (
                  <div className="text-xs text-orange-600 mt-1">{slot.availableSpots} left</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {slots.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          No available slots for this experience
        </p>
      )}

      <div className="text-xs text-gray-500 mt-2">
        All times are in IST (GMT +5:30)
      </div>
    </div>
  );
}
