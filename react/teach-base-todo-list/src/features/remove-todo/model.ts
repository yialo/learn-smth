import { Todo } from '@/entities/todo';

export const removeTodo = (todos: Todo[], todoId: string) =>
  todos.filter((todo) => todo.id !== todoId);
