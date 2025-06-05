import "../Stylesheets/Login.css";
import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

axios.defaults.withCredentials = true;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setValidate("Please enter email and password");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        login(response.data.user);
        navigate("/");
      } else {
        setValidate("Invalid email or password.");
      }
    } catch (error) {
      console.error(error);
      setValidate("An error occurred. Please try again.");
    }
  };

  return (
    <div className="main">
      <div className="left-login">
        <div className="left_logo">
          <NavLink to="/">
            <img src="/Logo.png" alt="Logo" />
          </NavLink>
        </div>
        <div className="layout">
          <div className="content">
            <h2 style={{ fontSize: "30px" }}>AcademyX</h2>
            <h1 style={{ fontSize: "80px", marginTop: "80px" }}>WELCOME</h1>
            <h1 style={{ fontSize: "70px" }}>Back!</h1>
            <p style={{ fontSize: "20px", marginTop: "40px" }}>
              Experience the X-Factor in learning
            </p>
            <p style={{ fontSize: "40px", marginTop: "40px" }}>
              Continue Your Learnings
            </p>
          </div>
        </div>
      </div>

      <div className="right">
        <form onSubmit={handleLogin}>
          <div className="formpage">
            <h3>SIGN IN</h3>
            <input
              type="email"
              id="inputbox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@gmail.com"
              required
            />
            <br />
            <input
              type="password"
              id="inputbox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
            <div className="rmiddle">
              <span>
                <input type="checkbox" id="checkbox" /> Keep me logged in
              </span>
              <a href="#">Forgot Password?</a>
            </div>
          </div>

          <div className="linkpage">
            <button type="submit">Sign in</button>
            {validate && <p>{validate}</p>}
            <span>
              <a href="/signup">Don't have an account? Create new account </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
