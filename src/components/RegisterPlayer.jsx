import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import GoBack from './GoBack'
import { useMutation } from '@tanstack/react-query'
import { postRequest } from '../api/ApiCall'
import { RegPlayer } from '../api/APiURL'

const RegisterPlayer = () => {
    const defaultButtonName = "Register Player"
    const [playerName, setPlayerName] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [buttonName, setButtonName] = useState(defaultButtonName)
    const navigate = useNavigate()


    const {mutate, isError, error: err} = useMutation({
      mutationFn:  (player) => postRequest(RegPlayer(), player),
      onSuccess: () => {
        navigate("/players")
        setButtonName(defaultButtonName)
      },
      onError: () => {
        setButtonName(defaultButtonName)
        setDisabled(false)
      },
    })

    const ProcessSubmit = (e) => {
      e.preventDefault()
      setButtonName("Processing, please wait...")
      setDisabled(true)
      const content = {
        name: playerName
      }
      mutate(content)
    }

    return (
      <div className=' h-[90vh] bg-gray-400 w-full flex flex-col gap-5 justify-center ' style={{alignItems: 'center'}}>
        <GoBack />
        {isError ? <div className=' bg-red-500 rounded-lg p-3 text-white text-1xl text-center'>{err.response.data.response}</div>: ""}
          <form method="post" onSubmit={ProcessSubmit} >
            <div className='flex flex-col gap-5'>
              <label htmlFor="name" className=' sr-only'>Player Name</label>
              <input
               type="text" id='name' 
               value={playerName} 
               onChange={e => setPlayerName(e.target.value)} 
               className='h-[50px] border-none rounded-sm w-[250px] outline-none px-2 shadow-xl' 
               placeholder='player name'
               />
            </div>
            <div className='flex justify-center'>
             <button className='bg-red-200 mt-5 px-5 py-2 rounded shadow-md' disabled={disabled}>{buttonName}</button>
            </div>
            
          </form>
      </div>
    )
}

export default RegisterPlayer