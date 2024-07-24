import {
  collection,
  doc,
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

  const getCollection = useCallback(async () => {
    setLoading(true);
    try {
      const collectionRef = collection(database, collectionName);
      let q = query(collectionRef);

      if (filterBy && filterValue) {
        q = query(q, where(filterBy, '==', filterValue));
      }

      const snapshot = await getDocs(q);
      const fetchedData = snapshot.docs
        .map(doc => doc.data())
        .filter(doc => {
          // Filter out documents that only have {_init: true}
          if (Object.keys(doc).length === 1 && doc._init === true) {
            return false;
          }
          return true;
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
      docId,
      field,
      value,
    }: {
      docId: string;
      field: string;
      value: string | number | boolean | null;
    }) => {
      try {
        const collectionRef = collection(database, collectionName);
        const docRef = doc(collectionRef, docId);
        await updateDoc(docRef, {
          [field]: value,
        });
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    },
    [collectionName],
  );

  const updateRequestDocument = useCallback(async (request: Request) => {
    try {
      const requestRef = doc(database, 'requests', request.id);
      type FirestoreData<T> = { [P in keyof T]: T[P] | FieldValue };
      await updateDoc(requestRef, request as FirestoreData<Request>);
    } catch (error) {
      console.error('Error updating request document: ', error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCollection();
      setData(data);
    };
    if (!data) {
      fetchData();
    }
  }, [getCollection, data]);

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
