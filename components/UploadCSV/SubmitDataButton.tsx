import { useState } from 'react';
import { useUpload } from './UploadCSVProvider/upload.hooks';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../../lib/firebase/config';
import { CURRENT_SCHEMA_VERSION, Request } from '../../lib/db/schema';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { revalidateRequests } from '@/app/actions';
import { useRouter } from 'next/navigation';

const SubmitDataButton = () => {
  const {
    csv,
    resetCsvFile,
    setUploadedFilename,
    setSelectedProvider,
    selectedProviderId,
  } = useUpload();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const { userData } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    if (
      !csv ||
      !csv.data ||
      csv.data.length === 0 ||
      !selectedProviderId ||
      !userData?.email
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      const requestsCollection = collection(database, 'requests');

      for (const row of csv.data) {
        const customerInfo: { [key: string]: string } = {};

        // Dynamically add fields that are present in the CSV
        for (const key in row) {
          if (Object.prototype.hasOwnProperty.call(row, key)) {
            customerInfo[key] = row[key] || '';
          }
        }

        const request: Request = {
          id: uuidv4(),
          version: CURRENT_SCHEMA_VERSION,
          status: 'Pending',
          submittedBy: userData?.email,
          requestType: 'Cancellation',
          dateSubmitted: new Date().toISOString(),
          dateResponded: null,
          proxyTenantId: userData?.tenantId,
          providerTenantId: selectedProviderId,
          customerInfo,
          notes: null,
          successfullyResolved: null,
          rescueOffer: null,
          rescueOfferText: null,
          declineReason: null,
        };

        await addDoc(requestsCollection, request);
      }

      setSubmitStatus('success');
      resetCsvFile();
      setUploadedFilename(undefined);
      setSelectedProvider(undefined);
      revalidateRequests();
      router.push('/requests');
    } catch (error) {
      console.error('Error submitting data:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!csv || !selectedProviderId || csv.data.length === 0) {
    return null;
  }

  const isDisabled =
    isSubmitting || !csv || !selectedProviderId || csv.data.length === 0;

  return (
    <div>
      <Button
        onClick={handleSubmit}
        disabled={isDisabled}
        className={`font-bold py-2 px-4 rounded ${
          isDisabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-700 text-white'
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Data'}
      </Button>
      {submitStatus === 'success' && (
        <p className="text-green-500 mt-2">Data submitted successfully!</p>
      )}
      {submitStatus === 'error' && (
        <p className="text-red-500 mt-2">
          Error submitting data. Please try again.
        </p>
      )}
    </div>
  );
};

export default SubmitDataButton;
