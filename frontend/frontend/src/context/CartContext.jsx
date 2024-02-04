import { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducers/cartReducer";
import { initialState } from "../reducers/cartReducer";
import { ADD_ITEM, REMOVE_ITEM, CLEAR_CART, INCREASE_QTY, DECREASE_QTY } from "../actions/cartActions";
import axios from "axios";
import { useUserContext } from "./userContext";
import { UserContext } from "./userContext";

export const CartContext = createContext();


export const CartProvider = ({ children }) => {

    const { authTokens } = useUserContext();

    const [state, dispatch] = useReducer(cartReducer, initialState, () => {
        const localData = localStorage.getItem('cart');
        return localData ? { ...initialState, cart: JSON.parse(localData) } : initialState;
    });

    const addItem = (item) => {
        dispatch({
            type: ADD_ITEM,
            payload: item,
        });
    };

    const removeItem = (item) => {
        dispatch({
            type: REMOVE_ITEM,
            payload: item,
        })
    }

    const increaseItem = (item) => {
        dispatch({
            type: INCREASE_QTY,
            payload: item,
        })
    }

    const decreaseItem = (item) => {
        dispatch({
            type: DECREASE_QTY,
            payload: item,
        })
    }

    const createOrder = async (orderDetails) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/order/add/', orderDetails, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`,
                },
            });
            if (response.status === 201) {
                console.log('Successfully created an order!');
            }
        } catch (err) {
            console.error('Error creating order:', err);
        }
    };

    const clearCart = () => {
        dispatch({
            type: CLEAR_CART
        })
        localStorage.removeItem('cart');
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    }, [state.cart])


    return <CartContext.Provider value={{ ...state, addItem, removeItem, increaseItem, decreaseItem, createOrder, clearCart }}>{children}</CartContext.Provider>;
}

export const useCartContext = () => useContext(CartContext);