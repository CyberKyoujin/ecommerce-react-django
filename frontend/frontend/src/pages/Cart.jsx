import React, { useEffect, useState } from 'react'
import { useCartContext } from '../context/CartContext'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Cart = () => {

  const { cart, removeItem, increaseItem, decreaseItem } = useCartContext();
  const [total, setTotal] = useState(0);
  
  const cartItems = JSON.parse(localStorage.getItem('cart'));

  useEffect(() => {
    calculateTotal();
  }, [cart, cartItems])

  const calculateTotal = () => {
    let totalPrice = 0;
  
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
  
    setTotal(totalPrice.toFixed(2));
  };

  if(cartItems.length === 0){
    return(
      <div>
        No items
      </div>
    )
  }

  return (
    <div className='main-container'>
      <div className='main-cart-container'>
      <div className='cart-container'>
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
      </div>

      <div className='total-container'>
          <h1>Total: {total} $</h1>
          <button>Place order</button>
      </div>

      </div>

    </div>
  );
};

export default Cart