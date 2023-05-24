import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
function Welcome() {
  return (
    <div className="welcome-page">
      <div className="home-text">
        <span>Welcome </span>
        <span>To </span>
        <span>Instagram </span>
        <span>!!!</span>
        
      </div>

      <Link to="/App" className="enter-btn">
        Let's Socialize
      </Link>
    </div>
  );
}

export default Welcome;
