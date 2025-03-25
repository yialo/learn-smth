export type TaskAction = 'view' | 'add' | 'remove';

export type Task = {
  id: string;
  title: string;
};

export interface TaskRepository {
  getTask(taskId: string): Promise<Task | null>;
  createTask(payload: { title: string }): Promise<Task>;
  deleteTask(taskId: string): Promise<string | undefined>;
}

export interface TaskGuard {
  canOrThrow(userId: string, taskAction: TaskAction): Promise<void>;
}
