import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

const PlayerCard = ({ name, player_id }) => {
  return (
    <Link
      to={`/players/${player_id}`}
      className="block transform transition-all duration-300 hover:scale-105"
    >
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl p-6 border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-50 p-3 rounded-full">
            <UserCircle className="w-8 h-8 text-blue-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">Player ID: {player_id}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-blue-600">
            <span>View Details</span>
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlayerCard;
