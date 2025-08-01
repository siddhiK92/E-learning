import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AddContext } from "../../context/AddContext";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AddContext);

  const price = Number(course?.coursePrice || 0);
  const discount = Number(course?.courseDiscount || 0);
  const finalPrice = price - (price * discount) / 100;

  const rating = calculateRating(course);
  const reviewCount = course?.courseRatings?.length || 0;

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
      className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg hover:shadow-md transition-all duration-200"
    >
      <img className="w-full" src={course.courseThumbnail} alt="course" />

      <div className="p-3 text-left space-y-1">
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        <p className="text-gray-500 text-sm">{course.educator?.name}</p>

        {/* Rating Display */}
        <div className="flex items-center gap-2 text-sm">
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
          <p className="text-gray-500">({reviewCount})</p>
        </div>

        {/* Price Display */}
        <div className="text-base font-semibold text-gray-800 flex items-center gap-2">
          {finalPrice > 0 ? `${currency}${finalPrice.toFixed(2)}` : "Free"}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
