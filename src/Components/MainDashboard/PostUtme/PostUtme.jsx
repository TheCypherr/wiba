import React, { useEffect, useState } from "react";
import "./PostUtme.css";
import { Link, useNavigate } from "react-router-dom";
import { selectUniversity } from "../../../utils/PostUtmeUnis";
import { FaChevronDown } from "react-icons/fa";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../config/Firebase";
import { useFirebaseUser } from "../../../utils/FirebaseContext";

const PostUtme = () => {
  const { user } = useFirebaseUser();
  const [facultyDropdown, setFacultyDropdown] = useState(selectUniversity[0]);
  const [loading, setLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [quizInstructionPopup, setQuizInstructionPopup] = useState(false);
  const [paymentPopup, setPaymentPopup] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const [selectedQuizLink, setSelectedQuizLink] = useState("");
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
    const selectedFaculty = selectUniversity.find(
      (item) => item.id === selectedId
    );
    setFacultyDropdown(selectedFaculty);
  };

  // Check quiz access
  const checkQuizAccess = async (quizLink) => {
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
          handleQuizInstruction(quizLink);
          setLoading(false);
        } else if (quizzesTaken >= 1) {
          // Restrict access and show payment popup
          setPaymentPopup(true);
          setLoading(false);
        } else {
          // Allow access to the quiz
          handleQuizInstruction(quizLink);
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

  // Popup instruction before navigating to quiz
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
    setPaymentPopup(false);
  };

  // useEffect for Disclaimer pop-out
  useEffect(() => {
    setShowDisclaimer(true);

    const timer = setTimeout(() => {
      setShowDisclaimer(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="allquiz-wrapper">
      <div className="allquiz-inner">
        <h1>Post-UTME Practice Test</h1>

        <p className="started">
          Take our well grounded and structured Post-UTME Test to get you ready
          for the University of choice <span>Examination.</span>
        </p>

        <div className="select-faculty department select-uni">
          <p>Select University: </p>
          <select onChange={handleQuizChange}>
            {selectUniversity.map((item) => (
              <option key={item.id} value={item.id} className="option">
                {item.label}
              </option>
            ))}
          </select>
          <FaChevronDown className="select-icon select-uni-icon" />
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

        {quizInstructionPopup && <div className="popup-backdrop"></div>}
        {quizInstructionPopup && (
          <div className="popup-container">
            {facultyDropdown.content.map((linkItem) => (
              <div key={linkItem.id} className="inner-popup">
                <div className="popup-texts">
                  <h3>Post-UTME Instructions</h3>
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
            {facultyDropdown.content && facultyDropdown.content.length > 0 ? (
              facultyDropdown.content.map((linkItem) => (
                <div key={linkItem.id} className="quiz-content">
                  <p>{linkItem.course}</p>
                  <button
                    onClick={() => checkQuizAccess(linkItem.link)}
                    className="take-quiz"
                  >
                    Take Test
                  </button>
                </div>
              ))
            ) : (
              <p className="cummulation">
                Practice Test for this University is in Progress. Kindly check
                back or take the
                <span className="span11"> General Post-UTME Test </span>in the
                main time.
              </p>
            )}
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

      {showDisclaimer && (
        <div
          className={`disclaimer ${showDisclaimer ? "slide-in" : "slide-out"}`}
        >
          <p>
            {/* The "General Test" in this section are Post-UTME Questions by
            Universities that set these major subjects for their Exams. */}
            The University Post-UTME Test are being updated. If you can't find
            your Uni, exercise patience as the list is being updated.
          </p>
        </div>
      )}
    </section>
  );
};

export default PostUtme;
