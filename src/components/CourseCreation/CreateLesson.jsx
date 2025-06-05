import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Stylesheets/CreateCoursePage.css";
import Navbar from "../navbar";
import Footer from "../footer";

const baseURL = import.meta.env.VITE_API_URL;

const CreateLesson = () => {
  const { id } = useParams();
  const [lessonTitle, setLessonTitle] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!lessonTitle || !videoTitle || !videoFile) {
      setMessage("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("lessonTitle", lessonTitle);
    formData.append("videoTitle", videoTitle);
    formData.append("video", videoFile);

    try {
      setUploading(true);
      const response = await axios.post(`${baseURL}/lessons/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message || "Lesson created successfully!");
      setLessonTitle("");
      setVideoTitle("");
      setVideoFile(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error uploading lesson");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="create-course-container">
        <h2 className="text-2xl font-bold mb-4">Create New Lesson</h2>
        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
        <form className="main-form">
          <div className="course-form">
            <label>Lesson Title</label>
            <input
              type="text"
              placeholder="Lesson Title"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
            />
          </div>

          <div className="course-form">
            <label>Video Title</label>
            <input
              type="text"
              placeholder="Video Title"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
          </div>

          <div className="course-form">
            <label>Upload Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="create-course-button"
          >
            {uploading ? "Uploading..." : "Create Lesson"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateLesson;
