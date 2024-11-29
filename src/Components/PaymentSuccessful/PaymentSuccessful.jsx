import React, { useState } from "react";
import "./PaymentSuccessful.css";
import { useNavigate, Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

const PaymentSuccessful = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePageLoading = (targetPage) => {
    setLoading(true); // start the loading

    // simulate the loading time
    setTimeout(() => {
      setLoading(false); // stop loading after timeout
      navigate(targetPage); // navigate to target page
    }, 2000); // come back to adjust timer oooo
  };

  return (
    <section className="Gst113-wrapper">
      <div className="main-logo quiz-logo">
        <div
          className="logo4-quiz"
          onClick={() => handlePageLoading("/main")}
        ></div>

        <button className="back" onClick={() => handlePageLoading("/profile")}>
          <FaChevronLeft /> Back
        </button>
      </div>

      <div className="payment-success">
        <div className="payment-check">
          <img src="/success.png" alt="success" />
        </div>
        <div className="payment-text">
          <h2>Payment Successful!</h2>
          <p>
            You can now access the complete
            <span className="span11"> Jamb CBT Test</span> and other related
            Materials.
          </p>
          <p>
            Thank you for choosing <span className="span22">WibA!</span>
          </p>
        </div>
      </div>

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

export default PaymentSuccessful;
