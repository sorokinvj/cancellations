// file: app/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import '@/app/globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Intermediary',
  description: 'Intermediary application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
