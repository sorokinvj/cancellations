import { Request } from '@/lib/db/schema';

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
