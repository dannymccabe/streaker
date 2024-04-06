import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [habit, setHabit] = useState<string>('');
  const [daysStreak, setDaysStreak] = useState<number>(0);

  useEffect(() => {
    const savedHabit = localStorage.getItem('habit');
    const savedDaysStreak = localStorage.getItem('daysStreak');
    if (savedHabit) setHabit(savedHabit);
    if (savedDaysStreak) setDaysStreak(parseInt(savedDaysStreak));
  }, []);

  const handleHabitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHabit(e.target.value);
    localStorage.setItem('habit', e.target.value);
  };

  const handleConfirmation = () => {
    setDaysStreak((prev) => prev + 1);
    localStorage.setItem('daysStreak', (daysStreak + 1).toString());
    // Add notification functionality here
    const showNotification = () => {
      chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'icon.png', // Provide your icon path
        title: 'Streaker Reminder',
        message: 'Did you stick to your habit today?',
        buttons: [{ title: 'Yes' }, { title: 'Not today' }],
      });
    };

    // Call this function to show daily reminders
    showNotification();
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
    </>
  );
};

export default App;
