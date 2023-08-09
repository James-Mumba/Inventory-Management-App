import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3O0jWFJQtqGk50nqUSsQhYvmLEQ9Qd9A",

  authDomain: "inventory-management-app-63381.firebaseapp.com",

  projectId: "inventory-management-app-63381",

  storageBucket: "inventory-management-app-63381.appspot.com",

  messagingSenderId: "88862442451",

  appId: "1:88862442451:web:311ab5fc954955b5cc2526",

  measurementId: "G-ZH0K4QGTN3",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const db = getFirestore(app);

export { app };
export { analytics };
export { db };
