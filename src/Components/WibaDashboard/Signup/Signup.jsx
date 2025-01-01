import React, { useState } from "react";
import "./Signup.css";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFirebaseUser } from "../../../utils/FirebaseContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../../config/Firebase";

const Signup = () => {
  const navigate = useNavigate();
  const { setUser } = useFirebaseUser();

  // State for username/password and error message
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent form from refreshing page

    // Clear previous error messages
    setEmailError("");
    setUsernameError("");
    setPasswordError("");

    // Check if any fields are empty
    if (!email) {
      setEmailError("Input an email");
      return;
    }
    if (!username) {
      setUsernameError("Input a username");
      return;
    }
    if (!password) {
      setPasswordError("Set a password");
      return;
    }

    try {
      setLoading(true); // show loading indicator

      // Check if the username already exists in the 'User Profiles' collection
      const usersRef = collection(db, "userProfiles");
      const q = query(usersRef, where("username", "==", username)); // Query for username match
      const querySnapshot = await getDocs(q);

      // If there's any document returned, that means the username already exists
      if (!querySnapshot.empty) {
        setUsernameError("Username is already taken");
        setLoading(false);
        return;
      }

      console.log("Creating user...");

      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created:", userCredential.user);

      // Update the user profile with the displayName (username)
      await updateProfile(user, {
        displayName: username, // username provided by user during signup
      });

      // force reload of user data after updating profile
      await user.reload();

      // Set user info in Firebase context
      setUser({
        displayName: username, // Set the display name (updated user info)
        email: user.email,
        userId: user.uid,
      });
      console.log("profile updated with username", username);

      setLoading(false); // don't show loading after successful signup
      setSuccess(true); // Trigger success message
      setTimeout(() => {
        navigate("/main");
      }, 2000);
      console.log("Navigated to /main");
    } catch (error) {
      setLoading(false);
      console.error("Error during signup:", error);

      // Handle Firebase auth errors
      if (error.code === "auth/email-already-in-use") {
        setEmailError("This email is already in use");
      } else if (error.code === "auth/weak-password") {
        setPasswordError("Password is too weak");
      } else {
        // Don't overwrite username error here, as we already handled it above
        if (!usernameError) {
          setUsernameError("An unexpected error occurred");
        }
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="signup-wrapper">
      <div className="signup-flex">
        <div className="inner-signup0">
          <div className="illustrator">
            <img src="illustrator3.png" alt="" />
          </div>
        </div>
        <div className="loginSide-two">
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit}>
            <div className="signup-input1">
              <div className="error-text">
                {emailError && (
                  <p style={{ color: "red" }} className="error-message1">
                    {emailError}
                  </p>
                )}
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>

            <div className="signup-input1">
              <div className="error-text">
                {usernameError && (
                  <p style={{ color: "red" }} className="error-message1">
                    {usernameError}
                  </p>
                )}
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>

            <div className="signup-input2">
              <div className="error-text">
                {passwordError && (
                  <p style={{ color: "red" }} className="error-message1">
                    {passwordError}
                  </p>
                )}
              </div>
              <div className="input-wrapper1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <span
                  className="show-password1"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEye size={15} />
                  ) : (
                    <FaEyeSlash size={15} />
                  )}
                </span>
              </div>
            </div>

            <button className="signup" type="submit">
              Sign up
            </button>
            <div className="already-have">
              <p>
                Already have an account?
                <Link className="signup-link" to="/login">
                  <span> Login </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {loading && (
        <div className="load-overlay">
          <div className="load-slide">
            <div className="load-bar"></div>
          </div>
        </div>
      )}
      {success && (
        <div className="success-popup1 slideIn">Sign up Successful</div>
      )}
    </section>
  );
};

export default Signup;
