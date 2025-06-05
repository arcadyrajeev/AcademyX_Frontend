import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useOptions } from "../../context/UserContext";

const baseURL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const { setSelectedOption } = useOptions();
  const [createdCourses, setCreatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreatedCourses = async () => {
      try {
        const res = await axios.get(`${baseURL}/dashboards/educator`, {
          withCredentials: true,
        });
        if (res.data && Array.isArray(res.data.data)) {
          setCreatedCourses(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching created courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCreatedCourses();
  }, []);

  return (
    <div className="courses-wrapper">
      <div className="courses-heading">Your Dashboard</div>

      <div style={{ marginBlock: "1rem" }}>Recently Created Courses</div>

      {loading ? (
        <p>Loading...</p>
      ) : createdCourses.length > 0 ? (
        <div className="courses-grid">
          {createdCourses.slice(0, 3).map((course) => (
            <div className="course-card" key={course._id}>
              {/* top section (thumb + info) */}
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
          ))}
        </div>
      ) : (
        <p>You haven’t created any courses yet.</p>
      )}

      {/* bottom buttons */}
      <div className="button-box">
        <NavLink
          to="/user"
          className="button1"
          onClick={() => setSelectedOption("Your Courses")}
        >
          All Courses You Created
        </NavLink>

        <NavLink
          to="/user"
          className="button1"
          style={{ width: "10vw" }}
          onClick={() => setSelectedOption("Create Course")}
        >
          <div className="plus">+</div>
          <div className="text">Create Course</div>
        </NavLink>
      </div>
    </div>
  );
}
