const baseURL = process.env.REACT_APP_URL


export const Tournaments = `${baseURL}/tournaments`
export const Players = (page) => `${baseURL}/users?page=${page}`
export const Lobbies = (id, day_number) => `${baseURL}/lobbies/${id}/${day_number}`
export const PlayerDetails = (player_id) => `${baseURL}/users/${player_id}`
export const RegPlayer = () => `${baseURL}/register`
export const RegTour = () => `${baseURL}/attendance`
export const PlayersInLobby = (id, day_number, lobby_id) => `${baseURL}/lobby_players/${id}/${day_number}/${lobby_id}`
export const AddPlayerKills = (id) => `${baseURL}/lobby/player/${id}`
export const PostLobby = (id) => `${baseURL}/lobby/${id}`