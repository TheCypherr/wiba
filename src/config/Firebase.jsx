import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAH_0JixG5qqgFRvDdcQweoT8TQnvQotfU",
  authDomain: "wiba-ad221.firebaseapp.com",
  projectId: "wiba-ad221",
  storageBucket: "wiba-ad221.appspot.com",
  messagingSenderId: "706220767413",
  appId: "1:706220767413:web:dd8907e7baf31f3c33e6fc",
  measurementId: "G-2EQGWWVSX5",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
