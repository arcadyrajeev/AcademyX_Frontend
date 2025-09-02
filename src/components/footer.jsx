import React from "react";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../context/CategoryContext";

export default function Footer() {
  const { setCategory, setSelectedCategory } = useCategory();
  const navigate = useNavigate();

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

  const sections = [
    "Home",
    "Courses",
    "My Library",
    "Community",
    "My Profile",
    "Creator Mode",
  ];

  const handleCategoryClick = (category) => {
    setCategory(category);
    setSelectedCategory(category);
    navigate("/courses");
  };

  const handleSectionClick = (section) => {
    if (section === "Home") navigate("/");
    else if (section === "Courses") navigate("/courses");
    else if (section === "My Profile") navigate("/profile");
    else if (section === "Creator Mode") navigate("/user");
    else navigate("/");
  };

  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-white mb-4">
            AcademyX Courses
          </h3>
          <ul className="flex flex-wrap gap-3 sm:gap-4 text-sm overflow-x-auto pb-2">
            {categories.map((category, idx) => (
              <li
                key={idx}
                onClick={() => handleCategoryClick(category)}
                className="cursor-pointer hover:text-white transition"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-gray-700 pt-8">
          {/* Sections */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Sections</h3>
            <ul className="space-y-2 text-sm">
              {sections.map((section, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSectionClick(section)}
                  className="cursor-pointer hover:text-white transition"
                >
                  {section}
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Our Team</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition">
                  Rajeev
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition">
                  Vikram
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition">
                  Manisha
                </a>
              </li>
            </ul>
          </div>

          {/* Branding / Extra */}
          <div className="flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-white mb-3">
              About AcademyX
            </h3>
            <p className="text-sm text-gray-400">
              AcademyX helps learners and creators connect through high-quality
              online courses.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              © {new Date().getFullYear()} AcademyX. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
