import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUsers, FaChevronRight } from "react-icons/fa";

const LobbyRepresentation = ({ date, lobbyID, lobbyNumber }) => {
  const pathToLobby = () => {
    return `${lobbyID}`;
  };

  return (
    <Link
      to={pathToLobby()}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden mb-4"
    >
      <div className="p-4 border-l-4 border-blue-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <div className="flex items-center mb-2 sm:mb-0">
            <FaUsers className="text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              Lobby {lobbyNumber}
            </h3>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaCalendarAlt className="mr-1" />
            <span>{date}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-600">Click to view lobby details</p>
          <FaChevronRight className="text-gray-400" />
        </div>
      </div>
    </Link>
  );
};

export default LobbyRepresentation;
