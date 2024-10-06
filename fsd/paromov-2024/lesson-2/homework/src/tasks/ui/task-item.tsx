export const TaskItem = ({
  title,
  actions,
}: {
  title: string;
  actions: React.ReactNode;
}) => {
  return (
    <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>
      {actions}
      <div>{title}</div>
    </div>
  );
};
