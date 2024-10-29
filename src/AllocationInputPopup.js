import { useState } from 'react';

export const AllocationInputPopup = ({ initialAllocation, onClose, onSave, startDate, endDate, person }) => {
  const [newHours, setNewHours] = useState(initialAllocation || 0);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-2">Edit Working Hours</h2>
        <p>
          {person}'s working hours for {startDate === endDate ? startDate : `${startDate} - ${endDate}`}:
        </p>
        <input
          autoFocus
          type="number"
          value={newHours}
          onChange={(e) => setNewHours(e.target.value)}
          className="border p-2 mt-2 w-full"
          data-testid="allocation-input"
        />
        <div className="flex justify-end mt-4 gap-2">
          <button className="px-4 py-2 bg-red-500 text-white" onClick={onClose} data-testid="allocation-popup-cancel">
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white"
            // todo: implement this onClick
            onClick={() => {}}
            data-testid="allocation-popup-save"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
