import React, { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../config/Firebase";
import { onAuthStateChanged } from "firebase/auth";

export const FirebaseUserContext = createContext({
  user: null,
  setUser: () => {},
});

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName || "", // Default to "" if no username is set
          email: currentUser.email,
          userId: currentUser.uid, // Make sure we always have userId here
        });
      } else {
        setUser(null); // If user is logged out, clear user state
      }
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

// export const FirebaseUserContext = createContext({ user: null, setUser: () => {} }); // Provide default values

// if (currentUser) {
//   setUser({
//     displayName: currentUser.displayName || "", // Default to "" if no username is set
//     email: currentUser.email,
//     userId: currentUser.uid, // Make sure we always have userId here
//   });
// } else {
//   setUser(null); // If user is logged out, clear user state
// }

// setUser(currentUser); // this go set the user in state when user been refresh by keeping the logged in user details
