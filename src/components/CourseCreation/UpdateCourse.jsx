import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "../../context/FormContext";
import { useOptions } from "../../context/UserContext";

const baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

export default function UpdateCourse() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { setSelectedOption } = useOptions();
  const { courseData, setCourseData } = useForm();
  const [preview, setPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [course, setCourse] = useState({});
  const { id } = useParams();

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${baseURL}/courses/${id}`);
        setCourse(res.data.data);
        setCourseData(res.data.data);
        setPreview(res.data.data.thumbnail);
      } catch (err) {
        console.error("Failed to fetch course", err);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const delLesson = async (lessonId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this lesson?"
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(`${baseURL}/lessons/${id}/${lessonId}`);
      alert("Lesson deleted!");
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleThumbnailUpdate = async () => {
    try {
      const formData = new FormData();
      formData.set("thumbnail", thumbnail);
      await axios.post(`${baseURL}/courses/${id}/updateThumbnail`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Thumbnail updated!");
    } catch (error) {
      alert("Failed to update thumbnail.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/courses/${id}/updateCourse`, courseData);
      alert("Course updated!");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Update Course</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            "courseName",
            "title",
            "description",
            "price",
            "duration",
            "category",
            "taqs",
          ].map((field) => (
            <div key={field} className="flex flex-col gap-2">
              <label
                htmlFor={field}
                className="text-sm font-medium text-gray-700 uppercase tracking-wide"
              >
                {field === "taqs" ? "Tags" : field}
              </label>

              {field === "description" ? (
                <textarea
                  id={field}
                  name={field}
                  value={courseData[field] || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={4}
                  placeholder="Enter a detailed course description"
                  required
                />
              ) : (
                <input
                  id={field}
                  type={field === "price" ? "number" : "text"}
                  name={field}
                  value={
                    field === "price"
                      ? courseData[field] || 0
                      : courseData[field] || ""
                  }
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder={
                    field === "taqs"
                      ? "comma-separated tags (e.g., js, react)"
                      : field === "price"
                      ? "₹ Price"
                      : `Enter ${field}`
                  }
                  min={field === "price" ? "0" : undefined}
                  step={field === "price" ? "0.01" : undefined}
                  required={[
                    "courseName",
                    "description",
                    "price",
                    "duration",
                    "category",
                  ].includes(field)}
                />
              )}
            </div>
          ))}

          {/* Thumbnail Update */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-700 uppercase tracking-wide">
              Thumbnail
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="border border-gray-300 rounded-lg p-2 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />
            {preview && (
              <div className="mt-3">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-28 object-cover rounded-md border"
                />
              </div>
            )}
            <button
              type="button"
              onClick={handleThumbnailUpdate}
              className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-900 transition w-fit"
            >
              Update Thumbnail
            </button>
          </div>

          {/* Lessons List */}
          {Array.isArray(course.content) && course.content.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Lessons</h3>
              {course.content.map((lesson, index) => (
                <div
                  key={lesson._id}
                  className="border rounded-lg p-4 flex flex-col gap-2"
                >
                  <h4 className="font-medium">
                    Lesson {index + 1}: {lesson.title}
                  </h4>
                  <ul className="list-disc ml-5 text-gray-600">
                    {lesson.video.map((vid) => (
                      <li key={vid._id}>{vid.videoTitle}</li>
                    ))}
                  </ul>
                  <div className="flex gap-3 mt-2">
                    <NavLink
                      to={`/user/updatecourse/${course._id}/${lesson._id}/updatelesson`}
                      className="bg-blue-600 text-white py-1 px-3 rounded-md text-sm hover:bg-blue-700 transition"
                    >
                      Edit Lesson
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => delLesson(lesson._id)}
                      className="bg-red-600 text-white py-1 px-3 rounded-md text-sm hover:bg-red-700 transition"
                    >
                      Delete Lesson
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Lesson + Save */}
          <NavLink
            to={`/user/updatecourse/${course._id}/createlesson`}
            className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-green-700 transition block text-center"
          >
            Add a Lesson
          </NavLink>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
