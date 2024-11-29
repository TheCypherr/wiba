import React, { useState } from "react";
import "./Getaway.css";
import { Link, useNavigate } from "react-router-dom";

const Getaway = () => {
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
    <section className="getaway-wrapper">
      <h1>Your Gateway to Academic Excellence</h1>
      <div className="inner-getaway">
        <div className="getaway-one">
          <div className="flex-1">
            <div className="small-get">
              <div className="get-icon">
                <i className="fas fa-book-open icon-style"></i>
              </div>
              <div className="get-text">
                <h2>Diverse Subjects</h2>
                <p>
                  Prepare for a wide array of subjects, from core academic
                  disciplines to specialized fields.
                </p>
              </div>
            </div>

            <div className="small-get">
              <div className="get-icon">
                <i className="fas fa-calendar-alt icon-style"></i>
              </div>
              <div className="get-text">
                <h2>Flexible Scheduling</h2>
                <p>
                  Study at your own pace, with self-paced courses and on-demand
                  access to materials.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-2">
            <div className="small-get">
              <div className="get-icon">
                <i className="fas fa-file-alt icon-style"></i>
              </div>
              <div className="get-text">
                <h2>Exam Types</h2>
                <p>
                  Ace a variety of exam formats, including standardized tests,
                  UTME Exams, Seasoned Questions for Freshers and professional
                  certifications.
                </p>
              </div>
            </div>

            <div className="small-get">
              <div className="get-icon">
                <i className="fas fa-trophy icon-style"></i>
              </div>
              <div className="get-text">
                <h2>Proven Success</h2>
                <p>
                  Join thousands of students who have achieved their academic
                  goals through our platform.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="getaway-two">
          <div className="getImage-container">
            <img src="/dimeji.webp" alt="" />
          </div>
        </div>
      </div>

      <div className="first-step">
        <h1>Take the First Step</h1>
        <div className="steps-flex">
          <div className="side-one">
            <div className="step-one">
              <h2>Get Started</h2>
              <p>
                Sign up today and unlock a world of academic opportunities.
                Elevate your studies and achieve your goals with our
                comprehensive platform.
              </p>
            </div>

            <div className="step-one">
              <h2>Explore our Features</h2>
              <p>
                Discover the full range of tools and resources available to
                support your academic journey. Dive into our expertly curated
                content and personalized study plans.
              </p>
            </div>
          </div>

          <div className="side-two">
            <div className="step-one">
              <h2>Connect with Us</h2>
              <p>
                Have questions or need guidance? Our team of dedicated support
                specialists is here to assist you every step of the way.
              </p>
            </div>

            <div className="step-one">
              <h2>Become a Student Ambassador</h2>
              <p>
                Join our community of student leaders and help us empower others
                to reach new heights of academic success.
              </p>
            </div>
          </div>
        </div>
        <div className="note">
          <p>
            Don't let exam challenges hold you back. <br />
            <Link
              to="#"
              onClick={() => handlePageLoading("/login")}
              className="note-link"
            >
              <span>Join WIBA </span>
            </Link>
            and embark on a transformative academic journey.
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

export default Getaway;
