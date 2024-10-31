import { createStore } from './store-utils/create-store';

export const ACTION_TYPES = {
  DELETE: 'DELETE',
};

const INITIAL_STATE = {
  todos: [
    { id: 'a', content: 'todo A' },
    { id: 'b', content: 'todo B' },
    { id: 'c', content: 'todo C' },
  ],
};

const reducer = (prevState, action) => {
  const state = prevState ?? INITIAL_STATE;

  if (action.type === ACTION_TYPES.DELETE) {
    return {
      ...state,
      todos: state.todos.filter((todo) => todo.id !== action.payload),
    };
  }

  return state;
};

export const store = createStore(reducer, INITIAL_STATE);
