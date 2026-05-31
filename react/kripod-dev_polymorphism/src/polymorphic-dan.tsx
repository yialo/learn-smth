import { Link } from './link';

type PolymorphicProps<C extends React.ElementType, OwnProps = {}> = OwnProps & {
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof OwnProps | 'as'>;

type TextProps<C extends React.ElementType = 'span'> = PolymorphicProps<
  C,
  {
    size?: 'sm' | 'md' | 'lg';
    weight?: 'normal' | 'medium' | 'bold';
  }
>;

function Text<C extends React.ElementType = 'span'>({
  as,
  size = 'md',
  weight = 'normal',
  children,
  ...props
}: TextProps<C>) {
  const Component = as || 'span';
  return (
    <Component className={`text-${size} font-${weight}`} {...props}>
      {children}
    </Component>
  );
}

export const TestComponent: React.FC = () => {
  return (
    <>
      <Text>Default span</Text>
      <Text as="h1" size="lg" weight="bold">
        Page Title
      </Text>
      <Text as="a" href="/about">
        About us
      </Text>
      <Text as="label" htmlFor="email" size="sm">
        Email
      </Text>
      <Text as={Link} href="http://example.com/" active>
        Link React component
      </Text>
    </>
  );
};
