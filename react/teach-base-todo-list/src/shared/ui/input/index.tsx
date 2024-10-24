import * as React from 'react';
import cx from 'clsx';

import styles from './index.module.scss';

interface InputProps {
  value: string;
  onChange: (v: string) => void;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ value, onChange, className }) => {
  return (
    <input
      type="text"
      className={cx(styles.root, className)}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
  );
};
