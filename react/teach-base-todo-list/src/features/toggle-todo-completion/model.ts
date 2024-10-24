import { Todo } from '@/entities/todo';

export const toggleTodoCompletionById = (
  todos: Todo[],
  targetId: Todo['id'],
) => {
  return todos.map((todo) => {
    if (todo.id === targetId) {
      return {
        ...todo,
        isCompleted: !todo.isCompleted,
      };
    }
    return todo;
  });
};
