import { Task } from './config';

export const TaskItem = ({
  task,
  onArchiveTask,
  onPinTask,
}: {
  task: Task;
  onArchiveTask: (taskId: string) => void;
  onPinTask: (taskId: string) => void;
}) => {
  const domId = `task-${task.id}`;

  return (
    <div className="list-item">
      <label htmlFor={domId} aria-label={task.title}>
        <input
          id={domId}
          type="text"
          value={task.title}
          readOnly
          name="title"
        />
      </label>
    </div>
  );
};
