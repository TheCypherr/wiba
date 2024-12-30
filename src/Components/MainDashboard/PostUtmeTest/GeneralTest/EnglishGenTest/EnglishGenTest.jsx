import React, { useState, useEffect, useRef } from "react";
import "./EnglishGenTest.css";
import { Link, useNavigate } from "react-router-dom";
import { generalEnglish as allQuestions } from "../../../../../utils/PostUtmeQuestions/General/English";
import { FaChevronLeft, FaClock } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { db } from "../../../../../config/Firebase";
import { useFirebaseUser } from "../../../../../utils/FirebaseContext";

const EnglishGenTest = () => {
  const { user } = useFirebaseUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentCompQuestion, setCurrentCompQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showScore, setShowScore] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [totalAnsweredQuestions, setTotalAnsweredQuestions] = useState(0);
  const [timer, setTimer] = useState(30);
  const timerIntervalRef = useRef(null);
  const [isTimerRunning, setIsTimerRunning] = useState(true); // Timer running status
  const [paymentPopup, setPaymentPopup] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const navigate = useNavigate();
  let askedQuestions = []; // Array to track already asked questions

  const testName = "English Post-UTME";

  // Function to handle Page Loading
  const handlePageLoading = (targetPage) => {
    setLoading(true); // start the loading

    // simulate the loading time
    setTimeout(() => {
      setLoading(false); // stop loading after timeout
      navigate(targetPage); // navigate to target page
    }, 2000); // come back to adjust timer oooo
  };

  // useEffect to prevent scrolling when popup is shown
  useEffect(() => {
    if (showPopup || paymentPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showPopup, paymentPopup]);

  // Check quiz access
  const checkQuizAccess = async () => {
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
          handleRetakeQuiz();
          setLoading(false);
        } else if (quizzesTaken >= 1) {
          // Restrict access and show payment popup
          setPaymentPopup(true);
          setLoading(false);
        } else {
          // Allow access to retake quiz
          handleRetakeQuiz();
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

  // Function to close payment popup
  const handleDontContinue = () => {
    setPaymentPopup(false);
  };

  // Function to handle page reload
  const handlePageReload = () => {
    window.scrollTo(0, 0);
    window.location.href = "/gst113";
  };

  // Function to shuffle and pick a random number of questions (including sub-questions) without repeats
  const shuffleQuestions = (questionsArray, numQuestions) => {
    // Filter out already asked questions
    const remainingQuestions = questionsArray.filter(
      (question) => !askedQuestions.includes(question)
    );

    // If there are fewer remaining questions than needed, reset the askedQuestions array
    if (remainingQuestions.length < numQuestions) {
      // Add all remaining questions to the selected set
      const selectedQuestions = [...remainingQuestions];

      // Reset the askedQuestions array
      askedQuestions = [];

      // Reshuffle the full question array and pick additional questions
      const reshuffledQuestions = [...questionsArray].sort(
        () => 0.5 - Math.random()
      );
      const moreQuestions = reshuffledQuestions.slice(
        0,
        numQuestions - selectedQuestions.length
      );

      // Combine the remaining questions and newly selected ones
      selectedQuestions.push(...moreQuestions);

      // Update the askedQuestions array with the newly selected questions
      askedQuestions = [...selectedQuestions];

      return selectedQuestions; // Return exactly 30 questions
    }

    // Otherwise, shuffle and pick 'numQuestions' directly from remaining pool
    const shuffled = [...remainingQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, numQuestions);

    // Add the selected questions to the askedQuestions array
    askedQuestions = [...askedQuestions, ...selectedQuestions];

    return selectedQuestions;
  };

  useEffect(() => {
    // Shuffle and set random questions when the component mounts
    const selectedQuestions = shuffleQuestions(allQuestions, 30);
    setShuffledQuestions(selectedQuestions);
  }, []);

  // Function to save score to Firestore database
  const saveScoreToFirestore = async () => {
    try {
      if (user) {
        const userId = user.userId; // Logged-in user's ID
        const userQuizzesRef = collection(db, "userScores", userId, "quizzes"); // Reference to the user's quizzes subcollection

        // const userScoreRef = doc(db, "userScores", userId);
        // Path to Firestore document

        // Data to save
        const data = {
          testName,
          score,
          totalQuizQuestion: shuffledQuestions.length,
          result: `${score} / ${shuffledQuestions.length}`,
          timeStamp: serverTimestamp(),
        };

        // Save data to Firestore
        await addDoc(userQuizzesRef, data); // Add a new quiz document to the subcollection

        // await setDoc(userScoreRef, data, { merge: true });
        // Use merge to avoid overwriting other fields

        console.log("Score saved successfully!");
      } else {
        console.error("No user is logged in!");
      }
    } catch (error) {
      console.error("Error saving score to Firestore:", error);
    }
  };

  useEffect(() => {
    if (showScore) {
      saveScoreToFirestore(); // Automatically save score when `showScore` is true
    }
  }, [showScore]);

  // Function to retake quiz
  const handleRetakeQuiz = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setCurrentQuestion(0);
      setCurrentCompQuestion(0);
      setScore(0);
      setSelectedAnswer("");
      setShowScore(false);
      setAnswers([]);
      setAnswered(false);
      setShowCorrectAnswer(false);
      setTotalAnsweredQuestions(0);
      // then the state to shoffle another 30 questions
      const selectedQuestions = shuffleQuestions(allQuestions, 30);
      setShuffledQuestions(selectedQuestions);
      setTimer(30);
    }, 2000);
  };

  // function to pause timer
  const pauseTimer = () => {
    clearInterval(timerIntervalRef.current);
    setIsTimerRunning(false);
    console.log("Timer Paused");
  };

  // function to resume timer
  const resumeTimer = () => {
    setIsTimerRunning(true);
    timerIntervalRef.current = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 30));
    }, 1000); // restart the timer interval
    console.log("Timer Resumed");
  };

  const handleExitPopup = () => {
    setShowPopup(true); //show popup when user clicks
    pauseTimer();
  };

  const handleConfirmExit = () => {
    setLoading(true);
    setShowPopup(false);

    setTimeout(() => {
      setLoading(false);
      navigate("/categories/post-utme");
    }, 2000);
  };

  const handleCancelExit = () => {
    setShowPopup(false);
    resumeTimer();
  };

  // For Regular Answer Click
  const handleAnswerOptionClick = (option) => {
    setSelectedAnswer(option);
    setAnswered(true);

    const isCorrect = option === shuffledQuestions[currentQuestion].answer;

    if (isCorrect) {
      setScore(score + 1); // Increment score by 1 for each correct answer
    } else if (!isCorrect) {
      setShowCorrectAnswer(true);
    }

    // Store the user's answer
    setAnswers([
      ...answers,
      { question: shuffledQuestions[currentQuestion].question, isCorrect },
    ]);

    // Automatically move to the next question after 1.5 seconds
    setTimeout(() => {
      moveToNextQuestion();
    }, 1500); // 1.5 second delay
  };

  useEffect(() => {
    if (isTimerRunning && !shuffledQuestions[currentQuestion]?.comprehension) {
      // Start the timer
      timerIntervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1; // Decrement timer
          } else {
            // Timer expired
            clearInterval(timerIntervalRef.current); // Stop the timer

            // If time runs out and no answer is selected, move to the next question with no score increment
            if (!answered) {
              setAnswers((prevAnswers) => [
                ...prevAnswers,
                {
                  question: shuffledQuestions[currentQuestion].question,
                  isCorrect: false, // Record incorrect answer due to timeout
                },
              ]);
            }
            moveToNextQuestion(); // Move to the next question
            return 30; // Reset the timer for the next question
          }
        });
      }, 1000);
    }

    // Cleanup function to clear the interval
    return () => clearInterval(timerIntervalRef.current);
  }, [isTimerRunning, answered, currentQuestion, shuffledQuestions]); // Dependencies: timer status, answered state, current question

  // Move to next question function
  const moveToNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < shuffledQuestions.length) {
      setCurrentQuestion(nextQuestion); // Move to next question
      setSelectedAnswer(""); // Clear selected answer
      setAnswered(false); // Reset answered state
      setShowCorrectAnswer(false); // Hide correct answer
      setTimer(30); // Reset timer for the next question
    } else {
      setShowScore(true); // Show score when the quiz ends
    }
  };

  // For Comprehension Answer Click
  const handleCompAnswerClick = (option) => {
    setSelectedAnswer(option);
    setAnswered(true);

    const isCorrect =
      option ===
      shuffledQuestions[currentQuestion].questions[currentCompQuestion].answer;

    if (isCorrect) {
      setScore(score + 1); // Increment score by 1 for each correct answer
    } else if (!isCorrect) {
      setShowCorrectAnswer(true);
    }

    // Automatically move to the next question after 2 seconds
    setTimeout(() => {
      const nextCompQuestion = currentCompQuestion + 1;

      // Check if there are more comprehension sub-questions
      if (
        nextCompQuestion < shuffledQuestions[currentQuestion].questions.length
      ) {
        setCurrentCompQuestion(nextCompQuestion); // Move to the next sub-question
        setTotalAnsweredQuestions(totalAnsweredQuestions + 1); // Increase by 1 for each sub-question
      } else {
        // All comprehension sub-questions answered, move to the next main question
        // setCurrentCompQuestion(0); // Reset comprehension question index
        const nextQuestion = currentQuestion + 1;
        setTotalAnsweredQuestions(totalAnsweredQuestions + 1); // Increase by 1 for each sub-question

        // Check if there are more main questions
        if (totalAnsweredQuestions + 1 < 30) {
          setCurrentQuestion(nextQuestion); // Move to the next main question
          setCurrentCompQuestion(0);
        } else {
          setShowScore(true); // All questions answered, show the score
          // setCurrentCompQuestion(0);
        }
      }

      setSelectedAnswer(""); // Clear the selected answer for the next question
      setAnswered(false); // Reset answer state for new question
      setShowCorrectAnswer(false); // Hide correct answer indicator
    }, 1500); // 1.5-second delay
  };

  return (
    <section className="Gst113-wrapper">
      <div className="main-logo quiz-logo">
        <div className="logo4-quiz" onClick={handleExitPopup}></div>

        <button className="back" onClick={handleExitPopup}>
          <FaChevronLeft /> Back
        </button>
      </div>

      {showPopup && <div className="popup-backdrop"></div>}
      {showPopup && (
        <div className="popup-container">
          <div className="popup-texts">
            <h3>Are you sure you want to Exit?</h3>
          </div>
          <div className="popup-btns">
            <button onClick={handleConfirmExit}>Yes</button>
            <button onClick={handleCancelExit}>No</button>
          </div>
        </div>
      )}

      <div className="quiz-type">
        <h2>English Post-UTME</h2>
      </div>

      <div className="Gst113-inner">
        {showScore ? (
          <div className="score-section">
            <h1>
              {score >= 15
                ? `You scored ${score} / ${shuffledQuestions.length}`
                : `You scored ${score} / ${shuffledQuestions.length}`}
            </h1>
            <div className="emoji">
              {score >= 15 ? (
                <img src="/trophy.png" alt="up" />
              ) : (
                <img src="/trophy.png" alt="down" />
              )}
            </div>
            <div className="retake">
              <button onClick={checkQuizAccess}>
                <p>Retake Test</p> <FaRepeat />
              </button>
            </div>
            <div className="save">
              <button onClick={() => handlePageLoading("/overview")}>
                <p>Test Overview</p>
              </button>
            </div>
          </div>
        ) : (
          <div className="question-section">
            {shuffledQuestions.length > 0 && (
              <>
                <div className="question-length">
                  <p>
                    Question: <br /> {currentQuestion + 1}/
                    {shuffledQuestions.length}
                  </p>

                  <p>
                    Current Score: <br /> {score}
                  </p>
                </div>
                <div className={`timer ${timer <= 5 ? "low" : ""}`}>
                  <FaClock />: {timer}
                </div>

                {/* Check if it's a comprehension question */}
                {shuffledQuestions[currentQuestion]?.comprehension ? (
                  <div className="comprehension-section">
                    {/* Show comprehension passage */}
                    <div className="comprehension-passage">
                      <p className="instruction">
                        {shuffledQuestions[currentQuestion].instruction}
                      </p>
                      <p>{shuffledQuestions[currentQuestion].comprehension}</p>
                    </div>

                    {/* Show comprehension questions */}
                    <div className="comprehension-question">
                      <p>
                        {
                          shuffledQuestions[currentQuestion].questions[
                            currentCompQuestion
                          ].question
                        }
                      </p>
                      <div className="options">
                        {shuffledQuestions[currentQuestion].questions[
                          currentCompQuestion
                        ].options.map((option) => (
                          <button
                            key={option}
                            onClick={() =>
                              handleCompAnswerClick(
                                option,
                                shuffledQuestions[currentQuestion].questions[
                                  currentCompQuestion
                                ].answer
                              )
                            }
                            className={`option-button ${
                              answered && option === selectedAnswer
                                ? selectedAnswer ===
                                  shuffledQuestions[currentQuestion].questions[
                                    currentCompQuestion
                                  ].answer
                                  ? "correct" // Mark selected correct answer green
                                  : "wrong" // Mark selected wrong answer red
                                : showCorrectAnswer &&
                                  option ===
                                    shuffledQuestions[currentQuestion]
                                      .questions[currentCompQuestion].answer
                                ? "correct" // Show correct answer in green if wrong selected
                                : ""
                            }`}
                            disabled={!!selectedAnswer} // Disable buttons after selecting one
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="question">
                    <div className="comprehension-passage2">
                      <p className="instruction2">
                        {shuffledQuestions[currentQuestion].instruction}
                      </p>
                    </div>
                    <p>{shuffledQuestions[currentQuestion]?.question}</p>
                    <div className="options">
                      {shuffledQuestions[currentQuestion]?.options.map(
                        (option) => (
                          <button
                            key={option}
                            onClick={() => handleAnswerOptionClick(option)}
                            className={`option-button ${
                              answered && option === selectedAnswer
                                ? selectedAnswer ===
                                  shuffledQuestions[currentQuestion].answer
                                  ? "correct" // Mark selected correct answer green
                                  : "wrong" // Mark selected wrong answer red
                                : showCorrectAnswer &&
                                  option ===
                                    shuffledQuestions[currentQuestion].answer
                                ? "correct" // Show correct answer in green if wrong selected
                                : ""
                            }`}
                            disabled={!!selectedAnswer} // Disable buttons after selecting one
                          >
                            {option}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
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
                To gain access to all JAMB & Post-UTME Practice Test, a one-time
                payment of
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

export default EnglishGenTest;