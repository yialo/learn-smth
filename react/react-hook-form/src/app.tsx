import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  topLevelField: z.string().min(1, 'This field is required'),
  nestedRequiredObject: z.object({
    name: z.string().min(1, 'This field is required'),
    age: z.string().refine((val) => {
      const asNumber = Number.parseInt(val);
      return Number.isInteger(asNumber) && asNumber > 0;
    }),
  }),
  nestedOptionalObject: z.object({
    description: z.string().optional(),
    hasBread: z.boolean().optional(),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const getDefaultValues = (): FormValues => {
  return {
    topLevelField: '',
    nestedRequiredObject: {
      name: '',
      age: '',
    },
    // NOTE: if these field are not defined, they will be defaulted to standard empty values for corresponding types:
    // { name: '', age: false }
    // Look like this is a feature of `form.register()` method.
    nestedOptionalObject: {},
  };
};

export const App: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  const { errors } = form.formState;

  const values = form.watch();
  console.log('values', values);

  const renderError = (error: unknown) => {
    if (
      error === null ||
      typeof error !== 'object' ||
      !('message' in error) ||
      typeof error.message !== 'string'
    )
      return null;
    return <span className="field__error">{error.message}</span>;
  };

  return (
    <div>
      <title>Learn: react-hook-form</title>
      <h1>Form</h1>

      <form
        className="form"
        onSubmit={form.handleSubmit((data) => {
          console.log('form.handleSubmit', data);
        })}
      >
        <label className="field">
          <span className="field__line">
            topLevelField
            <input {...form.register('topLevelField')} />
          </span>
          {renderError(errors.topLevelField)}
        </label>

        <fieldset className="fieldset">
          <legend>nestedRequiredObject</legend>

          <label className="field">
            <span className="field__line">
              name
              <input {...form.register('nestedRequiredObject.name')} />
            </span>
            {renderError(errors.nestedRequiredObject?.name)}
          </label>

          <label className="field">
            <span className="field__line">
              age
              <input {...form.register('nestedRequiredObject.age')} />
            </span>
            {renderError(errors.nestedRequiredObject?.age)}
          </label>
        </fieldset>

        <fieldset className="fieldset">
          <legend>nestedOptionalObject</legend>

          <label className="field">
            <span className="field__line">
              description
              <input {...form.register('nestedOptionalObject.description')} />
            </span>
            {renderError(errors.nestedOptionalObject?.description)}
          </label>

          <label className="field">
            <span className="field__line">
              hasBread
              <input
                type="checkbox"
                {...form.register('nestedOptionalObject.hasBread')}
              />
            </span>
            {renderError(errors.nestedOptionalObject?.hasBread)}
          </label>
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
