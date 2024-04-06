import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [habit, setHabit] = useState<string>('');
  const [daysStreak, setDaysStreak] = useState<number>(0);
  const [lastUpdateDate, setLastUpdateDate] = useState<string>('');

  useEffect(() => {
    const savedHabit = localStorage.getItem('habit');
    const savedDaysStreak = localStorage.getItem('daysStreak');
    const savedLastUpdateDate = localStorage.getItem('lastUpdateDate');

    if (savedHabit) setHabit(savedHabit);
    if (savedDaysStreak) setDaysStreak(parseInt(savedDaysStreak));
    if (savedLastUpdateDate) setLastUpdateDate(savedLastUpdateDate);
  }, []);

  const handleHabitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHabit(e.target.value);
    localStorage.setItem('habit', e.target.value);
  };

  const handleConfirmation = () => {
    const today = new Date().toLocaleDateString();
    if (today !== lastUpdateDate) {
      setDaysStreak((prev) => prev + 1);
      setLastUpdateDate(today);
      localStorage.setItem('daysStreak', (daysStreak + 1).toString());
      localStorage.setItem('lastUpdateDate', today);
    }
  };

  // Function to render calendar dates
  const renderCalendar = () => {
    const dates = []; // Array to store JSX elements for calendar dates
    for (let i = 1; i <= 30; i++) {
      // Assuming 30 days in a month
      const date = new Date();
      date.setDate(date.getDate() - i + 1);
      const formattedDate = date.toLocaleDateString();
      const isSuccessful = formattedDate === lastUpdateDate;

      dates.push(
        <div
          key={formattedDate}
          className={`calendar-date ${isSuccessful ? 'successful' : ''}`}
        >
          {formattedDate}
        </div>
      );
    }
    return dates;
  };

  return (
    <>
      <h1>Streaker 🏃💨</h1>
      <div className="card">
        <h2>What is your goal?</h2>
        <input
          type="text"
          placeholder="Enter your goal"
          value={habit}
          onChange={handleHabitChange}
        />
        <button onClick={handleConfirmation}>Confirm</button>
      </div>
      <div className="streak">
        <h3>Current Streak:</h3>
        <p>{daysStreak} days</p>
      </div>
      <div className="calendar">{renderCalendar()}</div>
    </>
  );
};

export default App;
