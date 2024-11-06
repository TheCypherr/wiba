import React, { useState } from "react";
import "./UserProfile.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaSun,
  FaMoon,
  FaTimes,
  FaBars,
  FaChevronRight,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaQuestionCircle,
  FaPencilAlt,
  FaBook,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { useFirebaseUser } from "../../../utils/FirebaseContext";

const UserProfile = () => {
  const { user } = useFirebaseUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState("");

  const handlePageReload = () => {
    window.scrollTo(0, 0);
    window.location.href = "/main";
  };

  const handlePageLoading = (targetPage) => {
    setLoading(true); // start the loading

    // simulate the loading time
    setTimeout(() => {
      setLoading(false); // stop loading after timeout
      navigate(targetPage); // navigate to target page
    }, 2000); // come back to adjust timer oooo
  };

  return (
    <section className="user-profile">
      <div className="inner-profile1">
        <div className="profile-logo">
          <Link onClick={handlePageReload}>
            <img src="/logo.png" alt="" />
          </Link>
        </div>

        <nav>
          <ul className="profile-menu">
            <li className="each-menu">
              <Link
                to="#"
                onClick={() => {
                  handlePageLoading("/categories/JambCBT");
                }}
                className="profile-custom-links"
              >
                <FaPencilAlt /> UTME Quiz
              </Link>
            </li>
            <li className="each-menu">
              <Link
                to="#"
                onClick={() => {
                  handlePageLoading("/categories/A-Level");
                }}
                className="profile-custom-links"
              >
                <FaPencilAlt /> A Level Test
              </Link>
            </li>
            <li className="each-menu">
              <Link
                to="#"
                onClick={() => {
                  handlePageLoading("/categories/allquiz");
                }}
                className="profile-custom-links"
              >
                <FaPencilAlt /> 100L Quiz
              </Link>
            </li>
            <li className="each-menu">
              <Link
                to="#"
                onClick={() => {
                  handlePageLoading("/categories/allquiz");
                }}
                className="profile-custom-links"
              >
                <FaBook /> Study Guide
              </Link>
            </li>
            <li className="each-menu">
              <Link
                to="#"
                onClick={() => {
                  handlePageLoading("/categories/allquiz");
                }}
                className="profile-custom-links"
              >
                <FaBook /> PDF Materials
              </Link>
            </li>
            <li className="each-menu">
              <Link
                to="#"
                onClick={() => {
                  handlePageLoading("/categories/allquiz");
                }}
                className="profile-custom-links"
              >
                <FaBook /> UTME Past Questions
              </Link>
            </li>
          </ul>
        </nav>

        <div
          className="profile-logout"
          onClick={() => {
            handleLogout();
          }}
        >
          <p>Logout</p>
          <FaSignOutAlt color="red" size={17} />
        </div>
      </div>

      <div className="inner-profile2">
        <div className="top-profile">
          <p>User Profile</p>
          <button className="profile-btn">Overview</button>
        </div>
        <div className="bottom-profile">
          <div className="left-profile">
            <div className="profile-pic">
              <img
                src={file ? URL.createObjectURL(file) : "/nooo.jpg"}
                alt="profile"
              />
            </div>
          </div>
          <div className="right-profile">
            <form className="form-container">
              <div className="form-input">
                <label htmlFor="file" style={{ fontSize: "1.1rem" }}>
                  Image: <FaCloudUploadAlt className="profile-icon" />
                </label>
                <input
                  id="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  //   style={{ display: "none" }}
                />
              </div>
              <div className="form-input">
                <label style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                  Username:
                </label>
                {user ? user.displayName : ""}
              </div>
              <div className="form-input">
                <label style={{ fontSize: "1.1rem" }}>Name & Surname:</label>
                <input type="text" placeholder="Oluwa Cypher" />
              </div>
              <div className="form-input">
                <label style={{ fontSize: "1.1rem" }}>Email:</label>
                {user ? user.email : ""}
              </div>
              <div className="form-input">
                <label style={{ fontSize: "1.1rem" }}>Phone:</label>
                <input type="text" placeholder="+234 701 2208 069" />
              </div>
              <div className="form-input">
                <label style={{ fontSize: "1.1rem" }}>Country:</label>
                Nigeria
              </div>

              <button className="profile-btn">Save</button>
            </form>
          </div>
        </div>
      </div>

      {loading && (
        <div className="load-slide">
          <div className="load-bar"></div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
