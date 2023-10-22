import React, { useEffect, useState } from 'react'
import TournamentCard from '../components/TournamentCard'
import GoBack from '../components/GoBack'
import { useQuery } from '@tanstack/react-query'
import { getRequest } from '../api/ApiCall'
import { Tournaments } from '../api/APiURL'

const ViewTournaments = () => {
  const [tournaments, setTournaments] = useState([])
    const {data, isLoading: loading, isError, error: err } = useQuery({
        queryKey: ["ViewTournament"],
        queryFn: async () => await getRequest(Tournaments)
    })

    if(tournaments) {
      console.log(tournaments)
    }

    useEffect(() => setTournaments(data), [data])
  return (
    <>
        <GoBack />
        {isError ? <div className=' bg-red-500 rounded-sm p-3 text-white text-2xl text-center'>{err.message}</div> : ""}
        <div className='container mx-auto px-4 grid gap-5 grid-cols-1 md:grid-cols-2 mt-5'>
            {
                
                !loading ? tournaments?.map((tournament, i )=> {

                    return (
                    <div key={i}>
                        <TournamentCard name={tournament.tournament_name} id={tournament._id}   />
                    </div>
                    
                    )
                }) : <div className=' bg-yellow-500 p-5'>Loading, please wait...</div>
            }
            
        </div>
    </>
    
  )
}

export default ViewTournaments