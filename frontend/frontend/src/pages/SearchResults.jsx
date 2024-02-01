import React from 'react'
import { useProductsContext } from '../context/ProductsContext'
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {

    const itemsString = localStorage.getItem('searchProducts');
    let items = [];

    const navigate = useNavigate();
    
    if (itemsString) {
        items = JSON.parse(itemsString);
    }

    return (
        <div className='main-container'>
            <div className='title-container'>
                <h1>Products Found</h1>
            </div>
            <div className='products-container'>
                {items.map((item) => (
                    <div key={item.id} className='product-container' onClick={() => navigate(`/products/${item.id}`)}>
                        <img src={item.image_url} alt="" />
                        <div className='product-name-container'><h1>{item.name}</h1></div>
                        <div className='price-container'>
                            {item.discount_price ? (
                                <>
                                    <p className='original-price'>{item.price} $</p>
                                    <p className='discount-price'>{item.discount_price} $</p>
                                </>
                            ):(
                                <>
                                    <p className='discount-price'>{item.price} $</p>
                                </>
                            )}
                        </div>
                        <p>incl. taxes</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults