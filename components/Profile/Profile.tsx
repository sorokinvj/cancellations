// components/Profile.tsx
'use client';

import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import { auth } from '@/lib/firebase/config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Profile: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { userData } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'same-origin',
      });
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!userData) return null;

  const bgColorMap = {
    proxy: 'bg-orange-100',
    provider: 'bg-green-100',
  };

  return (
    <li className={`relative ${bgColorMap[userData.tenantType]}`}>
      <button
        className="relative text-md group flex items-center gap-x-3 rounded-md p-2 font-semibold text-gray-700 hover:text-flair-700 focus:outline-none w-full"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <FaUser className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="truncate">{userData.email}</span>
      </button>
      {showDropdown && (
        <div className="absolute right-0 bottom-full w-full bg-white border border-gray-200 rounded-md shadow-lg py-2 mb-1">
          <div className="px-4 py-2">
            <div className="flex items-center gap-x-2 text-gray-600">
              <span className="font-bold">{userData.name}</span>
            </div>
            <div className="flex items-center gap-x-2 text-gray-600 mt-1">
              <span>{userData.tenantName}</span>
            </div>
          </div>
          <hr className="my-2" />
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-md text-gray-700 hover:bg-flair-50 hover:text-flair-700"
          >
            Sign out
          </button>
        </div>
      )}
    </li>
  );
};

export default Profile;