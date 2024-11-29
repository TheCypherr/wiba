import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  // Handle page reload onClick of logo at footer
  const handlePageReload = () => {
    window.location.href = "/";
    // window.scrollTo(0, 0);
  };
  const [theme, setTheme] = useState({
    background: true,
    logoBg: true,
    textColor: false,
    logoTextColor: true,
  });

  return (
    <section className="footer-wrapper">
      <div className="top-foot">
        <h1>Goal driven students use WIBA to achieve their Exam Goals.</h1>
      </div>
      <div className="underline" />
      <div className="inner-footer">
        <div className="down-foot">
          <div className="one">
            <li>Teach on WIBA</li>
            <li>Get the App</li>
            <li>About us</li>
            <li>Contact us</li>
          </div>
          <div className="two">
            <li>Careers</li>
            <li>Help and Support</li>
            <li>Affiliate</li>
            <li>Sponsors</li>
          </div>
          <div className="three">
            <li>Terms</li>
            <li>Privacy Policy</li>
            <li>Sitemap</li>
          </div>
        </div>

        <div className="four-side">
          <div className="four" onClick={handlePageReload}></div>
          <p>© 2024 Wiba Inc.</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
