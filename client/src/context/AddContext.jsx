import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AddContext = createContext();

export const AddContexProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);

  //Fetch All courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  //Function to calculate avaerage rating of course
  const calculateAverageRating = (course) => {
    if (!course || !Array.isArray(course.courseRatings) || course.courseRatings.length === 0) {
      return 0;
    }

    const total = course.courseRatings.reduce((sum, r) => sum + r.rating, 0);
    return total / course.courseRatings.length;
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating: calculateAverageRating, isEducator, setIsEducator
  };

  return (
    <AddContext.Provider value={value}>{props.children}</AddContext.Provider>
  );
};
