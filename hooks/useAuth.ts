// Custom hook for Firebase Authentication
'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange } from '@/lib/firebaseAuth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
      
      // Update localStorage for compatibility
      if (user) {
        localStorage.setItem('gamewave_user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          loggedIn: true,
          timestamp: new Date().toISOString(),
        }));
      } else {
        localStorage.removeItem('gamewave_user');
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};
