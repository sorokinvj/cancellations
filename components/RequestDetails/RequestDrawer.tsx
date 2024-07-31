// file: components/RequestDrawer/RequestDrawer.tsx
'use client';
import { useMemo, useReducer } from 'react';
import { Request } from '@/lib/db/schema';
import RequestActions from '../RequestDetails/RequestActions';
import RequestCard from '../RequestDetails/RequestCard';
import { Drawer } from '../ui/drawer';
import { useAuth } from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';

interface RequestDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  request: Request | null;
}

const RequestDrawer: React.FC<RequestDrawerProps> = ({
  isOpen,
  onClose,
  request,
}) => {
  const { userData } = useAuth();
  const { tenantType, tenantId } = userData || {};

  const isActionNeeded = useMemo(() => {
    return (
      (tenantType === 'proxy' &&
        (request?.declineReason || request?.status === 'Save Offered')) ||
      (tenantType === 'provider' &&
        (request?.status === 'Save Accepted' ||
          request?.status === 'Save Declined'))
    );
  }, [tenantType, request]);

  const [isWidgetVisible, closeWidget] = useReducer(
    () => false,
    isActionNeeded !== undefined,
  );

  const queryClient = useQueryClient();

  const onFix = () => {
    closeWidget();
    onClose();
    queryClient.invalidateQueries({
      queryKey: ['requests', tenantType, tenantId],
    });
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Request Details">
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <div className="flex flex-col space-y-4 h-full flex-1">
          {isWidgetVisible && request && (
            <RequestActions
              action="fixDeclineReason"
              request={request}
              onFix={onFix}
            />
          )}
          <RequestCard request={request} />
        </div>
      </div>
    </Drawer>
  );
};

export default RequestDrawer;
