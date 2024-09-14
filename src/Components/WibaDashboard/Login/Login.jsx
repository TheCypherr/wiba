import React, { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  // State for username/password and error message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Mock validation function for username/password
  const validateCredentials = () => {
    return username === "cypher" && password === "password123";
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form from refreshing page

    // Clear previous error message
    setUsernameError("");
    setPasswordError("");

    // Check if any field is empty
    if (!username) {
      setUsernameError("Fill in your username.");
    }
    if (!password) {
      setPasswordError("Fill in your password");
    }

    // if username and password is empty
    if (!username || !password) {
      return;
    }

    // Check if username/password is invalid
    if (!validateCredentials()) {
      setUsernameError("Invalid username or password");
      setPasswordError("Invalid username or password");
      return;
    }

    // If valid credentials, clear error and proceed with login
    setError("");
    console.log("Login successful");
    // Add login logic (page-redirect or API call)
    navigate("/mainDashboard");
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="login-wrapper">
      <h1>Login</h1>
      <div className="inner-login">
        <div className="loginSide-two">
          <form onSubmit={handleSubmit}>
            <div className="input-section1">
              <div className="input-label">
                <label>Username</label>
                {usernameError && (
                  <p style={{ color: "red" }} className="error-message">
                    {usernameError}
                  </p>
                )}
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="input-section2">
              <div className="input-label">
                <label>Password</label>
                {passwordError && (
                  <p style={{ color: "red" }} className="error-message">
                    {passwordError}
                  </p>
                )}
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <span
                className="show-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
              </span>
            </div>

            {/* Display error message if any error */}
            {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
            <button className="login" type="submit">
              Login &rarr;
            </button>
            <div className="in">
              <Link className="signup-link0">
                <p>Forgot password?</p>
              </Link>
            </div>
          </form>
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
    </section>
  );
};

export default Login;
