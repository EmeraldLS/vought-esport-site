import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import GoBack from '../components/GoBack'
import { useMutation} from '@tanstack/react-query'
import { postRequest } from '../api/ApiCall'
import { RegTour } from '../api/APiURL'

const CreateTournament = () => {
  const defaultButtonName = "Create Tournament"
  const [tournamentName, setTournamentName] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [buttonName, setButtonName] = useState(defaultButtonName)
  const navigate = useNavigate()

  const {mutate, isError, error: err} = useMutation({
    mutationFn: (tournament) => postRequest(RegTour(), tournament),
    onSuccess: () => navigate("/tournament"),
    onError: () => {
      setDisabled(false)
      setButtonName(defaultButtonName)
    }
  })


  const ProcessSubmit = async (e) => {
    e.preventDefault()
    setDisabled(true)
    setButtonName("Processing, please wait...")
    const content = {
      tournament_name: tournamentName
    }
    mutate(content)


  }
  return (
    <div className=' h-[90vh] bg-gray-400 w-full flex flex-col gap-5 justify-center ' style={{alignItems: 'center'}}>
      <GoBack />
      {isError ? <div className=' bg-red-500 rounded-lg p-3 text-white text-1xl text-center'>{err.response.data.response}</div>: ""}
        <form method="post" onSubmit={ProcessSubmit} >
          <div className='flex flex-col gap-5'>
            <label htmlFor="name" className=' sr-only'>Tournament Name</label>
            <input
             type="text" id='name' 
             value={tournamentName} 
             onChange={e => setTournamentName(e.target.value)} 
             className='h-[50px] border-none rounded-sm w-[250px] outline-none px-2 shadow-xl' 
             placeholder='tournament name'
             />
          </div>
          <div className='flex justify-center'>
           <button className='bg-red-200 mt-5 px-5 py-2 rounded shadow-md' disabled={disabled}>{buttonName}</button>
          </div>
          
        </form>
    </div>
  )
}

export default CreateTournament