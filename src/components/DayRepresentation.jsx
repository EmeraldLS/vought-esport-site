import React from 'react'
import { Link } from 'react-router-dom'

const DayRepresentation = ({dayNumber}) => {
    const genLink = () => {
        return`day/${dayNumber}`
    }
  return (
    <ul className=''>
        <li className='text-2xl p-3'>
            <Link to={genLink()} className='bg-gray-400 min-h-[50px] px-10 py-1'>
                Day {dayNumber}
            </Link>
        </li>
    </ul>
    
  )
}

export default DayRepresentation