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
import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Badge } from '@/components/ui/badge';
import { Field } from '@/components/ui/fieldset';
import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Select } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Modal from '@/components/ui/Modal';
import {
  DateRangePicker,
  DonutChart,
  List,
  ListItem,
  SelectItem,
  Select as SelectTremor,
} from '@tremor/react';
import clsx from 'clsx';
import { FaCheck, FaX } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { refundDummyDataDefault as refundDummyData } from '../../mocks/data';
import { Metadata } from 'next';
import {
  callsBarChartOptions,
  freqBarChartOptions,
  agentList,
  callsBarChartData,
  freqBarChartData,
  people,
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
  const [moreTopLeadsModal, setMoreTopLeadsModal] = useState(false);
  const [topLeadDetailsModal, setTopLeadDetailsModal] = useState(false);

  const [topAgentDetailsModal, setTopAgentDetailsModal] = useState(false);
  const [selectedAgent] = useState<(typeof agentList)[0] | null>(null);

  const [topMotivationDetailsModal, setTopMotivationDetailsModal] =
    useState(false);
  const [selectedMotivation] = useState<string | null>(null);

  const [topObjectionDetailsModal, setTopObjectionDetailsModal] =
    useState(false);
  const [selectedObjection] = useState<string | null>(null);

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

                <div className="flex gap-5">
                  <div className="mb-10 flex-[2] overflow-hidden rounded-lg border bg-white shadow">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="mb-4 flex items-center gap-2">
                        <div className="text-lg font-medium">
                          Recent Requests
                        </div>
                        <div className="flex-1" />
                        <div className="mr-2">Sort by</div>
                        <Field>
                          <Select
                            name="status"
                            defaultValue="date-created-desc"
                          >
                            <option value="resolution-status-asc">
                              Resolution Status (Asc)
                            </option>
                            <option value="resolution-status-desc">
                              Resolution Status (Desc)
                            </option>
                            <option value="date-created-asc">
                              Date Created (Asc)
                            </option>
                            <option value="date-created-desc">
                              Date Created (Desc)
                            </option>
                            <option value="date-updated-asc">
                              Date Updated (Asc)
                            </option>
                            <option value="date-updated-desc">
                              Date Updated (Desc)
                            </option>
                            <option value="customer-name-asc">
                              Customer Name (Asc)
                            </option>
                            <option value="customer-name-desc">
                              Customer Name (Desc)
                            </option>
                            <option value="agent-assigned-asc">
                              Agent Assigned (Asc)
                            </option>
                            <option value="agent-assigned-desc">
                              Agent Assigned (Desc)
                            </option>
                            <option value="notes-asc">Notes (Asc)</option>
                            <option value="notes-desc">Notes (Desc)</option>
                          </Select>
                        </Field>
                      </div>
                      <Table wFull className="font-medium">
                        <TableHead>
                          <TableRow>
                            <TableHeader>Date Created</TableHeader>
                            <TableHeader>Date Updated</TableHeader>
                            <TableHeader>Customer</TableHeader>
                            <TableHeader>Agent Assigned</TableHeader>
                            <TableHeader>Details</TableHeader>
                            <TableHeader>Successfully Resolved</TableHeader>
                            <TableHeader />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {refundDummyData.slice(0, 5).map((lead, i) => (
                            <TableRow
                              key={lead.customerName + i}
                              onClick={() => {
                                // setTopLeadDetailsModal(true)
                              }}
                              className="hover:bg-flair-50/30 active:bg-flair-50/60 cursor-pointer select-none"
                            >
                              <TableCell>{lead.dateCreated}</TableCell>
                              <TableCell>{lead.dateUpdated}</TableCell>
                              <TableCell>
                                <div className="flex">
                                  <img
                                    src="/faces/blank-profile-picture.png"
                                    className="mr-2 h-6 w-6 rounded-full border text-gray-600 shadow-sm"
                                    aria-hidden="true"
                                    alt="Customer profile picture"
                                  />
                                  {lead.customerName}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex">
                                  <img
                                    src="/faces/blank-profile-picture.png"
                                    className="mr-2 h-6 w-6 rounded-full border text-gray-600 shadow-sm"
                                    aria-hidden="true"
                                    alt="Agent profile picture"
                                  />
                                  {lead.agentName}
                                </div>
                              </TableCell>
                              <TableCell>{lead.requestDetails}</TableCell>
                              <TableCell>
                                {lead.resolvedStatus ? (
                                  <div className="flex items-center gap-2">
                                    <Badge color="green">
                                      <FaCheck className="m-1 text-lg" />
                                    </Badge>
                                    <div>Yes</div>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <Badge color="zinc" className="text-xl">
                                      <FaX className="m-2 opacity-50" />
                                    </Badge>
                                    <div>No</div>
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                {/* <Button>Details</Button> */}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="mt-4">
                        <button
                          className="flair-btn-secondary btn-sm"
                          onClick={() => {}}
                        >
                          <span>More</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Details */}
      <Modal
        shown={topLeadDetailsModal}
        size="md"
        onClose={() => {
          // Clear modal
          setTopLeadDetailsModal(false);
        }}
        title="Lead Details"
      >
        <div>
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Lead Details
            </h3>
          </div>
          <div className="mt-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2">
              <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Full name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  Leslie Alexander
                </dd>
              </div>
              <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Main agent
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  Jack Smith
                </dd>
              </div>
              <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Contacts
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  <div>lesliealexander@mail.com</div>
                  <div>555-412</div>
                </dd>
              </div>
              <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Lead stage
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  <Badge color="green">Appointment Set</Badge>
                </dd>
              </div>
              <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Last Calls
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  <Table className="font-medium [--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
                    <TableHead>
                      <TableRow>
                        <TableHeader>Agent Name</TableHeader>
                        <TableHeader>Contact Date</TableHeader>
                        <TableHeader>Duration</TableHeader>
                        <TableHeader>Outcome</TableHeader>
                        <TableHeader>Sentiment</TableHeader>
                        <TableHeader>Call Score</TableHeader>
                        <TableHeader>Follow Ups</TableHeader>
                        <TableHeader />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>John Smith</TableCell>
                        <TableCell className="font-medium">
                          2023/12/1 12:20
                        </TableCell>
                        <TableCell>18:00</TableCell>
                        <TableCell>Answered</TableCell>
                        <TableCell>5/5</TableCell>
                        <TableCell>86/100</TableCell>
                        <TableCell>Meeting Scheduled</TableCell>
                        <TableCell>
                          <Button color="white">Details</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>John Smith</TableCell>
                        <TableCell className="font-medium">
                          2023/12/1 12:20
                        </TableCell>
                        <TableCell>1:00</TableCell>
                        <TableCell>Unanswered</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>Call Again</TableCell>
                        <TableCell>
                          <Button color="white">Details</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Modal>

      {/* More top leads */}
      <Modal
        shown={moreTopLeadsModal}
        size="md"
        onClose={() => {
          // Clear modal
          setMoreTopLeadsModal(false);
        }}
        title="Top Leads"
      >
        <h3 className="text-lg font-bold">Top Leads</h3>
        <div className="flex items-center border-b border-b-gray-100 pb-6">
          <div className="flex-1" />
          <div className="mr-2">by</div>
          <Field>
            <Select name="status">
              <option value="sentiment">Sentiment</option>
              <option value="interest-level">Interest Level</option>
              <option value="appointment-potential">
                Appointment Potential
              </option>
            </Select>
          </Field>
        </div>
        <ul role="list" className="divide-y divide-gray-100 rounded">
          {people.map(person => (
            <li
              key={person.email}
              className="flex items-center justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {person.name}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {person.score}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <Pagination>
          <PaginationPrevious />
          <PaginationList>
            <PaginationPage>1</PaginationPage>
            <PaginationPage>2</PaginationPage>
            <PaginationPage current>3</PaginationPage>
            <PaginationPage>4</PaginationPage>
            <PaginationGap />
            <PaginationPage>65</PaginationPage>
            <PaginationPage>66</PaginationPage>
          </PaginationList>
          <PaginationNext />
        </Pagination>
      </Modal>

      {/* Top Agent Details */}
      <Modal
        shown={topAgentDetailsModal}
        size="md"
        onClose={() => {
          // Clear modal
          setTopAgentDetailsModal(false);
        }}
        title="Agent Details"
      >
        {selectedAgent && (
          <div>
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Agent Details
              </h3>
            </div>
            <div className="mt-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2">
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Agent
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                    {selectedAgent.name}
                    <br />
                    agent1192@company.com
                  </dd>
                </div>
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Conversations
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                    {selectedAgent.conversations}
                  </dd>
                </div>
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Appointments
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                    {selectedAgent.appointments}
                  </dd>
                </div>
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Avg Conversations per Lead
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                    {selectedAgent.avgConversationsPerLead}
                  </dd>
                </div>
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Avg Quality Score
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                    <Badge
                      color={
                        selectedAgent.avgQualityScore < 80 ? 'orange' : 'green'
                      }
                    >
                      {selectedAgent.avgQualityScore}
                    </Badge>
                  </dd>
                </div>
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    List of Leads
                  </dt>
                  <ul className="mt-2 list-disc pl-5 text-sm">
                    <li>Johnathan Smith</li>
                    <li>Emily Johnson</li>
                    <li>Michael Brown</li>
                    <li>Ashley Davis</li>
                    <li>Christopher Wilson</li>
                  </ul>
                </div>
              </dl>
              <dl className="grid grid-cols-2">
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Top Areas Agent Did Well
                  </dt>
                  <ul className="mt-2 list-disc pl-5 text-sm">
                    <li>Empathy</li>
                    <li>Listening</li>
                    <li>Grammar</li>
                  </ul>
                </div>
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Top Areas of Improvement
                  </dt>
                  <ul className="mt-2 list-disc pl-5 text-sm">
                    <li>Greeting</li>
                    <li>Speed</li>
                  </ul>
                </div>
              </dl>
              <div className="mt-6">
                <h4 className="text-sm font-medium leading-6 text-gray-900">
                  Last Calls
                </h4>
                <Table className="mt-4 font-medium [--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
                  <TableHead>
                    <TableRow>
                      <TableHeader>Lead Name</TableHeader>
                      <TableHeader>Contact Date</TableHeader>
                      <TableHeader>Duration</TableHeader>
                      <TableHeader>Outcome</TableHeader>
                      <TableHeader>Sentiment</TableHeader>
                      <TableHeader>Call Score</TableHeader>
                      <TableHeader>Follow Ups</TableHeader>
                      <TableHeader />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Christopher Wilson</TableCell>
                      <TableCell className="font-medium">
                        2024/05/01 10:20
                      </TableCell>
                      <TableCell>15:00</TableCell>
                      <TableCell>Answered</TableCell>
                      <TableCell>5/5</TableCell>
                      <TableCell>90/100</TableCell>
                      <TableCell>Meeting Scheduled</TableCell>
                      <TableCell>
                        <Button color="white">Details</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Christopher Wilson</TableCell>
                      <TableCell className="font-medium">
                        2024/05/02 14:20
                      </TableCell>
                      <TableCell>05:00</TableCell>
                      <TableCell>Unanswered</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>Call Again</TableCell>
                      <TableCell>
                        <Button color="white">Details</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Top Motivation Details */}
      <Modal
        shown={topMotivationDetailsModal}
        size="md"
        onClose={() => {
          // Clear modal
          setTopMotivationDetailsModal(false);
        }}
        title="Motivation Details"
      >
        {selectedMotivation && (
          <div>
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                {selectedMotivation} Motivated Calls
              </h3>
            </div>
            <div className="mt-6">
              <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
                <TableHead>
                  <TableRow>
                    <TableHeader>Lead Name</TableHeader>
                    <TableHeader>Intent Level</TableHeader>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>Agent Name</TableHeader>
                    <TableHeader>Motivation</TableHeader>
                    <TableHeader />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    {
                      leadName: 'Mark Wein',
                      intentLevel: 'High',
                      date: '2024-05-10',
                      agentName: 'Jane Smith',
                      motivation: selectedMotivation,
                      summary:
                        'Looking for a bigger home for his growing family.',
                    },
                    {
                      leadName: 'Mary Johnson',
                      intentLevel: 'Medium',
                      date: '2024-05-11',
                      agentName: 'Mark Wein',
                      motivation: selectedMotivation,
                      summary: 'Interested in investing in real estate.',
                    },
                    {
                      leadName: 'William Brown',
                      intentLevel: 'Low',
                      date: '2024-05-12',
                      agentName: 'Emily Davis',
                      motivation: selectedMotivation,
                      summary: 'Needs more space due to remote work.',
                    },
                    {
                      leadName: 'Olivia Smith',
                      intentLevel: 'High',
                      date: '2024-05-13',
                      agentName: 'Michael Johnson',
                      motivation: selectedMotivation,
                      summary: 'Wants to move to a safer neighborhood.',
                    },
                    {
                      leadName: 'James Lee',
                      intentLevel: 'Medium',
                      date: '2024-05-14',
                      agentName: 'David Wilson',
                      motivation: selectedMotivation,
                      summary: 'Looking for a home near good schools.',
                    },
                  ].map((call, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex">
                          <img
                            src="/faces/blank-profile-picture.png"
                            className="mr-2 h-6 w-6 rounded-full border text-gray-600 shadow-sm"
                            aria-hidden="true"
                            alt="Lead profile picture"
                          />
                          {call.leadName}
                        </div>
                      </TableCell>
                      <TableCell>{call.intentLevel}</TableCell>
                      <TableCell>{call.date}</TableCell>
                      <TableCell>
                        <div className="flex">
                          <img
                            src="/faces/blank-profile-picture.png"
                            className="mr-2 h-6 w-6 rounded-full border text-gray-600 shadow-sm"
                            aria-hidden="true"
                            alt="Agent profile picture"
                          />
                          {call.agentName}
                        </div>
                      </TableCell>
                      <TableCell>{call.motivation}</TableCell>
                      <TableCell>
                        <Button color="white">Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </Modal>

      {/* Top Objection Details */}
      <Modal
        shown={topObjectionDetailsModal}
        size="md"
        onClose={() => {
          // Clear modal
          setTopObjectionDetailsModal(false);
        }}
        title="Objection Details"
      >
        {selectedObjection && (
          <div>
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                {selectedObjection} Objections
              </h3>
            </div>
            <div className="mt-6">
              <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
                <TableHead>
                  <TableRow>
                    <TableHeader>Lead Name</TableHeader>
                    <TableHeader>Intent Level</TableHeader>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>Agent Name</TableHeader>
                    <TableHeader>Objection</TableHeader>
                    <TableHeader />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    {
                      leadName: 'Robert Lee',
                      intentLevel: 'High',
                      date: '2024-05-15',
                      agentName: 'Jessica Davis',
                      objection: selectedObjection,
                      summary:
                        'Concerns about the price being too high for the area.',
                    },
                    {
                      leadName: 'Sophia Martinez',
                      intentLevel: 'Medium',
                      date: '2024-05-16',
                      agentName: 'Michael Brown',
                      objection: selectedObjection,
                      summary: 'Worried about the condition of the house.',
                    },
                    {
                      leadName: 'James Walker',
                      intentLevel: 'Low',
                      date: '2024-05-17',
                      agentName: 'Emily Johnson',
                      objection: selectedObjection,
                      summary: 'Finding the commute to work too long.',
                    },
                    {
                      leadName: 'Olivia Garcia',
                      intentLevel: 'High',
                      date: '2024-05-18',
                      agentName: 'John Smith',
                      objection: selectedObjection,
                      summary: 'Unsure about the neighborhood safety.',
                    },
                    {
                      leadName: 'William Rodriguez',
                      intentLevel: 'Medium',
                      date: '2024-05-19',
                      agentName: 'David Wilson',
                      objection: selectedObjection,
                      summary: 'Thinks the size of the property is inadequate.',
                    },
                  ].map((call, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex">
                          <img
                            src="/faces/blank-profile-picture.png"
                            className="mr-2 h-6 w-6 rounded-full border text-gray-600 shadow-sm"
                            aria-hidden="true"
                            alt="Lead profile picture"
                          />
                          {call.leadName}
                        </div>
                      </TableCell>
                      <TableCell>{call.intentLevel}</TableCell>
                      <TableCell>{call.date}</TableCell>
                      <TableCell>
                        <div className="flex">
                          <img
                            src="/faces/blank-profile-picture.png"
                            className="mr-2 h-6 w-6 rounded-full border text-gray-600 shadow-sm"
                            aria-hidden="true"
                            alt="Agent profile picture"
                          />
                          {call.agentName}
                        </div>
                      </TableCell>
                      <TableCell>{call.objection}</TableCell>
                      <TableCell>
                        <Button color="white">Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Overview;
