'use client';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  RadioGroup,
} from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';
import { FaChevronDown, FaPlus } from 'react-icons/fa6';
import { CiCircleCheck } from 'react-icons/ci';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, Fieldset, Label } from '@/components/ui/fieldset';
import { Input } from '@/components/ui/input';

const Settings: React.FC<{}> = () => {
  const [activeTab, setActiveTab] = useState('My Account');

  const tabs = [
    { name: 'My Account', current: activeTab === 'My Account' },
    { name: 'Team', current: activeTab === 'Team' },
    { name: 'Billing', current: activeTab === 'Billing' },
  ];

  const handleTabClick = (tabName: string) => {
    window.scrollTo(0, 0);
    setActiveTab(tabName);
  };

  const people = [
    {
      name: 'Michael Foster',
      email: 'michael.foster@flaircomp.com',
      role: 'Project Owner',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
      dateCreated: '3 months ago',
    },
    {
      name: 'Dries Vincent',
      email: 'dries.vincent@flaircomp.com',
      role: 'View Only',
      imageUrl: '/faces/blank-profile-picture.png',
      lastSeen: null,
      dateCreated: '1 month ago',
    },
    {
      name: 'Lindsay Walton',
      email: 'lindsay.walton@flaircomp.com',
      role: 'View Only',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
      dateCreated: '5 months ago',
    },
    {
      name: 'Adam Smith',
      email: 'adam.smith@flaircomp.com',
      role: 'View Only',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
      dateCreated: '2 weeks ago',
    },
  ];

  return (
    <div className="flex w-full">
      {/* Main View */}
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        {/* Row: Header */}
        <div className="flex h-[72px] flex-none items-center border-b bg-white px-[20px]">
          <div className="text-[24px] font-bold">Settings</div>
          <div className="flex-1" />
        </div>
        {/* Row: Content */}
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
                            ? 'border-flair-500 text-flair-600'
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
                  <div className="my-5">
                    <Fieldset>
                      <FieldGroup>
                        <Field>
                          <Label>Name</Label>
                          <Input name="name" disabled value={''} />
                        </Field>
                      </FieldGroup>
                      <FieldGroup>
                        <Field>
                          <Label>Email</Label>
                          <Input name="email" disabled value={''} />
                        </Field>
                      </FieldGroup>
                      <FieldGroup>
                        <Field>
                          <Label>Organization</Label>
                          <Input name="email" disabled value={'Flair Labs'} />
                        </Field>
                      </FieldGroup>
                      {/* <FieldGroup>
                          <Field>
                            <Label>Projects</Label>
                            <div className="mt-2">
                              <Button
                                onClick={() => {
                                  setOpenProjects(true)
                                }}>
                                Select Project
                              </Button>
                            </div>
                          </Field>
                        </FieldGroup> */}
                    </Fieldset>
                  </div>
                )}
                {activeTab === 'Integrations' && (
                  <div className="h-full w-full overflow-hidden py-8">
                    <div className="mb-5">
                      Effortlessly transmit parsed data in real-time to your
                      favorite services like Google Sheets, seamlessly
                      integrating with AWS, GCP, Azure, HubSpot, Pipedrive, and
                      Calendar.
                    </div>
                    <div className="rounded-box mb-3 flex flex-wrap gap-4 overflow-x-auto py-2">
                      <div className="flex h-[200px] w-[300px] shrink-0 flex-col items-start rounded-md border bg-white px-5 py-3">
                        <div className="mb-3 flex w-full items-center">
                          <img
                            src="/images/data-sources/s3.svg"
                            width={30}
                            height={30}
                            className="mr-2"
                          />
                          <div className="text-center font-bold">AWS</div>
                          <div className="flex-1" />
                          <button
                            className="flair-btn-secondary btn-sm"
                            onClick={() => {
                              /* Connect AWS functionality */
                            }}
                          >
                            <span>Connect</span>
                          </button>
                        </div>
                        <div className="text-sm">
                          Effortlessly transmit parsed data in real-time to your
                          preferred Amazon Web Services (AWS), enhancing your
                          data integration capabilities and ensuring a smooth
                          flow of information.
                        </div>
                      </div>

                      <div className="flex h-[200px] w-[300px] shrink-0 flex-col items-start rounded-md border bg-white px-5 py-3">
                        <div className="mb-3 flex w-full items-center">
                          <img
                            src="/images/data-sources/gcp.svg"
                            width={30}
                            height={30}
                            className="mr-2"
                          />
                          <div className="text-center font-bold">GCP</div>
                          <div className="flex-1" />
                          <button
                            className="flair-btn-secondary btn-sm"
                            onClick={() => {
                              /* Connect GCP functionality */
                            }}
                          >
                            <span>Connect</span>
                          </button>
                        </div>
                        <div className="text-sm">
                          Connect Flair with Google Cloud Platform (GCP) to
                          streamline data export processes. Easily send parsed
                          data to GCP with a few clicks, enhancing collaboration
                          and data management.
                        </div>
                      </div>

                      <div className="flex h-[200px] w-[300px] shrink-0 flex-col items-start rounded-md border bg-white px-5 py-3">
                        <div className="mb-3 flex w-full items-center">
                          <img
                            src="/images/data-sources/azure.svg"
                            width={30}
                            height={30}
                            className="mr-2"
                          />
                          <div className="text-center font-bold">Azure</div>
                          <div className="flex-1" />
                          <button
                            className="flair-btn-secondary btn-sm"
                            onClick={() => {
                              /* Connect Azure functionality */
                            }}
                          >
                            <span>Connect</span>
                          </button>
                        </div>
                        <div className="text-sm">
                          Integrate Flair with Microsoft Azure for seamless data
                          export processes. With just a few clicks, send parsed
                          data to Azure, enhancing your data integration
                          capabilities and workflow efficiency.
                        </div>
                      </div>

                      <div className="flex h-[200px] w-[300px] shrink-0 flex-col items-start rounded-md border bg-white px-5 py-3">
                        <div className="mb-3 flex w-full items-center">
                          <img
                            src="/images/data-sources/google-sheets.svg"
                            width={20}
                            height={20}
                            className="mr-2"
                          />
                          <div className="text-center font-bold">
                            Google Sheets
                          </div>
                          <div className="flex-1" />
                          <button
                            className="flair-btn-secondary btn-sm"
                            onClick={() => {
                              /* Connect Google Sheets functionality */
                            }}
                          >
                            <span>Connect</span>
                          </button>
                        </div>
                        <div className="text-sm">
                          Integrate Flair with Google Sheets for a streamlined
                          data export process. With just a few clicks, you can
                          easily send parsed data to your Google Sheets,
                          enhancing collaboration and data management.
                        </div>
                      </div>

                      <div className="flex h-[200px] w-[300px] shrink-0 flex-col items-start rounded-md border bg-white px-5 py-3">
                        <div className="mb-3 flex w-full items-center">
                          <img
                            src="/images/data-sources/hubspot.svg"
                            width={30}
                            height={30}
                            className="mr-2"
                          />
                          <div className="text-center font-bold">HubSpot</div>
                          <div className="flex-1" />
                          <button
                            className="flair-btn-secondary btn-sm"
                            onClick={() => {
                              /* Connect HubSpot functionality */
                            }}
                          >
                            <span>Connect</span>
                          </button>
                        </div>
                        <div className="text-sm">
                          Connect Flair with HubSpot to automate data transfer
                          and streamline your marketing and sales processes.
                          Ensure seamless communication between your parsing
                          tool and HubSpot for enhanced efficiency.
                        </div>
                      </div>

                      <div className="flex h-[200px] w-[300px] shrink-0 flex-col items-start rounded-md border bg-white px-5 py-3">
                        <div className="mb-3 flex w-full items-center">
                          <img
                            src="/images/data-sources/pipedrive.svg"
                            width={30}
                            height={30}
                            className="mr-2"
                          />
                          <div className="text-center font-bold">Pipedrive</div>
                          <div className="flex-1" />
                          <button
                            className="flair-btn-secondary btn-sm"
                            onClick={() => {
                              /* Connect Pipedrive functionality */
                            }}
                          >
                            <span>Connect</span>
                          </button>
                        </div>
                        <div className="text-sm">
                          Streamline your sales processes by connecting Flair
                          with Pipedrive. Effortlessly transfer parsed data to
                          Pipedrive, ensuring that your sales team has access to
                          accurate and up-to-date information.
                        </div>
                      </div>

                      <div className="flex h-[200px] w-[300px] shrink-0 flex-col items-start rounded-md border bg-white px-5 py-3">
                        <div className="mb-3 flex w-full items-center">
                          <img
                            src="/images/data-sources/calendar.svg"
                            width={30}
                            height={30}
                            className="mr-2"
                          />
                          <div className="text-center font-bold">Calendar</div>
                          <div className="flex-1" />
                          <button
                            className="flair-btn-secondary btn-sm"
                            onClick={() => {
                              /* Connect Calendar functionality */
                            }}
                          >
                            <span>Connect</span>
                          </button>
                        </div>
                        <div className="text-sm">
                          Integrate Flair with your calendar applications for
                          real-time updates. Whether you use Google Calendar or
                          other calendar services, easily send parsed data to
                          keep your schedule organized and up-to-date.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'Billing' && <Pricing />}
                {activeTab === 'Team' && (
                  <div className="flex w-full flex-col items-center justify-center p-5">
                    <div className="mb-4 flex w-[750px] max-w-full">
                      <div className="flex-1" />
                      <Button color="white">
                        <FaPlus />
                        Invite
                      </Button>
                    </div>
                    <ul
                      role="list"
                      className="w-[750px] max-w-full divide-y divide-gray-100 border-y border-gray-100"
                    >
                      {people.map(person => (
                        <li
                          key={person.email}
                          className="flex items-center py-5"
                        >
                          <div className="flex shrink-0 gap-x-4">
                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xl font-bold text-gray-600">
                              {person.name
                                ?.split(' ')
                                .map(word => word.charAt(0).toUpperCase())
                                .join('')}
                            </div>
                            <div className="min-w-0 flex-auto">
                              <p className="text-md font-semibold leading-6 text-gray-900">
                                {person.name}
                              </p>
                              <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                                {person.email} · Added {person.dateCreated}
                              </p>
                            </div>
                          </div>
                          <div className="flex-1" />
                          <div className="flex items-center gap-2">
                            <Badge
                              className="shrink-0"
                              color={
                                person.role === 'Project Owner'
                                  ? 'fuchsia'
                                  : 'sky'
                              }
                            >
                              <div className="text-md shrink-0 break-keep">
                                {person.role === 'Project Owner'
                                  ? 'Admin'
                                  : 'User'}
                              </div>
                            </Badge>
                            {/* Dropdown Menu */}
                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <div>
                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-inset hover:bg-gray-50">
                                  <FaChevronDown
                                    className="-mr-1 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </MenuButton>
                              </div>
                              <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none">
                                <MenuItem>
                                  {({ active }) => (
                                    <button
                                      className={clsx(
                                        active
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-700',
                                        'block w-full px-4 py-2 text-left text-sm',
                                      )}
                                    >
                                      Change Role
                                    </button>
                                  )}
                                </MenuItem>
                                <MenuItem>
                                  {({ active }) => (
                                    <button
                                      className={clsx(
                                        active
                                          ? 'bg-gray-100 text-red-900'
                                          : 'text-red-700',
                                        'block w-full px-4 py-2 text-left text-sm',
                                      )}
                                    >
                                      Remove from Project
                                    </button>
                                  )}
                                </MenuItem>
                              </MenuItems>
                            </Menu>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annually', priceSuffix: '/year' },
] as const;

const tiers = [
  {
    name: 'Free',
    id: 'tier-free',
    href: '#',
    price: { monthly: '$0', annually: '$0' },
    description: "The essentials to try Flair's power.",
    features: ['1 Data Source', '1 Schema', '10 rows per month'],
    featured: false,
    cta: 'Current Plan',
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '#',
    price: { monthly: '$200', annually: '$2200' },
    description: 'A plan that scales with your rapidly growing business.',
    features: [
      'Unlimited data sources',
      'Unlimited schemas',
      'Unlimited data destinations',
      '1 AI Agent',
      '1000 rows per month',
      'Slack channel support',
    ],
    featured: false,
    cta: 'Buy plan',
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    price: 'Custom',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited data processing',
      'Unlimited AI agents',
      'Custom onboarding',
      'Priority support',
    ],
    featured: false,
    cta: 'Contact sales',
  },
];

function Pricing() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <div className="flex justify-center py-6">
      <div className="max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-7 max-w-4xl text-center">
          <h2 className="text-flair-600 text-base font-semibold leading-7">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pricing plans for teams of&nbsp;all&nbsp;sizes
          </p>
        </div>

        <div className="flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">
              Payment frequency
            </RadioGroup.Label>
            {frequencies.map(option => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  clsx(
                    checked ? 'bg-flair-600 text-white' : 'text-gray-500',
                    'cursor-pointer rounded-full px-2.5 py-1',
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map(tier => (
            <div
              key={tier.id}
              className={clsx(
                tier.featured
                  ? 'bg-gray-900 ring-gray-900'
                  : 'bg-white ring-gray-200',
                'rounded-3xl p-8 ring-1 xl:p-10',
              )}
            >
              <h3
                id={tier.id}
                className={clsx(
                  tier.featured ? 'text-white' : 'text-gray-900',
                  'text-lg font-semibold leading-8',
                )}
              >
                {tier.name}
              </h3>
              <p
                className={clsx(
                  tier.featured ? 'text-gray-300' : 'text-gray-600',
                  'mt-4 text-sm leading-6',
                )}
              >
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span
                  className={clsx(
                    tier.featured ? 'text-white' : 'text-gray-900',
                    'text-4xl font-bold tracking-tight',
                  )}
                >
                  {typeof tier.price === 'string'
                    ? tier.price
                    : tier.price[frequency.value]}
                </span>
                {typeof tier.price !== 'string' ? (
                  <span
                    className={clsx(
                      tier.featured ? 'text-gray-300' : 'text-gray-600',
                      'text-sm font-semibold leading-6',
                    )}
                  >
                    {frequency.priceSuffix}
                  </span>
                ) : null}
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={clsx(
                  tier.featured
                    ? 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'
                    : 'bg-flair-600 hover:bg-flair-500 focus-visible:outline-flair-600 text-white shadow-sm',
                  'mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                )}
              >
                {tier.cta}
              </a>
              <ul
                role="list"
                className={clsx(
                  tier.featured ? 'text-gray-300' : 'text-gray-600',
                  'mt-8 space-y-3 text-sm leading-6 xl:mt-10',
                )}
              >
                {tier.features.map(feature => (
                  <li key={feature} className="flex gap-x-3">
                    <CiCircleCheck
                      className={clsx(
                        tier.featured ? 'text-white' : 'text-flair-600',
                        'h-6 w-5 flex-none',
                      )}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
