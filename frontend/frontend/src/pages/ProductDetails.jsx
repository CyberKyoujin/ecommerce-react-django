import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Product from '../components/Product';
import axios from 'axios';
import { IoMdCart } from "react-icons/io";
import { useCartContext } from '../context/CartContext';

const ProductDetails = () => {

  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const{ addItem } = useCartContext();

  useEffect(() => {
    const fetchProductDetails = async () => {
        try{
            const response = await axios.get(`http://127.0.0.1:8000/products/${productId}`);
            setProduct(response.data);
        } catch(error){
            console.log(error);
        }
    }

    fetchProductDetails();

  }, [productId]);

  const handleAddToCart = () => {
    addItem(product);
  }

  if(!product){
    return <div>Loading...</div>
  }

  return (
    <div className='details-container'>
        <div className='details-image-container'>
            <h1>{product.name}</h1>
            <img src={product.image_url} alt="" className='product-img'/>
        </div>
        <div className='details-content-container'>
            <div>
                <h1>{product.price} $</h1>
                <p>{product.description}</p>
            </div>
            <div className='details-btn-container'>
                <button onClick={handleAddToCart}><IoMdCart/>  Add to cart</button>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails