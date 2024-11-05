import { Metadata } from 'next';

import { LogoutButton } from '@/features/logout';

export const metadata = {
  title: 'Dashboard',
} satisfies Metadata;

const DashboardPage: React.FC = () => {
  return (
    <div className="flex grow bg-gray-100 px-5 py-4">
      <div className="container mx-auto grid place-content-center justify-items-center">
        <h1 className="pb-4 text-xl font-medium">Dashboard</h1>
        <LogoutButton />
      </div>
    </div>
  );
};

export default DashboardPage;
