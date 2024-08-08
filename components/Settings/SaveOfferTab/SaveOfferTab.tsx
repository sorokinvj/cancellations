import { Button } from '@/components/ui/button';
import { SaveOffer } from '@/lib/db/schema';
import { useState } from 'react';
import { FaEdit, FaMinus, FaPlus } from 'react-icons/fa';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  createSaveOffer,
  updateSaveOffer,
  deleteSaveOffer,
} from '@/lib/api/tenant';

type SaveOffersTabProps = {
  isAdmin: boolean;
  offers?: SaveOffer[];
  tenantId: string;
};

const SaveOffersTab: React.FC<SaveOffersTabProps> = ({
  isAdmin,
  offers = [],
  tenantId,
}) => {
  const [selectedOffer, setSelectedOffer] = useState<SaveOffer | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (newOffer: Partial<SaveOffer>) =>
      createSaveOffer(tenantId, newOffer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      toast.success('Offer created successfully', { duration: 2000 });
      closeEditingModal();
    },
    onError: (error: Error) => {
      toast.error(`Failed to create offer: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedOffer: SaveOffer) =>
      updateSaveOffer(tenantId, updatedOffer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      toast.success('Offer updated successfully', { duration: 2000 });
      closeEditingModal();
    },
    onError: (error: Error) => {
      toast.error(`Failed to update offer: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (offerId: string) => deleteSaveOffer(tenantId, offerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      toast.success('Offer deleted successfully', { duration: 2000 });
      closeEditingModal();
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete offer: ${error.message}`);
    },
  });

  const handleCreateNewOffer = () => {
    setIsEditModalVisible(true);
  };

  const handleEditOffer = (offer: SaveOffer) => {
    setSelectedOffer(offer);
    setIsEditModalVisible(true);
  };

  const closeEditingModal = () => {
    setIsEditModalVisible(false);
    setSelectedOffer(null);
  };

  const handleDeleteClick = (offer: SaveOffer) => {
    setSelectedOffer(offer);
    setIsDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setSelectedOffer(null);
  };

  const onDelete = (id: string) => {
    setSelectedOffer(null);
    console.log(`Deleting offer with id: ${id}`);
    deleteMutation.mutate(id);
  };

  const onSave = (offer: Partial<SaveOffer>) => {
    if (offer.id) {
      updateMutation.mutate(offer as SaveOffer);
    } else {
      createMutation.mutate(offer);
    }
  };

  return (
    <div className="h-full w-full py-8">
      <div className="flex flex-col gap-4">
        <Button onClick={handleCreateNewOffer}>
          <FaPlus /> Create New
        </Button>
        {offers.map(offer => (
          <div key={offer.id} className="flex flex-col gap-2">
            <div>
              <span className="text-md font-semibold leading-6 text-gray-900">
                {offer.title}
              </span>
              {isAdmin && (
                <>
                  <Button color="indigo" onClick={() => handleEditOffer(offer)}>
                    <FaEdit /> <span>Edit</span>
                  </Button>
                  <Button color="red" onClick={() => handleDeleteClick(offer)}>
                    <FaMinus />
                    <span>Delete</span>
                  </Button>
                </>
              )}
            </div>
            <div>
              <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                {offer.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <DeleteModal
        isVisible={isDeleteModalVisible}
        offer={selectedOffer}
        onClose={closeDeleteModal}
        onDelete={onDelete}
      />
      <EditModal
        isVisible={isEditModalVisible}
        offer={selectedOffer}
        onClose={closeEditingModal}
        onSave={onSave}
      />
    </div>
  );
};

export default SaveOffersTab;
