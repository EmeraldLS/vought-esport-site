import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import GoBack from './GoBack'
import { useQuery } from '@tanstack/react-query'
import { getRequest } from '../api/ApiCall'
import { PlayerDetails } from '../api/APiURL'

const PlayerContent = () => {
    const [player, setPlayer] = useState({})
    const {player_id} = useParams() 


    const {data, isError, error: err, isLoading: loading} = useQuery({
        queryKey: ["PlayerContent"],
        queryFn: async () => getRequest(PlayerDetails(player_id))
    })

    useEffect(() => setPlayer(data), [data])
  return (
    <div className='p-4'>
        <GoBack />
        {isError ? <div className=' bg-red-500 rounded-lg p-3 text-white text-1xl text-center'>{err.message}</div> : ""}
        {!loading ? 

        <ul>
            <li>Player Name: {player?.name}</li>
            <li>Player ID: {player?.player_id}</li>
            <li>Registered Date: {player?.registered_at}</li>
            <li>Updated Date: {player?.updated_at}</li>
        </ul>

        : <div className=' bg-yellow-500 p-5'>Loading, please wait...</div>
        }
    </div>
  )
}

export default PlayerContent