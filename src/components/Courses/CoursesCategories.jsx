import React, { useState, useEffect } from "react";

import { useCategory } from "../../context/CategoryContext";
import "../../Stylesheets/Courses.css";

export default function CoursesCategories() {
  const { setCategory, selectedCategory, setSelectedCategory } = useCategory();

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
    <div className="categories hidden lg:flex flex-col w-[30vw] h-[100vh]">
      <h2 className="headings">Courses</h2>
      <ul className="categories__list">
        <li
          className={selectedCategory === "All Courses" ? "active-li" : ""}
          onClick={() => handleCategoryClick("All Courses")}
        >
          All Courses
        </li>

        <li
          className={selectedCategory === "Free Courses" ? "active-li" : ""}
          onClick={() => handleCategoryClick("Free Courses")}
        >
          Free Courses
        </li>

        <li
          className={selectedCategory === "New Courses" ? "active-li" : ""}
          onClick={() => handleCategoryClick("New Courses")}
        >
          New Courses
        </li>

        <li
          className={selectedCategory === "Popular Courses" ? "active-li" : ""}
          onClick={() => handleCategoryClick("Popular Courses")}
        >
          Popular Courses
        </li>
      </ul>
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
      <ul className="categories__list">
        {categories.map((category, idx) => (
          <li
            className={selectedCategory === category ? "active-li" : ""}
            key={idx}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
