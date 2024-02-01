import React, { useEffect, useState } from 'react'
import Form from '../components/Form';
import { useUserContext } from '../context/userContext';
import { useLocation } from 'react-router-dom';


const LoginPage = () => {

  const { loginUser, loginError, dispatch } = useUserContext();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    return () => {
      dispatch({ type: 'RESET_LOGIN_ERROR' });
    };
  }, [dispatch]);


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (loginError) {
        dispatch({ type: 'RESET_LOGIN_ERROR' });
      }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (loginError) {
        dispatch({ type: 'RESET_LOGIN_ERROR' });
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(username, password);
  }

  return (
    <div>
        {loginError && <div className='error-container'><p>{loginError}</p></div>}
        <Form isRegister={false} onSubmit={handleSubmit} onHandleUsername={handleUsernameChange} onHandlePassword={handlePasswordChange}/>
    </div>
  )
}

export default LoginPage