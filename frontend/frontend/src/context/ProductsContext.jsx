import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import { SET_ALL_PRODUCTS, PRODUCTS_FETCH_ERROR, SET_SEARCH_PRODUCTS } from "../actions/productsActions";
import { productsReducer } from "../reducers/productsReducer";
import { initialState } from "../reducers/productsReducer";


export const ProductsContext = createContext();



export const ProductsProvider = ({ children }) => {

    const [state, dispatch] = useReducer(productsReducer, initialState);

    const fetchProducts = async() => {
        try{
            const response = await axios.get('http://127.0.0.1:8000/products/');

            if(response.status === 200){
            
                dispatch({
                    type: SET_ALL_PRODUCTS,
                    payload: response.data
                })
            } 
        } catch(err){
            dispatch({
                type: PRODUCTS_FETCH_ERROR,
                payload: {err}
            })
        }
    }

    const searchProducts = async(productName) => {
        try{
            const response = await axios.get('http://127.0.0.1:8000/products/get-products-by-name/', {
                params: {
                    product_name: productName
                }
            });
            if (response.status === 200){
                localStorage.setItem('searchProducts', JSON.stringify(response.data))
                dispatch({
                    type: SET_SEARCH_PRODUCTS,
                    payload: response.data
                });
            }
        } catch(error){
            console.log(error.message);
        }
    };



    return <ProductsContext.Provider value={{...state, fetchProducts, searchProducts}}>{ children }</ProductsContext.Provider>
}


export const useProductsContext = () => useContext(ProductsContext);