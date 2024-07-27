import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
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
  const {
    trigger,
    watch,
    formState: { errors },
  } = useFormContext();

  const dirtyForm = Object.keys(errors).length > 0;

  const handleClick = async () => {
    const successfullyResolved = watch('successfullyResolved');
    if (successfullyResolved === null || successfullyResolved === undefined) {
      await trigger('successfullyResolved');
    } else {
      setResolveModal(true);
    }
  };

  return (
    <>
      <div>
        <Button
          outline={true}
          className="flex items-center whitespace-nowrap"
          onClick={handleClick}
        >
          <IoIosPaper />
          Report
        </Button>
        {dirtyForm && <p className="text-red-500 text-sm mt-1">fix errors</p>}
      </div>
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
