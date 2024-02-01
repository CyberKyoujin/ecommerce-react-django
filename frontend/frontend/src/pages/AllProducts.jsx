import React, { useEffect, useState } from 'react'
import { useProductsContext } from '../context/ProductsContext'

import Products from '../context/Products';

const AllProducts = () => {
  const { loading, products, fetchProducts } = useProductsContext();
  

  useEffect(() => {
    fetchProducts();
  }, []);

  

  return (
    <div>
      <Products products={products} title={'All Products'}/>
    </div>
  );
};

export default AllProducts