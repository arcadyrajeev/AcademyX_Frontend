import React from "react";
import { useCourse } from "../../context/CourseContext";
import { useParams, useNavigate } from "react-router-dom";
import "../../Stylesheets/CoursePage.css";
import axios from "axios";
import { useOptions } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";

const baseURL = import.meta.env.VITE_API_URL;

export default function CourseInfo() {
  const { course } = useCourse();
  const { id } = useParams();
  const { enrolledCourse } = useOptions();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  if (!course) return <p>Loading course info...</p>;

  const isEnrolled =
    Array.isArray(enrolledCourse) &&
    course?._id &&
    enrolledCourse.some((c) => c._id === course._id);

  const handleEnroll = async () => {
    if (!isLoggedIn) {
      alert("Login to Enroll");
      navigate("/login");
      return; // exit early, do not proceed
    }

    try {
      const res = await axios.get(`${baseURL}/enrollments/${id}`, {
        withCredentials: true,
      });
      alert(res.data.message);
      console.log(enrolledCourse);
      window.location.reload(); // Refresh to update enrollment status
    } catch (error) {
      console.error("Enrollment error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="info-container">
      <div className="thumbnail">
        <img className="thumb" src={course.thumbnail} alt="Course Thumbnail" />
      </div>
      <hr style={{ marginTop: "4rem" }} />
      <p className="descript">{course.description}</p>

      {!isEnrolled ? (
        <div className="enroll-button" onClick={handleEnroll}>
          ENROLL NOW
        </div>
      ) : (
        <div className="enroll-button" onClick={handleEnroll}>
          Enrolled
        </div>
      )}
    </div>
  );
}
