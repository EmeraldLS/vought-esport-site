import React, { useEffect, useState } from "react";
import TournamentCard from "../components/TournamentCard";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "../api/ApiCall";
import { Tournaments } from "../api/APiURL";
import { FaTrophy, FaSpinner } from "react-icons/fa";

const ViewTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ViewTournament"],
    queryFn: async () => await getRequest(Tournaments),
  });

  useEffect(() => setTournaments(data), [data]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <FaTrophy className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Available Tournaments
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Join exciting tournaments and compete with the best players!
          </p>
        </div>

        {isError && (
          <div className="mt-8 max-w-3xl mx-auto">
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md"
              role="alert"
            >
              <p className="font-bold">Error</p>
              <p>{error.message}</p>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="mt-12 flex justify-center">
            <FaSpinner className="h-8 w-8 text-gray-400 animate-spin" />
          </div>
        ) : (
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {tournaments?.map((tournament, i) => (
              <div
                key={i}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
              >
                <TournamentCard
                  name={tournament.tournament_name}
                  id={tournament._id}
                />
              </div>
            ))}
          </div>
        )}

        {!isLoading && tournaments?.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-xl text-gray-500">
              No tournaments available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTournaments;
