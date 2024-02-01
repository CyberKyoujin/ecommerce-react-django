import { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducers/cartReducer";
import { initialState } from "../reducers/cartReducer";
import { ADD_ITEM, REMOVE_ITEM, CLEAR_CART, INCREASE_QTY, DECREASE_QTY } from "../actions/cartActions";

export const CartContext = createContext();


export const CartProvider = ({ children }) => {

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

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    }, [state.cart])


    return <CartContext.Provider value={{ ...state, addItem, removeItem, increaseItem, decreaseItem }}>{children}</CartContext.Provider>;
}

export const useCartContext = () => useContext(CartContext);