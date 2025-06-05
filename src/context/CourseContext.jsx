import React, { createContext, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

const CourseContext = createContext();

const baseURL = import.meta.env.VITE_API_URL;

export const useCourse = () => useContext(CourseContext);

export function CourseProvider({ children }) {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedSection, setSelectedSection] = useState("info");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    fetch(`${baseURL}/courses/${id}`)
      .then((res) => res.json())
      .then((coursedata) => {
        if (coursedata?.data) {
          const data = coursedata.data;
          setCourse(data);

          const firstLesson = data.content?.[0];
          const firstVideo = firstLesson?.video?.[0];

          if (firstVideo) {
            setSelectedVideo({
              url: firstVideo.videoUrl,
              title: firstVideo.videoTitle,
            });
            setSelectedLesson(`Course 1: ${firstLesson.title}`); // store as string
          }
        }
      })
      .catch(console.error);
  }, [id]);

  return (
    <CourseContext.Provider
      value={{
        course,
        selectedVideo,
        setSelectedVideo,
        selectedLesson,
        setSelectedLesson,
        selectedSection,
        setSelectedSection,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}
