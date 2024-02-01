import React, { useState } from 'react'
import { useProductsContext } from '../context/ProductsContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from '../context/Products';

const Laptops = () => {


  const { products, fetchProducts } = useProductsContext();


  useEffect(() => {
    fetchProducts();
  }, [])

  const laptops = products ? products.filter(product => product.category === 'Laptop') : [];

  return (
    <div>
        
        <Products products={laptops} title={'Laptops'}/>
    
    </div>
  )
}

export default Laptops