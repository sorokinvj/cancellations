import { Button, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import clsx from 'clsx';
import { Badge, Menu } from 'lucide-react';
import { FC } from 'react';
import { FaPlus, FaChevronDown } from 'react-icons/fa';

const MyTeamTab: FC = () => {
  const people = [
    {
      name: 'Michael Foster',
      email: 'michael.foster@bluecomp.com',
      role: 'Project Owner',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
      dateCreated: '3 months ago',
    },
    {
      name: 'Dries Vincent',
      email: 'dries.vincent@bluecomp.com',
      role: 'View Only',
      imageUrl: '/faces/blank-profile-picture.png',
      lastSeen: null,
      dateCreated: '1 month ago',
    },
    {
      name: 'Lindsay Walton',
      email: 'lindsay.walton@bluecomp.com',
      role: 'View Only',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
      dateCreated: '5 months ago',
    },
    {
      name: 'Adam Smith',
      email: 'adam.smith@bluecomp.com',
      role: 'View Only',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
      dateCreated: '2 weeks ago',
    },
  ];

  return (
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
          <li key={person.email} className="flex items-center py-5">
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
                color={person.role === 'Project Owner' ? 'fuchsia' : 'sky'}
              >
                <div className="text-md shrink-0 break-keep">
                  {person.role === 'Project Owner' ? 'Admin' : 'User'}
                </div>
              </Badge>
              {/* Dropdown Menu */}
              <Menu className="relative inline-block text-left">
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
                </MenuItems>
              </Menu>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTeamTab;
