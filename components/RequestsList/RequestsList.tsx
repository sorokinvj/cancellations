// file: components/RequestsList/RequestsList.tsx
import { Request } from '@/lib/db/schema';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@tremor/react';
import { IoIosPaper } from 'react-icons/io';
import RequestsTable from '@/components/RequestsTable/RequestsTable';

const RequestsList: React.FC<{ requests: Request[] }> = ({ requests }) => {
  return (
    <div className="flex w-full">
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <div className="flex h-[72px] flex-none items-center justify-between gap-2 border-b bg-white px-[20px]">
          <h1 className="truncate">Requests</h1>

          <div className="flex items-center gap-2">
            <Button
              outline={true}
              className="flex items-center whitespace-nowrap"
            >
              <IoIosPaper />
              Report Selected
            </Button>
            <DateRangePicker className="z-30 mx-auto max-w-sm" />
          </div>
        </div>
        <div className="p-4 flex flex-col space-y-4">
          <RequestsTable requests={requests} />
        </div>
      </div>
    </div>
  );
};

export default RequestsList;
