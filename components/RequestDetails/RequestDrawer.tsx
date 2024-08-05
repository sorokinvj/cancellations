// file: components/RequestDrawer/RequestDrawer.tsx
'use client';
import { useMemo, useReducer } from 'react';
import { Request, RequestWithLog } from '@/lib/db/schema';
import RequestActions from '../RequestDetails/RequestActions';
import RequestCard from '../RequestDetails/RequestCard';
import { Drawer } from '../ui/drawer';
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import RequestHistory from '../RequestHistory/RequestHistory';
import { getRequest } from '@/lib/api/request';

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

  const { data: requestWithLog, isLoading: isLogLoading } =
    useQuery<RequestWithLog>({
      queryKey: ['request', request?.id, tenantType, tenantId],
      queryFn: () => getRequest({ id: request?.id, tenantType, tenantId }),
      enabled: isOpen && !!request?.id && !!tenantType && !!tenantId,
    });

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
          <RequestHistory request={requestWithLog} isLoading={isLogLoading} />
        </div>
      </div>
    </Drawer>
  );
};

export default RequestDrawer;