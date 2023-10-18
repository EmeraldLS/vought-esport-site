import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from '../api/axios'
import GoBack from '../components/GoBack'

const CreateTournament = () => {
  const defaultButtonName = "Create Tournament"
  const [tournamentName, setTournamentName] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [buttonName, setButtonName] = useState(defaultButtonName)
  const [err, setErr] = useState("")
  const navigate = useNavigate()
  const ProcessSubmit = async (e) => {
    e.preventDefault()
    setButtonName("Processing, please wait...")
    setDisabled(true)
    const content = {
      tournament_name: tournamentName
    }

    try{
      const response = await axios.post("/attendance", content)
      const data = await response.data
      console.log(data)
      setButtonName(defaultButtonName)
      setDisabled(false)
      navigate("/tournament")

    }catch(err) {
      if(err) {
        setErr(err.response.data.response)
        setButtonName(defaultButtonName)
        setDisabled(false)
      }
    }
    
  }
  useEffect(() => {
    setErr("")
  }, [tournamentName])
  return (
    <div className=' h-[90vh] bg-gray-400 w-full flex flex-col gap-5 justify-center ' style={{alignItems: 'center'}}>
      <GoBack />
      {err ? <div className=' bg-red-500 rounded-lg p-3 text-white text-1xl text-center'>{err}</div>: ""}
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