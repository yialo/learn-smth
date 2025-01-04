import { TasksModel } from '../model';
import { CreateTaskForm } from './create-task-form';
import { DeleteTaskButton } from './delete-task-button';
import { TaskDoneCheck } from './task-done-check';
import { TaskItem } from './task-item';

export function TaskList({
  model,
  renderOwner,
}: {
  model: TasksModel;
  renderOwner: (
    ownerId: string | undefined,
    onOwnerChange: (ownerId: string) => void,
  ) => React.ReactNode;
}) {
  return (
    <div>
      <CreateTaskForm onCreate={model.addTask} />
      {model.tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          actions={
            <>
              <TaskDoneCheck
                done={task.done}
                onDoneChange={() => {
                  model.toggleCheckTask(task.id);
                }}
              />
              <DeleteTaskButton onDelete={() => model.removeTask(task.id)} />
              {renderOwner(task.ownerId, (ownerId) =>
                model.updateOwner(task.id, ownerId),
              )}
            </>
          }
        />
      ))}
    </div>
  );
}
