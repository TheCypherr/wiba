import React from "react";
import "./Hero.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const settings = {
    dots: false,
    infinite: true,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };
  return (
    <section className="hero-wrapper">
      <div className="hero-slider">
        <Slider {...settings}>
          <div className="slide-one">
            <img src="/wiba33.jpg" alt="" />
            <div className="overlay">
              <h1>Ace Your Exams with Accessible Study Materials.</h1>
              <h3>
                Exam preparation can be a daunting task, with different
                challenges. Wiba is here to guide you through these obstacles,
                we'll you maximize your potential and succeed in your academic
                pursuits.
              </h3>
            </div>
          </div>
          <div className="slide-one">
            <img src="/wiba11.jpg" alt="" />
            <div className="overlay">
              <h1>Your One-Stop Study Hub with Extensive Study Materials.</h1>
              <h3>
                Gain access to a vast library of curated study guides, lecture
                notes, and video lessons covering a wide range of subjects and
                exam types..
              </h3>
            </div>
          </div>
          <div className="slide-one">
            <img src="/wiba2.jpg" alt="" />
            <div className="overlay">
              <h1>Performance Tracking on Study and Quiz for Students</h1>
              <h3>
                Monitor your progress and identify areas for improvement with
                our intuitive performance tracking tools, ensuring you're always
                on the path to success.
              </h3>
            </div>
          </div>
          <div className="slide-one">
            <img src="/wiba4.jpg" alt="" />
            <div className="overlay">
              <h1>Personalized Practice Questions for 100L - 400L.</h1>
              <h3>
                Sharpen your skills with our comprehensive database of practice
                questions, tailored to your individual needs and exam
                requirements.
              </h3>
            </div>
          </div>
        </Slider>
      </div>

      <div className="hero-slider-new">
        <Slider {...settings}>
          <div className="slide-one-new">
            <div className="slide-image">
              <img src="/wiba33.jpg" alt="" />
            </div>
            <div className="overlay-new">
              <h1>Ace Your Exams with Accessible Study Materials.</h1>
              <h3>
                Exam preparation can be a daunting task, with different
                challenges. Wiba is here to guide you through these obstacles,
                we'll you maximize your potential and succeed in your academic
                pursuits.
              </h3>
            </div>
          </div>
          <div className="slide-one-new">
            <div className="slide-image">
              <img src="/wiba11.jpg" alt="" />
            </div>
            <div className="overlay-new">
              <h1>Your One-Stop Study Hub with Extensive Study Materials.</h1>
              <h3>
                Gain access to a vast library of curated study guides, lecture
                notes, and video lessons covering a wide range of subjects and
                exam types..
              </h3>
            </div>
          </div>
          <div className="slide-one-new">
            <div className="slide-image">
              <img src="/wiba2.jpg" alt="" />
            </div>
            <div className="overlay-new">
              <h1>Performance Tracking on Study and Quiz for Students.</h1>
              <h3>
                Monitor your progress and identify areas for improvement with
                our intuitive performance tracking tools, ensuring you're always
                on the path to success.
              </h3>
            </div>
          </div>
          <div className="slide-one-new">
            <div className="slide-image">
              <img src="/wiba4.jpg" alt="" />
            </div>
            <div className="overlay-new">
              <h1>Personalized Practice Questions for 100L - 400L.</h1>
              <h3>
                Sharpen your skills with our comprehensive database of practice
                questions, tailored to your individual needs and exam
                requirements.
              </h3>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Hero;
