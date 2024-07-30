import { NextRequest, NextResponse } from 'next/server';
import {
  getFirestore,
  Firestore,
  DocumentData,
  UpdateData,
} from 'firebase-admin/firestore';
import { initializeFirebaseAdmin } from '@/lib/firebase/admin';
import { parseErrorMessage } from '@/utils/helpers';
import { Request, TenantType } from '@/lib/db/schema';

initializeFirebaseAdmin();

/**
 * Handles GET requests to fetch requests based on tenant type and ID.
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} A response containing the fetched requests or an error message.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const tenantType = url.searchParams.get('tenantType') as TenantType | null;
  const tenantId = url.searchParams.get('tenantId');

  if (!tenantType || !tenantId) {
    return new NextResponse(
      JSON.stringify({ error: 'Missing tenant information' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const db: Firestore = getFirestore();
  const requestsRef = db.collection('requests');
  let query;

  if (tenantType === 'proxy') {
    query = requestsRef.where('proxyTenantId', '==', tenantId);
  } else if (tenantType === 'provider') {
    query = requestsRef.where('providerTenantId', '==', tenantId);
  } else {
    return new NextResponse(JSON.stringify({ error: 'Invalid tenant type' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const snapshot = await query.get();
    const requests = snapshot.docs.map(doc => doc.data() as Request);

    return new NextResponse(JSON.stringify(requests), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Error fetching requests' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

/**
 * Handles POST requests to create multiple new requests.
 * @param {NextRequest} req - The incoming request object containing an array of requests.
 * @returns {Promise<NextResponse>} A response containing the created request IDs or an error message.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const db: Firestore = getFirestore();
    const { requests }: { requests: Omit<Request, 'id'>[] } = await req.json();

    if (!Array.isArray(requests)) {
      return new NextResponse(
        JSON.stringify({
          error: 'Invalid input: expected an array of requests',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const batch = db.batch();
    const createdIds: string[] = [];

    for (const requestData of requests) {
      const docRef = db.collection('requests').doc();
      batch.set(docRef, { ...requestData, id: docRef.id });
      createdIds.push(docRef.id);
    }

    await batch.commit();

    return new NextResponse(JSON.stringify({ ids: createdIds }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to create requests: ' + parseErrorMessage(error),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

/**
 * Handles PATCH requests to update a specific request.
 * @param {NextRequest} req - The incoming request object
 * @returns {Promise<NextResponse>} A response indicating success or an error message.
 */
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const db: Firestore = getFirestore();
  const updatedRequest: Request = await req.json();

  try {
    const requestsCollectionRef = db.collection('requests');
    const docRef = requestsCollectionRef.doc(updatedRequest.id);
    const updateData = updatedRequest as unknown as UpdateData<DocumentData>;

    await docRef.update(updateData);

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: 'Error updating document: ' + parseErrorMessage(error),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
