// TodayPrompt.tsx
import React from 'react';

interface TodayPromptProps {
  habit: string;
  handleSuccess: () => void;
  handleFailure: () => void;
}

const TodayPrompt: React.FC<TodayPromptProps> = ({
  habit,
  handleSuccess,
  handleFailure,
}) => {
  return (
    <div className="today-prompt">
      <h2>{habit}</h2>
      <h3>Did you succeed today?</h3>
      <div className="prompt-buttons">
        <button onClick={handleSuccess}>👍</button>
        <button onClick={handleFailure}>👎</button>
      </div>
    </div>
  );
};

export default TodayPrompt;
