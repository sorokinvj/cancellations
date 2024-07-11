import { Metadata } from 'next';
import Settings from '@/components/Settings/Settings';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function SettingsPage() {
  return <Settings />;
}
