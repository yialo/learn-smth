export const DeleteTaskButton: React.FC<{
  onDelete: () => void;
}> = ({ onDelete }) => {
  return (
    <button type="button" onClick={onDelete}>
      Delete task
    </button>
  );
};
