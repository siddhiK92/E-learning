import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddContext } from "../../context/AddContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const { allCourses } = useContext(AddContext); // removed calculateChapterTime

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      fetchCourseData();
    }
  }, [allCourses, id]);

  if (!courseData) {
    return <Loading />;
  }

  // --- Calculate rating and review count ---
  const reviewCount = courseData.courseRatings?.length || 0;
  const rating =
    reviewCount > 0
      ? courseData.courseRatings.reduce((acc, r) => acc + r.rating, 0) /
        reviewCount
      : 0;

  // --- Calculate students count ---
  const studentCount = courseData.enrolledStudents?.length || 0;

  // --- Local function for chapter time ---
  const calculateChapterTime = (chapter, index) => {
    if (index === 0) return "35 min";
    if (index === 1) return "30 min";
    return "25 min"; // default for others
  };

  return (
    <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
      {/* background gradient */}
      <div className="absolute top-0 left-0 w-full h-section-height -z-10 bg-gradient-to-b from-cyan-100/70 to-white"></div>

      {/* left column */}
      <div className="md:w-3/5 w-full">
        <h1 className="text-course-details-heading-large font-bold">
          {courseData.courseTitle}
        </h1>

        {/* course description */}
        <div
          className="text-default text-gray-700 mt-4"
          dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
        ></div>

        {/* review and rating */}
        <div className="flex items-center gap-2 text-sm mt-4 pt-3 pb-1 text-sm">
          <p className="text-orange-500 font-semibold">{rating.toFixed(1)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.round(rating) ? assets.star : assets.star_blank}
                alt="star"
                className="w-3.5 h-3.5"
              />
            ))}
          </div>
          <p className="text-blue-500">
            ({reviewCount} {reviewCount === 1 ? "rating" : "ratings"})
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            {studentCount} {studentCount === 1 ? "student" : "students"}
          </p>
        </div>

        <p className="text-sm">
          course by <span className="text-blue-600 underline">S.M.kawade</span>
        </p>

        <div className="pt-8 text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>
          <div className="pt-5">
            {courseData.courseContent.map((chapter, index) => (
              <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
                <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                  <div className="flex items-center gap-2">
                    <img
                      src={assets.down_arrow_icon}
                      alt="arrow icon"
                      className="inline mr-2"
                    />
                    <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                  </div>
                  <p className="text-sm md:text-default">
                    {chapter.chapterContent.length} lectures -{" "}
                    {calculateChapterTime(chapter, index)}
                  </p>
                </div>
                  <div>
                    <ul>
                      {chapter.chapterContent.map((lecture, i)=>(
                        <li key={i}>
                            <img src={assets.play_icon} alt="p" />
                        </li>
                      ))}
                    </ul>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* right column */}
      <div className="md:w-2/5 w-full">
        {courseData?.courseThumbnail && (
          <img
            src={courseData.courseThumbnail}
            alt={courseData.courseTitle}
            className="rounded-xl shadow-lg"
          />
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
