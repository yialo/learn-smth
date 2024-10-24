import * as React from 'react';

import { TodoList, TodoItem, Todo, readTodos } from '@/entities/todo';
import { toggleTodoCompletionById } from '@/features/toggle-todo-completion';
import '@/shared/ui/style.css';
import { AddTodo, addTodo } from '@/features/add-todo';
import { RemoveTodoButton, removeTodo } from '@/features/remove-todo';

import styles from './index.module.scss';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [isFetchingInProgress, setIsFetchingInProgress] = React.useState(false);
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setIsFetchingInProgress(true);
      const newTodos = await readTodos();
      setTodos(newTodos);
      setIsFetchingInProgress(false);
      setIsDataLoaded(true);
    })();
  }, []);

  const isLoaderVisible = isFetchingInProgress && !isDataLoaded;
  const isTodoListVisible = !isFetchingInProgress && isDataLoaded;

  return (
    <div>
      <h1 className={styles.title}>Todo list</h1>
      <AddTodo
        className={styles.addTodo}
        onAdd={(newTodo) => {
          setTodos(addTodo(todos, newTodo));
        }}
      />
      {isLoaderVisible && 'Loading...'}
      {isTodoListVisible && (
        <TodoList>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              item={todo}
              endSlot={
                <RemoveTodoButton
                  onRemove={() => {
                    setTodos((prevTodos) => removeTodo(prevTodos, todo.id));
                  }}
                />
              }
              onCompletionToggle={() => {
                setTodos((prevTodos) =>
                  toggleTodoCompletionById(prevTodos, todo.id),
                );
              }}
            />
          ))}
        </TodoList>
      )}
    </div>
  );
};
