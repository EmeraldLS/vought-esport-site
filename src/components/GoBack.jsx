import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const GoBack = () => {
  const navigate = useNavigate();

  const previousPage = () => {
    navigate(-1);
  };

  return (
    <div className="mb-4">
      <button
        onClick={previousPage}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200 ease-in-out"
        aria-label="Go back to previous page"
      >
        <FaArrowLeft className="mr-2" />
        Go Back
      </button>
    </div>
  );
};

export default GoBack;
