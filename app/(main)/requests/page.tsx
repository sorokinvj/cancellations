import { Metadata } from 'next';
import RequestsList from '@/components/RequestsList/RequestsList';
import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';
import { Request } from '@/lib/db/schema';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeFirebaseAdmin } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Requests',
};

initializeFirebaseAdmin();

const getCachedData = async (
  tenantType: string,
  tenantId: string,
): Promise<Request[]> => {
  const db = getFirestore();
  const requestsRef = db.collection('requests');
  let query;
  console.log(
    `Fetching data for tenantType: ${tenantType}, tenantId: ${tenantId}`,
  );

  if (tenantType === 'proxy') {
    query = requestsRef.where('proxyTenantId', '==', tenantId);
    console.log(`Query: requests where proxyTenantId == ${tenantId}`);
  } else if (tenantType === 'provider') {
    console.log(`Query: requests where providerTenantId == ${tenantId}`);
    query = requestsRef.where('providerTenantId', '==', tenantId);
    console.log(`Query: requests where providerTenantId == ${tenantId}`);
  } else {
    throw new Error('Invalid tenant type');
  }
  try {
    const snapshot = await query.get();

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        dateSubmitted: data.dateSubmitted.toDate().toISOString(),
        dateResponded: data.dateResponded
          ? data.dateResponded.toDate().toISOString()
          : null,
      } as Request;
    });
  } catch (error) {
    console.error('Error getting requests:', error);
    throw new Error('Error getting requests');
  }
};

export default async function RequestsPage() {
  const sessionCookie = cookies().get('session')?.value;
  if (!sessionCookie) {
    return <div>Please log in to view this page.</div>;
  }

  try {
    const decodedClaim = await getAuth().verifySessionCookie(sessionCookie);

    // Extract tenantType and tenantId from the decoded token
    const { tenantType, tenantId } = decodedClaim;

    if (!tenantType || !tenantId) {
      throw new Error('Tenant information missing from token');
    }

    const requests = await getCachedData(tenantType, tenantId);
    return <RequestsList requests={requests} />;
  } catch (error) {
    console.error('Error verifying session or fetching data:', error);
    return <div>An error occurred. Please try logging in again.</div>;
  }
}
