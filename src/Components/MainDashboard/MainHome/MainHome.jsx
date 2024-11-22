import React from "react";
import "./MainHome.css";
import { useFirebaseUser } from "../../../utils/FirebaseContext";

const MainHome = () => {
  const { user } = useFirebaseUser();
  return (
    <section className="main-home-wrapper">
      <div className="inner-main-home-new">
        <div className="inner-home1">
          <p>{user ? `Welcome ${user.displayName.split(" ")[0]}!` : ""}</p>
          {/* <p>
            {user ? `Welcome ${user.displayName.split(" ").slice(-1)[0]}!` : ""}
          </p> */}
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
          <p>{user ? `Welcome ${user.displayName.split(" ")[0]}!` : ""}</p>
          {/* <p>
            {user ? `Welcome ${user.displayName.split(" ").slice(-1)[0]}!` : ""}
          </p> */}
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
