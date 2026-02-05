
import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Configuration provided by the user
const firebaseConfig = {
  apiKey: "AIzaSyDzosK9Gth8bPibn3K_XJxdMVTi8f4DcLc",
  authDomain: "reliait.firebaseapp.com",
  projectId: "reliait",
  storageBucket: "reliait.firebasestorage.app",
  messagingSenderId: "992829564913",
  appId: "1:992829564913:web:d7bbb4cd0be1988c660650",
  measurementId: "G-515CZH1KFV"
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

try {
  // Initialize Firebase once
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase initialization failed (Offline Mode Active):", error);
  // We return null so the ContentContext knows to use LocalStorage
  app = null;
  db = null;
}

export { app, db };
