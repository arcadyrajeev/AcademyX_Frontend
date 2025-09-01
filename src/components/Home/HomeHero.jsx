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
    <div
      className="flex w-full flex-col-reverse items-center justify-between lg:flex-row p-10  bg-dark1 rounded-2xl  lg:h-fit lg:rounded3xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTransform}
    >
      <div className="flex flex-col  pl-0 lg:pl-24 gap-5 lg:gap-8  h-fit w-full lg:w-[46%]">
        <h1 className="fontheading font-black text-white text-[2.4rem] lg:text-[4.2rem]">
          X-FACTOR IN <br />
          LEARNING
        </h1>
        <h1 className="w-[80%] lg:w-[40%] fontheading text-white text-[1.2rem] lg:text-[1.2rem]">
          GET TECH COURSES ONLINE FOR{" "}
          <span className="flex px-4 py-2 w-fit rounded-xl bg-accent2-dark text-white fontheading text-white text-[1.8rem] self-end mt-2 lg:ml-10">
            FREE
          </span>
        </h1>
        <NavLink
          to="/signup"
          className="flex  px-10 py-2 mt-10 self-center lg:self-end rounded-[100vw] bg-white hover:bg-accent2 transition-all duration-300 ease-in-out hover:scale-[1.02] "
          style={isLoggedIn && isLoggedIn ? { display: "none" } : {}}
        >
          <span className="fontheading text-dark1 text-[1rem] lg:text-[2rem]">
            Sign up for free
          </span>
        </NavLink>
      </div>
      <div
        className="flex w-full lg:w-[55%] h-[45%] lg:h-full p-2 lg:p-30  rounded-2xl"
        ref={imageRef}
      >
        <div className="flex rounded-xl overflow-hidden">
          <img
            src="/Image/homehero.jpg"
            className=" object-cover w-[100%] h-[100%] "
            alt="Hero"
          />
        </div>
      </div>
    </div>
  );
}

export default HomeHero;
