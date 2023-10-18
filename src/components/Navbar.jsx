import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    const path = "/tournament"
    const [nav, setNav] = useState(false)
  return (
    <nav>
        <div  className="flex flex-row gap-5 bg-gray-800 px-10 py-5  justify-between">
            <div>
                <Link to="/" className=" font-bold text-[#b5b5b3] ">Vought Esports </Link>
            </div>
            <div className='md:hidden flex'>
                <button onClick={() => setNav(!nav)} className='text-white text-1xl p-3 toggle'>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div> 

            <div className="text-white hidden md:flex flex-col gap-5 sm:flex-row">
                <NavLink to={`${path}/view`}>Tournaments</NavLink>
                <NavLink to={`${path}/create`}>Create Tournament</NavLink>
                <NavLink to={`/players/view`}>Players</NavLink>
                <NavLink to={`/players/register`}>Register Player</NavLink>
            </div>
        </div>
        

        {
            nav ? 

        <div className="text-white flex md:hidden h-full w-full bg-gray-800 pl-10 pb-5 flex-col gap-5 ">
            <NavLink to={`${path}/view`}>Tournaments</NavLink>
            <NavLink to={`${path}/create`}>Create Tournament</NavLink>
            <NavLink to={`/players/view`}>Players</NavLink>
            <NavLink to={`/players/register`}>Register Player</NavLink>
        </div> : "" }
    </nav>
  )
}

export default Navbar