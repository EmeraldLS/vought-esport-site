import React, {  useEffect, useState } from 'react'
import { useParams } from 'react-router'
import LobbyRepresentation from './LobbyRepresentation'
import GoBack from './GoBack'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getRequest, postRequest } from '../api/ApiCall'
import { Lobbies, PostLobby } from '../api/APiURL'

const DayContent = () => {
    const {id} = useParams()
    const {day_number} = useParams()
    const [lobbies, setLobbies] = useState([])
    const [lobbyNumber, setLobbyNumber] = useState(0)
    const [showForm, setShowForm] = useState(false)
    // const [lobbyCreateErr, setLobbyCreateErr] = useState("")

    const {data, isError, isLoading: loading, error: err} = useQuery({
      queryKey: ["Lobbies"],
      queryFn: async () => getRequest(Lobbies(id, day_number))
    })

    const controlShowForm = () => {
      setShowForm(!showForm)
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
      }
      // eslint-disable-next-line
    }, [isSuccess])
    useEffect(() => setLobbies(data), [data])

  return (
    <div>
      <GoBack />
      {
        isError ? <div className=' bg-red-500 rounded-sm p-3 text-white text-2xl text-center'>{err?.response?.data.response}</div> 
        : !loading ? lobbies?.map((lobby, i) => {
          return (
            <div className='container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 mt-5' key={i}>
              <LobbyRepresentation date={lobby.Date} lobbyID={lobby.LobbyID} lobbyNumber={lobby.lobby_number} />
            </div>
            
          )
        })
        : <div className=' bg-yellow-500 p-5'>Loading, please wait...</div>
      }
      <div className='mx-auto px-4 my-5'>
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
              <label htmlFor="lobby_number">Lobby Number</label>
              <input type="number" onChange={e => setLobbyNumber(e.target.value)} min={0} max={3} className='border border-gray-300 ml-3 rounded-sm h-[50px] p-3' />
            </div>
            
            <button className=' bg-green-400 py-3 w-[100px] mt-3'>Submit</button>
          </form> : "" : ""
        }
        
      </div>
    </div>
  )
}

export default DayContent