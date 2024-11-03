import React, { useEffect, useState } from "react";
import GoBack from "./GoBack";
import { useParams } from "react-router";
import PlayerLobbyCard from "./PlayerLobbyCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequest, putRequest } from "../api/ApiCall";
import { AddPlayerKills, Players, PlayersInLobby } from "../api/APiURL";
import { useAuth0 } from "@auth0/auth0-react";

const LobbyContent = () => {
  const defaultButtonName = "Submit";
  const defaultColor = "bg-green-500";
  const [players, setPlayers] = useState([]);
  const [users, setUsers] = useState([]);
  const { id, day_number, lobby_id } = useParams();
  const [kills, setKills] = useState("");
  const [player_id, setPlayerID] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [button, setButtonName] = useState(defaultButtonName);
  const [disabled, setDisabled] = useState(false);
  const [color, setColor] = useState(defaultColor);

  const {
    data,
    isLoading: loading,
    isError,
    error: err,
  } = useQuery({
    queryKey: ["Players"],
    queryFn: () => getRequest(PlayersInLobby(id, day_number, lobby_id)),
  });

  const getAllUsers = async () => {
    const data = await getRequest(Players(1));
    setUsers(data);
  };

  const controlShowForm = () => {
    setShowForm(!showForm);
  };

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

  const queryClient = useQueryClient();

  const {
    mutate,
    isError: isKillsErr,
    error: killsErr,
    isSuccess,
  } = useMutation({
    mutationFn: (content) =>
      putRequest(AddPlayerKills(id), content, accessToken),
    onError: () => {
      setButtonName(defaultButtonName);
      setDisabled(false);
      setColor(defaultColor);
      setKills("");
    },
    onSuccess: () => {
      setButtonName(defaultButtonName);
      setDisabled(false);
      setColor(defaultColor);
      setKills("");
    },
  });

  const addPlayerKills = async (e) => {
    e.preventDefault();
    setButtonName("Processing...");
    setDisabled(true);
    setColor("bg-yellow-500");

    const content = {
      lobby_id,
      day_number: Number(day_number),
      player_id,
      kills: Number(kills),
    };

    mutate(content);
  };

  useEffect(() => setPlayers(data), [data]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["Players"] });
  }, [isSuccess]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <GoBack />
        </div>

        {isError && (
          <div className="mb-6">
            <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg text-lg font-medium text-center">
              {err.response.data.response ?? "Something went wrong"}
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full">
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 flex items-center">
                  <div className="animate-pulse mr-3 h-4 w-4 rounded-full bg-yellow-500"></div>
                  <p className="text-yellow-700">Loading, please wait...</p>
                </div>
              </div>
            ) : players?.length === 0 ? (
              <div className="col-span-full">
                <div className="bg-gray-100 border-l-4 border-green-500 p-6 rounded-lg">
                  <p className="text-green-700 text-xl font-semibold">
                    No player in this lobby yet.
                  </p>
                </div>
              </div>
            ) : (
              players?.map((player, i) => (
                <PlayerLobbyCard
                  name={player.name}
                  kills={player.kills}
                  key={i}
                  playerID={player.player_id}
                />
              ))
            )}
          </div>
        </div>

        <div className="mt-8">
          {players?.length === 4 ? (
            <div className="bg-purple-100 border-l-4 border-purple-500 p-6 rounded-lg">
              <p className="text-purple-700 text-xl font-semibold">
                Players for this lobby is completed!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <button
                onClick={controlShowForm}
                className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50"
              >
                Add Player Kills
              </button>

              {showForm && players?.length !== 4 && (
                <form
                  method="post"
                  onSubmit={addPlayerKills}
                  className="bg-white p-6 rounded-lg shadow-lg space-y-6"
                >
                  {isKillsErr && (
                    <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
                      <p className="text-red-700">
                        {killsErr.response.data.response ??
                          "Something went wrong"}
                      </p>
                    </div>
                  )}

                  <div className="space-y-4 space-x-3">
                    <select
                      name="users"
                      id="users"
                      className="w-full md:w-64 h-12 px-4 border border-gray-300 rounded-lg shadow-sm focus:border-lime-500 focus:ring-1 focus:ring-lime-500 focus:outline-none"
                      onChange={(e) => setPlayerID(e.target.value)}
                      onClick={getAllUsers}
                    >
                      <option value={player_id}>Select Player</option>
                      {users?.map((user, i) => (
                        <option key={i} value={`${user.player_id}`}>
                          {`${user.name}`}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      id="kills"
                      onChange={(e) => setKills(e.target.value)}
                      min={0}
                      max={100}
                      className="w-full md:w-64 h-12 px-4 border border-gray-300 rounded-lg shadow-sm focus:border-lime-500 focus:ring-1 focus:ring-lime-500 focus:outline-none"
                      placeholder="No of kills"
                      value={kills}
                    />

                    <button
                      className={`${color} text-white px-6 py-3 rounded-lg shadow-md transition duration-150 ease-in-out hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color} disabled:opacity-50`}
                      disabled={disabled}
                    >
                      {button}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LobbyContent;
