import React from 'react'
import { Link } from 'react-router-dom'

const TournamentCard = ({name, id}) => {
  const pathToTournament = () => {
    return `/tournament/${id}`
  } 
  return (
    <Link to={pathToTournament()}  >
      <div className='py-5 min-h-[100px] px-3 bg-gray-300 shadow-lg'>
        <h6>Name: {name}</h6>
      </div>
      
    </Link>
  )
}

export default TournamentCard