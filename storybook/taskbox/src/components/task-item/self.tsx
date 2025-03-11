import { Task } from './types';
import { clsx } from 'clsx';

export const TaskItem = ({
  task,
  onArchive,
  onPin,
}: {
  task: Task;
  onArchive: (taskId: string) => void;
  onPin: (taskId: string) => void;
}) => {
  const domIds = {
    archive: `task-${task.id}-archive`,
    input: `task-${task.id}-title`,
    pin: `task-${task.id}-pin`,
  };

  return (
    <div
      className={clsx('list-item', {
        task_pinned: task.state === 'PINNED',
        task_archived: task.state === 'ARCHIVED',
      })}
    >
      <label
        htmlFor={domIds.archive}
        aria-label="Archive task"
        className="checkbox"
      >
        <input
          type="checkbox"
          disabled={true}
          name="checked"
          id={domIds.archive}
          checked={task.state === 'ARCHIVED'}
        />
        <span className="checkbox-custom" onClick={() => onArchive(task.id)} />
      </label>

      <label htmlFor={domIds.input} aria-label={task.title} className="title">
        <input
          id={domIds.input}
          type="text"
          value={task.title}
          readOnly
          name="title"
          placeholder="Input title"
        />
      </label>

      {task.state !== 'ARCHIVED' && (
        <button
          className="pin-button"
          onClick={() => onPin(task.id)}
          id={domIds.pin}
          aria-label={domIds.pin}
        >
          <span className="icon-star" />
        </button>
      )}
    </div>
  );
};
