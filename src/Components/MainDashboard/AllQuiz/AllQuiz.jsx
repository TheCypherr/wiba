import React, { useEffect, useState } from "react";
import "./AllQuiz.css";
import { Link, useNavigate } from "react-router-dom";
import { selectFaculty } from "../../../utils/SelectFaculty";
import { FaChevronDown } from "react-icons/fa";

const AllQuiz = () => {
  const [facultyDropdown, setFacultyDropdown] = useState(selectFaculty[0]);
  const [loading, setLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [quizInstructionPopup, setQuizInstructionPopup] = useState(false);
  const [selectedQuizLink, setSelectedQuizLink] = useState("");
  const navigate = useNavigate();

  // useEffect to prevent scrolling when menubar is open
  useEffect(() => {
    if (quizInstructionPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [quizInstructionPopup]);

  const handleQuizChange = (event) => {
    const selectedId = parseInt(event.target.value, 10);
    const selectedFaculty = selectFaculty.find(
      (item) => item.id === selectedId
    );
    setFacultyDropdown(selectedFaculty);
  };

  const handleQuizInstruction = (link) => {
    setQuizInstructionPopup(true);
    setSelectedQuizLink(link);
  };

  const handleContinueToQuiz = () => {
    setLoading(true);
    setQuizInstructionPopup(false);

    setTimeout(() => {
      setLoading(false);
      navigate(selectedQuizLink);
    }, 2000);
  };

  const handleDontContinue = () => {
    setQuizInstructionPopup(false);
  };

  useEffect(() => {
    setShowDisclaimer(true);

    const timer = setTimeout(() => {
      setShowDisclaimer(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="allquiz-wrapper">
      <div className="allquiz-inner">
        <h1>100L Quiz Section</h1>

        <p className="started">
          Get Started with well structured and grounded quiz questions to
          prepare you for your first <span>University Exams.</span>
        </p>

        <div className="select-faculty">
          <p>Select Faculty: </p>
          <select onChange={handleQuizChange}>
            {selectFaculty.map((item) => (
              <option key={item.id} value={item.id} className="option">
                {item.label}
              </option>
            ))}
          </select>
          <FaChevronDown className="select-icon" />
        </div>

        {quizInstructionPopup && <div className="popup-backdrop"></div>}
        {quizInstructionPopup && (
          <div className="popup-container">
            {facultyDropdown.content.map((linkItem) => (
              <div key={linkItem.id} className="inner-popup">
                <div className="popup-texts">
                  <h3>Quiz Instructions</h3>
                  <ul>
                    <li>
                      Once you start the quiz, you cannot go back to previous
                      questions. Make sure you are confident in your answer
                      before proceeding.
                    </li>
                    <li>
                      You will have a limited amount of time to complete the
                      quiz, so manage your time wisely.
                    </li>
                    <li>
                      Each Question has a timer & the amount of time varies
                      depending on course chosen.
                    </li>
                    <li>
                      Click the 'Start Quiz' button when you are ready. Good
                      luck!
                    </li>
                  </ul>
                </div>
                <div className="popup-btns">
                  <button onClick={() => handleContinueToQuiz(linkItem.link)}>
                    Start Quiz
                  </button>
                  <button onClick={handleDontContinue}>Go Back</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {facultyDropdown && (
          <div className="quiz-container">
            <h2>{facultyDropdown.label}</h2>
            {facultyDropdown.content.map((linkItem) => (
              <div key={linkItem.id} className="quiz-content">
                <p>{linkItem.course}</p>
                <button
                  onClick={() => handleQuizInstruction(linkItem.link)}
                  className="take-quiz"
                >
                  Take Quiz
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {loading && (
        <div className="load-slide">
          <div className="load-bar"></div>
        </div>
      )}

      {showDisclaimer && (
        <div
          className={`disclaimer ${showDisclaimer ? "slide-in" : "slide-out"}`}
        >
          <p>
            Quiz in this section are strictly according to "Ekiti State
            University" Curriculum!
          </p>
        </div>
      )}
    </section>
  );
};

export default AllQuiz;
