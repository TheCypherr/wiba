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
