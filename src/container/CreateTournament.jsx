import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import GoBack from "../components/GoBack";
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "../api/ApiCall";
import { RegTour } from "../api/APiURL";
import { useAuth0 } from "@auth0/auth0-react";

export const CreateTournament = () => {
  const defaultButtonName = "Create Tournament";
  const [tournamentName, setTournamentName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [buttonName, setButtonName] = useState(defaultButtonName);
  const navigate = useNavigate();

  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    let isMounted = true;

    if (!isMounted) {
      return;
    }

    const getToken = async () => {
      const token = await getAccessTokenSilently();
      setAccessToken(token);
    };

    getToken();
    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  const {
    mutate,
    isError,
    error: err,
  } = useMutation({
    mutationFn: (tournament) => postRequest(RegTour(), tournament, accessToken),
    onSuccess: () => navigate("/tournament"),
    onError: () => {
      setDisabled(false);
      setButtonName(defaultButtonName);
    },
  });

  const ProcessSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setButtonName("Processing, please wait...");
    const content = {
      tournament_name: tournamentName,
    };
    mutate(content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <GoBack />
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <h2 className="text-2xl font-bold text-center">
                Create New Tournament
              </h2>
              <p className="mt-2 text-blue-100 text-center">
                Set up your tournament and start competing
              </p>
            </div>

            {isError && (
              <div className="px-6 pt-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        {err.response?.data.response ?? "Network Error"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="px-6 py-8">
              <form
                method="post"
                onSubmit={ProcessSubmit}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tournament Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      value={tournamentName}
                      onChange={(e) => setTournamentName(e.target.value)}
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                      placeholder="Enter tournament name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={disabled}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
                      ${
                        disabled
                          ? "bg-purple-400 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      } transition duration-150 ease-in-out`}
                  >
                    {buttonName}
                    {disabled && (
                      <svg
                        className="animate-spin ml-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Make sure to review tournament name before creating
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
