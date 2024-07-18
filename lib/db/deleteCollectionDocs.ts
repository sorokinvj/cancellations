// lib/db/utils.ts
import dotenv from 'dotenv';
dotenv.config();

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const initializeFirebaseAdmin = () => {
  if (getApps().length === 0) {
    return initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }
  return getApps()[0];
};

export const deleteAllDocumentsInCollection = async (
  collectionName: string,
) => {
  console.log('Initializing Firebase Admin...');
  const app = initializeFirebaseAdmin();
  console.log('Firebase Admin initialized successfully');

  const db = getFirestore(app);
  console.log(`Deleting all documents in collection: ${collectionName}`);
  const collectionRef = db.collection(collectionName);
  const querySnapshot = await collectionRef.get();

  if (querySnapshot.empty) {
    console.log(`No documents found in collection: ${collectionName}`);
    return;
  }

  const batch = db.batch();

  querySnapshot.forEach(doc => {
    console.log('Queueing deletion for doc:', doc.id);
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log(
    `All documents in collection ${collectionName} have been deleted.`,
  );
};

const deletAllCollections = async () => {
  console.log('Initializing Firebase Admin...');
  const app = initializeFirebaseAdmin();
  console.log('Firebase Admin initialized successfully');

  const db = getFirestore(app);
  console.log('Deleting all collections...');
  const collections = await db.listCollections();

  for (const collection of collections) {
    console.log('Deleting documents in collection:', collection.id);
    const documents = await collection.listDocuments();
    const batch = db.batch();

    documents.forEach(doc => {
      batch.delete(doc);
    });

    await batch.commit();
  }

  console.log('All documents in all collections have been deleted.');
};

// Self-invoking async function to run the script
(async () => {
  try {
    await deletAllCollections();
    console.log('Deletion completed successfully.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
  }
})();
