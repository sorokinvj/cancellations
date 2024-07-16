import dotenv from 'dotenv';
dotenv.config();

import { getFirestore } from 'firebase-admin/firestore';
import { collections, CURRENT_SCHEMA_VERSION, Tenant, User } from './schema';
import { getAuth } from 'firebase-admin/auth';
import { initializeFirebaseAdmin } from '../firebase/admin';

export async function initializeDatabase() {
  try {
    console.log('Initializing Firebase Admin...');
    initializeFirebaseAdmin();
    console.log('Firebase Admin initialized successfully');

    const db = getFirestore();
    console.log('Firestore instance obtained');

    // Test connection
    console.log('Testing Firestore connection...');
    const testDoc = await db.collection('test').doc('testDoc').get();
    if (testDoc.exists) {
      console.log('Successfully connected to Firestore');
    } else {
      console.log('Connected to Firestore, but test document does not exist');
    }

    // Create collections if they don't exist
    await createCollections(db);

    // Initialize test data
    await initializeTestData(db);
  } catch (error) {
    console.error('Error in initializeDatabase:', error);
    throw error;
  }
}

async function createCollections(db: FirebaseFirestore.Firestore) {
  // Create collections if they don't exist
  for (const collectionName of Object.values(collections)) {
    const collection = db.collection(collectionName);
    const doc = await collection.limit(1).get();
    if (doc.empty) {
      await collection.add({ _init: true });
      console.log(`Collection ${collectionName} created.`);
    }
  }
}

async function initializeTestData(db: FirebaseFirestore.Firestore) {
  const auth = getAuth();

  // Create test tenants
  const tenants: Tenant[] = [
    {
      id: 'rocket-money',
      name: 'RocketMoney',
      type: 'proxy',
      createdAt: new Date(),
      active: true,
      version: CURRENT_SCHEMA_VERSION,
    },
    {
      id: 'billshark',
      name: 'BillShark',
      type: 'proxy',
      createdAt: new Date(),
      active: true,
      version: CURRENT_SCHEMA_VERSION,
    },
    {
      id: 'espn',
      name: 'ESPN',
      type: 'provider',
      createdAt: new Date(),
      active: true,
      version: CURRENT_SCHEMA_VERSION,
    },
  ];

  for (const tenant of tenants) {
    await db.collection(collections.tenants).doc(tenant.id).set(tenant);
  }

  // Create test users
  const users: User[] = [
    {
      id: 'proxy1',
      email: 'proxy1@proxy.com',
      name: 'Bubba Gump',
      tenantId: 'rocket-money',
      tenantName: 'RocketMoney',
      tenantType: 'proxy',
      role: 'user',
      createdAt: new Date(),
      lastLogin: null,
      version: CURRENT_SCHEMA_VERSION,
    },
    {
      id: 'proxy2',
      email: 'proxy2@proxy.com',
      name: 'Daisy Duke',
      tenantId: 'rocket-money',
      tenantName: 'RocketMoney',
      tenantType: 'proxy',
      role: 'user',
      createdAt: new Date(),
      lastLogin: null,
      version: CURRENT_SCHEMA_VERSION,
    },
    {
      id: 'proxy3',
      email: 'proxy3@proxy.com',
      name: 'Cletus Spuckler',
      tenantId: 'billshark',
      tenantName: 'BillShark',
      tenantType: 'proxy',
      role: 'user',
      createdAt: new Date(),
      lastLogin: null,
      version: CURRENT_SCHEMA_VERSION,
    },
    {
      id: 'provider1',
      email: 'provider1@provider.com',
      name: 'Coach Bear Bryant',
      tenantId: 'espn',
      tenantName: 'ESPN',
      tenantType: 'provider',
      role: 'user',
      createdAt: new Date(),
      lastLogin: null,
      version: CURRENT_SCHEMA_VERSION,
    },
  ];

  for (const user of users) {
    try {
      const standardPassword = 'q1w2e3';

      // Create user in Firebase Authentication
      const userRecord = await auth.createUser({
        uid: user.id,
        email: user.email,
        password: standardPassword,
        displayName: user.name,
      });

      // Set custom claims for JWT tokens
      await auth.setCustomUserClaims(userRecord.uid, {
        tenantId: user.tenantId,
        tenantType: user.tenantType,
        role: user.role,
      });

      // Create user document in Firestore
      await db.collection(collections.users).doc(user.id).set(user);

      console.log(`User created successfully: ${user.email}`);
    } catch (error) {
      console.error(`Error creating user ${user.email}:`, error);
    }
  }

  console.log('Test data initialized');
}

initializeDatabase()
  .then(() => console.log('Database initialized successfully'))
  .catch(console.error);
