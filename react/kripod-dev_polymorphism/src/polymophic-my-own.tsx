import { Link } from './link';

type PolymorphicProps<
  C extends React.ElementType,
  OwnProps extends object = Record<PropertyKey, never>,
> = OwnProps &
  Omit<React.ComponentPropsWithoutRef<C>, keyof OwnProps | 'as'> & {
    as?: C;
  };

/* NOTE:
  If we want to narrow C as a specific union of allowed HTML element and React component types, we need to add:
  const Component = (as as React.ElementType) ?? 'button';
 */
const Button = <C extends React.ElementType = 'button'>({
  as,
  ...propsRest
}: PolymorphicProps<
  C,
  {
    className?: string;
    children?: React.ReactNode;
  }
>): React.ReactNode => {
  const Component = as ?? 'button';
  return <Component {...propsRest} />;
};

export const TestComponent: React.FC = () => {
  return (
    <div>
      <Button type="submit">HTML button</Button>
      <Button as="a" href="http://example.com/">
        HTML anchor
      </Button>
      <Button as={Link} href="http://example.com/" active>
        Link React component
      </Button>
    </div>
  );
};
