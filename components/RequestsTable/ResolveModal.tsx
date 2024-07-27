import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Modal from '../ui/Modal';
import { Request } from '@/lib/db/schema';
import { Button } from '@/components/ui/button';
import UserInfoCard from './UserInfoCard';
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from 'react-icons/io';
import useFirebase from '@/hooks/useFirebase';
import { parseErrorMessage } from '@/utils/helpers';
import { useRouter } from 'next/navigation';

interface Props {
  shown: boolean;
  request: Request;
  closeModal: () => void;
  handleSubmit: (request: Request) => void;
}

const ResolveModal: FC<Props> = ({ shown, request, closeModal }) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const successfullyResolved = watch('successfullyResolved');
  const declineReason = watch('declineReason');
  const { updateRequestDocument } = useFirebase({ collectionName: 'requests' });

  if (!shown) return null;

  const getResolveStatus = () => {
    if (successfullyResolved === true) {
      return {
        icon: (
          <IoMdCheckmarkCircleOutline className="text-green-500 text-4xl" />
        ),
        message: "You're about to mark this request as Successfully Resolved",
        description:
          "This indicates that the customer's issue has been addressed satisfactorily.",
        color: 'bg-green-100 border-green-500 text-green-700',
      };
    }
    if (successfullyResolved === false) {
      return {
        icon: <IoMdCloseCircleOutline className="text-red-500 text-4xl" />,
        message: "You're about to mark this request as Declined",
        description:
          "This indicates that the customer's issue could not be resolved to their satisfaction.",
        color: 'bg-red-100 border-red-500 text-red-700',
      };
    }
  };

  const resolveStatus = getResolveStatus();

  const onSubmit = async (e: React.FormEvent) => {
    try {
      setIsSubmitting(true);
      e.preventDefault();
      const newData: Request = {
        ...request,
        successfullyResolved,
        dateResponded: new Date().toISOString(),
        status: successfullyResolved ? 'Canceled' : 'Declined',
        declineReason: successfullyResolved ? null : declineReason,
      };
      await updateRequestDocument(newData);
      closeModal();
      router.refresh();
    } catch (error) {
      setSubmitError(parseErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      shown={shown}
      onClose={closeModal}
      title="Confirm Request Resolution"
      size="md"
      footer={
        <div className="flex justify-end space-x-4">
          <Button color="blue" onClick={onSubmit} loading={isSubmitting}>
            Confirm and Report
          </Button>
          <Button outline onClick={closeModal}>
            Cancel
          </Button>
        </div>
      }
    >
      <UserInfoCard request={request} />
      <div
        className={`mt-6 border-l-4 p-4 flex items-start space-x-4 ${resolveStatus?.color}`}
        role="alert"
      >
        {resolveStatus?.icon}
        <div>
          <p className="font-bold">{resolveStatus?.message}</p>
          <p className="mt-1">{resolveStatus?.description}</p>
          {successfullyResolved === false && declineReason && (
            <p className="mt-2 font-semibold">
              Decline Reason:{' '}
              <span className="font-normal">{declineReason}</span>
            </p>
          )}
        </div>
      </div>
      {errors.successfullyResolved && (
        <p className="text-red-500 text-sm mt-2">
          {errors.successfullyResolved?.message as string}
        </p>
      )}
      <div
        className="mt-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4"
        role="alert"
      >
        <p className="font-bold">Important</p>
        <p>
          Please review the resolution status carefully. Once submitted, this
          report cannot be modified.
        </p>
      </div>

      {submitError && (
        <p className="text-red-500 text-sm mt-2">{submitError}</p>
      )}
    </Modal>
  );
};

export default ResolveModal;
