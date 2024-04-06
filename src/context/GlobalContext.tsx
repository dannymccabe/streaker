// GlobalContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface GlobalState {
  habit: string;
  daysStreak: number;
  lastUpdateDate: string;
  calendarStatus: { [date: string]: boolean | undefined };
  setHabit: React.Dispatch<React.SetStateAction<string>>;
  setDaysStreak: React.Dispatch<React.SetStateAction<number>>;
  setLastUpdateDate: React.Dispatch<React.SetStateAction<string>>;
  setCalendarStatus: React.Dispatch<
    React.SetStateAction<{ [date: string]: boolean | undefined }>
  >;
}

const initialGlobalState: GlobalState = {
  habit: '',
  daysStreak: 0,
  lastUpdateDate: '',
  calendarStatus: {},
  setHabit: () => {},
  setDaysStreak: () => {},
  setLastUpdateDate: () => {},
  setCalendarStatus: () => {},
};

const GlobalContext = createContext<GlobalState>(initialGlobalState);

export const useGlobalState = () => useContext(GlobalContext);

export const GlobalProvider: React.FC = ({ children }) => {
  const [habit, setHabit] = useState<string>(initialGlobalState.habit);
  const [daysStreak, setDaysStreak] = useState<number>(
    initialGlobalState.daysStreak
  );
  const [lastUpdateDate, setLastUpdateDate] = useState<string>(
    initialGlobalState.lastUpdateDate
  );
  const [calendarStatus, setCalendarStatus] = useState<{
    [date: string]: boolean | undefined;
  }>(initialGlobalState.calendarStatus);

  return (
    <GlobalContext.Provider
      value={{
        habit,
        daysStreak,
        lastUpdateDate,
        calendarStatus,
        setHabit,
        setDaysStreak,
        setLastUpdateDate,
        setCalendarStatus,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
