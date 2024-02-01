import React, { useState } from 'react'
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const AddNewCard = () => {

  const [cardNumder, setCardNumber] = useState('');
  const [paymentSystem, setPaymentSystem] = useState('');
  const [cardOwner, setCardOwner] = useState('');

  const { addNewCard } = useUserContext();

  const navigate = useNavigate();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('card_number', cardNumder);
    formData.append('card_owner', cardOwner);
    formData.append('payment_system', paymentSystem);
    await addNewCard(formData);
    navigate('/profile');
  }

  return (
    <div className='main-container'>
        <form className='form' style={{marginTop: '5rem'}} onSubmit={handleSubmit}>
            <h1 className='form-header'>Please, fill out the form to add a new payment card</h1>
            <label htmlFor="" className='username-input' style={{marginTop: '0.5rem'}}>Card number<span>*</span></label>
            <input type="text" onChange={(e) => setCardNumber(e.target.value)}/>
            <label htmlFor="payment-system" className='username-input'>Payment System<span>*</span></label>
            <select id="payment-system" style={{padding: '0.75rem'}} onChange={(e) => setPaymentSystem(e.target.value)}>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
            </select>
            <label htmlFor="" className='username-input'>Card owner<span>*</span></label>
            <input type="text" onChange={(e) => setCardOwner(e.target.value)}/>
            <button type='submit' className='form-btn'>SUBMIT</button>
        </form>
        
    </div>
  )
}

export default AddNewCard