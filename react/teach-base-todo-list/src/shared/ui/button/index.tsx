import * as React from 'react';
import cx from 'clsx';

import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const Button: React.FC<Props> = ({
  children,
  className,
  type = 'button',
  onClick,
}) => {
  return (
    <button
      className={cx(styles.root, className)}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
