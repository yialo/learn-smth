import { TaskRepository } from '../task';

import { dbService } from './db-service-instance';

export class TaskRepositoryImpl implements TaskRepository {
  getOne(taskId: string) {
    return dbService.getTask(taskId);
  }
  insert(payload: { title: string }) {
    return dbService.createTask(payload.title);
  }
  update(taskId: string, payload: { title: string }) {
    return dbService.updateTask(taskId, payload.title);
  }
  delete(taskId: string) {
    return dbService.deleteTask(taskId);
  }
}
