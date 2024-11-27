import React, { useState } from "react";
import "./ComingSoonNew.css";
import { useNavigate, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const ComingSoonNew = () => {
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
        <Link onClick={() => handlePageLoading("/main")}>
          <img src="/logo.png" alt="" />
        </Link>

        <button className="back" onClick={() => handlePageLoading("/main")}>
          <FaHome /> Home
        </button>
      </div>

      <div className="coming-soon">
        <div className="soon-text">
          <h2>Coming Soon!</h2>
          <p>We're working on something amazing. Stay tuned!</p>
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

export default ComingSoonNew;
