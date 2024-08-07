// Update the file: Projects/intermediary.cc/lib/api/tenant.ts

import { Tenant } from '@/lib/db/schema';

/**
 * Sends a GET request to fetch tenants based on tenant type and ID.
 * @returns {Promise<Tenant[]>} A promise that resolves to an array of tenants.
 * @throws {Error} If the request fails.
 */
export const getTenants = async (): Promise<Tenant[]> => {
  try {
    const response = await fetch(`/api/tenants`);
    if (!response.ok) {
      throw new Error('Failed to fetch tenants');
    }
    const tenants = await response.json();
    return tenants;
  } catch (error) {
    throw new Error('Error getting tenants: ' + (error as Error).message);
  }
};
