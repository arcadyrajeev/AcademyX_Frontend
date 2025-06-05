import "../Stylesheets/Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { Link, NavLink } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_URL;

function SignUp() {
  let navigate = useNavigate();
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");
  let [username, setusername] = useState("");
  let [validate, setValidate] = useState("");

  const { setIsLoggedIn } = useAuth();

  const handleSignUp = async (e) => {
    console.log(email, password, username);
    e.preventDefault();
    if (!email || !password || !username) {
      setValidate("Please enter email and password");
    }
    const response = await fetch(`${baseURL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    if (jsonResponse.success) {
      navigate("/login");
    } else {
      setValidate(jsonResponse.message);
    }
  };

  return (
    <>
      <div className="main">
        <div className="left-signup">
          <div className="left_logo">
            <NavLink to="/">
              <img src="/Logo.png" alt="Logo" />
            </NavLink>
          </div>
          <div className="layout">
            <div className="content">
              <h2 style={{ fontSize: "30px" }}>AcademyX</h2>
              <h1 style={{ fontSize: "80px", marginTop: "80px" }}>WELCOME</h1>
              <p style={{ fontSize: "20px", marginTop: "40px" }}>
                Experience the X-Factor in learning
              </p>
              <p
                style={{
                  fontSize: "40px",
                  marginTop: "40px",
                  padding: "1rem",
                  borderRadius: "1rem",
                  backgroundColor: "#002bff",
                }}
              >
                Start Your Journey Here
              </p>
            </div>
          </div>
        </div>
        <div className="right">
          <form>
            <div className="formpage">
              <h3>JOIN</h3>
              <input
                type="text"
                id="inputbox"
                value={username}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                placeholder="enter username"
              />

              <input
                type="email"
                id="inputbox"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                placeholder="youremail@gmail.com"
              />
              <br />
              <input
                type="text"
                id="inputbox"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                placeholder="password"
              />
            </div>

            <div className="linkpage">
              <button style={{ marginTop: "4rem" }} onClick={handleSignUp}>
                Sign up
              </button>

              <p>{validate}</p>
              <span>
                <a href="/login">Already have an account? Sign in </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
