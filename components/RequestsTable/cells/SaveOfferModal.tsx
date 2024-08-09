import React, { useState, useMemo } from 'react';
import { Modal, Button } from '@/components/ui/';
import { Select as SelectTremor, SelectItem } from '@tremor/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Markdown from 'react-markdown';
import { IoMdSave } from 'react-icons/io';
import { Request, RequestStatus, SaveOffer } from '@/lib/db/schema';
import { updateRequest } from '@/lib/api/request';
import { getTenants } from '@/lib/api/tenant';
import Spinner from '@/components/ui/spinner';
import { markdownComponents } from '@/utils/md.utils';

interface SaveOfferModalProps {
  isVisible: boolean;
  request: Request;
  closeModal: () => void;
}

const SaveOfferModal: React.FC<SaveOfferModalProps> = ({
  isVisible,
  request,
  closeModal,
}) => {
  const [selectedOfferId, setSelectedOfferId] = useState('');
  const { data: tenants } = useQuery({
    queryKey: ['tenants'],
    queryFn: getTenants,
  });
  const offers = tenants?.find(
    t => t.id === request.providerTenantId,
  )?.saveOffers;

  const mutation = useMutation({
    mutationFn: (offer: SaveOffer) => {
      const updatedRequest = {
        ...request,
        status: 'Save Offered' as RequestStatus,
        saveOffer: { ...offer, dateOffered: new Date().toISOString() },
      };
      return updateRequest(updatedRequest);
    },
    onSettled: () => {
      closeModal();
    },
  });

  const selectedOffer = useMemo(() => {
    return offers?.find(o => o.id === selectedOfferId) || null;
  }, [selectedOfferId, offers]);

  const handleSelectChange = (value: string) => {
    setSelectedOfferId(value);
  };

  const handleConfirm = () => {
    if (selectedOffer) {
      mutation.mutate(selectedOffer);
    }
  };

  const options = offers?.map(offer => ({
    value: offer.id,
    label: offer.title,
  }));

  return (
    <Modal shown={isVisible} onClose={closeModal} title="Save Offer">
      <div className="space-y-4">
        <p className="text-gray-600 mb-4">
          Choose a save offer to retain this customer. The selected offer will
          be applied to their account.
        </p>

        <SelectTremor
          enableClear={false}
          className="w-60"
          placeholder="Select an offer"
          value={selectedOfferId}
          onValueChange={handleSelectChange}
        >
          {options?.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectTremor>
        {selectedOffer && (
          <div className="prose prose-sm w-full break-words">
            <Markdown
              className="prose prose-sm"
              components={markdownComponents}
            >
              {selectedOffer.description}
            </Markdown>
          </div>
        )}
        <div className="flex justify-end space-x-4">
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={handleConfirm} color="blue">
            {mutation.isPending ? (
              <Spinner color="white" />
            ) : (
              <>
                <IoMdSave className="text-xl" /> Confirm Offer
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SaveOfferModal;
