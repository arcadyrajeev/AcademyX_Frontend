import React from "react";
import "../../Stylesheets/User.css";
import ProfileContent from "./ProfileContent";
import Dashboard from "./Dashboard";
import { useOptions } from "../../context/UserContext";
import CreateCourse from "../CourseCreation/CreateCourse";
import EnrolledCourses from "./EnrolledCourses";
import YourCourses from "./YourCourses";
import CreateLesson from "../CourseCreation/CreateLesson";
import UpdateLesson from "../CourseCreation/UpdateLesson";
import CourseModify from "../CourseCreation/CourseModify";

export default function MainContent() {
  const { selectedOption } = useOptions();

  const renderContent = () => {
    switch (selectedOption) {
      case "My Profile":
        return <ProfileContent />;
      case "Dashboard":
        return <Dashboard />;
      case "Create Course":
        return <CreateCourse />;
      case "My Library":
        return <EnrolledCourses />;
      case "Your Courses":
        return <YourCourses />;
      case "Add Lesson":
        return <CreateLesson />;
      case "Edit Lesson":
        return <UpdateLesson />;
      case "Update Course":
        return <CourseModify />;
      default:
        return <p>Content in progress...</p>;
    }
  };

  return <div className="flex p-2 m-h-screen">{renderContent()}</div>;
}
