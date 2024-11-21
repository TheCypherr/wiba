import React from "react";
import md5 from "blueimp-md5";

function EmailAvatar({ email, size = 120, fontSize = 40 }) {
  const getInitials = (email) => {
    if (!email) return "U";

    const namePart = email.split("@")[0];
    const nameParts = namePart.split(/[.\-_]/); // Split by ".", "-", or "_"
    const firstNameInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
    const lastNameInitial =
      nameParts[nameParts.length - 1]?.charAt(0).toUpperCase() || "";

    return `${firstNameInitial}${lastNameInitial}`;
  };

  const generateColor = (email) => {
    // Hash the email to generate a deterministic color
    const hash = md5(email.trim().toLowerCase());
    // Use the first 6 characters of the hash as a hex color
    return `#${hash.slice(0, 6)}`;
  };

  const initials = getInitials(email);
  const backgroundColor = generateColor(email);

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: `${fontSize}px`, // Dynamic font size
        fontWeight: "bold",
      }}
    >
      {initials}
    </div>
  );
}

export default EmailAvatar;
