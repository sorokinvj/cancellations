import { CustomerInfoField, Request } from '@/lib/db/schema';
import FixCustomerInfo from './FixCustomerInfo';

const RequestActions: React.FC<{
  action: string;
  request: Request;
  onFix: () => void;
}> = ({ action, request, onFix }) => {
  if (action === 'fixDeclineReason' && request?.declineReason) {
    const declineReasonMap: Record<string, CustomerInfoField> = {
      'Wrong Customer Name': 'customerName',
      'Wrong Customer Email': 'customerEmail',
      'Wrong Account Number': 'accountNumber',
      'Wrong Last 4 CC Digits': 'lastFourCCDigits',
    };
    return (
      <FixCustomerInfo
        request={request}
        field={declineReasonMap[request?.declineReason]}
        onFix={onFix}
      />
    );
  }

  return null;
};

export default RequestActions;
