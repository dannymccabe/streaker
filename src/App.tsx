// App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Calendar from './components/Calendar';

const App: React.FC = () => {
  const [habit, setHabit] = useState<string>('');
  const [daysStreak, setDaysStreak] = useState<number>(0);
  const [lastUpdateDate, setLastUpdateDate] = useState<string>('');
  const [goalEntered, setGoalEntered] = useState<boolean>(false);
  const [calendarStatus, setCalendarStatus] = useState<{
    [date: string]: boolean | undefined;
  }>({});

  useEffect(() => {
    const savedHabit = localStorage.getItem('habit');
    const savedDaysStreak = localStorage.getItem('daysStreak');
    const savedLastUpdateDate = localStorage.getItem('lastUpdateDate');
    const savedCalendarStatus = localStorage.getItem('calendarStatus');

    if (savedHabit) {
      setHabit(savedHabit);
      setGoalEntered(true); // If goal exists, set goalEntered to true
    }
    if (savedDaysStreak) setDaysStreak(parseInt(savedDaysStreak));
    if (savedLastUpdateDate) setLastUpdateDate(savedLastUpdateDate);
    if (savedCalendarStatus) setCalendarStatus(JSON.parse(savedCalendarStatus));
  }, []);

  const handleHabitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHabit(e.target.value);
  };

  const handleConfirmation = () => {
    const today = new Date().toLocaleDateString();
    if (today !== lastUpdateDate) {
      setDaysStreak((prev) => prev + 1);
      setLastUpdateDate(today);
      localStorage.setItem('daysStreak', (daysStreak + 1).toString());
      localStorage.setItem('lastUpdateDate', today);
    }

    // Save the habit to local storage and update goalEntered
    localStorage.setItem('habit', habit);
    setGoalEntered(true);
  };

  const handleReset = () => {
    localStorage.clear(); // Clear all local storage data
    setHabit('');
    setDaysStreak(0);
    setLastUpdateDate('');
    setGoalEntered(false);
    setCalendarStatus({});
  };

  const handleSuccess = (date: string) => {
    const updatedStatus = { ...calendarStatus, [date]: true };
    setCalendarStatus(updatedStatus);
    localStorage.setItem('calendarStatus', JSON.stringify(updatedStatus));
  };

  const handleFailure = (date: string) => {
    // Reset streak and mark day as failed
    setDaysStreak(0);
    const updatedStatus = { ...calendarStatus, [date]: false };
    setCalendarStatus(updatedStatus);
    localStorage.setItem('daysStreak', '0');
    localStorage.setItem('calendarStatus', JSON.stringify(updatedStatus));
  };

  const renderGoal = () => {
    if (goalEntered) {
      return <h2>{habit}</h2>;
    } else {
      return (
        <input
          type="text"
          placeholder="Enter your goal"
          value={habit}
          onChange={handleHabitChange}
        />
      );
    }
  };

  return (
    <>
      <h1>Streaker 🏃💨</h1>
      <div className="card">
        {renderGoal()}
        {!goalEntered && <button onClick={handleConfirmation}>Confirm</button>}
      </div>
      {goalEntered && (
        <>
          <div className="streak">
            <h3>Current Streak:</h3>
            <p>{daysStreak} days</p>
          </div>
          <Calendar
            lastUpdateDate={lastUpdateDate}
            calendarStatus={calendarStatus}
            handleSuccess={handleSuccess}
            handleFailure={handleFailure}
          />
          <button onClick={handleReset}>Reset</button>
        </>
      )}
    </>
  );
};

export default App;
