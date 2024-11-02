import React from "react";
import { Link } from "react-router-dom";
import { FaTrophy, FaUsers, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const TournamentCard = ({
  name,
  id,
  participants = 0,
  startDate = "TBA",
  game = "Esports",
}) => {
  const pathToTournament = () => {
    return `/tournament/${id}`;
  };

  return (
    <Link to={pathToTournament()} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
          <FaTrophy className="text-white text-3xl mb-2" />
          <h2 className="text-xl font-bold text-white truncate">{name}</h2>
        </div>
        <div className="p-4">
          <div className="flex items-center text-gray-700 mb-2">
            <FaUsers className="mr-2" />
            <span>{participants} Participants</span>
          </div>
          <div className="flex items-center text-gray-700 mb-2">
            <FaCalendarAlt className="mr-2" />
            <span>Starts: {startDate}</span>
          </div>
          <div className="mt-4 flex items-center text-blue-600 font-semibold">
            View Details
            <FaArrowRight className="ml-2" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TournamentCard;
