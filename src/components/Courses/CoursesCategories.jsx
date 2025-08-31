import React, { useState, useEffect } from "react";

import { useCategory } from "../../context/CategoryContext";
import "../../Stylesheets/Courses.css";

export default function CoursesCategories() {
  const { setCategory, selectedCategory, setSelectedCategory } = useCategory();

  const topcat = [
    "All Courses",
    "Free Courses",
    "New Courses",
    "Popular Courses",
  ];

  const categories = [
    "Artificial Intelligence",
    "Web Development",
    "App Development",
    "Software Development",
    "Game Development",
    "Language",
    "Graphic Design",
    "UI/UX Design",
    "Video Editing",
    "Cyber Security",
    "Cloud Computing",
    "Blockchain",
    "Data Science",
    "DevOps",
    "Business Analysis",
  ];

  const handleCategoryClick = (category) => {
    setCategory(category);
    setSelectedCategory(category);
  };

  return (
    <div className="flex flex-col w-[20vw] bg-dark1   rounded-lg ">
      <h2 className="headings">Courses</h2>
      <div className="flex gap-5 border border-white itens-center flex-col ">
        {topcat.map((item) => (
          <p
            className={
              selectedCategory === item
                ? "border-white border w-[70%] text-accent2 fontbody"
                : "border-white border w-[70%] text-grey2 fontbody text-[0.8rem] hover:text-white hover:translate-x-5 transition-translate duration-300 ease-in-out cursor-pointer"
            }
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </p>
        ))}
      </div>
      <h1
        className="headings"
        style={{
          fontSize: "clamp(0.6rem, 1vw, 1.5vw)",
          marginLeft: "2vw",
          marginTop: "clamp(1rem, 3vw, 3vw)",
        }}
      >
        Course Categories
      </h1>
      <div className="flex gap-5 border border-white itens-center flex-col ">
        {categories.map((category, idx) => (
          <p
            className={
              selectedCategory === category
                ? "border-white border w-[70%] text-accent2 fontbody"
                : "border-white border w-[70%] text-grey2 fontbody text-[0.8rem] hover:text-white hover:translate-x-5 transition-translate duration-300 ease-in-out cursor-pointer"
            }
            key={idx}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </p>
        ))}
      </div>
    </div>
  );
}
