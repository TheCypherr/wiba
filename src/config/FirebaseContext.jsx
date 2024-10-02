import React, { createContext, useState, useContext, useEffect } from "react";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";

export const FirebaseUserContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // this go set the user in state when user been refresh by keeping the logged in user details
    });
    return () => unsubscribe(); // clean up subscription when it unmount
  }, []);

  return (
    <FirebaseUserContext.Provider value={{ user, setUser }}>
      {children}
    </FirebaseUserContext.Provider>
  );
};

export const useFirebaseUser = () => useContext(FirebaseUserContext);
