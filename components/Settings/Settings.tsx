'use client';
import clsx from 'clsx';
import { useState } from 'react';
import MyAccountTab from './MyAccountTab';
import { useAuth } from '@/hooks/useAuth';
import { getTenants } from '@/lib/api/tenant';
import { useQuery } from '@tanstack/react-query';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('My Account');
  const { userData } = useAuth();
  const { data: tenants } = useQuery({
    queryKey: ['tenants'],
    queryFn: getTenants,
  });
  const tenantName = tenants?.find(t => t.id === userData?.tenantId)?.name;

  const tabs = [{ name: 'My Account', current: activeTab === 'My Account' }];

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  if (!userData) return null;

  return (
    <div className="flex w-full">
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <div className="flex h-[72px] flex-none items-center border-b bg-white px-[20px]">
          <div className="text-[24px] font-bold">Settings</div>
        </div>
        <div className="flex-1 overflow-scroll bg-white">
          <div className="mx-auto w-full px-4">
            <div className="mb-10 mt-6 overflow-hidden border bg-white shadow sm:rounded-lg">
              <div className="p-6">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map(tab => (
                      <div
                        key={tab.name}
                        onClick={() => handleTabClick(tab.name)}
                        className={clsx(
                          tab.current
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                          'cursor-pointer whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium',
                        )}
                        aria-current={tab.current ? 'page' : undefined}
                      >
                        {tab.name}
                      </div>
                    ))}
                  </nav>
                </div>
                {activeTab === 'My Account' && (
                  <MyAccountTab userData={userData} tenantName={tenantName} />
                )}
                {/* {activeTab === 'Team' && <MyTeamTab people={people} />} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
