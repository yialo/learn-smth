'use client';

import { BugIcon } from '@/shared/ui/icons';

const RootError: React.FC<{
  error: Error;
}> = ({ error }) => {
  return (
    <div className="grid min-h-screen grid-cols-[600px] place-content-center bg-gray-100 dark:bg-gray-900">
      <div className="space-y-4">
        <BugIcon className="h-24 w-24 text-pink-500 dark:text-pink-400" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Oops! Something went wrong.
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          This is an error page. Please try again later.
        </p>
        <p className="italic text-pink-800">{error.message}</p>
      </div>
    </div>
  );
};

export default RootError;
