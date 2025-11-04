// Firebase Authentication Service
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  UserCredential,
  User,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebase';

// Google Authentication
export const signInWithGoogle = async (): Promise<UserCredential> => {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized');
  }
  
  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error: any) {
    console.error('Google sign-in error:', error);
    
    // Handle specific error codes
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in cancelled. Please try again.');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Pop-up blocked by browser. Please allow pop-ups and try again.');
    } else if (error.code === 'auth/cancelled-popup-request') {
      throw new Error('Only one sign-in request at a time.');
    }
    
    throw new Error(error.message || 'Failed to sign in with Google');
  }
};

// Email/Password Authentication
export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName?: string
): Promise<UserCredential> => {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized');
  }
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update display name if provided
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    
    return userCredential;
  } catch (error: any) {
    console.error('Email signup error:', error);
    
    // Handle specific error codes
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('This email is already registered. Please sign in instead.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('Password is too weak. Please use a stronger password.');
    }
    
    throw new Error(error.message || 'Failed to create account');
  }
};

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized');
  }
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: any) {
    console.error('Email sign-in error:', error);
    
    // Handle specific error codes
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email. Please sign up.');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password. Please try again.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address.');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many failed attempts. Please try again later.');
    }
    
    throw new Error(error.message || 'Failed to sign in');
  }
};

// Phone Authentication
let recaptchaVerifier: RecaptchaVerifier | null = null;

export const initializeRecaptcha = (elementId: string): RecaptchaVerifier => {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized');
  }
  
  if (!recaptchaVerifier) {
    try {
      recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          recaptchaVerifier = null;
        }
      });
    } catch (error) {
      console.error('RecaptchaVerifier initialization error:', error);
      throw error;
    }
  }
  return recaptchaVerifier;
};

export const sendPhoneVerificationCode = async (
  phoneNumber: string,
  recaptchaVerifier: RecaptchaVerifier
): Promise<ConfirmationResult> => {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized');
  }
  
  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );
    return confirmationResult;
  } catch (error: any) {
    console.error('Phone verification error:', error);
    
    // Handle specific error codes
    if (error.code === 'auth/invalid-phone-number') {
      throw new Error('Invalid phone number format. Please use international format (e.g., +1234567890).');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many requests. Please try again later.');
    } else if (error.code === 'auth/quota-exceeded') {
      throw new Error('SMS quota exceeded. Please try again later.');
    }
    
    throw new Error(error.message || 'Failed to send verification code');
  }
};

export const verifyPhoneCode = async (
  confirmationResult: ConfirmationResult,
  code: string
): Promise<UserCredential> => {
  try {
    const result = await confirmationResult.confirm(code);
    return result;
  } catch (error: any) {
    console.error('Code verification error:', error);
    throw new Error(error.message || 'Invalid verification code');
  }
};

export const resetRecaptcha = (): void => {
  if (recaptchaVerifier) {
    recaptchaVerifier.clear();
    recaptchaVerifier = null;
  }
};

// Sign Out
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
    // Clear local storage
    localStorage.removeItem('gamewave_user');
  } catch (error: any) {
    console.error('Sign out error:', error);
    throw new Error(error.message || 'Failed to sign out');
  }
};

// Auth State Observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get Current User
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Format Phone Number for Firebase (E.164 format)
export const formatPhoneNumber = (phoneNumber: string, countryCode: string = '+1'): string => {
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Add country code if not present
  if (!phoneNumber.startsWith('+')) {
    return `${countryCode}${cleaned}`;
  }
  
  return `+${cleaned}`;
};
