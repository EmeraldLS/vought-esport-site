import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarDay, FaChevronRight } from "react-icons/fa";

const DayRepresentation = ({ dayNumber }) => {
  const genLink = () => {
    return `day/${dayNumber}`;
  };

  return (
    <Link
      to={genLink()}
      className="block bg-white overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaCalendarDay className="h-8 w-8 text-blue-500" />
            <h2 className="ml-3 text-2xl font-semibold text-gray-900">
              Day {dayNumber}
            </h2>
          </div>
          <FaChevronRight className="h-5 w-5 text-gray-400" />
        </div>
        <p className="mt-3 text-gray-600">
          View matches and results for Day {dayNumber}
        </p>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-150 ease-in-out">
          See details
        </div>
      </div>
    </Link>
  );
};

export default DayRepresentation;
