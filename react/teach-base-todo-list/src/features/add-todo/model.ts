import { nanoid } from 'nanoid';

import { Todo } from '@/entities/todo';

export const createNewTodo = (todoText: Todo['text']) => ({
  id: nanoid(),
  text: todoText,
  isCompleted: false,
});

export const addTodo = (todos: Todo[], newTodo: Todo) => {
  return [...todos, newTodo];
};
