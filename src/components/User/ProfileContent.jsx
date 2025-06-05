import React, { useState, useRef, useEffect } from "react";
import "../../Stylesheets/User.css";
import { NavLink } from "react-router-dom";
import useUserData from "./UserData";
import axios from "axios";
import { LiaEditSolid } from "react-icons/lia";

export default function ProfileContent() {
  const [pfp, setPfp] = useState(null);
  const [banner, setBanner] = useState(null);
  const [bio, setBio] = useState(null);
  const [fullname, setFullname] = useState("Your name");
  const [showUpdatePfp, setShowUpdatePfp] = useState(false);
  const [showUpdateBan, setShowUpdateBan] = useState(false);
  const updatePfpRef = useRef(null);
  const updateBannerRef = useRef(null);
  const { user, isLoading } = useUserData();
  const [showInput, setShowInput] = useState(false);
  const [showInput2, setShowInput2] = useState(false);

  const handleClickbio = () => {
    setShowInput((prev) => !prev);
  };

  const handleClickName = () => {
    setShowInput2((prev) => !prev);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
    setFullname(user.fullname || "your full name");
  };

  const updateName = (e) => {
    setFullname(e.target.value);
    setBio(user.bio || "your bio");
  };

  const updateProfile = async () => {
    try {
      const payload = {
        bio,
        fullname,
      };

      const res = await axios.put(
        "http://localhost:8080/api/v1/users/updateProfile",
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Upload successful:", res.data);
      window.location.reload();
    } catch (err) {
      if (err.response) {
        console.error("Server responded with:", err.response.data);
      } else {
        console.error("Error uploading profile picture:", err);
      }
    }
  };

  // Handle outside click for pfp
  useEffect(() => {
    function handleClickOutsidePfp(event) {
      if (
        updatePfpRef.current &&
        !updatePfpRef.current.contains(event.target)
      ) {
        setShowUpdatePfp(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutsidePfp);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsidePfp);
    };
  }, []);

  // Handle outside click for banner
  useEffect(() => {
    function handleClickOutsideBanner(event) {
      if (
        updateBannerRef.current &&
        !updateBannerRef.current.contains(event.target)
      ) {
        setShowUpdateBan(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutsideBanner);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideBanner);
    };
  }, []);

  const handlePfpChange = (e) => {
    const file = e.target.files[0];
    setPfp(file);
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setBanner(file);
  };

  const handlePfpUpload = async () => {
    if (!pfp) return alert("Please select a file first");

    try {
      const formData = new FormData();
      formData.append("profileImage", pfp);

      const res = await axios.post(
        "http://localhost:8080/api/v1/users/updateProfileImage",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload successful:", res.data);
      window.location.reload();
    } catch (err) {
      console.error("Error uploading profile picture:", err);
    }
  };

  const handleBannerUpload = async () => {
    if (!banner) return alert("Please select a file first");

    try {
      const formData = new FormData();
      formData.append("coverImage", banner);

      const res = await axios.post(
        "http://localhost:8080/api/v1/users/updateCoverImage",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload successful:", res.data);
      window.location.reload();
    } catch (err) {
      console.error("Error uploading banner image:", err);
    }
  };

  if (isLoading) return <p>Loading profile...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="profile-content">
      <div className="banner">
        <img src={user.coverImage} alt="Profile" />
      </div>

      <div
        className="edit-banner"
        ref={updateBannerRef}
        style={{ zIndex: "5" }}
      >
        <span
          onClick={() => setShowUpdateBan(!showUpdateBan)}
          className="edit-button"
        >
          <LiaEditSolid />
        </span>
        {showUpdateBan && (
          <div
            className="update-banner"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div>Update Cover image</div>
            <input type="file" accept="image/*" onChange={handleBannerChange} />
            <button type="button" onClick={handleBannerUpload}>
              Upload
            </button>
          </div>
        )}
      </div>

      <div className="head-container">
        <div className="pfp">
          {user?.profileImage ? (
            <img src={user.profileImage} alt="profile image" />
          ) : (
            <img src="/Image/pfp.jpg" alt="default profile" />
          )}
        </div>

        <div className="edit-pfp" ref={updatePfpRef}>
          <span
            onClick={() => setShowUpdatePfp(!showUpdatePfp)}
            className="edit-button"
          >
            <LiaEditSolid />
          </span>
          {showUpdatePfp && (
            <div
              className="update-pfp"
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div>Update profile pic</div>
              <input type="file" accept="image/*" onChange={handlePfpChange} />
              <button type="button" onClick={handlePfpUpload}>
                Upload
              </button>
            </div>
          )}
        </div>

        <h2 className="username">@{user.username}</h2>

        <div className="bio-box">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {user.fullname ? (
              <div className="fullname">{user.fullname}</div>
            ) : (
              <span>fullname</span>
            )}
            <div className="edit-bio" onClick={handleClickName}>
              <span>
                <LiaEditSolid />
              </span>
            </div>
          </div>
          {showInput2 && (
            <div>
              <input
                type="text"
                placeholder="Type something..."
                onChange={updateName}
              />
              <button onClick={updateProfile}>Save</button>
            </div>
          )}
        </div>

        <div className="bio-box">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ color: "grey" }}>Bio</span>
            <div className="edit-bio" onClick={handleClickbio}>
              <span>
                <LiaEditSolid />
              </span>
            </div>
          </div>
          {showInput && (
            <div>
              <input
                type="text"
                placeholder="Type something..."
                onChange={updateBio}
              />
              <button onClick={updateProfile}>Save</button>
            </div>
          )}
        </div>

        {user.bio ? <p className="bio">{user.bio}</p> : ""}
        <hr
          style={{
            height: "2px",
            width: "50vw",
            marginLeft: "2rem",
            marginTop: "1.5rem",
          }}
        />
      </div>
    </div>
  );
}
