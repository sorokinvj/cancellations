import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { SaveOffer } from '@/lib/db/schema';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

interface EditModalProps {
  isVisible: boolean;
  offer: SaveOffer | null;
  onClose: () => void;
  onSave: (offer: Partial<SaveOffer>) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isVisible,
  offer,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (offer) {
      setTitle(offer.title);
      setDescription(offer.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [offer]);

  const handleSave = () => {
    onSave({
      id: offer?.id,
      title,
      description,
    });
    onClose();
  };

  return (
    <Modal
      shown={isVisible}
      onClose={onClose}
      title={offer ? 'Edit Save Offer' : 'Create New Save Offer'}
      size="lg"
      footer={
        <>
          <Button color="zinc" onClick={onClose}>
            Cancel
          </Button>
          <Button color="blue" onClick={handleSave}>
            {offer ? 'Update' : 'Create'}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <SimpleMDE
            value={description}
            onChange={setDescription}
            options={{
              spellChecker: true,
              placeholder: 'Enter description (supports markdown)',
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
