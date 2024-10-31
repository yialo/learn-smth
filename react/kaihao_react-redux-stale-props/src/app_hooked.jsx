import { store, ACTION_TYPES } from './store';
import { StoreProvider } from './store-utils/store-provider/nested-subscription-driven';
import { useDispatch, useSelector } from './store-utils/hooks';

const makeTodoContentSelector = (id) => (state) =>
  state.todos.find((todo) => todo.id === id).content;

const Todo = ({ id }) => {
  console.log('Todo is rendering...');

  const todoContentSelector = makeTodoContentSelector(id);
  const content = useSelector(todoContentSelector);

  const dispatch = useDispatch();

  return (
    <li
      className="todoItem"
      onClick={() => {
        setTimeout(() => {
          dispatch({ type: ACTION_TYPES.DELETE, payload: id });
        }, 250);
      }}
    >
      {content}
    </li>
  );
};

const selectTodos = (state) => state.todos;

const TodoList = () => {
  console.log('TodoList is rendering...');

  const todos = useSelector(selectTodos);

  return (
    <ul className="todoList">
      {todos.length ? (
        todos.map((todo) => <Todo key={todo.id} id={todo.id} />)
      ) : (
        <p className="empty">No todos</p>
      )}
    </ul>
  );
};

export function HookedApp() {
  console.log('App is rendering...');

  return (
    <div className="app">
      <h2>HookedApp</h2>

      <StoreProvider store={store}>
        <TodoList />
      </StoreProvider>
    </div>
  );
}
