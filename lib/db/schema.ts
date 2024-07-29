// file: lib/db/schema.ts
export type RequestStatus =
  | 'Pending'
  | 'Canceled'
  | 'Declined'
  | 'Rescue Attempt';

export type CustomerInfoField =
  | 'customerName'
  | 'customerEmail'
  | 'accountNumber'
  | 'lastFourCCDigits';

export interface Request {
  id: string;
  version: number;
  status: RequestStatus;
  submittedBy: string;
  requestType: string;
  dateSubmitted: string;
  dateResponded: string | null;
  proxyTenantId: string;
  providerTenantId: string;
  customerInfo: { [K in CustomerInfoField]?: string };
  successfullyResolved: boolean | null;
  rescueOffer: string | null;
  rescueOfferText: string | null;
  declineReason: string | null;
  notes: string | null;
}

export interface User {
  id: string;
  version: number;
  email: string;
  tenantId: string;
  tenantName: string;
  tenantType: 'proxy' | 'provider';
  role: 'admin' | 'user';
  createdAt: string;
  name: string;
}

export interface Tenant {
  id: string;
  version: number;
  name: string;
  type: 'proxy' | 'provider';
  createdAt: string;
  active: boolean;
  requiredCustomerInfo?: CustomerInfoField[]; // Only for provider tenants
}

export const CURRENT_SCHEMA_VERSION = 2;

export const collections = {
  requests: 'requests',
  users: 'users',
  tenants: 'tenants',
};
