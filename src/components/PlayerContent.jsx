import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "../api/ApiCall";
import { PlayerDetails } from "../api/APiURL";
import {
  Loader2,
  UserCircle,
  Calendar,
  Clock,
  AlertCircle,
  RefreshCcw,
  Shield,
} from "lucide-react";

const PlayerContent = () => {
  const [player, setPlayer] = useState({});
  const { player_id } = useParams();

  const {
    data,
    isError,
    error: err,
    isLoading,
  } = useQuery({
    queryKey: ["PlayerContent", player_id],
    queryFn: async () => getRequest(PlayerDetails(player_id)),
  });

  useEffect(() => setPlayer(data), [data]);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Players</span>
            </button>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-500">
                Player ID: {player_id}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isError && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error Loading Player Details
                </h3>
                <p className="mt-1 text-sm text-red-700">{err?.message}</p>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Loading player details...</p>
          </div>
        ) : (
          player && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-8 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <UserCircle className="w-12 h-12 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {player?.name || "Unknown Player"}
                    </h1>
                    <p className="text-gray-500 mt-1">Player Profile</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">
                      Registration Date
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    {formatDate(player?.registered_at)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <RefreshCcw className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">
                      Last Updated
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    {formatDate(player?.updated_at)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">
                      Player Status
                    </h3>
                  </div>
                  <p className="text-green-600 font-medium">Active</p>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Last activity: {formatDate(player?.updated_at)}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PlayerContent;
