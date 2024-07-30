import { Request } from '@/lib/db/schema';

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
