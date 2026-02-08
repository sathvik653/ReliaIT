// Authentication manager - Firebase Google Auth
import { auth } from './firebase-init.js';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const ALLOWED_EMAILS = ['reliaitinfo@gmail.com'];

const provider = new GoogleAuthProvider();

export function isAuthenticated() {
  return auth && auth.currentUser && ALLOWED_EMAILS.includes(auth.currentUser.email);
}

export function getCurrentUser() {
  return auth ? auth.currentUser : null;
}

export async function loginWithGoogle() {
  if (!auth) throw new Error('Firebase not available');
  const result = await signInWithPopup(auth, provider);
  const email = result.user.email;
  if (!ALLOWED_EMAILS.includes(email)) {
    await signOut(auth);
    throw new Error(`Access denied. ${email} is not an authorized admin.`);
  }
  return result.user;
}

export async function logout() {
  if (auth) {
    await signOut(auth);
  }
  // Clear legacy localStorage auth
  localStorage.removeItem('reliait_auth');
}

export function onAuthChange(callback) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, (user) => {
    if (user && ALLOWED_EMAILS.includes(user.email)) {
      callback(user);
    } else {
      callback(null);
    }
  });
}
