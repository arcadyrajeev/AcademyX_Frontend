import React, { useEffect, useOptimistic, useState } from "react";
import "../../Stylesheets/enrolledcourses.css";
import "../../Stylesheets/base.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useOptions } from "../../context/UserContext";

const baseURL = import.meta.env.VITE_API_URL;

export default function EnrolledCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setEnrolledCourse } = useOptions();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseURL}/dashboards`, {
          withCredentials: true,
        });

        if (res.data && res.data.data && res.data.data[0]?.courses) {
          setCourses(res.data.data[0].courses);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    console.log("Fetched courses:", courses);
  }, [courses]);

  const handleEnroll = async (id) => {
    try {
      const res = await axios.get(`${baseURL}/enrollments/${id}`, {
        withCredentials: true,
      });
      alert(res.data.message);

      // ✅ Remove the course from UI state
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== id)
      );

      // ✅ Remove from global enrolledCourse in context
      setEnrolledCourse((prev) => prev.filter((course) => course._id !== id));
    } catch (error) {
      console.error("Enrollment error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="courses-wrapper">
      <div className="courses-heading">Your Enrolled Course</div>

      <div className="courses-grid">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div className="course-card" key={course._id}>
              <div className="course-content">
                <div className="course-thumbnail">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="course-thumbnail__img"
                  />
                </div>
                <div className="course-info">
                  <h3 className="course-info__title">{course.courseName}</h3>
                  <p className="course-info__subtitle">{course.title}</p>
                </div>
              </div>

              <div className="course-actions">
                <button
                  className="course-remove-btn"
                  onClick={() => handleEnroll(course._id)}
                >
                  Remove
                </button>
                <NavLink
                  to={`/coursepage/${course._id}`}
                  className="course-watch-btn"
                >
                  <span>Watch</span>
                  <span className="course-watch-btn__icon">&rsaquo;</span>
                </NavLink>
              </div>
            </div>
          ))
        ) : (
          <p>No Enrolled Courses</p>
        )}
      </div>
    </div>
  );
}
