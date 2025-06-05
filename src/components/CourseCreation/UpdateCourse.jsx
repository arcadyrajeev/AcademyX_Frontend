import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "../../context/FormContext";
import { useOptions } from "../../context/UserContext";
import "../../Stylesheets/CreateCoursePage.css"; // Using same styling

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

  const categories = [
    "Artificial Intelligence",
    "Web Development",
    "App Development",
    "Software Development",
    "Game Development",
    "Language",
    "Graphic Design",
    "UI/UX Design",
    "Video Editing",
    "Cyber Security",
    "Cloud Computing",
    "Blockchain",
    "Data Science",
    "DevOps",
    "Business Analysis",
  ];

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
    console.log("Attempting to delete lesson:", lessonId);
    // Show the confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this lesson?"
    );
    // If user clicks "Cancel", exit the function
    if (!isConfirmed) return;

    try {
      await axios.delete(`${baseURL}/lessons/${id}/${lessonId}`, {
        withCredentials: true,
      });
      alert("Course updated!");
    } catch (error) {
      console.error("Update error:", error);
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
    <div className="create-course-container">
      <h1 className="text-2xl font-bold mb-4 sans-serif">Update Course</h1>

      <form onSubmit={handleSubmit} className="main-form">
        {[
          "courseName",
          "title",
          "description",
          "price",
          "duration",
          "category",
          "taqs",
        ].map((field) => (
          <div key={field} className="course-form">
            <label
              style={{
                alignContent: "center",
                alignItems: "center",
                marginTop: "2rem",
                marginLeft: "2vw",
                textTransform: "uppercase",
              }}
            >
              {field === "taqs" ? "tags" : field}
            </label>

            {field === "description" ? (
              <textarea
                name={field}
                value={courseData[field] || ""}
                onChange={handleChange}
                style={{ minHeight: "100px" }}
                placeholder="Enter a detailed course description"
                required
              />
            ) : (
              <input
                type={field === "price" ? "number" : "text"}
                name={field}
                value={
                  field === "price"
                    ? courseData[field] || 0
                    : courseData[field] || ""
                }
                onChange={handleChange}
                placeholder={
                  field === "taqs"
                    ? "comma-separated tags (e.g., js,react)"
                    : field === "price"
                    ? "₹"
                    : ""
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

        <div className="thumbnail">
          <label className="block font-semibold">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
          {preview && (
            <div className="thumbnail-box">
              <img src={preview} alt="Preview" />
            </div>
          )}
          <button
            type="button"
            onClick={handleThumbnailUpdate}
            className="create-course-button"
            style={{ width: "15rem", fontSize: "1rem" }}
          >
            Update Thumbnail
          </button>
        </div>

        {Array.isArray(course.content) && course.content.length > 0 && (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              marginBlock: "1rem",
            }}
          >
            <h3 style={{ margin: "1rem" }}>Lessons</h3>
            {course.content.map((lesson, index) => (
              <div key={lesson._id} style={{ marginTop: "2rem" }}>
                <h4>
                  Lesson {index + 1} : {lesson.title}
                </h4>
                <ul>
                  {lesson.video.map((vid) => (
                    <li key={vid._id}>- {vid.videoTitle} </li>
                  ))}
                </ul>
                <NavLink
                  to={`/user/updatecourse/${course._id}/${lesson._id}/updatelesson`}
                  className="create-course-button"
                  style={{
                    width: "6rem",
                    height: "2rem",
                    fontSize: "0.6rem",
                  }}
                >
                  Edit Lesson
                </NavLink>
                <button onClick={() => delLesson(lesson._id)}>
                  Delete Lesson
                </button>
              </div>
            ))}
          </div>
        )}

        <NavLink
          to={`/user/updatecourse/${course._id}/createlesson`}
          className="create-course-button"
          style={{ width: "15rem", fontSize: "1rem" }}
        >
          ADD A LESSON
        </NavLink>

        <button type="submit" className="create-course-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}
