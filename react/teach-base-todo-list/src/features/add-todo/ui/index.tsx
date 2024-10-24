import * as React from 'react';
import cx from 'clsx';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Todo } from '@/entities/todo';
import { createNewTodo } from '../model';
import styles from './index.module.scss';

interface Props {
  onAdd: (todo: Todo) => void;
  className?: string;
}

export const AddTodo: React.FC<Props> = ({ className, onAdd }) => {
  const [queryString, setQueryString] = React.useState('');

  return (
    <div className={cx(styles.root, className)}>
      <Input
        className={styles.field}
        value={queryString}
        onChange={setQueryString}
      />
      <Button
        onClick={() => {
          const newTodo = createNewTodo(queryString);
          onAdd(newTodo);
          setQueryString('');
        }}
      >
        Add
      </Button>
    </div>
  );
};
