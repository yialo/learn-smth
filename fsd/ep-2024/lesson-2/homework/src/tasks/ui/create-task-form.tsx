import * as React from 'react';

export function CreateTaskForm({
  onCreate,
}: {
  onCreate: (title: string) => void;
}) {
  const [value, setValue] = React.useState('');
  const id = React.useId();
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onCreate(value);
        setValue('');
      }}
    >
      <label htmlFor={id}>Create task input</label>
      <input id={id} type="text" value={value} onChange={handleChange} />
      <button>Create Task</button>
    </form>
  );
}
