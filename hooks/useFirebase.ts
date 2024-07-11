import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { useState } from 'react';
import { database } from '../firebase/config';

const useFirebase = () => {
  const [firebaseError, setFirebaseError] = useState<unknown>(null);
  const [firebaseLoading, setFirebaseLoading] = useState(false);

  const getUserData = async (email: string) => {
    setFirebaseLoading(true);
    try {
      const docRef = doc(database, 'users', email);
      const docSnapshot = await getDoc(docRef);
      const data = docSnapshot.data();
      return data;
    } catch (error: unknown) {
      console.error('Error reading document: ', error);
      setFirebaseError(error);
    } finally {
      setFirebaseLoading(false);
    }
  };

  const checkIfAdmin = async (email: string) => {
    setFirebaseLoading(true);
    try {
      const docRef = doc(database, 'users', email);
      const docSnapshot = await getDoc(docRef);

      const data = docSnapshot.data();
      const isAdmin = Boolean(data?.isAdmin);

      return isAdmin;
    } catch (error) {
      console.error('Error reading document: ', error);
      setFirebaseError(error);
      return false;
    } finally {
      setFirebaseLoading(false);
    }
  };

  const getUsers = async () => {
    setFirebaseLoading(true);
    try {
      const usersCollectionRef = collection(database, 'users');
      const usersSnapshot = await getDocs(usersCollectionRef);

      const userIds = usersSnapshot.docs.map(doc => doc.id);
      const data = usersSnapshot.docs.map(doc => doc.data());
      return { userIds, data };
    } catch (error) {
      console.error('Error reading document: ', error);
      setFirebaseError(error);
      return { userIds: null, data: null };
    } finally {
      setFirebaseLoading(false);
    }
  };

  const saveResume = async ({
    email,
    resume,
    fileName,
  }: {
    email: string;
    resume: string | Record<string, unknown> | null;
    fileName: string | null;
  }) => {
    if (!resume) return;
    setFirebaseLoading(true);
    try {
      const docRef = doc(database, 'users', email);

      await updateDoc(docRef, {
        resumes: arrayUnion({
          fileName,
          resume,
          createdAt: new Date().toISOString(),
        }),
      });
      const docSnapshot = await getDoc(docRef);
      const data = docSnapshot.data();

      return data;
    } catch (error: unknown) {
      console.error('Error reading document: ', error);
      setFirebaseError(error);
    } finally {
      setFirebaseLoading(false);
    }
  };
  const saveSelectedResumeIndex = async ({
    email,
    index,
  }: {
    email: string;
    index: number;
  }) => {
    if (!email) return;
    setFirebaseLoading(true);
    try {
      const docRef = doc(database, 'users', email);

      await updateDoc(docRef, {
        selectedResumeIndex: index,
      });
      const docSnapshot = await getDoc(docRef);
      const data = docSnapshot.data();

      return data;
    } catch (error: unknown) {
      console.error('Error reading document: ', error);
      setFirebaseError(error);
    } finally {
      setFirebaseLoading(false);
    }
  };

  const getResumes = async (email: string) => {
    if (!email) return;
    setFirebaseLoading(true);
    try {
      const docRef = doc(database, 'users', email);

      const docSnapshot = await getDoc(docRef);
      const data = docSnapshot.data();

      return data?.resumes || null;
    } catch (error: unknown) {
      console.error('Error reading document: ', error);
      setFirebaseError(error);
      return null;
    } finally {
      setFirebaseLoading(false);
    }
  };

  return {
    firebaseError,
    firebaseLoading,
    getUserData,
    getUsers,
    checkIfAdmin,
    saveResume,
    getResumes,
    saveSelectedResumeIndex,
  };
};

export default useFirebase;
