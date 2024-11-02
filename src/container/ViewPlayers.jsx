import React, { useEffect, useState } from "react";
import PlayerCard from "../components/PlayerCard";
import { useQuery } from "@tanstack/react-query";
import GoBack from "../components/GoBack";
import { getRequest } from "../api/ApiCall";
import { Players } from "../api/APiURL";
import { Loader2, Users } from "lucide-react";

const ViewPlayers = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ViewPlayers", page],
    queryFn: async () => getRequest(Players(page)),
    keepPreviousData: true, // Keeps the previous page data while fetching new data
  });

  const [players, setPlayers] = useState([]);

  useEffect(() => setPlayers(data), [data]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8">
          <GoBack />
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Players Directory
              </h1>
            </div>
          </div>
        </div>

        {isError && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error?.message || "An error occurred"}
                </p>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="ml-2 text-gray-600">Loading players...</span>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {players?.map((player, i) => (
                <PlayerCard
                  key={i}
                  name={player.name}
                  player_id={player.player_id}
                />
              ))}
              {players?.length === 0 && !isLoading && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No players found</p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition disabled:bg-gray-200"
              >
                Previous
              </button>
              <span className="text-gray-600">Page {page}</span>
              <button
                onClick={handleNextPage}
                className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPlayers;
