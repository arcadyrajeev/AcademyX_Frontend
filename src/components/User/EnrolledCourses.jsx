import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useOptions } from "../../context/UserContext";
import { FiSettings } from "react-icons/fi"; // gear icon

const baseURL = import.meta.env.VITE_API_URL;

export default function EnrolledCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
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

  const handleRemove = async (id) => {
    try {
      const res = await axios.get(`${baseURL}/enrollments/${id}`, {
        withCredentials: true,
      });
      alert(res.data.message);

      // remove from UI + global context
      setCourses((prev) => prev.filter((course) => course._id !== id));
      setEnrolledCourse((prev) => prev.filter((course) => course._id !== id));
    } catch (error) {
      console.error("Enrollment error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Your Enrolled Courses
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="relative bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition"
            >
              {/* Gear Icon */}
              <div className="absolute top-3 right-3">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === course._id ? null : course._id
                    )
                  }
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <FiSettings className="text-gray-600" />
                </button>

                {openDropdown === course._id && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-20">
                    <button
                      onClick={() => handleRemove(course._id)}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Remove Course
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnail */}
              <div className="aspect-video w-full">
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col flex-grow p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {course.courseName}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                  {course.title}
                </p>

                {/* Watch button */}
                <NavLink
                  to={`/coursepage/${course._id}`}
                  className="mt-auto bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center justify-between hover:bg-blue-700 transition"
                >
                  <span>Watch</span>
                  <span>&rsaquo;</span>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No Enrolled Courses</p>
      )}
    </div>
  );
}
