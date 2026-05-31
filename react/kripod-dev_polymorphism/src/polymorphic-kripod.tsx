import { clsx } from 'clsx/lite';

import { DistributiveOmit } from './distributive';

type Merge<T, U> = DistributiveOmit<T, keyof U> & U;

type MyButtonElementType = React.ElementType<any, 'a' | 'button'>;

type MyButtonProps<T extends MyButtonElementType = 'button'> = Merge<
  // Prevent overriding `as` prop
  React.ComponentPropsWithoutRef<T> & { as?: never },
  {
    as?: T;
  }
>;

export function MyButton<T extends MyButtonElementType = 'button'>({
  as,
  className,
  ...propsRest
}: MyButtonProps<T>): React.ReactNode {
  const Component = as ?? 'button';

  return <Component className={clsx(className, 'my-button')} {...propsRest} />;
}

export const TestComponent: React.FC = () => {
  return (
    <div>
      <MyButton type="submit">HTML button</MyButton>
      <MyButton as="a" href="http://example.com/">
        HTML anchor
      </MyButton>
    </div>
  );
};
