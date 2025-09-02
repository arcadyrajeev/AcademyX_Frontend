import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
      setMessage(response.data.message || "✅ Lesson created successfully!");
      setLessonTitle("");
      setVideoTitle("");
      setVideoFile(null);
    } catch (err) {
      setMessage(
        `❌ ${err.response?.data?.message || "Error uploading lesson"}`
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Create New Lesson
          </h2>

          {message && (
            <p
              className={`mb-4 text-sm ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleUpload} className="space-y-6">
            {/* Lesson Title */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="lessonTitle"
                className="text-sm font-medium text-gray-700 uppercase tracking-wide"
              >
                Lesson Title
              </label>
              <input
                id="lessonTitle"
                type="text"
                placeholder="Lesson Title"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Video Title */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="videoTitle"
                className="text-sm font-medium text-gray-700 uppercase tracking-wide"
              >
                Video Title
              </label>
              <input
                id="videoTitle"
                type="text"
                placeholder="Video Title"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Upload Video */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="videoFile"
                className="text-sm font-medium text-gray-700 uppercase tracking-wide"
              >
                Upload Video
              </label>
              <input
                id="videoFile"
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                className="border border-gray-300 rounded-lg p-2 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {uploading ? "Uploading..." : "Create Lesson"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateLesson;
