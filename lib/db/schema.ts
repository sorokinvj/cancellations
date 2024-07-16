export interface Request {
  id: string;
  version: number;
  status: 'Pending' | 'Canceled' | 'Declined' | 'Rescue Attempt';
  submittedBy: string;
  requestType: string;
  dateSubmitted: Date;
  dateResponded: Date | null;
  proxyTenantId: string;
  providerTenantId: string;
  customerName: string;
  customerEmail: string;
  accountNumber: string;
  lastFourCCDigits: string;
  successfullyResolved: boolean;
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
