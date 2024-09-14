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

function App() {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Utme />
              <Getaway />
              <Reviews />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Signup />
            </>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
