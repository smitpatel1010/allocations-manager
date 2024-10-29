import React, { useState } from 'react';
import { AllocationInputPopup } from './AllocationInputPopup';
import { Header } from './Header';

export const AllocationsManager = ({ initialAllocations }) => {
  const [view, setView] = useState('week');
  const [startDate, setStartDate] = useState(8);
  const [allocations, setAllocations] = useState(initialAllocations);

  const [popupState, setPopupState] = useState({ isOpen: false });

  const getCurrentDates = () => {
    let dates = [];
    if (view === 'week') {
      for (let i = 0; i < 7; i++) {
        dates.push({
          start: startDate + i,
          end: startDate + i,
          label: `${startDate + i}`,
        });
      }
    } else if (view === 'month') {
      for (let i = 0; i < 4; i++) {
        dates.push({
          start: 1 + i * 7,
          end: 7 + i * 7,
          label: `${1 + i * 7}-${7 + i * 7}`,
        });
      }
    } else if (view === 'day') {
      dates.push({
        start: startDate,
        end: startDate,
        label: `${startDate}`,
      });
    }
    return dates;
  };

  const splitAllocation = (person, startDate, endDate, newValue) => {
    // todo: complete this function
  };

  const saveChanges = (params) => {
    splitAllocation(params.person, params.startDate, params.endDate, params.allocation);
    setPopupState({ isOpen: false });
  };

  return (
    <div className="p-4">
      <Header startDate={startDate} setStartDate={setStartDate} setView={setView} view={view} />

      <div
        className={`grid gap-4 grid-cols-[90px_repeat(${view === 'day' ? '1' : view === 'month' ? '4' : '7'},minmax(0,_1fr))]`}
      >
        <div className="font-bold">People</div>
        {getCurrentDates().map(({ label }, index) => (
          <div key={index} className="font-bold text-center">
            {label}
          </div>
        ))}

        {Object.keys(allocations).map((person) => (
          <React.Fragment key={person}>
            <div>{person}</div>
            {getCurrentDates().map(({ start, end, label }, index) => (
              <div key={index} className="relative p-2 bg-gray-200 text-center">
                <div
                  className="inline-block w-full cursor-pointer"
                  data-testid={`${person}-date-${label}-allocation-value`}
                  onClick={() =>
                    setPopupState({
                      isOpen: true,
                      payload: { person, initialAllocation: 0 },
                    })
                  }
                >
                  0 hours
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {popupState.isOpen ? (
        <AllocationInputPopup onClose={() => setPopupState({ isOpen: false })} onSave={saveChanges} {...popupState.payload} />
      ) : null}
    </div>
  );
};
