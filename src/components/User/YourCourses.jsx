import React, { useEffect, useState } from "react";
import "../../Stylesheets/enrolledcourses.css";
import "../../Stylesheets/base.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useOptions } from "../../context/UserContext";

export default function YourCourses() {
  const [ycourses, setYCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedOption } = useOptions();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/dashboards/educator",
          {
            withCredentials: true,
          }
        );

        if (res.data && res.data.data) {
          setYCourses(res.data.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    console.log("Fetched courses:", ycourses);
  }, [ycourses]);

  return (
    <div className="course-wrapper">
      <div className="courses-heading">Your Courses</div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="courses-grid">
          {ycourses.length > 0 ? (
            ycourses.map((course) => (
              <div className="course-card" key={course._id}>
                <div className="course-content" style={{ width: "100%" }}>
                  <div className="course-thumbnail">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="course-thumbnail__img"
                    />
                  </div>
                  <div className="course-info">
                    <h3 className="course-info__title">
                      {course.courseName}
                      {console.log(course.category)}
                    </h3>
                    <p className="course-info__subtitle">{course.title}</p>
                  </div>

                  {/* bottom actions */}
                  <div className="course-actions">
                    <NavLink
                      to={`/user/updatecourse/${course._id}`}
                      className="course-watch-btn"
                    >
                      <span>Edit</span>
                      <span className="course-watch-btn__icon">›</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No courses found.</p>
          )}
        </div>
      )}
    </div>
  );
}
