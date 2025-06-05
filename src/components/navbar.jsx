import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../Stylesheets/Navbar.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useOptions } from "../context/UserContext";
import { IoIosSearch } from "react-icons/io";

const baseURL = import.meta.env.VITE_API_URL;

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useAuth();
  const { setSelectedOption, setOption } = useOptions();
  const [isOpen, setIsOpen] = useState(false);
  const [courseText, setCourseText] = useState("");

  const handleSearch = () => {
    const trimmedQuery = courseText.trim();
    if (trimmedQuery.length > 0) {
      navigate(`/courses?search=${encodeURIComponent(trimmedQuery)}`);
      setCourseText(""); // optional: clear search box
    }
  };

  const handleClick = (option, fromDropdown = false) => {
    setSelectedOption(option);

    if (option === "My Library" && fromDropdown) {
      navigate("/user?from=dropdown");
    } else {
      navigate("/user");
    }
    console.log(`navigate to ${option}`);
  };

  const handleLogOut = async () => {
    await axios.get(`${baseURL}/users/logout`, {
      withCredentials: true,
    });
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar__left">
          <NavLink to="/" className="left-container">
            <div className="left-container__logo">
              <img src="/Logo.png" alt="logo" />
            </div>
            <div className="left-container__acad"> AcademyX</div>
          </NavLink>
        </div>

        <div className="navbar__center">
          <ul className="ullist">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "navlink active" : "navlink"
                }
                to="/"
              >
                Home
                <div className="underline"></div>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "navlink active" : "navlink"
                }
                to="/courses"
              >
                Courses
                <div className="underline"></div>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "navlink active" : "navlink"
                }
                to="/user"
                onClick={() => {
                  !isLoggedIn
                    ? navigate("/nolibrary")
                    : handleClick("My Library");
                }}
              >
                My Library
                <div className="underline"></div>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "navlink active" : "navlink"
                }
                id="indevelopment"
                to="/community"
              >
                Community
                <div className="underline"></div>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar__right">
          <div className="search-bar" style={{ display: "none" }}>
            <IoIosSearch size={24} />
            <input
              type="text"
              value={courseText}
              onChange={(e) => setCourseText(e.target.value)}
              placeholder=" Search for courses"
            />
            <button onClick={handleSearch} className="search-bar__button">
              Search
            </button>
          </div>

          {!isLoggedIn ? (
            <div className="user-buttons">
              <NavLink className="user-buttons__login" to="/login">
                Log in
              </NavLink>
              <NavLink className="user-buttons__signup" to="/signup">
                Sign up
              </NavLink>
            </div>
          ) : (
            <div
              className="pfp-wrapper"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div
                className="pfp-icon"
                onClick={() => handleClick("My Profile")}
              >
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="profile image" />
                ) : (
                  <img src="/Image/pfp.jpg" alt="default profile" />
                )}
              </div>

              {isOpen && (
                <div className="pfpdrop-container">
                  <div className="pfpdrop">
                    <div
                      className="pfpdrop__content"
                      onClick={() => handleClick("My Profile", true)}
                    >
                      My Profile
                    </div>
                    <div
                      className="pfpdrop__content"
                      onClick={() => handleClick("My Library", true)}
                    >
                      My Library
                    </div>
                    <div
                      className="pfpdrop__content"
                      onClick={() => handleClick("Dashboard", true)}
                    >
                      Creator mode
                    </div>
                    <div
                      className="pfpdrop__content"
                      onClick={() => handleClick("Settings", true)}
                    >
                      Settings
                    </div>
                    <div onClick={handleLogOut} className="logout">
                      <div onClick={handleLogOut} className="box">
                        Log out
                      </div>
                      <div
                        onClick={handleLogOut}
                        className="box"
                        id="top"
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
