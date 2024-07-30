import { Request } from '@/lib/db/schema';
import { formatDate } from '@/utils/helpers';
import { getDisplayHeader } from '../UploadCSV/upload.utils';
import RequestStatus from '../RequestStatus/RequestStatus';
import useFirebase from '@/hooks/useFirebase';
import Spinner from '../ui/spinner';

const RequestDetails: React.FC<{ request: Request }> = ({ request }) => {
  const {
    id,
    status,
    submittedBy,
    requestType,
    dateSubmitted,
    dateResponded,
    proxyTenantId,
    providerTenantId,
    customerInfo,
    successfullyResolved,
    rescueOffer,
    rescueOfferText,
    declineReason,
    notes,
  } = request;

  const { data: tenants, loading: tenantsLoading } = useFirebase({
    collectionName: 'tenants',
  });

  const findTenantName = (tenantId: string) => {
    return tenants?.find(tenant => tenant.id === tenantId)?.name;
  };

  return (
    <div className="max-w-4xl p-2">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold">Request Information</h2>{' '}
            <RequestStatus status={status} />
          </div>
          <InfoItem label="ID" value={id} />

          <InfoItem label="Request Type" value={requestType} />
          <InfoItem label="Submitted By" value={submittedBy} />
          <InfoItem label="Date Submitted" value={formatDate(dateSubmitted)} />
          {dateResponded && (
            <InfoItem
              label="Date Responded"
              value={formatDate(dateResponded)}
            />
          )}
          <InfoItem
            label="Source"
            value={findTenantName(proxyTenantId)}
            isLoading={tenantsLoading}
          />
          <InfoItem
            label="Destination"
            value={findTenantName(providerTenantId)}
            isLoading={tenantsLoading}
          />
          {successfullyResolved !== null && (
            <InfoItem
              label="Successfully Resolved"
              value={successfullyResolved.toString()}
            />
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          {Object.entries(customerInfo)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([key, value]) => (
              <InfoItem key={key} label={getDisplayHeader(key)} value={value} />
            ))}

          <h2 className="text-xl font-semibold mt-6 mb-4">
            Additional Details
          </h2>
          {rescueOffer && <InfoItem label="Rescue Offer" value={rescueOffer} />}
          {rescueOfferText && (
            <InfoItem label="Rescue Offer Text" value={rescueOfferText} />
          )}
          {declineReason && (
            <InfoItem label="Decline Reason" value={declineReason} />
          )}
          {notes && <InfoItem label="Notes" value={notes} />}
        </div>
      </div>
    </div>
  );
};

const InfoItem: React.FC<{
  label: string;
  value: string | undefined;
  isLoading?: boolean;
}> = ({ label, value, isLoading }) => (
  <div className="mb-2">
    <span className="font-medium">{label}: </span>
    <span>{isLoading ? <Spinner className="p-2" /> : value}</span>
  </div>
);

export default RequestDetails;
