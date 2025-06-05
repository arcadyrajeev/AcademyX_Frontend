import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react"; // Capital "R"
import { useCourse } from "../../context/CourseContext";
import CourseInfo from "./CourseInfo";
import VideoContainer from "./VideoContainer";
import CourseTracker from "./CourseTracker";
import CourseList from "./CourseList";

function CourseContent() {
  const { id } = useParams();
  const { selectedSection } = useCourse();

  return (
    <div>
      {selectedSection && selectedSection === "info" ? (
        <div
          style={{
            display: "flex",
            width: "90%",
            justifySelf: "center",
          }}
        >
          <CourseInfo />
          <CourseList />
        </div>
      ) : (
        <div>
          <VideoContainer />
          <CourseTracker />
        </div>
      )}
    </div>
  );
}

export default CourseContent;
