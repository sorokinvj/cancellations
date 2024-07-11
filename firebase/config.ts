import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBORZsvynFAQSl0Nt5-sj8imFUPt48_9vk",
  authDomain: "meet-assistant-6d8ad.firebaseapp.com",
  projectId: "meet-assistant-6d8ad",
  storageBucket: "meet-assistant-6d8ad.appspot.com",
  messagingSenderId: "255174193709",
  appId: "1:255174193709:web:1ae9edb4f3405d365afea4",
  measurementId: "G-3VQS4Z19WZ"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);

export { app, auth, database, firebaseConfig };
