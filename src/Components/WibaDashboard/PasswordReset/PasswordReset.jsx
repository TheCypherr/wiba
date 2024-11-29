import React, { useState } from "react";
import "./PasswordReset.css";
import { useNavigate, Link } from "react-router-dom";
import { FaChevronLeft, FaHome } from "react-icons/fa";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../config/Firebase";

const PasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle, success, error
  const navigate = useNavigate();

  const handlePageLoading = (targetPage) => {
    setLoading(true); // start the loading

    // simulate the loading time
    setTimeout(() => {
      setLoading(false); // stop loading after timeout
      navigate(targetPage); // navigate to target page
    }, 2000); // come back to adjust timer oooo
  };
  const handleResetLoading = (targetPage) => {
    setLoading(true); // start the loading

    setTimeout(() => {
      setLoading(false);
      navigate(targetPage);
    }, 1000);
  };

  // Handle password reset function
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setStatus("idle");
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setStatus("success");
    } catch (err) {
      setError(err.message || "An error occurred. Try again.");
      setStatus("error");
    }
  };

  return (
    <section className="Gst113-wrapper">
      <div className="main-logo quiz-logo">
        <div
          className="logo4-quiz"
          onClick={() => handlePageLoading("/")}
        ></div>

        <button className="back" onClick={() => handlePageLoading("/login")}>
          <FaChevronLeft /> Back
        </button>
      </div>

      <div className="coming-soon">
        <div className="soon-text">
          {status === "idle" && (
            <>
              <h2>Forgot Password?</h2>
              <form onSubmit={handlePasswordReset}>
                <input
                  className="reset-text"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="send-reset"
                  onClick={handleResetLoading}
                >
                  Send Reset Email
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {status === "success" && (
        <div className="success-message">
          <div className="email-success">
            <img src="/success.png" alt="success" />
          </div>
          <div>
            <p>Password reset email sent! Check your inbox.</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="success-message">
          <div className="email-success">
            <img src="/error.png" alt="success" />
          </div>
          <div>
            <p>Invalid-Email! Try again later or input correct email.</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="load-overlay">
          <div className="load-slide">
            <div className="load-bar"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PasswordReset;
