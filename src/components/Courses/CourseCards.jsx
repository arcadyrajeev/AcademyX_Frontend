import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useCategory } from "../../context/CategoryContext";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export default function CourseCard() {
  const { category } = useCategory();
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let response;
        if (
          category === "All Courses" ||
          category === "New Courses" ||
          category === "Free Courses" ||
          category === "Popular Courses"
        ) {
          response = await axios.get(`${baseURL}/courses/allCourses`);
        } else {
          response = await axios.get(
            `${baseURL}/courses/?category=${category}`
          );
        }
        setCourses(response.data.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, [category]);

  return (
    <div className="grid grid-cols-1 border lg:grid-cols-3 gap-6 p-4 w-full">
      {courses.length > 0 ? (
        courses.map((course) => (
          <NavLink
            to={`/coursepage/${course._id}`}
            key={course._id}
            className="group transition duration-300 ease-in-out"
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition">
              {/* Thumbnail */}
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="h-full w-full object-cover group-hover:scale-105 transition"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-4">
                <h3 className="text-lg mb-2 font-semibold text-gray-800 truncate">
                  {course.courseName}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 h-30">
                  {course.title}
                </p>

                {/* Buy Button */}
                <NavLink
                  to="/buypage"
                  className="mt-auto bg-accent2-dark text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center justify-between hover:bg-accent2 transition"
                >
                  <span>BUY NOW</span>
                  <span>
                    {course.price === 0 ? "Free" : `₹ ${course.price}`}
                  </span>
                </NavLink>
              </div>
            </div>
          </NavLink>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-600">
          No Courses in this Category
        </p>
      )}
    </div>
  );
}
