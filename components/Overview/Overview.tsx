'use client';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  DateRangePicker,
  DonutChart,
  List,
  ListItem,
  SelectItem,
  Select as SelectTremor,
} from '@tremor/react';
import clsx from 'clsx';
import { Metadata } from 'next';
import {
  callsBarChartOptions,
  freqBarChartOptions,
  callsBarChartData,
  freqBarChartData,
} from './utils';
import { useAuth } from '@/hooks/useAuth';

export const metadata: Metadata = {
  title: 'Overview',
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  LineElement,
  Filler,
);

const Overview: React.FC = () => {
  const { userData } = useAuth();

  const stats = [
    { name: 'Requests', stat: '5,231' },
    {
      name: 'Unique Sources',
      stat: '6',
    },
    {
      name: 'Resolved',
      stat: '3,199',
      donut: (
        <DonutChart
          data={[{ amount: 3199 }, { amount: 5231 - 3199 }]}
          category="amount"
          index="name"
          className="h-14 w-14"
          showLabel={false}
          showTooltip={false}
          colors={['blue', 'slate-200']}
        />
      ),
    },
    {
      name: 'More Info Needed',
      stat: '993',
      donut: (
        <DonutChart
          data={[{ amount: 993 }, { amount: 5231 - 993 }]}
          category="amount"
          index="name"
          className="h-14 w-14"
          showLabel={false}
          showTooltip={false}
          colors={['blue', 'slate-200']}
        />
      ),
    },
    { name: 'Avg Time to Resolution', stat: '2d' },
  ];

  const data = [
    {
      name: 'Rocket Money',
      amount: 6730,
      share: '32.1%',
      color: 'bg-orange-500',
    },
    {
      name: 'Bill.com',
      amount: 4120,
      share: '19.6%',
      color: 'bg-blue-500',
    },
    {
      name: 'Bank of America',
      amount: 3920,
      share: '18.6%',
      color: 'bg-red-500',
    },
    {
      name: 'Customer Call',
      amount: 2000,
      share: '10%',
      color: 'bg-purple-500',
    },
    {
      name: 'Other',
      amount: 1000,
      share: '5.3%',
      color: 'bg-gray-500',
    },
  ];

  const currencyFormatter = (number: number) => {
    return Intl.NumberFormat('us').format(number).toString();
  };

  return (
    <>
      <div className="flex w-full bg-white">
        {/* Main View */}
        <div className="flex h-screen flex-1 flex-col overflow-hidden">
          {/* Row: Header */}
          <div className="flex h-[72px] flex-none items-center gap-2 border-b bg-white px-[20px]">
            <div className="text-2xl font-bold">Overview</div>
            <div className="flex-1" />
            <DateRangePicker className="w-30 z-30" />
            <SelectTremor
              enableClear={false}
              className="z-30 w-52"
              defaultValue="1"
            >
              <SelectItem value="1">All Sources</SelectItem>
            </SelectTremor>
            <SelectTremor
              enableClear={false}
              className="z-30 w-52"
              defaultValue="1"
            >
              <SelectItem value="1">All Request Types</SelectItem>
            </SelectTremor>
          </div>
          {/* Row: Content */}
          <div className="flex flex-1 overflow-scroll">
            <div className="relative h-full w-full overflow-hidden">
              <img
                src="/images/purple-gradient.svg"
                className="absolute right-0 top-0 h-[600px]"
                alt="Purple gradient"
              />
              <div className="absolute z-10 mx-auto h-full w-full max-w-[1600px] overflow-scroll p-8">
                <div className="mb-3 text-2xl">👋 Hello, {userData?.name}</div>
                {/* Stats */}
                <div className="mb-10">
                  <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-5">
                    {stats.map(item => (
                      <div
                        key={item.name}
                        className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
                      >
                        <div className="flex items-center">
                          <div className="flex-1">
                            <dt className="truncate text-sm font-medium text-gray-500">
                              {item.name}
                            </dt>
                            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                              {item.stat}
                            </dd>
                          </div>
                          <div className="">{item.donut}</div>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Chart */}
                <div className="flex gap-5">
                  <div className="mb-10 flex-[2] overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:p-6">
                      <div>
                        <div className="mb-2 text-lg font-medium">
                          Request Volume by Day
                        </div>
                      </div>
                      <div className="flex min-h-80 items-center justify-center">
                        <Bar
                          options={callsBarChartOptions}
                          data={callsBarChartData}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart Row 2 */}
                <div className="flex gap-5">
                  <div className="mb-10 flex flex-[1] overflow-hidden rounded-lg bg-white shadow">
                    <div className="flex w-full flex-col px-4 py-5 sm:p-6">
                      <div className="mb-4 flex items-center gap-2">
                        <div className="text-lg font-medium">
                          Avg Request Volume by Time of the Day
                        </div>
                        <div className="flex-1" />
                      </div>
                      <div className="flex-1">
                        <Line
                          options={freqBarChartOptions}
                          data={freqBarChartData}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-10 flex h-[350px] flex-[1] overflow-hidden rounded-lg bg-white shadow">
                    <div className="flex flex-1 flex-col px-4 py-5 sm:p-6">
                      <div>
                        <div className="mb-2 text-lg font-medium">Sources</div>
                      </div>

                      <div className="flex flex-1 items-center gap-3">
                        <div className="flex-1">
                          <DonutChart
                            data={data}
                            category="amount"
                            index="name"
                            valueFormatter={currencyFormatter}
                            showTooltip={false}
                            colors={['orange', 'blue', 'red', 'purple', 'gray']}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-tremor-label text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
                            <span>Category</span>
                            <span>Amount / Share</span>
                          </p>
                          <List className="">
                            {data.map(item => (
                              <ListItem key={item.name} className="space-x-6">
                                <div className="flex items-center space-x-2.5 truncate">
                                  <span
                                    className={clsx(
                                      item.color,
                                      'h-2.5 w-2.5 shrink-0 rounded-sm',
                                    )}
                                    aria-hidden={true}
                                  />
                                  <span className="dark:text-dark-tremor-content-emphasis truncate">
                                    {item.name}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium tabular-nums">
                                    {item.amount}
                                  </span>
                                  <span className="rounded-tremor-small bg-tremor-background-subtle text-tremor-label text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis px-1.5 py-0.5 font-medium tabular-nums">
                                    {item.share}
                                  </span>
                                </div>
                              </ListItem>
                            ))}
                          </List>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
