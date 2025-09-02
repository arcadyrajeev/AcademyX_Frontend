import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../Stylesheets/Navbar.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useOptions } from "../context/UserContext";

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
    label: "Community",
    link: "/comunity",
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
      <div className="flex border-2 border-gray-300 justify-between items-center w-full h-[4rem] px-8">
        <NavLink to="/" className="flex   h-full">
          <div className="flex overflow-hidden p-3 ">
            <img
              src="/acadxlogo.png"
              className="object-cover object-center w-[100%] h-[100%] hover:translate-x-3 transition-transform duration-300 ease-in-out"
              alt="logo"
            />
          </div>
        </NavLink>

        <div className="hidden lg:flex w-[50%] justify-center p-3  gap-10 h-full items-center">
          {navlinks.map((option, id) => (
            <NavLink
              key={id}
              className={({ isActive }) =>
                isActive
                  ? "fontboby text-[1.2rem] text-accent1 font-bold"
                  : "fontbody text-grey3 text-[1rem] hover:-translate-y-1 hover:text-accent2-dark transition-all duration-300 ease-in-out"
              }
              to={option.link}
            >
              {option.label}
              <div className="underline"></div>
            </NavLink>
          ))}
        </div>

        <div className="flex h-full  ">
          {!isLoggedIn ? (
            <div className="flex gap-2 h-full ">
              <NavLink
                className="flex w-24 h-full fontbody font-medium items-center justify-center rounded-md bg-accent1-light hover:bg-highlight duration-300 ease-in-out"
                to="/login"
              >
                Log in
              </NavLink>
              <NavLink
                className="hidden md:flex w-24 h-full fontbody font-medium items-center justify-center rounded-md bg-accent1/70 hover:bg-highlight duration-300 ease-in-out"
                to="/signup"
              >
                Sign up
              </NavLink>
            </div>
          ) : (
            <div
              className="flex w-15 h-full p-2 items-center rounded-[100vw]"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div
                className="flex w-10 h-full items-center rounded-[100vw] overflow-hidden"
                onClick={() => handleClick("My Profile")}
              >
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="profile image"
                    className="object-cover object-center w-[100%] h-[100%]"
                  />
                ) : (
                  <img
                    src="/Image/pfp.jpg"
                    alt="default profile"
                    className="object-cover object-center w-[100%] h-[100%]"
                  />
                )}
              </div>

              {isOpen && (
                <div className="pfpdrop-container flex lg:hidden">
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
