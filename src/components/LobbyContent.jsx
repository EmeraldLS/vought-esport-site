import React, { useEffect, useState } from 'react'
import GoBack from './GoBack'
import axios from '../axios'
import { useParams } from 'react-router'
import PlayerLobbyCard from './PlayerLobbyCard'

const LobbyContent = () => {
  const [players, setPlayers] = useState([])
  const {id, day_number, lobby_id, } = useParams()
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const [kills, setKills]= useState(0)
  const [player_id, setPlayerID] = useState("")
  const [killsErr, setKillsErr] = useState("")
  const [showForm, setShowForm] = useState(false)

  const controlShowForm = () => {
    setShowForm(!showForm)
  }

  const getLobbyPlayers = async() => {
    setLoading(true)
    try{
      const response =  await axios.get(`/lobby_players/${id}/${day_number}/${lobby_id}`)
      const data = await response.data
      setPlayers(data)
      setLoading(false)
    }catch(err) {
      if(err) {
        setErr("An error occured. Please try again later.")
        setLoading(false)
      }
    }
  }

  const content = {
    lobby_id,
    day_number: Number(day_number),
    player_id,
    kills: Number(kills)
  }

  const addPlayerKills = async (e)=> {
    e.preventDefault()
    setLoading(true)
    setKillsErr("")
    try{
      const response = await axios.put(`/lobby/player/${id}`, content)
      const players = await response.data
      setPlayers(players)
      setLoading(false)
    }catch(err) {
      if(err) {
        setKillsErr(err.response.data.response)
        setLoading(false)
      }
    }
  }
  useEffect(() => getLobbyPlayers, [])
  useEffect(() => {
    setKillsErr("")
  }, [player_id, kills])
  return (
    <div>
      <GoBack />
  
      {err ? <div className=' bg-red-500 rounded-sm p-3 text-white text-2xl text-center'>{err}</div>: ""} 
      <div className='container mx-auto px-4 gap-5 grid grid-cols-1 md:grid-cols-2 mt-5'>
        
        { 
        
        
        !loading 
        
        ? players.length === 0 
        ? 
        <div className=' text-green-500 bg-gray-100 pl-1 py-5 text-2xl font-bold'>No player in this lobby yet.</div>
         : 
          players.map((player, i) => {
            return <PlayerLobbyCard name={player.name} kills={player.kills} key={i} playerID={player.player_id} />
          })
          : <div className=' bg-yellow-500 p-5'>Loading, please wait...</div>
        } 
        
      </div>
      <div>
      {
        
        players.length === 4 ? <div className=' text-green-500 my-3 bg-gray-100 pl-1 py-5 text-2xl font-bold'>Players for this lobby is completed!</div> : 
        <button onClick={controlShowForm} className=' bg-lime-500 text-white px-5 py-2 mx-5 mt-3'>Add Player Kills </button>
      }
      {
        showForm ?
        players.length !== 4 ? <form method="post" className='my-3 flex flex-col md ' onSubmit={addPlayerKills}>
          {killsErr ? <div className=' bg-red-500 rounded-lg m-3 p-3 text-white text-1xl text-center'>{killsErr}</div>: ""}

        <div className='flex flex-col gap-5 px-5 my-3'>
          <label htmlFor="player_id" className='sr-only'>Player ID</label>
          <input 
          type="text" 
          value={player_id} 
          onChange={e => setPlayerID(e.target.value)}
          className='h-[50px] border-black border rounded-sm w-[250px] outline-none px-2 shadow-xl' 
          id='player_id' 
          placeholder='Player ID'
          />
          
        </div>
        <div className='flex flex-col gap-5 px-5'> 
          <label htmlFor="kills" className='sr-only'>Lobby Number</label>
          <input 
          type="number" 
          id='kills' 
          onChange={e => setKills(e.target.value)} min={0} max={100} 
          className='h-[50px] border-black border rounded-sm w-[250px] outline-none px-2 shadow-xl' 
          placeholder='No of kills'
          />
        </div>
        
        <button className=' bg-green-400 py-3 w-[100px] mt-3 ml-5'>Submit</button>
      </form>  : ""
      : ""
      }
      </div>
    </div>
  )
}

export default LobbyContent