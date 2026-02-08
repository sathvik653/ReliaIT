// Firebase initialization - ported from firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDzosK9Gth8bPibn3K_XJxdMVTi8f4DcLc",
  authDomain: "reliait.firebaseapp.com",
  projectId: "reliait",
  storageBucket: "reliait.firebasestorage.app",
  messagingSenderId: "992829564913",
  appId: "1:992829564913:web:d7bbb4cd0be1988c660650",
  measurementId: "G-515CZH1KFV"
};

let app = null;
let db = null;
let auth = null;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  auth = getAuth(app);
} catch (error) {
  console.warn("Firebase initialization failed (Offline Mode Active):", error);
  app = null;
  db = null;
  auth = null;
}

export { app, db, auth };
