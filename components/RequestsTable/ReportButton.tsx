// components/RequestsTable/ReportButton.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosPaper } from 'react-icons/io';
import ResolveModal from './ResolveModal';
import { Request } from '@/lib/db/schema';

interface ReportButtonProps {
  request: Request;
  handleSubmitReport: (request: Request) => void;
}

const ReportButton: React.FC<ReportButtonProps> = ({
  request,
  handleSubmitReport,
}) => {
  const [resolveModal, setResolveModal] = useState(false);

  return (
    <>
      <Button
        outline={true}
        className="flex items-center whitespace-nowrap"
        onClick={() => setResolveModal(true)}
      >
        <IoIosPaper />
        Report
      </Button>
      <ResolveModal
        shown={resolveModal}
        request={request}
        closeModal={() => setResolveModal(false)}
        handleSubmit={handleSubmitReport}
      />
    </>
  );
};

export default ReportButton;
