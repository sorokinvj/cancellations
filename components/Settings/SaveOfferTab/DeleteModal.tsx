import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { SaveOffer } from '@/lib/db/schema';

interface DeleteModalProps {
  isVisible: boolean;
  offer: SaveOffer | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isVisible,
  offer,
  onClose,
  onDelete,
}) => {
  if (!offer) return null;

  const handleDelete = () => {
    onDelete(offer.id);
    onClose();
  };

  return (
    <Modal
      shown={isVisible}
      onClose={onClose}
      title="Delete Save Offer"
      size="sm"
      footer={
        <>
          <Button color="zinc" onClick={onClose}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center text-center">
        <FaExclamationTriangle className="text-yellow-500 text-4xl mb-4" />
        <p className="mb-4">Are you sure you want to delete this save offer?</p>
        <p className="font-semibold">{offer.title}</p>
      </div>
    </Modal>
  );
};

export default DeleteModal;
