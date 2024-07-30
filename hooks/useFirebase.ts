// file: hooks/useFirebase.ts
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { database } from '../lib/firebase/config';
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

  const getCollection = useCallback(async () => {
    setLoading(true);
    try {
      const collectionRef = collection(database, collectionName);
      let q = query(collectionRef);

      if (filterBy && filterValue) {
        q = query(q, where(filterBy, '==', filterValue));
      }

      const snapshot = await getDocs(q);
      const fetchedData = snapshot.docs.map(doc => doc.data());

      return fetchedData;
    } catch (error) {
      console.error('Error reading document: ', error);
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [collectionName, filterBy, filterValue]);

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
  };
};

export default useFirebase;
