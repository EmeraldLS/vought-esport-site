import React from 'react'

const PlayerLobbyCard = ({kills, name, playerID}) => {
  return (
    <div className='py-5 min-h-[100px] px-3 bg-gray-300 shadow-lg'>
        <div className='flex flex-col gap-5 md:flex-row justify-between px-3'>
            <h6 className='text-[12px]'>Name: {name} </h6>
            <h6 className='text-[12px]'>Player ID: {playerID}</h6>
            <h6 className='text-[12px]'>Kills: {kills}</h6>
            
        </div>
    </div>
  )
}

export default PlayerLobbyCard