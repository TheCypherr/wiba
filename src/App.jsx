import React from "react";
import Header from "./Components/WibaDashboard/Header/Header";
import Hero from "./Components/WibaDashboard/Hero/Hero";
import Utme from "./Components/WibaDashboard/Utme/Utme";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Getaway from "./Components/WibaDashboard/Getaway/Getaway";
import Reviews from "./Components/WibaDashboard/Reviews/Reviews";
import Footer from "./Components/WibaDashboard/Footer/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/WibaDashboard/Login/Login";
import Signup from "./Components/WibaDashboard/Signup/Signup";
import MainHeader from "./Components/MainDashboard/MainHeader/MainHeader";
import MainHome from "./Components/MainDashboard/MainHome/MainHome";
import MainUtme from "./Components/MainDashboard/MainUtme/MainUtme";
import FresherQuiz from "./Components/MainDashboard/100LQuiz/100LQuiz";
import MainGetaway from "./Components/MainDashboard/MainGetaway/MainGetaway";
import Theme from "./utils/Theme";
import { FirebaseProvider } from "./utils/FirebaseContext";
import AllQuiz from "./Components/MainDashboard/AllQuiz/AllQuiz";
import Gst113Quiz from "./Components/MainDashboard/FresherQuestion/Gst113Quiz/Gst113Quiz";
import Gst111Quiz from "./Components/MainDashboard/FresherQuestion/Gst111Quiz/Gst111Quiz";
import JambAllquiz from "./Components/MainDashboard/JambAllquiz/JambAllquiz";
import MathQuiz from "./Components/MainDashboard/JambQuestions/MathQuiz/MathQuiz";
import EnglishQuiz from "./Components/MainDashboard/JambQuestions/EnglishQuiz/EnglishQuiz";
import PhysicsQuiz from "./Components/MainDashboard/JambQuestions/PhysicsQuiz/PhysicsQuiz";
import ChemistryQuiz from "./Components/MainDashboard/JambQuestions/ChemistryQuiz/ChemistryQuiz";
import BiologyQuiz from "./Components/MainDashboard/JambQuestions/BiologyQuiz/BiologyQuiz";
import CrsQuiz from "./Components/MainDashboard/JambQuestions/CrsQuiz/CrsQuiz";
import GovernmentQuiz from "./Components/MainDashboard/JambQuestions/GovernmentQuiz/GovernmentQuiz";
import LiteratureQuiz from "./Components/MainDashboard/JambQuestions/LiteratureQuiz/LiteratureQuiz";
import CommerceQuiz from "./Components/MainDashboard/JambQuestions/CommerceQuiz/CommerceQuiz";
import EconomicsQuiz from "./Components/MainDashboard/JambQuestions/EconomicsQuiz/EconomicsQuiz";
import AccountQuiz from "./Components/MainDashboard/JambQuestions/AccountQuiz/AccountQuiz";
import UserProfile from "./Components/MainDashboard/UserProfile/UserProfile";
import Overview from "./Components/MainDashboard/Overview/Overview";
import PaymentSuccessful from "./Components/PaymentSuccessful/PaymentSuccessful";
import JambPastQuestion from "./Components/MainDashboard/JambPastQuestion/JambPastQuestion";
import ComingSoonNew from "./Components/MainDashboard/ComingSoonNew/ComingSoonNew";

function App() {
  return (
    <>
      <FirebaseProvider>
        <div className="wiba-dashboard">
          <ScrollToTop />
          <Theme />
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
              path="/categories/past-questions"
              element={
                <>
                  <MainHeader />
                  <JambPastQuestion />
                  <Footer />
                </>
              }
            />
            <Route
              path="/categories/allquiz"
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
              path="/categories/JambCBT"
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
            <Route path="/jamb/physics" element={<PhysicsQuiz />} />
            <Route path="/jamb/chemistry" element={<ChemistryQuiz />} />
            <Route path="/jamb/biology" element={<BiologyQuiz />} />
            <Route path="/jamb/crs" element={<CrsQuiz />} />
            <Route path="/jamb/government" element={<GovernmentQuiz />} />
            <Route path="/jamb/literature" element={<LiteratureQuiz />} />
            <Route path="/jamb/commerce" element={<CommerceQuiz />} />
            <Route path="/jamb/economics" element={<EconomicsQuiz />} />
            <Route path="/jamb/account" element={<AccountQuiz />} />
            <Route
              path="/profile"
              element={
                <>
                  <UserProfile />
                  <Footer />
                </>
              }
            />
            <Route
              path="/overview"
              element={
                <>
                  <Overview />
                  <Footer />
                </>
              }
            />
            <Route
              path="/payment-success"
              element={
                <>
                  <PaymentSuccessful />
                  <Footer />
                </>
              }
            />
            <Route
              path="/coming-soon"
              element={
                <>
                  <ComingSoonNew />
                </>
              }
            />
          </Routes>
        </div>
      </FirebaseProvider>
    </>
  );
}

export default App;
