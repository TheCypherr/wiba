import React, { useState } from "react";
import "./MainGetaway.css";
import { Link, useNavigate } from "react-router-dom";

const MainGetaway = () => {
  // State for showing the top loading
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePageLoading = (targetPage) => {
    setLoading(true); // start the loading

    setTimeout(() => {
      setLoading(false);
      navigate(targetPage);
    }, 2000);
  };

  return (
    <section className="main-getaway-wrapper">
      <h1>Your Gateway to Academic Excellence</h1>
      <div className="main-inner-getaway">
        <div className="main-getaway-one">
          <div className="main-flex-1">
            <div className="main-small-get">
              <div className="main-get-icon">
                <i className="fas fa-book-open main-icon-style"></i>
              </div>
              <div className="main-get-text">
                <h2>Diverse Subjects</h2>
                <p>
                  Prepare for a wide array of subjects, from core academic
                  disciplines to specialized fields.
                </p>
              </div>
            </div>

            <div className="main-small-get">
              <div className="main-get-icon">
                <i className="fas fa-calendar-alt main-icon-style"></i>
              </div>
              <div className="main-get-text">
                <h2>Flexible Scheduling</h2>
                <p>
                  Study at your own pace, with self-paced courses and on-demand
                  access to materials.
                </p>
              </div>
            </div>
          </div>

          <div className="main-flex-2">
            <div className="main-small-get">
              <div className="main-get-icon">
                <i className="fas fa-file-alt main-icon-style"></i>
              </div>
              <div className="main-get-text">
                <h2>Exam Types</h2>
                <p>On WibA, you get standardized JAMB CBT & Post-UTME Test.</p>
              </div>
            </div>

            <div className="main-small-get">
              <div className="main-get-icon">
                <i className="fas fa-trophy main-icon-style"></i>
              </div>
              <div className="main-get-text">
                <h2>Proven Success</h2>
                <p>
                  Join other students who have achieved their academic goals
                  through WibA.
                </p>
              </div>
            </div>
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
    </section>
  );
};

export default MainGetaway;
