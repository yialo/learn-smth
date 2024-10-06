import {
  createStrictContext,
  useStrictContext,
} from '../shared/strict-context';
import { TasksApiClient } from './config';

export const TasksContext = createStrictContext<TasksApiClient>();

export const useTasks = () => {
  const { addTask, authorizeActionOrThrow, deleteTask, getTasks, getTaskById } =
    useStrictContext(TasksContext, 'Tasks');

  async function create(title: string) {
    await authorizeActionOrThrow('add');
    return addTask(title);
  }

  async function remove(id: string) {
    await authorizeActionOrThrow('delete');
    return deleteTask(id);
  }

  async function getMany() {
    await authorizeActionOrThrow('view');
    return getTasks();
  }

  async function getOne(id: string) {
    await authorizeActionOrThrow('view');
    return getTaskById(id);
  }

  return { create, remove, getMany, getOne };
};
