import React, { useEffect, useState } from 'react'
import GoBack from './GoBack'
import { useParams } from 'react-router'
import PlayerLobbyCard from './PlayerLobbyCard'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getRequest, putRequest } from '../api/ApiCall'
import { AddPlayerKills, Players, PlayersInLobby } from '../api/APiURL'

const LobbyContent = () => {
  
  const defaultButtonName = "Submit"
  const defaultColor = "bg-green-400"
  const [players, setPlayers] = useState([])
  const [users, setUsers] = useState([])
  const {id, day_number, lobby_id, } = useParams()
  const [kills, setKills]= useState(0)
  const [player_id, setPlayerID] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [button, setButtonName] = useState(defaultButtonName)
  const [disabled, setDisabled] = useState(false)
  const [color, setColor] = useState(defaultColor)


  const {data, isLoading: loading, isError, error: err} = useQuery({
    queryKey: ["Players"],
    queryFn: () => getRequest(PlayersInLobby(id, day_number, lobby_id))
  })


  const getAllUsers = async () => {
    const data = await getRequest(Players(1))
    setUsers(data)
  } 

  const controlShowForm = () => {
    setShowForm(!showForm)
  }


  const queryClient = useQueryClient()

  const {mutate, isError: isKillsErr, error: killsErr, isSuccess} = useMutation({
    mutationFn: (content) => putRequest(AddPlayerKills(id), content),

    onError: () => {
      setButtonName(defaultButtonName)
      setDisabled(false)
      setColor(defaultColor)
    },

    onSuccess: () => {
      setButtonName(defaultButtonName)
      setDisabled(false)
      setColor(defaultColor)
    }
  })

  const addPlayerKills = async (e)=> {
    e.preventDefault()
    setButtonName("Processing...")
    setDisabled(true)
    setColor("bg-yellow-500")

    const content = {
      lobby_id,
      day_number: Number(day_number),
      player_id,
      kills: Number(kills)
    }

    mutate(content)
    
  }
  useEffect(() => setPlayers(data), [data])
  
  useEffect(() => {
    queryClient.invalidateQueries({queryKey: ["Players"]})
  }, [isSuccess])
  return (
    <div className='pb-5'>
      <GoBack />
  
      {isError ? <div className=' bg-red-500 rounded-sm p-3 text-white text-2xl text-center'>{err.response.data.response}</div>: ""} 
      <div className='container mx-auto px-4 gap-5 grid grid-cols-1 md:grid-cols-2 mt-5'>
        
        { 
        
        
        !loading 
        
        ? players?.length === 0 
        ? 
        <div className=' text-green-500 bg-gray-100 pl-1 py-5 text-2xl font-bold'>No player in this lobby yet.</div>
         : 
          players?.map((player, i) => {
            return <PlayerLobbyCard name={player.name} kills={player.kills} key={i} playerID={player.player_id} />
          })
          : <div className=' bg-yellow-500 p-5'>Loading, please wait...</div>
        } 
        
      </div>
      <div>
      </div>
      <div>
      {
        
        players?.length === 4 ? <div className=' text-green-500 my-3 bg-gray-100 pl-1 py-5 text-2xl font-bold'>Players for this lobby is completed!</div> : 
        <button onClick={controlShowForm} className=' bg-lime-500 text-white px-5 py-2 mx-5 mt-3'>Add Player Kills </button>
      }
      {
        showForm ?
        players?.length !== 4 ? <form method="post" className='my-3 flex flex-col md ' onSubmit={addPlayerKills}>
          {isKillsErr ? <div className=' bg-red-500 rounded-lg m-3 p-3 text-white text-1xl text-center'>{killsErr.response.data.response}</div>: ""}

        <div className='flex flex-col gap-5 px-5 my-3'>

          <select 
          name="users" 
          id="users" 
          className='h-[50px] border-black border rounded-sm w-[250px] outline-none px-2 shadow-xl'
          onChange={e => setPlayerID(e.target.value)}
          onClick={getAllUsers}
          >
            <option value="">Select Player</option>
            {users?.map((user,i) => {
              return (
              <option key={i} value={`${user.player_id}`}>{`${user.name}`}</option>
              )
            })}
          </select>

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
        
        <button className={`${color} py-3 w-[100px] mt-3 ml-5`} disabled={disabled}>{button}</button>
      </form>  : ""
      : ""
      }
      </div>
    </div>
  )
}

export default LobbyContent