// Calendar.tsx
import React from 'react';

interface CalendarProps {
  lastUpdateDate: string;
  calendarStatus: { [date: string]: boolean | undefined };
  handleSuccess: (date: string) => void;
  handleFailure: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  calendarStatus,
  handleSuccess,
  handleFailure,
}) => {
  const renderCalendar = () => {
    const dates = [];

    for (let i = 1; i <= 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i + 1);
      const formattedDate = date.toLocaleDateString();
      const isSuccessMarked = calendarStatus[formattedDate];

      dates.push(
        <div
          key={formattedDate}
          className={`calendar-date ${
            isSuccessMarked === undefined
              ? ''
              : isSuccessMarked
              ? 'successful'
              : 'failed'
          }`}
        >
          {formattedDate}
          {!isSuccessMarked && (
            <div>
              <button onClick={() => handleSuccess(formattedDate)}>👍</button>
              <button onClick={() => handleFailure(formattedDate)}>👎</button>
            </div>
          )}
        </div>
      );
    }
    return dates;
  };

  return <div className="calendar">{renderCalendar()}</div>;
};

export default Calendar;
