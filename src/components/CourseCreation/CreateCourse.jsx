import React, { useState } from "react";
import axios from "axios";
import "../../Stylesheets/CreateCoursePage.css";
import Navbar from "../navbar";

const baseURL = import.meta.env.VITE_API_URL;

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    title: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    taqs: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thumbnail) {
      setMessage("Please upload a thumbnail.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (key === "taqs") {
        val.split(",").forEach((tag) => data.append("taqs", tag.trim()));
      } else {
        data.append(key, val);
      }
    });
    data.append("thumbnail", thumbnail);

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        `${baseURL}/courses/createCourse`,
        data,
        {
          withCredentials: true, // ✅ Use cookies
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(`✅ Course created! ID: ${response.data.data._id}`);
    } catch (err) {
      setMessage(`❌ Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-course-container">
      <h1 className="text-2xl font-bold mb-4 sans-serif">
        Create a New Course
      </h1>
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
              {field == "taqs" ? "tags" : field}
            </label>
            {field === "description" ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                style={{ minHeight: "100px" }}
                placeholder="Enter a detailed course description"
                required
              />
            ) : (
              <input
                type={field === "price" ? "number" : "text"}
                name={field}
                value={formData[field]}
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
        </div>

        <button
          type="submit"
          disabled={loading}
          className="create-course-button"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>

        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
      </form>
    </div>
  );
};

export default CreateCourse;
