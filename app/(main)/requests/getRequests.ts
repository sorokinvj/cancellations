import { Request } from '@/lib/db/schema';

export const getRequests = async (
  tenantType: string | undefined,
  tenantId: string | undefined,
): Promise<Request[]> => {
  if (!tenantType || !tenantId) {
    throw new Error('Tenant information missing from token');
  }

  try {
    const response = await fetch(
      `/api/requests?tenantType=${tenantType}&tenantId=${tenantId}`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch requests');
    }
    const requests = (await response.json()) as Request[];
    return requests;
  } catch (error) {
    throw new Error('Error getting requests: ' + (error as Error).message);
  }
};
