import React from 'react'
import check from '../assets/check.png'
import { useNavigate } from 'react-router-dom'


const SuccessfulRegister = () => {


  const navigate = useNavigate();

  return (
    <div className='success-container'>
        <div className='success-header'>
            <img src={check} alt="" />
            <h1>You were successfully signed up <span>!</span></h1>
            
        </div>
        <button onClick={() => navigate('/')}>Back to the home page</button>
    </div>
  )
}

export default SuccessfulRegister