import React, { useState } from 'react'
import { useProductsContext } from '../context/ProductsContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SliderOne } from '../components/Sliders';

const Home = () => {

  const { products, fetchProducts } = useProductsContext();

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [])

  const discountProducts = products ? products.filter(product => product.discount_price) : [];
  console.log(discountProducts);
  return (
    <div className='home-container'>
        <div className='home-title-container'>
            <h1>Discover the discounts</h1>
        </div>
        <SliderOne>
          {discountProducts.map(item => (
              <div className='card' key={item.id}>
                <div className='card-top'>
                  <img src={item.image_url} alt={item.name}/>
                  <div className='name-container'>
                    <h1>{item.name}</h1>
                  </div>
                </div>
                <div className='card-bottom'>
                  <p>{item.price} $</p>
                  <h3>{item.discount_price} $</h3>
                </div>
                <button className='product-btn' onClick={() => navigate(`/products/${item.id}`)}>To the Product</button>
              </div>
          ))}
        </SliderOne>
        
        
    </div>
  )
}

export default Home