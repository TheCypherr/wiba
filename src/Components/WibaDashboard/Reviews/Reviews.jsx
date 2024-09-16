import React, { useState } from "react";
import "./Reviews.css";
import { FaQuoteLeft } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlide = 6;

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
    centerPadding: "15px",
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
    <section className="review-wrapper">
      <h1>See how WIBA helped students ace their exams</h1>
      <div className="inner-review">
        <Slider {...settings}>
          <div className="review-one">
            <FaQuoteLeft />
            <h4>
              Wiba really came through when I needed help with ACC 101. The
              practice quizzes and materials helped me fill in the
              <span> gaps in my understanding. </span>
            </h4>
            <div className="little">
              <div className="img-contain">
                <img src="/www2.jpg" alt="" />
              </div>
              <div className="small-word">
                <h5>
                  Tunde <br />
                  100L Accounting student
                </h5>
              </div>
            </div>
          </div>

          <div className="review-one">
            <FaQuoteLeft />
            <h4>
              Wiba really came through when I needed help with ACC 101. The
              practice quizzes and materials helped me fill in the
              <span> gaps in my understanding. </span>
            </h4>
            <div className="little">
              <div className="img-contain">
                <img src="/www2.jpg" alt="" />
              </div>
              <div className="small-word">
                <h5>
                  Tunde <br />
                  100L Accounting student
                </h5>
              </div>
            </div>
          </div>

          <div className="review-one">
            <FaQuoteLeft />
            <h4>
              Wiba really came through when I needed help with ACC 101. The
              practice quizzes and materials helped me fill in the
              <span> gaps in my understanding. </span>
            </h4>
            <div className="little">
              <div className="img-contain">
                <img src="/www2.jpg" alt="" />
              </div>
              <div className="small-word">
                <h5>
                  Tunde <br />
                  100L Accounting student
                </h5>
              </div>
            </div>
          </div>

          <div className="review-one">
            <FaQuoteLeft />
            <h4>
              Wiba really came through when I needed help with ACC 101. The
              practice quizzes and materials helped me fill in the
              <span> gaps in my understanding. </span>
            </h4>
            <div className="little">
              <div className="img-contain">
                <img src="/www2.jpg" alt="" />
              </div>
              <div className="small-word">
                <h5>
                  Tunde <br />
                  100L Accounting student
                </h5>
              </div>
            </div>
          </div>

          <div className="review-one">
            <FaQuoteLeft />
            <h4>
              Wiba really came through when I needed help with ACC 101. The
              practice quizzes and materials helped me fill in the
              <span> gaps in my understanding. </span>
            </h4>
            <div className="little">
              <div className="img-contain">
                <img src="/www2.jpg" alt="" />
              </div>
              <div className="small-word">
                <h5>
                  Tunde <br />
                  100L Accounting student
                </h5>
              </div>
            </div>
          </div>

          <div className="review-one">
            <FaQuoteLeft />
            <h4>
              Wiba really came through when I needed help with ACC 101. The
              practice quizzes and materials helped me fill in the
              <span> gaps in my understanding. </span>
            </h4>
            <div className="little">
              <div className="img-contain">
                <img src="/www2.jpg" alt="" />
              </div>
              <div className="small-word">
                <h5>
                  Tunde <br />
                  100L Accounting student
                </h5>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Reviews;
