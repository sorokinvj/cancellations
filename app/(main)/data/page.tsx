import { Metadata } from 'next';
import Data from '@/components/Data/Data';

export const metadata: Metadata = {
  title: 'Requests',
};

export default function DataPage() {
  return <Data />;
}
