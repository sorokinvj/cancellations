import React from 'react';
import { Metadata } from 'next';
import Overview from '@/components/Overview/Overview';

export const metadata: Metadata = {
  title: 'Overview',
};

const Page: React.FC = () => {
  return <Overview />;
};

export default Page;
