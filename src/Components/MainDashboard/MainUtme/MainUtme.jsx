import React, { useState } from "react";
import "./MainUtme.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";

const MainUtme = () => {
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
          <h1>Are you preparing for JAMB? (Take our quiz).</h1>
          <h3>
            Up to-date CBT Questions for Jamb Students along side 100L Practice
            Questions for FRESHERS.
          </h3>
        </div>
        <div className="utme-slider-divs">
          <Slider {...settings}>
            <div className="main-utme-slide">
              <div className="utme-img-container">
                <img src="/math.webp" alt="" />
              </div>
              <div className="utme-text-container">
                <h3>
                  Math CBT: JAMB Math Questions to test your Readiness & Prepare
                  you.
                </h3>
                <h5>Ace your Exams with WIBA</h5>
                <Link
                  onClick={() => handlePathNavigation("/categories/JambCBT")}
                >
                  <button className="utme-test-btn">Take Quiz</button>
                </Link>
              </div>
            </div>

            <div className="main-utme-slide">
              <div className="utme-img-container">
                <img src="/account.jpg" alt="" />
              </div>
              <div className="utme-text-container">
                <h3>
                  Practice JAMB Accounting Questions to get you prepared for
                  your Exams
                </h3>
                <h5>Accounting Practice Questions on WIBA.</h5>
                <Link
                  onClick={() => handlePathNavigation("/categories/JambCBT")}
                >
                  <button className="utme-test-btn">Take Quiz</button>
                </Link>
              </div>
            </div>

            <div className="main-utme-slide">
              <div className="utme-img-container">
                <img src="/biology.jpg" alt="" />
              </div>
              <div className="utme-text-container">
                <h3>
                  Updated Biology JAMB Practice Questions to help you Ace your
                  Exam.
                </h3>
                <h5>Up to-date Biology Past Questions on WIBA </h5>
                <Link
                  onClick={() => handlePathNavigation("/categories/JambCBT")}
                >
                  <button className="utme-test-btn">Take Quiz</button>
                </Link>
              </div>
            </div>

            <div className="main-utme-slide">
              <div className="utme-img-container">
                <img src="/Commerce.jpg" alt="" />
              </div>
              <div className="utme-text-container">
                <h3>
                  Commerce CBT: Succeed in JAMB Commerce and have better
                  Understanding
                </h3>
                <h5>Improve your skills with WIBA Test</h5>
                <Link
                  onClick={() => handlePathNavigation("/categories/JambCBT")}
                >
                  <button className="utme-test-btn">Take Quiz</button>
                </Link>
              </div>
            </div>
          </Slider>
        </div>
        <div className="see-allquiz">
          <Link onClick={() => handlePathNavigation("/categories/JambCBT")}>
            <button className="utme-test-btn2">See all Quiz</button>
          </Link>
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

export default MainUtme;
