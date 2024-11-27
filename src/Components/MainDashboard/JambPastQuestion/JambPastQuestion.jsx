import React, { useState } from "react";
import "./JambPastQuestion.css";
import { useNavigate } from "react-router-dom";
import { jambPDF } from "../../../utils/JambPDF";
import { FaChevronDown } from "react-icons/fa";

const JambPastQuestion = () => {
  const [facultyDropdown, setFacultyDropdown] = useState(jambPDF[0]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePageLoading = (targetPage) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate(targetPage);
    }, 1500);
  };

  const handleQuizChange = (event) => {
    const selectedId = parseInt(event.target.value, 10);
    const selectedFaculty = jambPDF.find((item) => item.id === selectedId);
    setFacultyDropdown(selectedFaculty);
  };

  return (
    <section className="allquiz-wrapper">
      <div className="allquiz-inner">
        <h1>JAMB Past Questions</h1>

        <div className="flex-pdf">
          <p className="started">
            Up-to-date past questions for all subject to help you prepare for
            your Exams.
          </p>
          <button
            className="take-jamb"
            onClick={() => {
              handlePageLoading("/categories/JambCBT");
            }}
          >
            Take Jamb CBT
          </button>
        </div>

        <div className="select-faculty department">
          <p>Select Department: </p>
          <select onChange={handleQuizChange}>
            {jambPDF.map((item) => (
              <option key={item.id} value={item.id} className="option">
                {item.label}
              </option>
            ))}
          </select>
          <FaChevronDown className="select-icon" />
        </div>

        {facultyDropdown && (
          <div className="quiz-container">
            <h2>{facultyDropdown.label}</h2>
            {facultyDropdown.content.map((linkItem) => (
              <div key={linkItem.id} className="quiz-content">
                <p>{linkItem.course}</p>
                <a
                  download={
                    linkItem.download ? linkItem.doc.split("/").pop() : ""
                  }
                  href={linkItem.doc}
                  className="take-quiz"
                >
                  Download PDF
                </a>
              </div>
            ))}
          </div>
        )}
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

export default JambPastQuestion;
