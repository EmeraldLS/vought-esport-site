import React from 'react'
import { Link } from 'react-router-dom'

const PlayerCard = ({name, player_id}) => {
    const pathToPlayer = () => {
        return `/players/${player_id}`
    }
  return (
        <Link to={pathToPlayer()}  className='py-5 min-h-[100px] px-3 bg-gray-300 shadow-lg'>
            <div className='flex flex-col gap-5 md:flex-row justify-between px-3'>
                <h6 className='text-[12px]'>Name: {name} </h6>
                <h6 className='text-[12px]'>Player ID: {player_id}</h6>
            </div>
            
        </Link>
  )
}

export default PlayerCard