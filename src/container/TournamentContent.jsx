import React from "react";
import DayRepresentation from "../components/DayRepresentation";
import GoBack from "../components/GoBack";
import { FaTrophy } from "react-icons/fa";

const TournamentContent = () => {
  const days = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="max-w-4xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <GoBack />
      </div>
      <div className="text-center mb-12">
        <FaTrophy className="mx-auto h-12 w-12 text-yellow-500" />
        <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Tournament Schedule
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Follow the exciting matches day by day
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {days.map((day) => (
          <DayRepresentation key={day} dayNumber={day} />
        ))}
      </div>
    </div>
  );
};

export default TournamentContent;
