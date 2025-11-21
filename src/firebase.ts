import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, type Firestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate Firebase configuration
const isFirebaseConfigValid = Object.values(firebaseConfig).every(value => value !== undefined);

// Initialize Firebase
let app;
let db: Firestore | null = null;
let auth = null;

if (isFirebaseConfigValid) {
  try {
    app = initializeApp(firebaseConfig);
    
    // Initialize Firestore with additional safety checks
    try {
      db = getFirestore(app);
      
      // Additional check to ensure db is properly initialized
      if (db && typeof db === 'object') {
        // Enable offline persistence
        try {
          enableIndexedDbPersistence(db).catch((err) => {
            if (err.code == 'failed-precondition') {
              // Multiple tabs open, persistence can only be enabled
              // in one tab at a time.
              console.warn('Persistence failed: multiple tabs open');
            } else if (err.code == 'unimplemented') {
              // The current browser doesn't support persistence
              console.warn('Persistence not supported by browser');
            }
          });
        } catch (persistenceError) {
          console.warn('Failed to enable Firestore persistence:', persistenceError);
        }
      } else {
        console.error('Firestore initialization returned invalid instance');
        db = null;
      }
    } catch (firestoreError) {
      console.error('Error initializing Firestore:', firestoreError);
      db = null;
    }
    
    // Initialize Firebase Authentication
    try {
      auth = getAuth(app);
    } catch (authError) {
      console.error('Error initializing Firebase Auth:', authError);
      auth = null;
    }
  } catch (error) {
    console.error('Firebase initialization error:', error);
    // Initialize with empty objects to prevent crashes
    db = null;
    auth = null;
  }
} else {
  console.warn('Firebase configuration is invalid. Running in offline mode.');
  // Initialize with empty objects to prevent crashes
  db = null;
  auth = null;
}

export { db, auth };