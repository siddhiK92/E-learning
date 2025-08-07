import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddContext } from "../../context/AddContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const { allCourses, currency } = useContext(AddContext);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

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
      ? courseData.courseRatings.reduce((acc, r) => acc + r.rating, 0) / reviewCount
      : 0;

  const studentCount = courseData.enrolledStudents?.length || 0;

  const calculateChapterTime = (chapter) => {
    const totalMinutes = chapter.chapterContent.reduce((sum, lecture) => {
      return sum + (lecture.lectureDuration || 0);
    }, 0);

    return humanizeDuration(totalMinutes * 60 * 1000, {
      units: ["h", "m"],
      round: true,
      largest: 2,
      conjunction: '',
      serialComma: false,
      spacer: " ",
      delimiter: ", ",
    });
  };

  const calculateNoOfLectures = (course) => {
    return course.courseContent.reduce((total, chapter) => {
      return total + chapter.chapterContent.length;
    }, 0);
  };

  const calculateTotalCourseDuration = (course) => {
    let totalMinutes = 0;
    course.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        totalMinutes += lecture.lectureDuration || 0;
      });
    });
    return totalMinutes;
  };

  const totalDurationFormatted = humanizeDuration(
    calculateTotalCourseDuration(courseData) * 60 * 1000,
    {
      units: ["h", "m"],
      round: true,
      largest: 2,
      conjunction: '',
      serialComma: false,
      spacer: " ",
      delimiter: ", ",
    }
  );

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-6 md:pt-30 pt-20 text-left">
        {/* Background */}
        <div className="absolute top-0 left-0 w-full h-section-height -z-10 bg-gradient-to-b from-cyan-100/70 to-white"></div>

        {/* LEFT COLUMN */}
        <div className="md:w-3/5 w-full">
          <h1 className="text-course-details-heading-large font-bold">{courseData.courseTitle}</h1>

          <div
            className="text-default text-gray-700 mt-4"
            dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
          ></div>

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

          {/* Course Structure Section */}
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
                        className={`transform transition-transform ${openSections[index] ? "rotate-180" : ""}`}
                        src={assets.down_arrow_icon}
                        alt="arrow icon"
                      />
                      <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                    </div>
                    <p className="text-sm md:text-default">
                      {chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  {/* Expandable lecture list */}
                  <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? "max-h-96" : "max-h-0"}`}>
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          <img src={assets.play_icon} alt="play icon" className="w-4 h-4 mt-1" />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl.split('/').pop(),
                                    })
                                  }
                                  className="text-blue-500 cursor-pointer"
                                >
                                  Preview
                                </p>
                              )}
                              <p className="humanize">
                                {lecture.lectureDuration
                                  ? humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                                      units: ["h", "m"],
                                      round: true,
                                      largest: 2,
                                      conjunction: '',
                                      serialComma: false,
                                      spacer: " ",
                                      delimiter: ", ",
                                    })
                                  : "Duration not available"}
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

        {/* RIGHT COLUMN */}
        <div className="w-[280px] sm:w-[320px] z-10 rounded overflow-hidden bg-white shadow-md font-sans">

          {/* Removed the blue header section here */}

          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img src={courseData.courseThumbnail} alt="" />
          )}

          <div className="p-5 border-b border-gray-200">
            <p className="text-red-500 text-xs mb-2">5 days left at this price!</p>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-semibold text-gray-900">
                {currency}
                {(courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100).toFixed(2)}
              </p>
              <p className="text-gray-400 line-through text-base">
                {currency}
                {courseData.coursePrice.toFixed(2)}
              </p>
              <p className="text-gray-600 font-medium text-base">{courseData.discount}% off</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-gray-600 text-sm p-5">
            <div className="flex items-center gap-1">
              <img src={assets.star} alt="star" className="w-4 h-4" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={assets.time_clock_icon} alt="clock" className="w-4 h-4" />
              <span>{totalDurationFormatted}</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={assets.play_icon} alt="lessons" className="w-4 h-4" />
              <span>{calculateNoOfLectures(courseData)} lessons</span>
            </div>
          </div>

          <button className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium">
            {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
          </button>

          <div className="pt-6">
            <p className="md:text-xl text-lg text-lg font-medium text-gray-800">What's in the course</p>
            <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500">
              <li>Lifetime access with free updates.</li>
              <li>Step-by-step, hands-on project guidance.</li>
              <li>Downloadable resources and source code.</li>
              <li>Quizzes to test your knowledge.</li>
              <li>Certificate of completion.</li>
            </ul>
          </div>
        </div>
      </div>

      {/*  Footer inserted here */}
      <Footer />
    </>
  );
};

export default CourseDetails;
