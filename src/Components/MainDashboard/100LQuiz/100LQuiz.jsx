import React, { useEffect, useState } from "react";
import "./100LQuiz.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";

const FresherQuiz = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const totalSlide = 6;

  const handlePathNavigation = (path) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate(path);
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
    <section className="main-utme-wrapper">
      <div className="main-inner-utme">
        <div className="main-utme-below">
          <h1>What's your learning style as a Fresher?</h1>
          <h3>
            Get ready for your 100L exams with carefully drafted quiz questions.
          </h3>
        </div>
        <div className="utme-slider-divs">
          <Slider {...settings}>
            <div className="fresher-slide">
              <div className="fresher-img-container">
                <img src="/mat101.png" alt="" />
              </div>
              <div className="fresher-text-container">
                <h3>MAT 101</h3>
                <h5>Ace your Exams with WIBA</h5>
                <Link to="/mathquiz">
                  <button className="utme-test-btn">Take Quiz</button>
                </Link>
              </div>
            </div>

            <div className="fresher-slide">
              <div className="fresher-img-container">
                <img src="/gst111.png" alt="" />
              </div>
              <div className="fresher-text-container">
                <h3>GST 111</h3>
                <h5>Up to-date GST 111 Past Questions</h5>
                <Link to="/engquiz">
                  <button className="utme-test-btn">Take Quiz</button>
                </Link>
              </div>
            </div>

            <div className="fresher-slide">
              <div className="fresher-img-container">
                <img src="/acc101.jpg" alt="" />
              </div>
              <div className="fresher-text-container">
                <h3>ACC 101</h3>
                <h5>Introduction to Accounting</h5>
                <Link to="/accquiz">
                  <button className="utme-test-btn">Take Quiz</button>
                </Link>
              </div>
            </div>

            <div className="fresher-slide">
              <div className="fresher-img-container">
                <img src="/biology.jpg" alt="" />
              </div>
              <div className="fresher-text-container">
                <h3>BIO 101</h3>
                <h5>Up to-date BIO 101 Quiz Questions on WIBA </h5>
                <Link to="/bioquiz">
                  <button className="utme-test-btn">Take Quiz</button>
                </Link>
              </div>
            </div>

            <div className="fresher-slide">
              <div className="fresher-img-container">
                <img src="/physics.jpg" alt="" />
              </div>
              <div className="fresher-text-container">
                <h3>PHY 101</h3>
                <h5>Practice on WIBA with Timer</h5>
                <Link to="/phyquiz">
                  <button className="utme-test-btn">Take Quiz</button>
                </Link>
              </div>
            </div>

            <div className="fresher-slide">
              <div className="fresher-img-container">
                <img src="/chemistry.png" alt="" />
              </div>
              <div className="fresher-text-container">
                <h3>CHM 101</h3>
                <h5>Get Confident with CHM Practice Questions</h5>
                <Link to="/chmquiz">
                  <button className="utme-test-btn">Take Quiz</button>
                </Link>
              </div>
            </div>

            <div className="fresher-slide">
              <div className="fresher-img-container">
                <img src="/Commerce.jpg" alt="" />
              </div>
              <div className="fresher-text-container">
                <h3>ECO 101</h3>
                <h5>Improve your skills with WIBA Test</h5>
                <Link to="/commquiz">
                  <button className="utme-test-btn">Take Quiz</button>
                </Link>
              </div>
            </div>
          </Slider>
        </div>
        <div className="see-allquiz">
          <Link onClick={() => handlePathNavigation("/allquiz")}>
            <button className="utme-test-btn2">See all Quiz</button>
          </Link>
        </div>
      </div>

      {loading && (
        <div className="load-slide">
          <div className="load-bar"></div>
        </div>
      )}
    </section>
  );
};

export default FresherQuiz;
