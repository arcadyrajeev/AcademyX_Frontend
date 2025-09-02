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
    <div className="flex flex-col w-[20vw] bg-dark1 rounded-lg  p-5">
      <h2 className="fontheading text-[0.8rem] text-grey2/60 font-bold">
        COURSES
      </h2>
      <div className="flex gap-5 py-6 itens-center flex-col ">
        {topcat.map((item) => (
          <p
            className={
              selectedCategory === item
                ? "flex  w-[70%] text-accent2 fontbody translate-x-4"
                : "flex  w-[70%] text-grey2 fontbody text-[0.8rem] hover:text-white hover:translate-x-2 transition-translate duration-300  ease-in-out cursor-pointer"
            }
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </p>
        ))}
      </div>
      <h1 className="fontheading text-[0.8rem] py-3 text-grey2/60 font-bold">
        COURSE CATEGORIES
      </h1>
      <div className="flex gap-5 py-6 itens-center flex-col ">
        {categories.map((category, idx) => (
          <p
            className={
              selectedCategory === category
                ? "flex  w-[70%] text-accent2 fontbody translate-x-4"
                : "flex  w-[70%] text-grey2 fontbody text-[0.8rem] hover:text-white hover:translate-x-2 transition-translate duration-300  ease-in-out cursor-pointer"
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
