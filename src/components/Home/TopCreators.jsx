import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../Stylesheets/Home.css";
export default function TopCreators() {
  let [card, setCard] = useState([]);
  useEffect(() => {
    let cardValue = [
      {
        img: "/Image/pfp1.png",
        name: "Rahul Sinha",
        course: "Machine Learning",
      },
      {
        img: "/Image/pfp2.png",
        name: "Prof.David Hefner",
        course: "Data Science",
      },
      {
        img: "/Image/pfp3.png",
        name: "Prof.Kelly Mcawth",
        course: "Mathematics",
      },
    ];
    setCard(cardValue);
  }, []);
  return (
    <>
      <div className="flex flex-col p-6 lg:p-10 gap-5 w-full items-center rounded-3xl bg-accent1">
        <h1 className="fontheading text-[2rem] lg:text-[4rem] text-white py-2">
          Our Top Creators
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3  gap-5 lg:gap-10 rounded-lg">
          {card.length > 0 ? (
            card.map((value, idx) => (
              <NameCard
                key={idx}
                image={value.img}
                tittle={value.name}
                course={value.course}
              />
            ))
          ) : (
            <p>Loadind......</p>
          )}
        </div>
      </div>
    </>
  );
}

function NameCard({ image, tittle, course }) {
  return (
    <>
      <div className="flex w-full lg:w-[26vw] flex-col h-fit p-8 bg-dark1 rounded-3xl items-center">
        <div className="flex w-full h-[54%] rounded-xl overflow-hidden">
          <img
            src={image}
            alt={tittle}
            className="object-contain w-[100%] h-[100%] object-center"
          />
        </div>
        <div className="flex flex-col gap-2 mt-10">
          <h3 className="font-heading font-bold text-[6.8vw] md:text-[2.4vw] lg:text-[2vw] text-white">
            {tittle}
          </h3>
          <p className="font-heading font-bold text-[0.8rem] lg:text-[1rem] text-white/60">
            {course}
          </p>
          <p className="fontbody text-[0.7rem] text-justify lg:text-[0.84rem] text-grey2 mt-2 lg:mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quidem{" "}
          </p>
        </div>
        <NavLink
          to={"/"}
          className="mt-10 text-accent1 underline hover:translate-x-2 hover:text-accent2 transition-[color, transform] duration-300 ease-in-out"
        >
          View Courses &gt;
        </NavLink>
      </div>
    </>
  );
}
