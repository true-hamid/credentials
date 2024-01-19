import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

console.log('process.env', process.env);
const firebaseConfig = {
  apiKey: process.env.NX_FIREBASE_API_KEY,
  authDomain: process.env.NX_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NX_FIREBASE_DATABASE_URL,
  projectId: process.env.NX_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NX_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NX_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NX_FIREBASE_APP_ID,
};

console.log('firebaseConfig', firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);



