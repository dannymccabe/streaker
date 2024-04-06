interface SetGoalProps {
  habit: string;
  handleHabitChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmation: () => void;
  goalEntered: boolean;
}

const SetGoal: React.FC<SetGoalProps> = ({
  habit,
  handleHabitChange,
  handleConfirmation,
  goalEntered,
}) => {
  return (
    <>
      {goalEntered ? (
        <h2>{habit}</h2>
      ) : (
        <input
          type="text"
          placeholder="Enter your goal"
          value={habit}
          onChange={handleHabitChange}
        />
      )}
      {!goalEntered && <button onClick={handleConfirmation}>Confirm</button>}
    </>
  );
};

export default SetGoal;
