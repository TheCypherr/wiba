import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useFirebaseUser } from "./FirebaseContext";
import BouncyLogo from "./BouncyLogo/BouncyLogo";

const RequireAuth = ({ children }) => {
  const { user, loading } = useFirebaseUser();
  const location = useLocation();

  if (loading) {
    return <BouncyLogo />; // Show the bouncing logo while loading
  }

  return user ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default RequireAuth;
