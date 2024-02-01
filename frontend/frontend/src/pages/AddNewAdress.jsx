import React, { useState } from 'react'
import { useUserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';

const AddNewAdress = () => {

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [zip, setZip] = useState('');

  const navigate = useNavigate();

  const { addNewAdress} = useUserContext();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('country', country);
    formData.append('city', city);
    formData.append('street', street);
    formData.append('zip_code', zip);
    await addNewAdress(formData);
    navigate('/profile');
  }

  return (
    <div className='main-container'>
        <form className='form' style={{marginTop: '5rem'}} onSubmit={handleSubmit}>
            <h1 className='form-header'>Please, fill out the form to add new adress</h1>
            <label htmlFor="" className='username-input' style={{marginTop: '0.5rem'}}>Country<span>*</span></label>
            <input type="text" onChange={(e) => setCountry(e.target.value)}/>
            <label htmlFor="" className='username-input'>City<span>*</span></label>
            <input type="text" onChange={(e) => setCity(e.target.value)}/>
            <label htmlFor="" className='username-input'>Street<span>*</span></label>
            <input type="text" onChange={(e) => setStreet(e.target.value)}/>
            <label htmlFor="" className='username-input'>Zip<span>*</span></label>
            <input type="text" onChange={(e) => setZip(e.target.value)}/>
            <button type='submit' className='form-btn'>SUBMIT</button>
        </form>
        
    </div>
  )
}

export default AddNewAdress