import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddContext } from "../../context/AddContext";
import Loading from "../../components/student/Loading"; 

import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const { allCourses } = useContext(AddContext);
  const [openSections, setOpenSections] = useState({});

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

  const reviewCount = courseData.courseRatings?.length || 0;
  const rating =
    reviewCount > 0
      ? courseData.courseRatings.reduce((acc, r) => acc + r.rating, 0) /
        reviewCount
      : 0;

  const studentCount = courseData.enrolledStudents?.length || 0;

  const calculateChapterTime = (chapter, index) => {
    if (index === 0) return "35 min";
    if (index === 1) return "30 min";
    return "25 min"; // default
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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

        {/* course description (only once) */}
        <div
          className="text-default text-gray-700 mt-4"
          dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
        ></div>

        {/* review and rating */}
        <div className="flex items-center gap-2 text-sm mt-4 pt-3 pb-1">
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

        {/* Course Structure */}
        <div className="pt-8 text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>
          <div className="pt-5">
            {courseData.courseContent.map((chapter, index) => (
              <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                  onClick={() => toggleSection(index)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      className={`transform transition-transform ${
                        openSections[index] ? "rotate-180" : ""
                      }`}
                      src={assets.down_arrow_icon}
                      alt="arrow icon"
                    />
                    <p className="font-medium md:text-base text-sm">
                      {chapter.chapterTitle}
                    </p>
                  </div>
                  <p className="text-sm md:text-default">
                    {chapter.chapterContent.length} lectures -{" "}
                    {calculateChapterTime(chapter, index)}
                  </p>
                </div>

                {/* Lecture list */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSections[index] ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className="flex items-start gap-2 py-1">
                        <img
                          src={assets.play_icon}
                          alt="play icon"
                          className="w-4 h-4 mt-1"
                        />
                        <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                          <p>{lecture.lectureTitle}</p>
                          <div className="flex gap-2">
                            {lecture.isPreviewFree && (
                              <p className="text-blue-500 cursor-pointer">
                                Preview
                              </p>
                            )}
                            <p>
                              {humanizeDuration(
                                lecture.lectureDuration * 60 * 1000,
                                { units: ["h", "m"] }
                              )}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* right column - Thumbnail Card */}
      <div className="max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w[420px]">
        <img src={courseData?.courseThumbnail} alt="course thumbnail" />
        <div className="p-4 flex gap-2 items-center">
          <img
            className="w-3.5"
            src={assets.time_clock_icon}
            alt="time left clock icon"
          />
          <p className="text-red-500 text-sm">
            <span className="font-medium">5 days </span>left at this price!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
