import React, { useState } from "react";
import "./Utme.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";

const Utme = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlide = 6;

  // function to handlePageLoading
  const handlePageLoading = (targetPage) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate(targetPage);
    }, 2000);
  };

  // Custom previous Slide
  const PrevArrow = (props) => {
    const { className, onClick, currentSlide } = props;
    return (
      <div
        className={`${className} ${currentSlide === 0 ? "hidden" : ""}`}
        onClick={onClick}
        style={{ display: currentSlide === 0 ? "none" : "block" }}
      />
    );
  };

  // Custom Next Arrow
  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={className}
        style={{ display: "block" }}
      />
    );
  };

  const settings = {
    dots: false,
    infinite: false, //this is false to control arrow behavior
    speed: 500,
    slidesToShow: 4,
    swipeToSlide: true,
    spaceBetween: 10,
    slidesToScroll: 1,
    nextArrow: <NextArrow />, //custom next arrow
    prevArrow: <PrevArrow />,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="utme-wrapper">
      <div className="inner-utme">
        <div className="below">
          <h1>Conquer all your Exam Challenges.</h1>
          <h3>
            With up to-date CBT Questions for Jamb Students along side 100L
            Courses Practice Questions for FRESHERS.
          </h3>
        </div>
        <div className="slider-divs">
          <Slider {...settings}>
            <div className="utme-slide">
              <div className="img-container">
                <img src="/math.webp" alt="" />
              </div>
              <div className="text-container">
                <h3>
                  Math CBT: JAMB Math Questions to test your Readiness & Prepare
                  you.
                </h3>
                <h5>Ace your Exams with WIBA</h5>
                <Link to="#">
                  <button
                    className="test-btn"
                    onClick={() => handlePageLoading("/login")}
                  >
                    Take TEST
                  </button>
                </Link>
              </div>
            </div>

            <div className="utme-slide">
              <div className="img-container">
                <img src="/english.jpg" alt="" />
              </div>
              <div className="text-container">
                <h3>
                  Sharpen your English Skills for JAMB Success (Grammar &
                  Vocabulary)
                </h3>
                <h5>Authentic English JAMB Past Questions</h5>
                <Link to="#">
                  <button
                    className="test-btn"
                    onClick={() => handlePageLoading("/login")}
                  >
                    Take TEST
                  </button>
                </Link>
              </div>
            </div>

            <div className="utme-slide">
              <div className="img-container">
                <img src="/account.jpg" alt="" />
              </div>
              <div className="text-container">
                <h3>
                  Practice JAMB Accounting Questions to get you prepared for
                  your Exams
                </h3>
                <h5>Accounting Practice Questions on WIBA.</h5>
                <Link to="#">
                  <button
                    className="test-btn"
                    onClick={() => handlePageLoading("/login")}
                  >
                    Take TEST
                  </button>
                </Link>
              </div>
            </div>

            <div className="utme-slide">
              <div className="img-container">
                <img src="/biology.jpg" alt="" />
              </div>
              <div className="text-container">
                <h3>
                  Updated Biology JAMB Practice Questions to help you Ace your
                  Exam.
                </h3>
                <h5>Up to-date Biology Past Questions on WIBA </h5>
                <Link to="#">
                  <button
                    className="test-btn"
                    onClick={() => handlePageLoading("/login")}
                  >
                    Take TEST
                  </button>
                </Link>
              </div>
            </div>

            <div className="utme-slide">
              <div className="img-container">
                <img src="/physics.jpg" alt="" />
              </div>
              <div className="text-container">
                <h3>
                  Physics CBT: Get prepared for JAMB Physics on WIBA with
                  questions to help you Pass.
                </h3>
                <h5>Practice on WIBA with Timer</h5>
                <Link to="#">
                  <button
                    className="test-btn"
                    onClick={() => handlePageLoading("/login")}
                  >
                    Take TEST
                  </button>
                </Link>
              </div>
            </div>

            <div className="utme-slide">
              <div className="img-container">
                <img src="/chemistry.png" alt="" />
              </div>
              <div className="text-container">
                <h3>
                  Chemistry CBT: JAMB Chemistry Questions to Test your
                  Understanding.
                </h3>
                <h5>Get Confident with Practice Questions</h5>
                <Link to="#">
                  <button
                    className="test-btn"
                    onClick={() => handlePageLoading("/login")}
                  >
                    Take TEST
                  </button>
                </Link>
              </div>
            </div>

            <div className="utme-slide">
              <div className="img-container">
                <img src="/Commerce.jpg" alt="" />
              </div>
              <div className="text-container">
                <h3>
                  Commerce CBT: Succeed in JAMB Commerce and have better
                  Understanding
                </h3>
                <h5>Improve your skills with WIBA Test</h5>
                <Link to="#">
                  <button
                    className="test-btn"
                    onClick={() => handlePageLoading("/login")}
                  >
                    Take TEST
                  </button>
                </Link>
              </div>
            </div>
          </Slider>
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

export default Utme;
