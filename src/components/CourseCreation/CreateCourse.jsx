import React, { useState } from "react";
import axios from "axios";

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
          withCredentials: true,
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
    <div className="min-h-screen w-full bg-gray-50 px-4 py-8">
      <div className="w-full mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Create a New Course
        </h1>

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
                  value={formData[field]}
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
                  value={formData[field]}
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

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Creating..." : "Create Course"}
          </button>

          {message && (
            <p
              className={`mt-2 text-sm ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
