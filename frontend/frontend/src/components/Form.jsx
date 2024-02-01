import React from 'react'



const Form = ({isRegister, onSubmit, onHandleEmail, onHandleUsername, onHandlePassword}) => {


  return (
    <form className='form' onSubmit={onSubmit}>
        <h1 className='form-header'>Please, fill out the form to {isRegister ? 'sign up' : 'login'}</h1>
        {isRegister && <div className='email-container'><label htmlFor="">Email<span>*</span></label>
        <input type="email" name="" id="" onChange={onHandleEmail}/></div>}
        <label htmlFor="" className='username-input'>Username<span>*</span></label>
        <input type="text" onChange={onHandleUsername}/>
        <label htmlFor="" className='password-input'>Password<span>*</span></label>
        <input type="password" onChange={onHandlePassword}/>
        <button type='submit' className='form-btn'>SUBMIT</button>
    </form>
  )

}

export default Form