import React, { useEffect, useState } from 'react'
import PlayerCard from '../components/PlayerCard'
import axios from '../api/axios'
import GoBack from '../components/GoBack'

const ViewPlayers = () => {
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")
    const getAllPlayers = async () => {
        setLoading(true)
        try{
            const response = await axios.get("/users")
            const data = await response.data
            setPlayers(data)
            setLoading(false)
        }catch(err) {
            if(err) {
                console.error(err)
                setErr("An occured, please try again!")
                setLoading(false)
            }
        }
    }

    useEffect(() => getAllPlayers, [])
  return (
    <div>
        <GoBack />
        {err ? <div className=' bg-red-500 rounded-sm p-3 text-white text-2xl text-center'>{err}</div> : ""}
        <div className='container mx-auto px-4 gap-5 grid grid-cols-1 md:grid-cols-2 mt-5'>
            { 
            !loading ?
                players == null ? "" :
                players.map((player, i )=> {
                    return <PlayerCard name={player.name} player_id={player.player_id} key={i} />
                } )
            : <div className=' bg-yellow-500 p-5'>Loading, please wait...</div>
            }
            
        </div>
    </div>
  )
}

export default ViewPlayers