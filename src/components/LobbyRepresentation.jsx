import React from 'react'
import { Link } from 'react-router-dom'

const LobbyRepresentation = ({date, lobbyID, lobbyNumber}) => {
    const pathToLobby = () => {
        return `${lobbyID}`
    }
  return (
        <Link to={pathToLobby()}  className='py-5 min-h-[100px] px-3 bg-gray-300 shadow-lg'>
            <div className='flex flex-col md:flex-row gap-5 justify-between px-3'>
                <h6 className='text-[12px]'>Date: {date} </h6>
                <h6 className='text-[12px]'>Lobby Number: {lobbyNumber}</h6>
            </div>
            
        </Link>
  )
}

export default LobbyRepresentation