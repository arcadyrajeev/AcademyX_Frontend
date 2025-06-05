import React from "react";
import "../../Stylesheets/User.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useOptions } from "../../context/UserContext";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const baseURL = import.meta.env.VITE_API_URL;

export default function UserOptions() {
  const { selectedOption, setSelectedOption } = useOptions();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handlelogOut = async (e) => {
    await axios.get(`${baseURL}/users/logout`, {
      withCredentials: true,
    });

    // remove data from local storage
    logout();
    //redirtect to login page
    navigate("/");
  };

  // Define your options as objects for easier mapping
  const options = [
    { name: "My Profile", path: "/user" },
    { name: "My Library", path: "/user" },
    { name: "Dashboard", path: "/user" },
    { name: "Create Course", path: "/user" },
    { name: "Billing", path: "/user" },
    { name: "Notifications", path: "/user" },
    { name: "Settings", path: "/user" },
    { name: "Log out" },
  ];

  return (
    <div className="sidebardiv">
      <div className="user-options">
        <ul className="option-list">
          {options.map(({ name, path }) => (
            <li
              key={name}
              className={selectedOption === name ? "active-option" : ""}
              onClick={() => {
                if (name === "Log out") {
                  handlelogOut();
                } else {
                  handleOptionClick(name); // set selected option
                }
              }}
            >
              <span style={{ cursor: "pointer", color: "inherit" }}>
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
