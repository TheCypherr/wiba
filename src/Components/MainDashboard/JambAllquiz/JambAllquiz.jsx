import React, { useEffect, useState } from "react";
import "./JambAllquiz.css";
import { Link, useNavigate } from "react-router-dom";
import { selectDepartment } from "../../../utils/JambData";
import { FaChevronDown } from "react-icons/fa";

const JambAllquiz = () => {
  const [facultyDropdown, setFacultyDropdown] = useState(selectDepartment[0]);
  const [loading, setLoading] = useState(false);
  // const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [quizInstructionPopup, setQuizInstructionPopup] = useState(false);
  const [selectedQuizLink, setSelectedQuizLink] = useState("");
  const navigate = useNavigate();

  // useEffect to prevent scrolling when popup is shown
  useEffect(() => {
    if (quizInstructionPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [quizInstructionPopup]);

  const handleQuizChange = (event) => {
    const selectedId = parseInt(event.target.value, 10);
    const selectedFaculty = selectDepartment.find(
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

  // useEffect(() => {
  //   setShowDisclaimer(true);

  //   const timer = setTimeout(() => {
  //     setShowDisclaimer(false);
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <section className="allquiz-wrapper">
      <div className="allquiz-inner">
        <h1>JAMB Practice Test</h1>

        <p className="started">
          Get Started with well structured and grounded quiz questions to
          prepare you for your first <span>University Exams.</span>
        </p>

        <div className="select-faculty department">
          <p>Select Department: </p>
          <select onChange={handleQuizChange}>
            {selectDepartment.map((item) => (
              <option key={item.id} value={item.id} className="option">
                {item.label}
              </option>
            ))}
          </select>
          <FaChevronDown className="select-icon department-icon" />
        </div>

        {quizInstructionPopup && <div className="popup-backdrop"></div>}
        {quizInstructionPopup && (
          <div className="popup-container">
            {facultyDropdown.content.map((linkItem) => (
              <div key={linkItem.id} className="inner-popup">
                <div className="popup-texts">
                  <h3>CBT Instruction</h3>
                  <ul>
                    <li>
                      Once you start the Test, you cannot go back to previous
                      questions. Make sure you are confident in your answer
                      before proceeding.
                    </li>
                    <li>
                      You will have a limited amount of time to complete the
                      test, so manage your time wisely.
                    </li>
                    <li>
                      Each Question has a timer & the amount of time varies
                      depending on subject chosen.
                    </li>
                    <li>
                      Click the 'Start Test' button when you are ready. Good
                      luck!
                    </li>
                  </ul>
                </div>
                <div className="popup-btns">
                  <button onClick={() => handleContinueToQuiz(linkItem.link)}>
                    Start Test
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
                  Take Test
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

      {/* {showDisclaimer && (
        <div
          className={`disclaimer ${showDisclaimer ? "slide-in" : "slide-out"}`}
        >
          <p>
            Quiz in this section are strictly according to "Ekiti State
            University" Curriculum!
          </p>
        </div>
      )} */}
    </section>
  );
};

export default JambAllquiz;
