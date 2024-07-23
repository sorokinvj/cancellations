import { FC } from 'react';
import Modal from '../ui/Modal'; // Update the import path as needed
import { Request } from '@/lib/db/schema';
import { Button } from '@/components/ui/button';
import UserInfoCard from './UserInfoCard';

interface Props {
  shown: boolean;
  request: Request;
  closeModal: () => void;
  handleSubmit: (request: Request) => void;
}

const ResolveModal: FC<Props> = ({
  shown,
  request,
  closeModal,
  handleSubmit,
}) => {
  if (!shown) return null;
  console.log('ResolveModal', request);
  return (
    <Modal
      shown={shown}
      onClose={closeModal}
      title="Resolve Request"
      size="md"
      footer={
        <div className="flex justify-end space-x-4">
          <Button color="blue" onClick={() => handleSubmit(request)}>
            Report
          </Button>
          <Button outline onClick={closeModal}>
            Cancel
          </Button>
        </div>
      }
    >
      <UserInfoCard request={request} />
      <div
        className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
        role="alert"
      >
        <p className="font-bold">Warning</p>
        <p>
          You are about to report this request. Once submitted, it cannot be
          changed.
        </p>
      </div>
    </Modal>
  );
};

export default ResolveModal;
