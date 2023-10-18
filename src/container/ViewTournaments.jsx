import React, { useEffect, useState } from 'react'
import TournamentCard from '../components/TournamentCard'
import axios from '../api/axios'
import GoBack from '../components/GoBack'

const ViewTournaments = () => {
  const [tournaments, setTournaments] = useState([])
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)
    const getTournaments = async () => {
        setLoading(true)
        try{
            const response = await axios.get("/tournaments")
            const data = await response?.data
            setTournaments(data)
            setLoading(false)
        }catch(err) {
            if(err) {
                setErr("An unexpected error occured. Please try again.")
                setLoading(false)
            }
        }
    }

    useEffect(() => getTournaments, [])
  return (
    <>
    <GoBack />
    {err ? <div className=' bg-red-500 rounded-sm p-3 text-white text-2xl text-center'>{err}</div> : ""}
    <div className='container mx-auto px-4 grid gap-5 grid-cols-1 md:grid-cols-2 mt-5'>
        {
            
            !loading ? tournaments.map((tournament, i )=> {

                return (
                <div >
                    <TournamentCard name={tournament.tournament_name} id={tournament._id} key={i}  />
                </div>
                
                )
            }) : <div className=' bg-yellow-500 p-5'>Loading, please wait...</div>
        }
        
    </div>
    </>
    
  )
}

export default ViewTournaments