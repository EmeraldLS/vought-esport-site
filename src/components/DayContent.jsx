import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import LobbyRepresentation from "./LobbyRepresentation";
import GoBack from "./GoBack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequest, postRequest } from "../api/ApiCall";
import {
  Lobbies,
  PlayerKillsInADay,
  PlayersInDay,
  PostLobby,
} from "../api/APiURL";
import { FaPlus, FaUsers, FaTrophy } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";

const DayContent = () => {
  const { id } = useParams();
  const { day_number } = useParams();
  const [lobbies, setLobbies] = useState([]);
  const [lobbyNumber, setLobbyNumber] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [players, setPlayers] = useState([]);
  const [playerID, setPlayerID] = useState("");
  const [totalKillsData, setTotalKillsData] = useState({});

  const {
    data,
    isError,
    isLoading: loading,
    error: err,
  } = useQuery({
    queryKey: ["Lobbies"],
    queryFn: async () => getRequest(Lobbies(id, day_number)),
  });

  const controlShowForm = () => {
    setShowForm(!showForm);
  };

  const getPlayersInDay = async () => {
    const data = await getRequest(PlayersInDay(id, day_number));
    setPlayers(data);
  };

  const getTotalPlayerKillsInADay = async (e) => {
    e.preventDefault();
    if (playerID === "" || playerID === "_") {
      return;
    }
    const data = await getRequest(PlayerKillsInADay(id, day_number, playerID));
    setTotalKillsData(data);
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
    isError: isLobbyCreateErr,
    error: lobbyCreateErr,
    mutate,
    isSuccess,
  } = useMutation({
    mutationFn: (newLobby) => postRequest(PostLobby(id), newLobby, accessToken),
  });

  const createLobby = async (e) => {
    e.preventDefault();
    const dataTOsend = {
      lobby_number: Number(lobbyNumber),
      day_number: Number(day_number),
    };
    mutate(dataTOsend);
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["Lobbies"] });
      setLobbyNumber("");
      setShowForm(false);
    }
  }, [isSuccess, queryClient]);

  useEffect(() => setLobbies(data), [data]);

  return (
    <div className="container mx-auto px-4 py-8">
      <GoBack />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Day {day_number} Content
      </h1>
      {isError ? (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{err?.response?.data.response}</p>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center">
              <FaTrophy className="mr-2 text-yellow-500" />
              Lobbies
            </h2>
            {lobbies?.length === 0 ? (
              <div className="bg-gray-100 p-4 rounded-md text-green-600 font-semibold">
                No Lobby has been created today
              </div>
            ) : (
              lobbies?.map((lobby, i) => (
                <LobbyRepresentation
                  date={lobby.Date}
                  lobbyID={lobby.LobbyID}
                  lobbyNumber={lobby.lobby_number}
                  key={i}
                />
              ))
            )}
            <div className="mt-6">
              {lobbies?.length === 3 ? (
                <div className="bg-green-100 p-4 rounded-md text-green-600 font-semibold">
                  Lobby Is Filled!
                </div>
              ) : (
                <button
                  onClick={controlShowForm}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md transition duration-300 ease-in-out flex items-center"
                >
                  <FaPlus className="mr-2" /> Create Lobby
                </button>
              )}
              {lobbies?.length !== 3 && showForm && (
                <form onSubmit={createLobby} className="mt-4 space-y-4">
                  {isLobbyCreateErr && (
                    <div
                      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                      role="alert"
                    >
                      <p className="font-bold">Error</p>
                      <p>{lobbyCreateErr?.response?.data.response}</p>
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="lobby_number"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Lobby Number
                    </label>
                    <input
                      type="number"
                      id="lobby_number"
                      onChange={(e) => setLobbyNumber(e.target.value)}
                      min={0}
                      max={3}
                      className="border border-gray-300 p-3 h-[50px] w-full md:w-[250px] rounded-md"
                      value={lobbyNumber}
                      placeholder="Lobby Number e.g 1"
                    />
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out">
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center">
              <FaUsers className="mr-2 text-blue-500" />
              Player Stats
            </h2>
            <form onSubmit={getTotalPlayerKillsInADay} className="space-y-4">
              <div>
                <label
                  htmlFor="players"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select a player
                </label>
                <select
                  name="players"
                  id="players"
                  className="h-[50px] border-gray-300 border rounded-md w-full md:w-[250px] outline-none px-2 shadow-sm"
                  onChange={(e) => setPlayerID(e.target.value)}
                  onClick={getPlayersInDay}
                >
                  <option value="">Select Player</option>
                  {players === null ? (
                    <option value="_" disabled>
                      No Player yet
                    </option>
                  ) : (
                    players?.map((player, i) => (
                      <option value={player.player_id} key={i}>
                        {player.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out">
                Get Player Stats
              </button>
            </form>
            {totalKillsData?.total_kills && (
              <div className="bg-gray-100 p-4 rounded-md">
                <span className="font-bold text-blue-600">
                  {totalKillsData.player_name}
                </span>{" "}
                has{" "}
                <span className="font-bold text-green-600">
                  {totalKillsData.total_kills}
                </span>{" "}
                kill(s) for today's game
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DayContent;
