export const Link: React.FC<
  React.ComponentPropsWithoutRef<'a'> & {
    active?: boolean;
  }
> = (props) => {
  return <a {...props} />;
};
