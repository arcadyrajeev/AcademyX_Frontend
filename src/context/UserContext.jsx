import React, { createContext, useState, useContext, useEffect } from "react";

import axios from "axios";

const OptionContext = createContext();

const baseURL = import.meta.env.VITE_API_URL;

export const OptionProvider = ({ children }) => {
  const [option, setOption] = useState("My Profile");
  const [selectedOption, setSelectedOption] = useState("My Profile");
  const [enrolledCourse, setEnrolledCourse] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const res = await axios.get(`${baseURL}/dashboards`, {
          withCredentials: true,
        });

        if (res.data && res.data.data && res.data.data[0]?.courses) {
          setEnrolledCourse(res.data.data[0].courses);
        }
      } catch (err) {
        console.error("Error fetching enrolled courses:", err);
      }
    };

    fetchEnrolledCourses();
  }, []);

  return (
    <OptionContext.Provider
      value={{
        option,
        setOption,
        selectedOption,
        setSelectedOption,
        enrolledCourse,
        setEnrolledCourse,
      }}
    >
      {children}
    </OptionContext.Provider>
  );
};

export const useOptions = () => useContext(OptionContext);
