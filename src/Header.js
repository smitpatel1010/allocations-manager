export const Header = ({ view, setView, startDate, setStartDate }) => {
  const changeDate = (direction) => {
    // todo: complete this function to change the date according to
  };

  return (
    <div className="flex justify-center items-center gap-4 mb-4">
      <button className="px-4 py-2 bg-blue-500 text-white" data-testid="day-view" onClick={() => setView('day')}>
        Day View
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white"
        data-testid="week-view"
        onClick={() => {
          setView('week');
          // change the start date according to current selected date to open the perfect week which includes current date.
          // e.g. current day is 10 then swiching to week view should open 8-14 dates
          // e.g. current day is 19 then swiching to week view should open 15-21 dates
        }}
      >
        Week View
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white"
        data-testid="month-view"
        onClick={() => {
          setView('month');
          setStartDate(1);
        }}
      >
        Month View
      </button>

      {view !== 'month' ? (
        <div className="flex justify-between items-center gap-2">
          <button
            className="px-4 py-2 bg-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
            onClick={() => changeDate(-1)}
            // todo: add condition to disable
            disabled={false}
            data-testid="prev-view"
          >
            Previous {view}
          </button>
          <div className="font-bold text-center" data-testid="current-view">
            {view === 'day' ? startDate : `Week ${Math.floor((startDate - 1) / 7) + 1}`}
          </div>
          <button
            className="px-4 py-2 bg-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
            onClick={() => changeDate(1)}
            // todo: add condition to disable here over 28 days of month
            disabled={false}
            data-testid="next-view"
          >
            Next {view}
          </button>
        </div>
      ) : null}
    </div>
  );
};
