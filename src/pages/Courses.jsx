import React from "react";
import CoursesCategories from "../components/Courses/CoursesCategories";
import CourseCard from "../components/Courses/CourseCards";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../Stylesheets/base.css";

import ErrorBoundary from "../errorHandeling/ErrorBoundary";
import { CategoryProvider } from "../context/CategoryContext";

function Courses() {
  return (
    <div>
      <div className="bodydiv">
        <Navbar />
        <ErrorBoundary>
          <div className="flex flex-row gap-10 w-full justify-between m-8">
            <div className="flex w-[22vw] p-5 !important ">
              <CoursesCategories />
            </div>
            <div className="flex w-[84vw] p-5 ">
              <CourseCard />
            </div>
          </div>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
}

export default Courses;
