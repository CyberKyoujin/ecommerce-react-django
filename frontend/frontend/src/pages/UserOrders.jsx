import React, { useEffect } from 'react'
import { useUserContext } from '../context/userContext'
import mastercard from '../assets/mastercard.png';
import visa from '../assets/visa.png';
import Footer from '../components/Footer';

const UserOrders = () => {

  const {fetchUserOrders, userOrders } = useUserContext();

  useEffect(() => {
    fetchUserOrders();
  }, [])

  const baseUrl = "http://127.0.0.1:8000"

  const orders = fetchUserOrders && userOrders;

  console.log(orders);

  return (
    <div className='main-container'>
        <div className='orders-container'>
            <h1>Your Orders</h1>
            {orders.map((order) => (
                <div className='order-container' key={order.id}>

                    <div className='order-header'>

                        {order.orderItems.map((item) => (

                                <div key={item.id} className='order-item'>
                                    <img src={baseUrl + item.product.image_url} alt="product" style={{width: '150px'}} />
                                    <p>{item.product.name}</p>
                                    <h4>x{item.qty} | {item.price}$</h4>
                                </div>

                                
                            
                        ))}                 
                    </div>

                    <div className='divider-container'>
                        <hr className='sidebar-divider'/>
                    </div>

                    <div className='order-footer'>
                        <div className='order-item-date'>
                            <h4>Ordered :</h4>
                            <p>{order.order_date}</p>
                        </div> 
                        <div className='order-item-adress'>
                            <h4>Delivery Adress:</h4>
                            <p>{order.shippingAddress.country}, {order.shippingAddress.city}</p>
                            <p>{order.shippingAddress.street}</p>
                            <p style={{fontWeight: 'bold'}}>{order.shippingAddress.zip_code}</p>
                        </div>
                        <div className='order-item-card'>
                            <h4>Payed with :</h4>
                           
                            <p><img className='card-img' src={order.paymentMethod.payment_system === 'MasterCard' ? mastercard : visa} alt="" /> ••••{order.paymentMethod.card_number.slice(-4)}</p>
                           
                            <p>{order.paymentMethod.card_owner}</p>
                        </div>
                    </div>

                    <div className='divider-container'>
                        <hr className='sidebar-divider'/>
                    </div>

                    <div className='total-order-container'>
                        <h1>{order.total_price} $</h1>
                    </div>
 
                </div>
            ))}
        </div>
    </div>
  )
}

export default UserOrders
