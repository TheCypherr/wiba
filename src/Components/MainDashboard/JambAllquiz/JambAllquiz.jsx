import React, { useEffect, useState } from "react";
import "./JambAllquiz.css";
import { Link, useNavigate } from "react-router-dom";
import { selectDepartment } from "../../../utils/JambData";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../config/Firebase";
import { useFirebaseUser } from "../../../utils/FirebaseContext";

const JambAllquiz = () => {
  const { user } = useFirebaseUser();
  const [facultyDropdown, setFacultyDropdown] = useState(selectDepartment[0]);
  const [loading, setLoading] = useState(false);
  // const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [quizInstructionPopup, setQuizInstructionPopup] = useState(false);
  const [practiceModeInstruction, setPracticeModeInstruction] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [paymentPopup, setPaymentPopup] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const [selectedQuizLink, setSelectedQuizLink] = useState("");
  const [selectedPracticeLink, setSelectedPracticeLink] = useState("");
  const navigate = useNavigate();

  const handlePageLoading = (targetPage) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate(targetPage);
    }, 2000);
  };

  // useEffect to prevent scrolling when popup is shown
  useEffect(() => {
    if (quizInstructionPopup || paymentPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [quizInstructionPopup, paymentPopup]);

  const handleQuizChange = (event) => {
    const selectedId = parseInt(event.target.value, 10);
    const selectedFaculty = selectDepartment.find(
      (item) => item.id === selectedId
    );
    setFacultyDropdown(selectedFaculty);
  };

  // Check quiz access
  const checkQuizAccess = async (quizLink, practiceLink) => {
    console.log("Exam Link:", quizLink);
    console.log("Practice Link:", practiceLink);

    if (!user) return;
    setLoading(true);

    try {
      const userQuizzesRef = collection(
        db,
        "userScores",
        user.userId,
        "quizzes"
      );
      const userQuizzesSnapshot = await getDocs(userQuizzesRef); // Fetch all quizzes taken by the user

      const quizzesTaken = userQuizzesSnapshot.size; // Count of quizzes taken
      const docRef = doc(db, "userProfiles", user.userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.paymentStatus === "Paid") {
          // Full access granted
          handleSelectMode(quizLink, practiceLink); //take this to handleTest/Practice Mode
          // handleQuizInstruction(quizLink)
          setLoading(false);
          //change this to >= 1 for when you need to automate payment method again
        } else if (quizzesTaken >= 10000) {
          // Restrict access and show payment popup
          setPaymentPopup(true);
          setLoading(false);
        } else {
          // Allow access to the quiz
          handleSelectMode(quizLink, practiceLink);
          // handleQuizInstruction(quizLink)
          setLoading(false);
        }
      } else {
        console.error("User profile not found");
        setIncomplete(true);
        setLoading(false);

        setTimeout(() => {
          setIncomplete(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error checking quiz access:", error);
    }
  };

  // Popup to select Preferred Mode
  const handleSelectMode = (quizLink, practiceLink) => {
    setSelectMode(true);
    setSelectedQuizLink(quizLink);
    setSelectedPracticeLink(practiceLink);
  };

  // Popup instruction before navigating to quiz
  const handleExamInstruction = () => {
    setQuizInstructionPopup(true);
    setSelectMode(false);

    console.log("Exam mode selected:", selectedQuizLink);
  };

  const handlePracticeInstruction = () => {
    setPracticeModeInstruction(true);
    setSelectMode(false);

    console.log("Practice mode selected:", selectedPracticeLink);
  };

  const handleContinueToQuiz = () => {
    setLoading(true);
    setQuizInstructionPopup(false);
    setPracticeModeInstruction(false);

    setTimeout(() => {
      setLoading(false);
      if (practiceModeInstruction) {
        navigate(selectedPracticeLink);
        console.log("Navigating to Practice:", selectedPracticeLink);
      } else {
        navigate(selectedQuizLink);
        console.log("Navigating to Exam:", selectedQuizLink);
      }
    }, 2000);
  };

  const handleDontContinue = () => {
    setQuizInstructionPopup(false);
    setPracticeModeInstruction(false);
    setPaymentPopup(false);
    setSelectMode(false);
  };

  return (
    <section className="allquiz-wrapper">
      <div className="allquiz-inner">
        <h1>JAMB Practice Test</h1>

        <p className="started">
          Get Started with well structured and grounded Jamb CBT questions to
          prepare you for your <span>Exams.</span>
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

        {paymentPopup && <div className="popup-backdrop"></div>}
        {paymentPopup && (
          <div className="popup-container">
            <div className="inner-popup">
              <div className="error-container">
                <img src="/error.png" alt="error" />
              </div>
              <div className="required-text">
                <h2>Payment Required!</h2>
                <p>
                  To gain access to all JAMB & Post-UTME Practice Test, a
                  one-time payment of
                  <span className="span11"> 2,000 NGN </span>
                  is required.
                </p>
              </div>
              <div>
                <button
                  className="proceed-payment"
                  onClick={() => handlePageLoading("/profile")}
                >
                  Proceed to payment
                </button>
              </div>
              <span className="cancel-pay" onClick={handleDontContinue}>
                Cancel
              </span>
            </div>
          </div>
        )}

        {selectMode && <div className="popup-backdrop"></div>}
        {selectMode && (
          <div className="popup-container">
            <div className="popup-texts">
              <h3>Kindly Select Preferred Mode</h3>
            </div>
            <div className="popup-btns mode-btns">
              <button onClick={handlePracticeInstruction}>Practice</button>
              <button onClick={handleExamInstruction}>Exam</button>
            </div>

            <FaTimes
              size={20}
              className="main-fa-times ai-btn"
              onClick={handleDontContinue}
            />
          </div>
        )}

        {/* Exam Mode CBT Instruction */}
        {quizInstructionPopup && <div className="popup-backdrop"></div>}
        {quizInstructionPopup && (
          <div className="popup-container">
            {facultyDropdown.content.map((linkItem) => (
              <div key={linkItem.id} className="inner-popup">
                <div className="popup-texts">
                  <h3>Exam Mode Instruction</h3>
                  <ul>
                    <li>
                      Once you start the Test, you cannot go back to previous
                      questions. Make sure you are confident in your answer
                      before proceeding.
                    </li>
                    <li>
                      "WibA AI" feature is NOT AVAILABLE in this mode as it is
                      strictly Exam Mode.
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

        {/* Practice Mode CBT Instruction */}
        {practiceModeInstruction && <div className="popup-backdrop"></div>}
        {practiceModeInstruction && (
          <div className="popup-container">
            {facultyDropdown.content.map((practiceLink) => (
              <div key={practiceLink.id} className="inner-popup">
                <div className="popup-texts">
                  <h3>Practice Mode Instruction</h3>
                  <ul>
                    <li>
                      Once you start the Test, you cannot go back to previous
                      questions. Make sure you are confident in your answer
                      before proceeding.
                    </li>
                    <li>
                      "WibA AI" feature is implemented for question explanation
                      & answer.
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
                  <button
                    onClick={() => handleContinueToQuiz(practiceLink.practice)}
                  >
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
                  onClick={() =>
                    checkQuizAccess(linkItem.link, linkItem.practice)
                  }
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
        <div className="load-overlay">
          <div className="load-slide">
            <div className="load-bar"></div>
          </div>
        </div>
      )}

      {incomplete && (
        <div className="profile-incomplete slideIn">Incomplete Profile</div>
      )}
    </section>
  );
};

export default JambAllquiz;
