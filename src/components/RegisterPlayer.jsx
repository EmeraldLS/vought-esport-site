import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "../api/ApiCall";
import { RegPlayer } from "../api/APiURL";
import { UserPlus, ArrowLeft, Loader2, XCircle } from "lucide-react";

const RegisterPlayer = () => {
  const defaultButtonName = "Register Player";
  const [playerName, setPlayerName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [buttonName, setButtonName] = useState(defaultButtonName);
  const navigate = useNavigate();

  const {
    mutate,
    isError,
    error: err,
  } = useMutation({
    mutationFn: (player) => postRequest(RegPlayer(), player),
    onSuccess: () => {
      navigate("/players");
      setButtonName(defaultButtonName);
    },
    onError: () => {
      setButtonName(defaultButtonName);
      setDisabled(false);
    },
  });

  const ProcessSubmit = (e) => {
    e.preventDefault();
    setButtonName("Processing, please wait...");
    setDisabled(true);
    const content = {
      name: playerName,
    };
    mutate(content);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Register New Player
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Add a new player to your roster
          </p>
        </div>

        {isError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-sm text-red-700">
                {err?.response?.data?.response || "An error occurred"}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={ProcessSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="playerName"
              className="block text-sm font-medium text-gray-700"
            >
              Player Name
            </label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none shadow-sm"
              placeholder="Enter player name"
              required
            />
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={disabled}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {disabled ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <UserPlus className="mr-2 h-4 w-4" />
              )}
              {buttonName}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-gray-600">
          Need help? Contact support
        </p>
      </div>
    </div>
  );
};

export default RegisterPlayer;
