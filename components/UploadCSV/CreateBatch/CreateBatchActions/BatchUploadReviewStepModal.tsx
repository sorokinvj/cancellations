import React from 'react';
import Spinner from '@/components/ui/spinner'; // Assuming this exists based on other UI components
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';

export const BatchUploadReviewStepModal = () => {
  const onClose = () => {};
  return (
    <Modal shown={true} onClickBackdrop={onClose} size="md">
      <h3 className="mb-4 text-lg font-bold">Review items</h3>
      <div className="flex flex-col items-center space-y-4 pb-3">
        <Spinner />
        <p className="text-center">Review items</p>
      </div>
      <div className="mt-6 flex justify-end space-x-2">
        <Button outline={true} onClick={onClose}>
          Cancel
        </Button>
        <Button>Confirm</Button>
      </div>
    </Modal>
  );
};
