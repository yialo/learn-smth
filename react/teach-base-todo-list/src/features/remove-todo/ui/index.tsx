import * as React from 'react';
import clsx from 'clsx';
import { Button } from '@/shared/ui/button';

import styles from './index.module.scss';

interface Props {
  onRemove: () => void;
  className?: string;
}

export const RemoveTodoButton: React.FC<Props> = ({ className, onRemove }) => {
  return (
    <Button
      className={clsx(styles.root, className)}
      aria-label="Remove todo"
      onClick={onRemove}
    >
      <span className={styles.cross} aria-hidden />
    </Button>
  );
};
