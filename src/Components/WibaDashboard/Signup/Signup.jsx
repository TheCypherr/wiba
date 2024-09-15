import React, { useState } from "react";
import "./Signup.css";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();

  // State for username/password and error message
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form from refreshing page

    // Clear previous error messages
    setFullNameError("");
    setEmailError("");
    setUsernameError("");
    setPasswordError("");

    // Check if any fields is empty
    if (!fullName) {
      setFullNameError("Input Full Name");
    }
    if (!email) {
      setEmailError("Input an email");
    }
    if (!username) {
      setUsernameError("Input a username");
    }
    if (!password) {
      setPasswordError("Set a password");
    }

    // If all fields are empty
    if (!fullName || !email || !username || !password) {
      return;
    }

    // Simulate login process
    setLoading(true); //show loading icon/slider

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/mainDashboard");
      }, 1500);
    }, 2000);
    // Redirect to new dashboard automatically after signup
    // navigate("/mainDashboard");
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="signup-wrapper">
      <h1>Sign up and start learning</h1>
      <div className="inner-signup">
        <form onSubmit={handleSubmit}>
          <div className="signup-input1">
            <div className="error-text">
              {fullNameError && (
                <p style={{ color: "red" }} className="error-message1">
                  {fullNameError}
                </p>
              )}
            </div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
            />
          </div>

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
                {showPassword ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
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

      {loading && (
        <div className="load-slide1">
          <div className="load-bar1"></div>
        </div>
      )}
      {success && <div className="success-popup1">Sign up Successful!</div>}
    </section>
  );
};

export default Signup;
