import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { database } from '../lib/firebase/config';

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCollection();
      setData(data);
    };
    fetchData();
  }, [getCollection]);

  return {
    error,
    loading,
    getCollection,
    data,
  };
};

export default useFirebase;
