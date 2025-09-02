import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useOptions } from "../../context/UserContext";

const baseURL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const { setSelectedOption } = useOptions();
  const [createdCourses, setCreatedCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch created courses
        const createdRes = await axios.get(`${baseURL}/dashboards/educator`, {
          withCredentials: true,
        });
        if (Array.isArray(createdRes.data?.data)) {
          setCreatedCourses(createdRes.data.data);
        }

        // Fetch enrolled courses
        const enrolledRes = await axios.get(`${baseURL}/dashboards`, {
          withCredentials: true,
        });
        if (Array.isArray(enrolledRes.data?.data[0]?.courses)) {
          setEnrolledCourses(enrolledRes.data.data[0].courses);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-12">
          {/* Active Course */}
          {enrolledCourses.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Current Active Course
              </h2>
              <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6">
                <img
                  src={enrolledCourses[0].thumbnail}
                  alt={enrolledCourses[0].courseName}
                  className="w-40 h-24 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-800">
                    {enrolledCourses[0].courseName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {enrolledCourses[0].title}
                  </p>
                  {/* placeholder progress */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-1/3"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">33% Complete</p>
                </div>
                <NavLink
                  to={`/coursepage/${enrolledCourses[0]._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  Continue
                </NavLink>
              </div>
            </div>
          )}

          {/* Recently Enrolled */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Recently Enrolled
            </h2>
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.slice(0, 3).map((course) => (
                  <div
                    key={course._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
                  >
                    <div className="aspect-video">
                      <img
                        src={course.thumbnail}
                        alt={course.courseName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {course.courseName}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {course.title}
                      </p>
                      <NavLink
                        to={`/coursepage/${course._id}`}
                        className="mt-auto bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition text-center"
                      >
                        Watch
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No enrolled courses yet.</p>
            )}
          </div>

          {/* Recently Created Courses */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Recently Created Courses
            </h2>
            {createdCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {createdCourses.slice(0, 3).map((course) => (
                  <div
                    key={course._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
                  >
                    <div className="aspect-video">
                      <img
                        src={course.thumbnail}
                        alt={course.courseName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {course.courseName}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {course.title}
                      </p>
                      <NavLink
                        to={`/user/updatecourse/${course._id}`}
                        className="mt-auto bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-900 transition text-center"
                      >
                        Edit
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                You haven’t created any courses yet.
              </p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4">
            <NavLink
              to="/user"
              className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition"
              onClick={() => setSelectedOption("Your Courses")}
            >
              All Created Courses
            </NavLink>
            <NavLink
              to="/user"
              className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-green-700 transition"
              onClick={() => setSelectedOption("Create Course")}
            >
              + Create Course
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
