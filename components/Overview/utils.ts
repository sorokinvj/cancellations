import { getRandomNumber } from '@/utils/general';
import { ChartData } from 'chart.js';
import { ComponentProps } from 'react';
import { Bar, Line } from 'react-chartjs-2';

export const callsBarChartOptions: ComponentProps<typeof Bar>['options'] = {
  plugins: {
    title: {
      display: false,
      text: 'Chart.js Bar Chart - Stacked',
    },
    legend: {
      display: true,
      onClick() {},
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      grid: {
        display: false,
      },
    },
  },
};

export const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
    score: '4.8',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
    score: '4.75',
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    role: 'Business Relations',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: null,
    score: '4.75',
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
    score: '4.71',
  },
  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    role: 'Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
    score: '4.70',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    role: 'Director of Product',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: null,
    score: '4.6',
  },
];

export const chartLabels = [
  '10/8',
  '10/9',
  '10/10',
  '10/11',
  '10/12',
  '10/13',
  '10/14',
  '10/15',
  '10/16',
  '10/17',
  '10/18',
  '10/19',
  '10/20',
  '10/21',
  '10/22',
  '10/23',
  '10/24',
  '10/25',
  '10/26',
  '10/27',
  '10/28',
  '10/29',
  '10/30',
  '10/31',
  '11/1',
  '11/2',
  '11/3',
  '11/4',
  '11/5',
  '11/6',
];

export const callsBarChartData: ChartData<'bar', number[], string> = {
  labels: chartLabels,
  datasets: [
    {
      label: 'Requests',
      data: chartLabels.map(() => getRandomNumber(0, 250)),
      backgroundColor: '#548ea6',
    },
  ],
};

export const agentList = [
  {
    name: 'John Smith',
    conversations: 78,
    appointments: 23,
    avgConversationsPerLead: 3.39,
    avgQualityScore: 98,
  },
  {
    name: 'Emily Johnson',
    conversations: 85,
    appointments: 30,
    avgConversationsPerLead: 2.83,
    avgQualityScore: 94,
  },
  {
    name: 'Michael Brown',
    conversations: 92,
    appointments: 28,
    avgConversationsPerLead: 3.29,
    avgQualityScore: 87,
  },
  {
    name: 'Jessica Davis',
    conversations: 67,
    appointments: 22,
    avgConversationsPerLead: 3.05,
    avgQualityScore: 77,
  },
  {
    name: 'David Wilson',
    conversations: 74,
    appointments: 25,
    avgConversationsPerLead: 2.96,
    avgQualityScore: 75,
  },
];

export const callFlowList = [
  {
    flow: ['rapport building', 'search criteria', 'objections', 'follow-ups'],
    conversations: 100,
    appointments: 50,
    conversionRate: 0,
  },
  {
    flow: ['search criteria', 'objections', 'end call'],
    conversations: 300,
    appointments: 5,
    conversionRate: 0,
  },
  {
    flow: ['introduction', 'needs analysis', 'product presentation', 'closing'],
    conversations: 150,
    appointments: 40,
    conversionRate: 0,
  },
  {
    flow: ['greeting', 'rapport building', 'qualifying', 'next steps'],
    conversations: 200,
    appointments: 30,
    conversionRate: 0,
  },
  {
    flow: ['initial contact', 'discovery', 'solution proposal', 'objections'],
    conversations: 120,
    appointments: 25,
    conversionRate: 0,
  },
];

callFlowList.forEach(flow => {
  flow.conversionRate = Number(
    (flow.appointments / flow.conversations).toFixed(2),
  );
});

export const freqBarChartData: ChartData<'line', number[], string> = {
  labels: [
    '12 AM',
    '1 AM',
    '2 AM',
    '3 AM',
    '4 AM',
    '5 AM',
    '6 AM',
    '7 AM',
    '8 AM',
    '9 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '1 PM',
    '2 PM',
    '3 PM',
    '4 PM',
    '5 PM',
    '6 PM',
    '7 PM',
    '8 PM',
    '9 PM',
    '10 PM',
    '11 PM',
  ],
  datasets: [
    {
      label: 'Requests',
      data: [
        1,
        2,
        0,
        0,
        0,
        0, // 0-5
        0,
        0,
        5,
        20,
        18,
        25, // 6-11
        30,
        35,
        40,
        60,
        90,
        110, // 12-17
        150,
        155, // 18-19 peak
        100,
        50,
        20,
        5, // 20-23
      ],
      fill: true,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export const freqBarChartOptions: ComponentProps<typeof Line>['options'] = {
  plugins: {
    title: {
      display: false,
      text: 'Calls by Time of Day',
    },
    legend: {
      display: true,
      onClick() {},
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      // stacked: false,
      title: {
        display: true,
        text: 'Time of Day',
      },
    },
    y: {
      // stacked: false,
      title: {
        display: true,
        text: 'Number of Calls',
      },
      ticks: {
        stepSize: 1,
      },
    },
  },
};

export const scoreLineChartOptions: ComponentProps<typeof Line>['options'] = {
  plugins: {
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
    legend: {
      display: true,
      onClick() {},
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: false,
      // min: 0,
      // max: 5,
    },
    y: {
      stacked: false,
      grid: {
        display: false,
      },
      min: 0,
      max: 5,
    },
  },
};
