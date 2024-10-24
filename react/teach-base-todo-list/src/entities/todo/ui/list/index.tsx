import * as React from 'react';
import cx from 'clsx';

import styles from './index.module.scss';

interface Props {
  children: React.ReactNode[];
  className?: string;
}

export const TodoList: React.FC<Props> = ({ children, className }) => {
  if (!children.length) {
    return <p className={cx(styles.empty, className)}>There is no items.</p>;
  }

  return <ul className={cx(styles.root, className)}>{children}</ul>;
};
