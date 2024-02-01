import React, { useEffect, useState } from 'react'
import { useCartContext } from '../context/CartContext'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import mastercard from '../assets/mastercard.png';
import visa from '../assets/visa.png';


const Cart = () => {

  const { cart, removeItem, increaseItem, decreaseItem } = useCartContext();
  const { fetchUserAdresses, fetchUserCards, userPaymentMethods, userAdresses } = useUserContext();

  const [total, setTotal] = useState(0);
  const [adress, setAdress] = useState(null);
  const [card, setCard] = useState(null);

  const orderItems = localStorage.getItem('cart');
  
  const cartItems = JSON.parse(localStorage.getItem('cart'));
  const adresses = userAdresses && userAdresses;
  const cards = userPaymentMethods && userPaymentMethods;

  const navigate = useNavigate();

  useEffect(() => {
    calculateTotal();
  }, [cart, cartItems])

  useEffect(() => {
    fetchUserAdresses();
    fetchUserCards();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('order_items', orderItems);
    formData.append('payment_method', card);
    formData.append('shipping_address', adress);
  }

  const calculateTotal = () => {
    let totalPrice = 0;
  
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
  
    setTotal(totalPrice.toFixed(2));
  };


  return (
    <div className='main-container'>
      <form onSubmit={handleSubmit}>
      {cartItems.length === 0 ? (
        <div className='no-items'>
          <BsCart4 className='no-items-icon'/>
          <p>There are no products in your shopping cart. Fill the shopping cart with one of our offers.</p>
          <button className='no-items-btn' onClick={() => navigate('/products')}>Continue Shopping</button>
        </div>
      )
      :
      (
        <div className='main-cart-container'>
          <div className='cart-container'>
            <div className='cart-items-container'>
            {cart.map((item) => (
              <div className='cart-item' key={item.id}>

                <div className='cart-header'>

                  <div>
                    <img src={item.image_url} alt="" />
                  </div>

                  <div className='cart-item-center'>
                    <p>{item.name}</p>
                    <div> 
                      <button onClick={() => removeItem(item)}>Remove</button>
                    </div>
                  </div>

                </div>

                <div className='price-container'>
                  <h1 style={{color: 'rgb(239,124,0)'}}>{(item.price * item.quantity).toFixed(2)} $</h1>
                </div>

                <div className='cart-footer'>
                    <IoIosArrowUp onClick={() => increaseItem(item)}/>
                    <h2 style={{padding: '2px'}}>{item.quantity}</h2>
                    <IoIosArrowDown onClick={() => decreaseItem(item)}/>
                </div>

              </div>
            ))}

              <div className='select-container'>

                <h2>Choose Delivery Adress <span style={{color: 'red'}}>*</span></h2>
                <select className='select-adress' onChange={(e) => setAdress(e.target.value)}>
                  <option value='' disabled selected>Choose an Adress</option>
                  {adresses.map((adress) => (
                    <option key={adress.id} value={adress.id}>{adress.country}, {adress.city}, {adress.street}, {adress.zip_code}</option>
                  ))}
                </select>
                <button className='adress-btn' style={{marginTop: '2rem'}} onClick={() => navigate('/add-new-adress')}>Add new Adress</button>

                <h2 style={{marginTop: '4rem'}}>Choose Payment Method <span style={{color: 'red'}}>*</span></h2>
                <select className='select-adress' onChange={(e) => setCard(e.target.value)}>
                <option value="" disabled selected>Choose a Card</option>
                  {cards.map((card) => (
                    <option key={card.id} value={card.id}>{card.payment_system}  ••••{card.card_number.slice(-4)}, {card.card_owner}</option>
                  ))}
                </select>
                <button className='adress-btn' style={{marginTop: '2rem'}} onClick={() => navigate('/add-new-card')}>Add new Card</button>

              </div>

            </div>
          </div>

          <div className='total-container'>
            <div className='total-header'>
              <p>Order items: {total} $</p>
              <p>Delivery costs: 0 $</p>
            </div>
            <div className='divider-container'>
                    <hr className='sidebar-divider'/>
            </div>
              <h1>Total: {total} $</h1>
              <button type='submit'>Place order</button>
          </div>

          

          </div>
          )}
      </form>
      </div>
  );
};

export default Cart