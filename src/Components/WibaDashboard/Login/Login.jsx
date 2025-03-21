import React, { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFirebaseUser } from "../../../utils/FirebaseContext";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../config/Firebase";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useFirebaseUser();

  // State for username/password and error message
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePageLoading = (targetPage) => {
    setLoading(true); // start the loading

    // simulate the loading time
    setTimeout(() => {
      setLoading(false); // stop loading after timeout
      navigate(targetPage); // navigate to target page
    }, 2000); // come back to adjust timer oooo
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent form from refreshing page

    // Clear previous error message
    setEmailError("");
    setPasswordError("");

    // Check if any field is empty
    if (!email) {
      setEmailError("Enter your email");
      return;
    }
    if (!password) {
      setPasswordError("Enter your password");
      return;
    }

    try {
      setLoading(true); //show loading slider

      // Sign in user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log(user, "Logged in user");

      // Set user info and handle missing displayName
      setUser({
        displayName: user.displayName || "", // Default user as "" if no username is set
        email: user.email,
        userId: user.uid,
      });
      setLoading(false);
      setSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/main");
      }, 2000);
    } catch (error) {
      setLoading(false); // Stop loading on error
      console.error("Error during login:", error);

      if (error.code) {
        setEmailError("Incorrect details");
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Google sign-in
  const googleSignIn = async () => {
    try {
      setLoading(true);
      const googleUser = await signInWithPopup(auth, googleProvider);
      console.log("Google User:", googleUser);

      const user = googleUser.user;
      // then I store user info in context so I can use globally by doing this first
      setUser({
        displayName: user.displayName,
        email: user.email,
        userId: user.uid,
      });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/main");
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error("Error signing up user", error);
    }
  };

  return (
    <section className="login-wrapper">
      <div className="inner-login">
        <div className="loginSide-one">
          <div className="illustrator">
            <img src="illustrator2.png" alt="" />
          </div>
        </div>
        <div className="loginSide-two">
          <h1>Login</h1>
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

            {/* Display error message if any error */}
            {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
            <button className="login" type="submit">
              Login &rarr;
            </button>
            <div className="in">
              <Link
                className="signup-link0"
                onClick={() => handlePageLoading("/forgot-password")}
              >
                <p>Forgot password?</p>
              </Link>
            </div>
          </form>

          <div className="login-or">
            <p>--------------- OR ---------------</p>
          </div>

          <div className="google-signin">
            <button className="google" onClick={googleSignIn}>
              <img src="/google.png" alt="google" />
              <p> Continue with Google</p>
            </button>
          </div>

          <div className="dont-have">
            <p>
              Don't have an account?
              <Link className="signup-link" to="/signup">
                <span> Sign Up </span>
              </Link>
            </p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="load-overlay">
          <div className="load-slide">
            <div className="load-bar"></div>
          </div>
        </div>
      )}
      {success && <div className="success-popup slideIn">Login Successful</div>}
    </section>
  );
};

export default Login;
