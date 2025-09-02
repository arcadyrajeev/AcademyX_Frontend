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
      <Navbar />
      <ErrorBoundary>
        <div className="flex w-full  p-2 lg:p-3 gap-4 lg:gap-8">
          <div className="hidden md:flex w-[20%] min-h-screen">
            <CoursesCategories />
          </div>
          <div className="flex w-[80%] min-h-screen">
            <CourseCard />
          </div>
        </div>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default Courses;
