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
      <h1>The Motivations you need!</h1>
      <div className="inner-review">
        <Slider {...settings}>
          <div className="review-one">
            <FaQuoteLeft />
            <h4>
              "Success is the sum of small efforts, repeated day in and day
              out." Consistency is your greatest ally on the path to academic
              excellence.
            </h4>
            <div className="little">
              <div className="small-word">
                <h5>
                  WibA <br />
                  Stay dedicated, aim for success.
                </h5>
              </div>
            </div>
          </div>

          <div className="review-one">
            <FaQuoteLeft />
            <h4>
              "Tomorrow belongs to those who prepare for it today." Your
              dedication now sets the foundation for a bright and successful
              future.
            </h4>
            <div className="little">
              <div className="small-word">
                <h5>
                  WibA <br />
                  Stay dedicated, aim for success.
                </h5>
              </div>
            </div>
          </div>

          <div className="review-one">
            <FaQuoteLeft />
            <h4>
              "The expert in anything was once a beginner." Remember, every
              master started as a learner. Take each step confidently, knowing
              growth takes time.
            </h4>
            <div className="little">
              <div className="small-word">
                <h5>
                  WibA <br />
                  Stay dedicated, aim for success.
                </h5>
              </div>
            </div>
          </div>

          <div className="review-one">
            <FaQuoteLeft />
            <h4>
              "Your future is created by what you do today, not tomorrow." Make
              every moment count, and let today's efforts push you closer to
              your dreams.
            </h4>
            <div className="little">
              <div className="small-word">
                <h5>
                  WibA <br />
                  Stay dedicated, aim for success.
                </h5>
              </div>
            </div>
          </div>

          <div className="review-one">
            <FaQuoteLeft />
            <h4>
              "Believe you can, and you're halfway there." Confidence in your
              abilities can propel you to achieve the extraordinary and you'll
              be surprised by your ability.
            </h4>
            <div className="little">
              <div className="small-word">
                <h5>
                  WibA <br />
                  Stay dedicated, aim for success.
                </h5>
              </div>
            </div>
          </div>

          <div className="review-one">
            <FaQuoteLeft />
            <h4>
              "Dreams don't work unless you do." Your hard work and
              determination will turn your aspirations into achievements. Don't
              give up!
            </h4>
            <div className="little">
              <div className="small-word">
                <h5>
                  WibA <br />
                  Stay dedicated, aim for success.
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
