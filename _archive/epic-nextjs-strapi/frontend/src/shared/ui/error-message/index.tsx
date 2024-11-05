export const ErrorMessage: React.FC<{
  error:
    | string[]
    | {
        message: string;
      }
    | string
    | undefined;
}> = ({ error }) => {
  if (!error) return null;

  if (Array.isArray(error)) {
    return (
      <div>
        {error.map((err, i) => {
          return (
            <div key={i} className="py-1 text-xs italic text-pink-500">
              {err}
            </div>
          );
        })}
      </div>
    );
  }

  if (typeof error === 'string') {
    return <div className="py-1 text-xs italic text-pink-500">{error}</div>;
  }

  if (typeof error === 'object') {
    return (
      <div className="py-1 text-xs italic text-pink-500">{error.message}</div>
    );
  }
};
