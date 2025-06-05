import React, { useRef } from "react";
import "../../Stylesheets/Home.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function HomeHero() {
  const imageRef = useRef(null);
  const { isLoggedIn } = useAuth();

  const handleMouseMove = (e) => {
    const img = imageRef.current;
    const rect = img.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;

    const threshold = 300; // range in px

    if (Math.abs(offsetX) < threshold && Math.abs(offsetY) < threshold) {
      const rotateX = (-offsetY / 40).toFixed(2);
      const rotateY = (offsetX / 40).toFixed(2);

      img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    } else {
      img.style.transform = `rotateX(0deg) rotateY(0deg)`;
    }
  };

  const resetTransform = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
    }
  };

  return (
    <div>
      <div
        className="hero"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTransform}
      >
        <div className="herotext">
          <h1 className="hero__title">
            X-FACTOR IN <br />
            LEARNING
          </h1>
          <h1 className="hero__subtitle">
            GET TECH COURSES ONLINE FOR{" "}
            <span className="herotext__free">FREE</span>
          </h1>
        </div>
        <div className="heroimage" ref={imageRef}>
          <img src="/Image/homehero.jpg" alt="Hero" />
        </div>
        <NavLink
          to="/signup"
          className="signupbutton"
          style={isLoggedIn && isLoggedIn ? {} : {}}
        >
          <div className="signupbutton__text">Sign up for free</div>
        </NavLink>
      </div>
    </div>
  );
}

export default HomeHero;
