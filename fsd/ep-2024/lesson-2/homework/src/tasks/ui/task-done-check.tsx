export const TaskDoneCheck: React.FC<{
  done: boolean;
  onDoneChange: () => void;
}> = ({ done, onDoneChange }) => {
  return (
    <label>
      <input type="checkbox" checked={done} onChange={onDoneChange} />
      done
    </label>
  );
};
