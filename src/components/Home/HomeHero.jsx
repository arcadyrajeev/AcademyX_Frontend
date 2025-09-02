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
    <div className="flex lg:pb-10 flex-col w-full p-8 lg:p-0 content-center  bg-dark1 rounded-2xl  lg:h-fit lg:rounded3xl">
      <div
        className="flex w-full flex-col-reverse items-center justify-between lg:flex-row "
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTransform}
      >
        <div className="flex flex-col  pl-2 md:pl-6 lg:pl-24 gap-5 lg:gap-8  h-fit w-full lg:w-[46%]">
          <h1 className="mt-2 md:mt-6 lg:mt-10 fontheading font-black text-white text-[10vw] md:text-[6vw] lg:text-[4.2vw]  xl:text-[4.6vw]">
            X-FACTOR IN <br />
            LEARNING
          </h1>
          <h1 className="w-full lg:w-[60%] fontheading text-white text-[5vw] md:text-[4vw] lg:text-[2.3vw] xl:text-[2.4vw]">
            <span>GET TECH COURSES ONLINE </span>{" "}
            <span className="flex">FOR </span>
            <span className="flex px-4 py-2 w-fit rounded-xl bg-accent2-dark text-white fontheading text-white text-[1.8rem] self-end mt-2 lg:ml-10">
              FREE
            </span>
          </h1>
        </div>
        <div
          className="flex w-full justify-center lg:w-[55%] h-[45%] lg:h-full p-2 lg:p-20  rounded-2xl"
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
      <NavLink
        to="/signup"
        className="flex  px-10 py-2 mt-8 self-center rounded-[100vw] bg-white hover:bg-accent2 transition-all duration-300 ease-in-out hover:scale-[1.02] "
        style={isLoggedIn && isLoggedIn ? { display: "none" } : {}}
      >
        <span className="fontheading text-dark1 text-[1rem] lg:text-[2rem]">
          Sign up for free
        </span>
      </NavLink>
    </div>
  );
}

export default HomeHero;
