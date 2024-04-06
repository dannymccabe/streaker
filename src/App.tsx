// App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import SetGoal from './components/SetGoal';
import TodayPrompt from './components/TodayPrompt';

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

  const handleSuccess = () => {
    const today = new Date().toLocaleDateString();
    setCalendarStatus({ ...calendarStatus, [today]: true });
    setDaysStreak((prev) => prev + 1);
    localStorage.setItem(
      'calendarStatus',
      JSON.stringify({ ...calendarStatus, [today]: true })
    );
    localStorage.setItem('daysStreak', (daysStreak + 1).toString());
  };

  const handleFailure = () => {
    const today = new Date().toLocaleDateString();
    setCalendarStatus({ ...calendarStatus, [today]: false });
    setDaysStreak(0);
    localStorage.setItem(
      'calendarStatus',
      JSON.stringify({ ...calendarStatus, [today]: false })
    );
    localStorage.setItem('daysStreak', '0');
  };

  const renderContent = () => {
    if (!goalEntered) {
      return (
        <SetGoal
          habit={habit}
          handleHabitChange={handleHabitChange}
          handleConfirmation={handleConfirmation}
          goalEntered={goalEntered}
        />
      );
    } else {
      const today = new Date().toLocaleDateString();
      if (calendarStatus[today] === undefined) {
        return (
          <TodayPrompt
            habit={habit}
            handleSuccess={handleSuccess}
            handleFailure={handleFailure}
          />
        );
      } else {
        return (
          <>
            <div className="streak">
              <h3>Current Streak:</h3>
              <p>{daysStreak} days</p>
            </div>
            <Calendar
              lastUpdateDate={lastUpdateDate}
              calendarStatus={calendarStatus}
              handleSuccess={function (date: string): void {
                throw new Error('Function not implemented.');
              }}
              handleFailure={function (date: string): void {
                throw new Error('Function not implemented.');
              }}
            />
            <button onClick={handleReset}>Reset</button>
          </>
        );
      }
    }
  };

  return (
    <>
      <h1>Streaker 🏃💨</h1>
      <div className="card">{renderContent()}</div>
    </>
  );
};

export default App;
