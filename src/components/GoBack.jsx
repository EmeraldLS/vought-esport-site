import React from 'react'
import { useNavigate } from 'react-router'

const GoBack = () => {
    const navigate = useNavigate()
    const previousPage = () => {
        navigate(-1)
    }
  return (
    <div>
        <button onClick={previousPage} className='px-12 ml-4 my-3 py-3 bg-green-500 text-black'>Go Back</button>
    </div>
  )
}

export default GoBack