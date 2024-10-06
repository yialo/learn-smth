export type TaskAction = 'add' | 'delete' | 'view';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type TasksApiClient = {
  getTasks(): Promise<Task[]>;
  getTaskById(id: string): Promise<Task | null>;
  addTask(title: string): Promise<Task>;
  deleteTask(id: string): Promise<void>;
  authorizeActionOrThrow(action: TaskAction): Promise<void>;
};
