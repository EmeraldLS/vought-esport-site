import React, { useEffect, useState } from 'react'
import PlayerCard from '../components/PlayerCard'
import {useQuery} from '@tanstack/react-query'
import GoBack from '../components/GoBack'
import { getRequest } from '../api/ApiCall'
import { Players } from '../api/APiURL'

const ViewPlayers = () => {

    const {data, isLoading: loading, isError, error: err} = useQuery({
        queryKey: ["ViewPlayers"],
        queryFn: async () => getRequest(Players(1))
    })

    const [players, setPlayers] = useState([])

    useEffect(() => setPlayers(data), [data])
  return (
    <div>
        <GoBack />
        {isError ? <div className=' bg-red-500 rounded-sm p-3 text-white text-2xl text-center'>{err.message}</div> : ""}
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