import React, { useEffect } from 'react'
import Form from '../components/Form'
import { useState } from 'react'
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {


  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { registerUser, registerError, dispatch } = useUserContext();

  useEffect(() => {
    dispatch({
      type: 'RESET_REGISTER_ERROR',
    })
  }, [dispatch])

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if(registerError){
      dispatch({
        type: 'RESET_REGISTER_ERROR',
      })
    }
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if(registerError){
      dispatch({
        type: 'RESET_REGISTER_ERROR',
      })
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if(registerError){
      dispatch({
        type: 'RESET_REGISTER_ERROR',
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(email, username, password);
  }


  return (
    <div>
      {registerError && <div className='error-container'><p>{registerError}</p></div>}
      <Form  isRegister={true} onSubmit={handleSubmit} onHandleEmail={handleEmailChange} onHandleUsername={handleUsernameChange} onHandlePassword={handlePasswordChange}/>
    </div>
  )
}

export default RegisterPage