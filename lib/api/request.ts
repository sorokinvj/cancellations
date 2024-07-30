import { Request, RequestStatus } from '@/lib/db/schema';

export const getRequest = async ({
  id,
  tenantType,
  tenantId,
}: {
  id: string;
  tenantType: string | undefined;
  tenantId: string | undefined;
}) => {
  console.log('getRequest', id, tenantType, tenantId);
  const response = await fetch(
    `/api/request/${id}?tenantType=${tenantType}&tenantId=${tenantId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch request');
  }

  const request = (await response.json()) as Request;
  return request;
};

/**
 * Sends a GET request to fetch requests based on tenant type and ID.
 * @param {string | undefined} tenantType - The tenant type of the request.
 * @param {string | undefined} tenantId - The tenant ID of the request.
 * @returns {Promise<Request[]>} A promise that resolves to an array of requests.
 * @throws {Error} If the request fails.
 */
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

interface PostRequestsResponse {
  ids: string[];
}

/**
 * Sends a POST request to create multiple new requests.
 * @param {Omit<Request, 'id'>[]} requests - An array of request objects without IDs.
 * @returns {Promise<string[]>} A promise that resolves to an array of created request IDs.
 * @throws {Error} If the request fails.
 */
export async function postRequests(
  requests: Omit<Request, 'id'>[],
): Promise<string[]> {
  const response = await fetch('/api/requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ requests }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit requests');
  }

  const data: PostRequestsResponse = await response.json();
  return data.ids;
}

/**
 * Sends a PATCH request to update a specific request.
 * @param {Request} request - The updated request object.
 * @returns {Promise<void>} A promise that resolves when the request is updated.
 * @throws {Error} If the request fails.
 */
export async function updateRequest(request: Request): Promise<void> {
  const response = await fetch(`/api/requests`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to update request');
  }
}

export function filterRequests(
  requests: Request[],
  statuses: RequestStatus[],
): Request[] {
  return requests.filter(request => statuses.includes(request.status));
}
