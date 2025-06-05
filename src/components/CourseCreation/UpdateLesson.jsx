import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Stylesheets/CreateCoursePage.css"; // reusing CreateLesson styles
import Footer from "../footer";
import Navbar from "../navbar";

const baseURL = import.meta.env.VITE_API_URL;

const UpdateLesson = () => {
  const { courseId, lessonId } = useParams();
  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleAddVideo = async (e) => {
    e.preventDefault();

    if (!videoTitle || !videoFile || !videoTitle.trim()) {
      setMessage("Both video title and file are required.");
      return;
    }

    const formData = new FormData();
    formData.append("videoTitle", videoTitle);
    formData.append("video", videoFile);

    try {
      setUploading(true);
      const response = await axios.post(
        `${baseURL}/lessons/${courseId}/${lessonId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setMessage(response.data.message || "Video added successfully!");
      setVideoTitle("");
      setVideoFile(null);
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="create-course-container">
        <h2 className="text-2xl font-bold mb-4">
          Update Lesson - Add New Video
        </h2>

        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

        <form className="main-form">
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
            onClick={handleAddVideo}
            disabled={uploading}
            className="create-course-button"
          >
            {uploading ? "Uploading..." : "Add Video"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateLesson;
