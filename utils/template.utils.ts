import { CustomerInfoField } from '@/lib/db/schema';

// Custom header mapping based on CustomerInfoField
const CUSTOMER_INFO_HEADERS_MAP: { [K in CustomerInfoField]: string } = {
  customerName: 'Customer Name',
  customerEmail: 'Customer Email',
  accountNumber: 'Account Number',
  lastFourCCDigits: 'Last 4 CC Digits',
};

export const getDisplayHeader = (header: string): string => {
  return header in CUSTOMER_INFO_HEADERS_MAP
    ? CUSTOMER_INFO_HEADERS_MAP[header as CustomerInfoField]
    : header;
};

export const getCustomerInfoField = (
  name: string,
): CustomerInfoField | undefined => {
  const entry = Object.entries(CUSTOMER_INFO_HEADERS_MAP).find(
    ([_, value]) => value === name,
  );
  return entry ? (entry[0] as CustomerInfoField) : undefined;
};

export const generateHeaders = (headers: string[]) => {
  return headers.map(getDisplayHeader).join(',');
};
