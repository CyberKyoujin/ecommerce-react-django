import React from 'react'
import avatar from '../assets/avatar.png'
import { useEffect } from 'react'
import { useUserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { SliderTwo } from '../components/Sliders'
import mastercard from '../assets/mastercard.png';
import visa from '../assets/visa.png';
import Footer from '../components/Footer'


const UserProfile = () => {
  const { userProfile, fetchUserProfile, userData, fetchUserAdresses, fetchUserCards, userAdresses, userPaymentMethods, removeAdress, removeCard } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
    fetchUserAdresses();
    fetchUserCards();
  }, []); 

  
  const profileImageUrl = userProfile?.profile_image_url || avatar;
  const location = userProfile?.location || 'not specified';
  const dateJoined = new Date(userData?.date_joined).toLocaleDateString(); 
  const userAdressesList = userAdresses && userAdresses;
  const userCardsList = userPaymentMethods && userPaymentMethods;

  return (
    <div className='main-container'>
      <div className='profile-container'>
        <div className='avatar-container'>
          <img src={profileImageUrl} alt="Profile" />
          <button onClick={() => navigate('/profile-edit')}>Edit Profile</button>
        </div>
        <div className='user-data-container'>
          <h1>{userData?.username}</h1>
          <p>Email: {userData?.email}</p>
          <p>Location: {location}</p>
          <p>Joined: {dateJoined}</p>
        </div>
      </div>
      <div className='adress-title-container'>
          <h1>Your shipping Adresses</h1>
      </div>
      
          { userAdressesList.length > 0 ? (
            <div className='slider-container'>
            <SliderTwo>
              {userAdressesList.map(adress => (
                <div className='adress-card' key={adress.id}>
                  <div className='adress-card-top'>
                    <h1>{adress.country}</h1>

                    <p>{adress.city}</p> 
                </div>
                <div className='adress-card-bottom'>
                    <p>{adress.street}</p>
                    <h3>{adress.zip_code}</h3>
                </div>
                <button className='adress-btn' onClick={() => removeAdress(adress.id)}>Remove</button>
              </div>
              ))}
            </SliderTwo>
            </div>
          )
          :
          (
            <div className='no-adresses'><p>You have no adresses yet.</p></div>
          )}

      <div className='adress-title-container'>
          <button className='add-adress-btn' onClick={() => navigate('/add-new-adress')}>Add new adress</button>
      </div>

      <div className='adress-title-container'>
          <h1>Your Payment Methods</h1>
      </div>

      { userCardsList.length > 0 ? (
        <div className='slider-container'>
          <SliderTwo>
            {userCardsList.map(card => (
              <div className='adress-card' key={card.id}>
          
                <div className='payment-card-top'>
                  <img src={card.payment_system === 'MasterCard' ? mastercard : visa} alt="" className='payment-img'/>
                  <h1>••••{card.card_number.slice(-4)}</h1>
                </div>
                  <p>{card.card_owner}</p> 
                  <button className='adress-btn' onClick={() => removeCard(card.id)}>Remove</button>
              </div>
            ))}
          </SliderTwo>
        </div>
      )
      :
      (
        <div className='no-adresses'><p>You have no payment methods yet.</p></div>
      )}

      <div className='adress-title-container'>
          <button className='add-adress-btn' onClick={() => navigate('/add-new-card')}>Add new payment method</button>
      </div>
    </div>

        
  );
};

export default UserProfile