import React, {  useEffect, useState } from 'react'
import { useParams } from 'react-router'
import LobbyRepresentation from './LobbyRepresentation'
import GoBack from './GoBack'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getRequest, postRequest } from '../api/ApiCall'
import { Lobbies, PlayerKillsInADay, PlayersInDay, PostLobby } from '../api/APiURL'

const DayContent = () => {
    const {id} = useParams()
    const {day_number} = useParams()
    const [lobbies, setLobbies] = useState([])
    const [lobbyNumber, setLobbyNumber] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [players, setPlayers] = useState([])
    const [playerID, setPlayerID] = useState("")
    const [totalKillsData, setTotalKillsData] = useState({})
    // const [lobbyCreateErr, setLobbyCreateErr] = useState("")

    const {data, isError, isLoading: loading, error: err} = useQuery({
      queryKey: ["Lobbies"],
      queryFn: async () => getRequest(Lobbies(id, day_number))
    })

    const controlShowForm = () => {
      setShowForm(!showForm)
    }

    const getPlayersInDay = async () => {
      const data = await getRequest(PlayersInDay(id, day_number))
      setPlayers(data)
    }

    const getTotalPlayerKillsInADay = async (e) => {
      e.preventDefault()
      console.log(playerID)
      if( playerID === ""){
        return
      }
      if(playerID == "_") {
        return
      }
      const data = await getRequest(PlayerKillsInADay(id, day_number, playerID))
      setTotalKillsData(data)
    }

   const queryClient = useQueryClient()

    const {isError: isLobbyCreateErr, error: lobbyCreateErr, mutate, isSuccess} = useMutation({
      mutationFn: (newLobby) =>  postRequest(PostLobby(id), newLobby),

    })


    const createLobby = async (e) => {
      e.preventDefault()
      const dataTOsend = {
        lobby_number : Number(lobbyNumber),
        day_number: Number(day_number)
      }
      mutate(dataTOsend)
    }
    useEffect(() => {
      if(isSuccess) {
        queryClient.invalidateQueries({ queryKey: ['Lobbies'] })
        setLobbyNumber("")
      }
      // eslint-disable-next-line
    }, [isSuccess])
    useEffect(() => setLobbies(data), [data])

  return (
    <div>
      <GoBack />
      {
        isError ? <div className=' bg-red-500 rounded-sm p-3 text-white text-2xl text-center'>{err?.response?.data.response}</div> 
        : !loading ?
          <div className='container grid grid-cols-1 md:grid-cols-2 md:p-5'>
            <div className=' container mx-left px-4 grid grid-cols-1 ' >
            {
              lobbies?.length === 0 ? 
              <div className=' text-green-500 bg-gray-100 pl-1 py-5 text-2xl font-bold'>No Lobby has been created today</div>
              :
               lobbies?.map((lobby, i) => {
                return (
                  
                    <LobbyRepresentation date={lobby.Date} lobbyID={lobby.LobbyID} lobbyNumber={lobby.lobby_number} key={i} />
                )
              })
            }
            <div className='mx-left my-5'>
        {
          lobbies?.length === 3 ? <div className=' text-green-500 bg-gray-100 pl-1 py-5 text-2xl font-bold'>Lobby Is Filled!</div> :

         <button onClick={controlShowForm} className=' bg-lime-500 text-white px-5 py-2 '>Create Lobby</button>
        }
        {
          lobbies?.length !== 3 ?
          showForm ? 
          <form method="post" className='my-3 flex flex-col  justify-start align-top' onSubmit={createLobby}>
            {isLobbyCreateErr ? <div className=' bg-red-500 rounded-sm p-3 text-white text-2xl text-center'>{lobbyCreateErr?.response?.data.response}</div> : ""}
            <div className='h-full'> 
              <label htmlFor="lobby_number" className='sr-only'>Lobby Number</label>
              <input type="number" onChange={e => setLobbyNumber(e.target.value)} min={0} max={3} className='border border-gray-300 p-3 h-[50px] w-full md:w-[250px]' value={lobbyNumber} placeholder='Lobby Number e.g 1' />
            </div>
            
            <button className=' bg-green-400 py-3 w-[100px] mt-3'>Submit</button>
          </form> : "" : ""
        }
        
      </div>
            </div>
            <div >
              <form className='flex flex-col gap-4 ml-4 pb-4' onSubmit={getTotalPlayerKillsInADay} method='GET'>
              <label htmlFor="players" className='text-2xl text-gray-800'>List of players in Today's lobbies</label>
              <hr />
              <div className='flex flex-col'>
                <select 
                    name="players" 
                    id="players" 
                    className='h-[50px] border-black border rounded-sm w-[250px] outline-none px-2 shadow-xl'
                    onChange={e => setPlayerID(e.target.value)}
                    onClick={getPlayersInDay}
                    >
                      <option value="">Select Player</option>
                      {
                        players === null ? <option value="_" disabled>No Player yet</option> :
                      
                      players?.map((player, i) => {
                        return <option value={player.player_id} key={i}>{player.name}</option>
                      })
                      }
                    </select>
                    <button className=' bg-green-400 py-3 w-[100px] mt-3'>Submit</button>
                    {
                      
                      totalKillsData?.total_kills ? 
                      <div className='mt-2'>
                        <span className='font-bold'>{totalKillsData.player_name}</span> has {totalKillsData.total_kills} kill(s) for today's game
                      </div> : ""
                    }
              </div>
                
              </form>
              
            </div>
          </div> 
           
        : <div className=' bg-yellow-500 p-5'>Loading, please wait...</div>
      }
      
    </div>
  )
}

export default DayContent