// file: hooks/useFirebase.ts
import {
  collection,
  DocumentData,
  FieldValue,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { database } from '../lib/firebase/config';
import { Request } from '@/lib/db/schema';
import { getAuth } from 'firebase/auth';
import { useAuth } from './useAuth';

interface FilterOptions {
  collectionName: string;
  filterBy?: string;
  filterValue?: string;
}

const useFirebase = ({
  collectionName,
  filterBy,
  filterValue,
}: FilterOptions) => {
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DocumentData[] | null>(null);

  const { user } = useAuth();
  const isAuthenticated = user !== null;

  const verifyTokenClaims = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      console.log('User Claims:', idTokenResult.claims);
    }
  };

  const getCollection = useCallback(async () => {
    await verifyTokenClaims();
    setLoading(true);
    try {
      const collectionRef = collection(database, collectionName);
      let q = query(collectionRef);

      console.log('Query Collection:', collectionName);
      if (filterBy && filterValue) {
        q = query(q, where(filterBy, '==', filterValue));
        console.log('Query Filter:', filterBy, filterValue);
      }

      const snapshot = await getDocs(q);
      const fetchedData = snapshot.docs.map(doc => {
        console.log(doc.id, ' => ', doc.data());
        return doc.data();
      });

      return fetchedData;
    } catch (error) {
      console.error('Error reading document: ', error);
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [collectionName, filterBy, filterValue]);

  const updateFieldInCollection = useCallback(
    async ({
      requestId,
      field,
      value,
    }: {
      requestId: string;
      field: string;
      value: string | number | boolean | null;
    }) => {
      try {
        const requestsCollectionRef = collection(database, 'requests');
        const requestQuery = query(
          requestsCollectionRef,
          where('id', '==', requestId),
        );
        const querySnapshot = await getDocs(requestQuery);

        if (querySnapshot.empty) {
          console.error('No matching document found with id:', requestId);
          return;
        }

        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          [field]: value,
        });
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    },
    [],
  );

  const updateRequestDocument = useCallback(async (request: Request) => {
    try {
      const requestsCollectionRef = collection(database, 'requests');
      const requestQuery = query(
        requestsCollectionRef,
        where('id', '==', request.id),
      );
      const querySnapshot = await getDocs(requestQuery);

      if (querySnapshot.empty) {
        console.error('No matching document found with id:', request.id);
        return;
      }

      const docRef = querySnapshot.docs[0].ref;
      type FirestoreData<T> = { [P in keyof T]: T[P] | FieldValue };
      await updateDoc(docRef, request as FirestoreData<Request>);
    } catch (error) {
      console.error('Error updating request document: ', error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCollection();
      setData(data);
    };
    if (!data && isAuthenticated) {
      fetchData();
    }
  }, [getCollection, data, isAuthenticated]);

  return {
    error,
    loading,
    getCollection,
    data,
    updateFieldInCollection,
    updateRequestDocument,
  };
};

export default useFirebase;
