import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { fetchGlobalAppMetadata, fetchGlobalData } from '@/shared/api';
import { cn } from '@/shared/lib/cn';
import { PageFooter } from '@/widgets/page-footer';
import { PageHeader } from '@/widgets/page-header';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const globalAppMetadata = await fetchGlobalAppMetadata();
  const { title, description } = globalAppMetadata;

  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await fetchGlobalData();

  return (
    <html lang="en" className="h-full">
      <body className={cn('flex h-full flex-col', inter.className)}>
        <PageHeader data={globalData.header} />
        {children}
        <PageFooter className="mt-auto" data={globalData.footer} />
      </body>
    </html>
  );
}
