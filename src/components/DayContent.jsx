import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from '../axios'
import LobbyRepresentation from './LobbyRepresentation'
import GoBack from './GoBack'

const DayContent = () => {
    const {id} = useParams()
    const {day_number} = useParams()
    const [lobbies, setLobbies] = useState([])
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)
    const [lobbyNumber, setLobbyNumber] = useState(0)
    const [showForm, setShowForm] = useState(false)
    const [lobbyCreateErr, setLobbyCreateErr] = useState("")
    const controlShowForm = () => {
      setShowForm(!showForm)
    }
    const createLobby = async (e) => {
      e.preventDefault()
      setLoading(true)
      const data = {
        lobby_number : Number(lobbyNumber),
        day_number: Number(day_number)
      }
      try{
        const response = await axios.post(`/lobby/${id}`, data)
        setLobbies(response.data)
        setLoading(false)
      }catch(err) {
        if(err) {
          setLobbyCreateErr(err.response.data.response)
          setLoading(false)
        }
      }
    }
    const getLobbies = async () => {
      setLoading(true)
      try{
        const response = await axios.get(`/lobbies/${id}/${day_number}`)
        const lobbies = response.data
        setLobbies(lobbies)
        setLoading(false)
      }catch(err) {
        if(err) {
          setErr("An error occured. Please try again later.")
          setLoading(false)
        }
      }
    }

    useEffect(() => getLobbies, [])

  return (
    <div>
      <GoBack />
      {
        err ? <div className=' bg-red-500 rounded-sm p-3 text-white text-2xl text-center'>{err}</div> 
        : !loading ? lobbies.map((lobby, i) => {
          return (
            <div className='container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 mt-5'>
              <LobbyRepresentation date={lobby.Date} lobbyID={lobby.LobbyID} lobbyNumber={lobby.lobby_number} key={i} />
            </div>
            
          )
        })
        : <div className=' bg-yellow-500 p-5'>Loading, please wait...</div>
      }
      <div className='mx-auto px-4 my-5'>
        {
          lobbies.length === 3 ? <div className=' text-green-500 bg-gray-100 pl-1 py-5 text-2xl font-bold'>Lobby Is Filled!</div> :

         <button onClick={controlShowForm} className=' bg-lime-500 text-white px-5 py-2 '>Create Lobby</button>
        }
        {
          lobbies.length !== 3 ?
          showForm ? 
          <form method="post" className='my-3 flex flex-col  justify-start align-top' onSubmit={createLobby}>
            {lobbyCreateErr ? <div className=' bg-red-500 rounded-sm p-3 text-white text-2xl text-center'>{lobbyCreateErr}</div> : ""}
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