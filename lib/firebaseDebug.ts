// Firebase Debug Utility
'use client';

import { auth } from './firebase';

export const debugFirebase = () => {
  if (typeof window === 'undefined') {
    console.log('Server-side: Firebase not available');
    return;
  }

  console.log('=== Firebase Debug Info ===');
  console.log('Firebase Auth initialized:', !!auth);
  console.log('Current user:', auth?.currentUser?.email || 'Not signed in');
  console.log('Auth domain:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
  console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
  console.log('========================');
};

// Call this in browser console: window.debugFirebase()
if (typeof window !== 'undefined') {
  (window as any).debugFirebase = debugFirebase;
}
