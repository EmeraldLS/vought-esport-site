import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import { useParams } from 'react-router'
import GoBack from './GoBack'

const PlayerContent = () => {
    const [player, setPlayer] = useState({})
    const [loading, setLoading] = useState(false)
    const [err, setErr]= useState("")
    const {player_id} = useParams() 
     const getPlayerDetails = async () => {
        setLoading(true)
        try{
            const response = await axios.get(`/users/${player_id}`)
            const data = await response.data
            setLoading(false)
            setPlayer(data)
        }catch(err) {
            if(err) {
                setErr("An error occured. Please try again later.")
                setLoading(false)
            }
        }
    }

    useEffect(() => getPlayerDetails, [])
  return (
    <div className='p-4'>
        <GoBack />
        {err ? <div className=' bg-red-500 rounded-lg p-3 text-white text-1xl text-center'>{err}</div> : ""}
        {!loading ? 
        <ul>
            <li>Player Name: {player.name}</li>
            <li>Player ID: {player.player_id}</li>
            <li>Registered Date: {player.registered_at}</li>
            <li>Updated Date: {player.updated_at}</li>
        </ul>

        : <div className=' bg-yellow-500 p-5'>Loading, please wait...</div>
        }
    </div>
  )
}

export default PlayerContent