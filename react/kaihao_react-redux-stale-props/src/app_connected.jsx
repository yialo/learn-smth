import { connect } from './store-utils/connect/nested-subscription-driven';
import { StoreProvider } from './store-utils/store-provider/nested-subscription-driven';
import { store, ACTION_TYPES } from './store';

const Todo = ({ id, content, dispatch }) => {
  console.log('Todo is rendering...');

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

const mapTodoStateToProps = (state, ownProps) => ({
  content: state.todos.find((todo) => todo.id === ownProps.id).content,
});

const TodoContainer = connect(mapTodoStateToProps)(Todo);

const TodoList = ({ todos }) => {
  console.log('TodoList is rendering...');

  return (
    <ul className="todoList">
      {todos.length ? (
        todos.map((todo) => <TodoContainer key={todo.id} id={todo.id} />)
      ) : (
        <p className="empty">No todos</p>
      )}
    </ul>
  );
};

const mapTodoListStateToProps = (state) => ({
  todos: state.todos,
});

const TodoListContainer = connect(mapTodoListStateToProps)(TodoList);

export function ConnectedApp() {
  console.log('App is rendering...');

  return (
    <div className="app">
      <h2>ConnectedApp</h2>

      <StoreProvider store={store}>
        <TodoListContainer />
      </StoreProvider>
    </div>
  );
}
