import { fetchData } from '../../shared/api';
import { Todo } from './config';

const initialTodos: Todo[] = [
  {
    id: '1',
    text: 'Do 1',
    isCompleted: false,
  },
  {
    id: '2',
    text: 'Do 2',
    isCompleted: true,
  },
  {
    id: '3',
    text: 'Do 3',
    isCompleted: false,
  },
];

let todos = initialTodos;

export const readTodos = () => fetchData(todos);
