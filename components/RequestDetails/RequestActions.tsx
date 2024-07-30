import { CustomerInfoField, Request } from '@/lib/db/schema';
import { Button } from '@/components/ui/button';
import { getDisplayHeader } from '../UploadCSV/upload.utils';
import { useState } from 'react';

const RequestActions: React.FC<{
  action: string;
  request: Request;
}> = ({ action, request }) => {
  const handleSubmit = () => {
    console.log('handle submit');
  };
  if (action === 'fixDeclineReason' && request?.declineReason) {
    const declineReasonMap: Record<string, CustomerInfoField> = {
      'Wrong Customer Name': 'customerName',
      'Wrong Customer Email': 'customerEmail',
      'Wrong Account Number': 'accountNumber',
      'Wrong Last 4 CC Digits': 'lastFourCCDigits',
    };
    return (
      <FixWrongCustomerInfo
        request={request}
        field={declineReasonMap[request?.declineReason]}
        handleSubmit={handleSubmit}
      />
    );
  }

  return null;
};

const FixWrongCustomerInfo: React.FC<{
  request: Request;
  field: CustomerInfoField;
  handleSubmit: () => void;
}> = ({ request, field, handleSubmit }) => {
  const currentInvalidValue = request.customerInfo[field];
  const [newValue, setNewValue] = useState('');

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 mr-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h2 className="text-2xl font-bold">
          Action Required: Fix Customer Info
        </h2>
      </div>
      <p className="text-lg mb-4">
        The customer information provided for this request is incorrect. Please
        verify and update the following field:
      </p>
      <div className="bg-white text-gray-800 rounded p-4 mb-4">
        <p className="font-semibold text-lg mb-2">{getDisplayHeader(field)}</p>
        <p className="text-sm">
          Current value:{' '}
          <span className="font-medium">{currentInvalidValue}</span>
        </p>
        <label>
          New value:
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={newValue}
            onChange={e => setNewValue(e.target.value)}
          />
        </label>
      </div>
      <Button
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded transition duration-300"
        onClick={handleSubmit}
      >
        Submit Info
      </Button>
    </div>
  );
};

export default RequestActions;
