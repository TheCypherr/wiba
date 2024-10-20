import React from "react";
import Header from "./Components/WibaDashboard/Header/Header";
import Hero from "./Components/WibaDashboard/Hero/Hero";
import Utme from "./Components/WibaDashboard/Utme/Utme";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Getaway from "./Components/WibaDashboard/Getaway/Getaway";
import Reviews from "./Components/WibaDashboard/Reviews/Reviews";
import Footer from "./Components/WibaDashboard/Footer/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/WibaDashboard/Login/Login";
import Signup from "./Components/WibaDashboard/Signup/Signup";
import MainHeader from "./Components/MainDashboard/MainHeader/MainHeader";
import MainHome from "./Components/MainDashboard/MainHome/MainHome";
import MainUtme from "./Components/MainDashboard/MainUtme/MainUtme";
import FresherQuiz from "./Components/MainDashboard/100LQuiz/100LQuiz";
import MainGetaway from "./Components/MainDashboard/MainGetaway/MainGetaway";
import Theme from "./utils/Theme";
import { FirebaseProvider } from "./config/FirebaseContext";
import AllQuiz from "./Components/MainDashboard/AllQuiz/AllQuiz";
import Gst113Quiz from "./Components/MainDashboard/FresherQuestion/Gst113Quiz/Gst113Quiz";
import Gst111Quiz from "./Components/MainDashboard/FresherQuestion/Gst111Quiz/Gst111Quiz";
import JambAllquiz from "./Components/MainDashboard/JambAllquiz/JambAllquiz";
import MathQuiz from "./Components/MainDashboard/JambQuestions/MathQuiz/MathQuiz";
import EnglishQuiz from "./Components/MainDashboard/JambQuestions/EnglishQuiz/EnglishQuiz";

function App() {
  return (
    <>
      <FirebaseProvider>
        <div className="wiba-dashboard">
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Hero />
                  <Utme />
                  <Getaway />
                  <Reviews />
                  <Footer />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Header />
                  <Login />
                  <Footer />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Header />
                  <Signup />
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>

        <div className="main-dashboard">
          <ScrollToTop />
          <Theme />
          <Routes>
            <Route
              path="/main"
              element={
                <>
                  <MainHeader />
                  <MainHome />
                  <MainUtme />
                  <MainGetaway />
                  <FresherQuiz />
                  <Footer />
                </>
              }
            />
            <Route
              path="/allquiz"
              element={
                <>
                  <MainHeader />
                  <AllQuiz />
                  <Footer />
                </>
              }
            />
            <Route path="/categories/gst113" element={<Gst113Quiz />} />
            <Route path="/categories/gst111" element={<Gst111Quiz />} />
            <Route
              path="/JambCBT"
              element={
                <>
                  <MainHeader />
                  <JambAllquiz />
                  <Footer />
                </>
              }
            />
            <Route path="/jamb/maths" element={<MathQuiz />} />
            <Route path="/jamb/english" element={<EnglishQuiz />} />
          </Routes>
        </div>
      </FirebaseProvider>
    </>
  );
}

export default App;
