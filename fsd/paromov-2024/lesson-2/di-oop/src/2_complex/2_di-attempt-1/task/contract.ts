export type TaskAction = 'view' | 'add' | 'change' | 'remove';

type Task = {
  id: string;
  title: string;
};

export interface TaskRepository {
  getOne(taskId: string): Promise<Task | null>;
  insert(payload: { title: string }): Promise<Task>;
  update(id: string, payload: { title: string }): Promise<Task | null>;
  delete(taskId: string): Promise<string | undefined>;
}

export interface TaskGuard {
  canOrThrow(userId: string, taskAction: TaskAction): Promise<void>;
}
