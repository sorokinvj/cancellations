// file: app/api/request/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import {
  getFirestore,
  Firestore,
  DocumentData,
  UpdateData,
} from 'firebase-admin/firestore';
import { initializeFirebaseAdmin } from '@/lib/firebase/admin';
import { Request, TenantType } from '@/lib/db/schema';
import { parseErrorMessage } from '@/utils/helpers';

initializeFirebaseAdmin();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const { id } = params;
  const url = new URL(req.url);
  const tenantType = url.searchParams.get('tenantType') as TenantType | null;
  const tenantId = url.searchParams.get('tenantId');
  console.log('get request route', id, tenantType, tenantId);

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
  const requestRef = db.collection('requests').doc(id);

  try {
    const doc = await requestRef.get();
    console.log('is doc.exists', doc.exists);

    if (!doc.exists) {
      return new NextResponse(JSON.stringify({ error: 'Request not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const request = doc.data() as Request;

    // Verify that the requester has permission to access this request
    if (
      (tenantType === 'proxy' && request.proxyTenantId !== tenantId) ||
      (tenantType === 'provider' && request.providerTenantId !== tenantId)
    ) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized access' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    return new NextResponse(JSON.stringify(request), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Error fetching request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const db: Firestore = getFirestore();
  const { id } = params;
  const updatedRequest: Partial<Request> = await req.json();

  try {
    const requestsCollectionRef = db.collection('requests');
    const docRef = requestsCollectionRef.doc(id);
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
