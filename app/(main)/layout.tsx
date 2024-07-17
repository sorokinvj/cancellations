// file: app/(main)/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import ClientLayout from '@/components/Layout/Layout';

export const metadata: Metadata = {
  title: 'Proxz',
  description: 'Proxz application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
