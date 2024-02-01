import React, { useState } from 'react'
import { useProductsContext } from '../context/ProductsContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from '../context/Products';

const Tablets = () => {

  const { products, fetchProducts } = useProductsContext();


  useEffect(() => {
    fetchProducts();
  }, [])

  const tablets = products ? products.filter(product => product.category === 'Tablet') : [];


  return (
    <div>
        
      <Products products={tablets} title={'Tablets'}/>

    </div>
  )
}

export default Tablets