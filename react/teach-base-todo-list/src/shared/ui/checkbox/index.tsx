import * as React from 'react';
import cx from 'clsx';

import styles from './index.module.scss';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  className,
}) => {
  return (
    <input
      type="checkbox"
      id={id}
      className={cx(styles.root, className)}
      checked={checked}
      onChange={onChange}
    />
  );
};
