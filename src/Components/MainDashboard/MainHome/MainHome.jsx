import React from "react";
import "./MainHome.css";
import { useFirebaseUser } from "../../../config/FirebaseContext";

const MainHome = () => {
  const { user } = useFirebaseUser();
  return (
    <section className="main-home-wrapper">
      <div className="inner-main-home-new">
        <div className="inner-home1">
          <p>{user ? `Welcome ${user.displayName}!` : ""}</p>
        </div>
        <div className="inner-home2">
          <div className="inner-home-img-container">
            <img src="/wiba444.jpg" alt="" />
          </div>
          <h1>Start your Comprehensive Learning Journey.</h1>
          <div className="home-btn">
            <button>View Materials</button>
          </div>
        </div>
      </div>

      <div className="inner-main-home">
        <div className="inner-home1">
          <p>{user ? `Welcome ${user.displayName}!` : "user"}</p>
          <h1>Start your Comprehensive Learning Journey.</h1>
        </div>
        <div className="inner-home2">
          <div className="inner-home-img-container">
            <img src="/wiba444.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainHome;
