import React, { useState, useMemo } from 'react';
import { Modal, Button } from '@/components/ui/';
import { Select as SelectTremor, SelectItem } from '@tremor/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Markdown from 'react-markdown';
import { IoMdSave } from 'react-icons/io';
import { Request } from '@/lib/db/schema';
import { updateRequest } from '@/lib/api/request';
import { getTenants } from '@/lib/api/tenant';
import { Components } from 'react-markdown';

interface SaveOfferModalProps {
  isVisible: boolean;
  request: Request;
  closeModal: () => void;
}

const PreComponent: Components['pre'] = ({ children, ...props }) => {
  return (
    <pre className="whitespace-pre-wrap break-words overflow-x-auto" {...props}>
      {children}
    </pre>
  );
};

const CodeComponent: Components['code'] = ({
  className,
  children,
  ...props
}) => {
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

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
    mutationFn: updateRequest,
  });

  const selectedOffer = useMemo(() => {
    return offers?.find(o => o.id === selectedOfferId) || null;
  }, [selectedOfferId, offers]);

  const handleSelectChange = (value: string) => {
    setSelectedOfferId(value);
  };

  const handleConfirm = () => {
    if (selectedOffer) {
      mutation.mutate({
        ...request,
        saveOffer: {
          ...selectedOffer,
          dateOffered: new Date().toISOString(),
        },
      });
    }
  };

  const options = offers?.map(offer => ({
    value: offer.id,
    label: offer.title,
  }));

  const markdownComponents: Components = {
    p: ({ children, ...props }) => (
      <p
        style={{ overflowWrap: 'break-word', wordWrap: 'break-word' }}
        {...props}
      >
        {children}
      </p>
    ),
    pre: PreComponent,
    code: CodeComponent,
    ul: ({ children, ...props }) => (
      <ul className="list-disc pl-4" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal pl-4" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="mb-1" {...props}>
        {children}
      </li>
    ),
  };

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
            <IoMdSave className="text-xl" /> Confirm Offer
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SaveOfferModal;
