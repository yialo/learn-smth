/**
  @typedef {object} TTask
  @property {string} id
  @property {string} title
  @property {string} state
*/

/**
  @typedef {object} Props
  @property {{ id: string; title: string; state: string }} task
  @property {(id: string) => void} onArchiveTask
  @property {(id: string) => void} onPinTask
*/

/**
  @param {Props} props
 */
export const Task = ({ task, onArchiveTask, onPinTask }) => {
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
