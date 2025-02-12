import * as React from 'react';
import { nanoid } from 'nanoid';

export type Task = {
  id: string;
  title: string;
  done: boolean;
  ownerId?: string;
};

export type TasksStorage = {
  getTasks: (defaultValue: Task[]) => Task[];
  saveTasks: (tasks: Task[]) => void;
};

export function useTasksModel({ storage }: { storage: TasksStorage }) {
  const [tasks, setTasks] = React.useState<Task[]>(() => storage.getTasks([]));

  const addTask = (value: string) => {
    setTasks((tasks) => [
      { id: nanoid(), title: value, done: false },
      ...tasks,
    ]);
  };

  const removeTask = (id: string) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== id));
  };

  const toggleCheckTask = (id: string) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const updateOwner = (id: string, ownerId: string) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, ownerId } : task)),
    );
  };

  React.useEffect(() => {
    storage.saveTasks(tasks);
  }, [storage, tasks]);

  return {
    tasks,
    addTask,
    removeTask,
    toggleCheckTask,
    updateOwner,
  };
}

export type TasksModel = ReturnType<typeof useTasksModel>;
