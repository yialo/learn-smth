import * as React from 'react';
import cx from 'clsx';
import { Checkbox } from '@/shared/ui/checkbox';
import { Todo } from '../../config';

import styles from './index.module.scss';

interface Props {
  item: Todo;
  onCompletionToggle: () => void;
  endSlot?: React.ReactElement;
}

export const TodoItem: React.FC<Props> = ({
  item,
  endSlot,
  onCompletionToggle,
}) => {
  const checkboxId = React.useId();

  return (
    <li
      className={cx(styles.root, {
        [styles.root_completed]: item.isCompleted,
      })}
    >
      <Checkbox
        id={checkboxId}
        checked={item.isCompleted}
        onChange={onCompletionToggle}
      />
      <label className={styles.label} htmlFor={checkboxId}>
        {item.text}
      </label>
      <div className={styles.endSlot}>{endSlot}</div>
    </li>
  );
};
