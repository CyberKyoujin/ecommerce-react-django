import React, { useState } from 'react'
import { useProductsContext } from '../context/ProductsContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from '../context/Products';

const Smartphones = () => {

  const { products, fetchProducts } = useProductsContext();

  useEffect(() => {
    fetchProducts();
  }, [])

  const smartphones = products ? products.filter(product => product.category === 'Smartphone') : [];

  return (
    <div>
        <Products products={smartphones}  title={'Smartphones'}/>
    </div>
  )
}

export default Smartphones