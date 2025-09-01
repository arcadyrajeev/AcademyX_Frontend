import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../Stylesheets/Navbar.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useOptions } from "../context/UserContext";
import { IoIosSearch } from "react-icons/io";

const baseURL = import.meta.env.VITE_API_URL;

const navlinks = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Courses",
    link: "/courses",
  },
  {
    label: "My Library",
    link: "/user",
  },
  {
    label: "Communinty",
    link: "/",
  },
];

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
      <div className="flex border justify-between w-[100vw] h-[4rem]">
        <NavLink to="/" className="flex border w-[15vw] h-full">
          <div className="flex border w-[2rem] overflow-hidden ">
            <img
              src="/Logo.png"
              className="object-cover object-center w-full h-full"
              alt="logo"
            />
          </div>
          <div className="fontheading font-bold text-[1.4rem] text-dark2">
            {" "}
            AcademyX
          </div>
        </NavLink>

        <div className="flex w-[50%] gap-5 h-full">
          {navlinks.map((option, id) => (
            <NavLink
              key={id}
              className={({ isActive }) =>
                isActive ? "" : "fontbody text-grey2 text-[1rem] "
              }
              to={option.link}
            >
              {option.label}
              <div className="underline"></div>
            </NavLink>
          ))}
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
