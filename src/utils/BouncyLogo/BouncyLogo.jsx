import React from "react";
import "./BouncyLogo.css";

const BouncyLogo = () => {
  return (
    <div className="logo-container">
      {/* Replace the src with your actual logo path */}
      <img src="/logo.png" alt="Logo" className="bouncy-logo" />
    </div>
  );
};

export default BouncyLogo;
