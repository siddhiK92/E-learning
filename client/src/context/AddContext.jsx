import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration"; 

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

  //function to calculate course chapter time
  const calculateChapterTime=(chapter)=>{
      let time=0
      chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration)
      return humanizeDuration(time * 60 * 1000, { units: ["h", "m"]});
  }

  //function to calculate course duration
  const CalculateCourseDuration = (course)=>{
      let time=0
      course.courseContent.map((chapter)=> chapter.chapterContent.map(
        (lecture)=> time += lecture.lectureDuration
      ))
      return humanizeDuration(time * 60 * 1000, { units: ["h", "m"]});

  } 

  //function to calculate to no of lectures in the course
  const CalculateNoOfLectures = (course)=>{
      let totalLectures = 0;
      course.courseContent.forEach(chapter =>{
        if(Array.isArray(chapter.chapterContent)){
          totalLectures += chapter.chapterContent.length
        }
      });
      return totalLectures;
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating: calculateAverageRating, isEducator, setIsEducator, CalculateNoOfLectures , CalculateCourseDuration, calculateChapterTime
  };

  return (
    <AddContext.Provider value={value}>{props.children}</AddContext.Provider>
  );
};
