// Content manager singleton - ported from ContentContext.tsx
import { db } from './firebase-init.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { defaultContent } from './data.js';

let _content = null;

export async function initContent() {
  let firebaseData = null;

  try {
    if (db) {
      const contentDocRef = doc(db, 'site', 'content');
      const docSnap = await getDoc(contentDocRef);
      if (docSnap.exists()) {
        firebaseData = docSnap.data();
      } else {
        await setDoc(contentDocRef, defaultContent);
      }
    }
  } catch (error) {
    console.warn("Firebase unavailable or fetch failed, using local/default:", error);
  }

  if (firebaseData) {
    _content = firebaseData;
  } else {
    const saved = localStorage.getItem('reliait_content');
    if (saved) {
      _content = JSON.parse(saved);
    } else {
      _content = defaultContent;
    }
  }

  return _content;
}

export function getContent() {
  return _content || defaultContent;
}

export async function updateContent(newContent) {
  try {
    if (db) {
      const contentDocRef = doc(db, 'site', 'content');
      await setDoc(contentDocRef, newContent);
    } else {
      console.warn("Firebase not available, saving to localStorage only.");
    }
    _content = newContent;
    localStorage.setItem('reliait_content', JSON.stringify(newContent));
  } catch (error) {
    console.error("Failed to update content:", error);
    throw error;
  }
}

export async function resetContent() {
  try {
    if (db) {
      const contentDocRef = doc(db, 'site', 'content');
      await setDoc(contentDocRef, defaultContent);
    }
    _content = defaultContent;
    localStorage.removeItem('reliait_content');
  } catch (error) {
    console.error("Failed to reset content:", error);
    throw error;
  }
}
