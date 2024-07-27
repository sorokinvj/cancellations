// file: lib/db/schema.ts
export type RequestStatus =
  | 'Pending'
  | 'Canceled'
  | 'Declined'
  | 'Rescue Attempt';

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
  customerName: string;
  customerEmail: string;
  accountNumber: string;
  lastFourCCDigits: string;
  successfullyResolved: boolean | null; // local changes
  rescueOffer: string | null; // local changes
  rescueOfferText: string | null; // local changes
  declineReason: string | null; // local changes
  notes: string | null; // local changes
}

export interface User {
  id: string;
  version: number;
  email: string;
  tenantId: string;
  tenantName: string;
  tenantType: 'proxy' | 'provider';
  role: 'admin' | 'user';
  createdAt: Date;
  lastLogin: Date | null;
  name: string;
}

export interface Tenant {
  id: string;
  version: number;
  name: string;
  type: 'proxy' | 'provider';
  createdAt: Date;
  active: boolean;
}

export const CURRENT_SCHEMA_VERSION = 1;

export const collections = {
  requests: 'requests',
  users: 'users',
  tenants: 'tenants',
};
