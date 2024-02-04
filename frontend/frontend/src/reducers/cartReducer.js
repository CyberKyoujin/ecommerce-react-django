

import { ADD_ITEM, REMOVE_ITEM, CLEAR_CART, INCREASE_QTY, DECREASE_QTY } from "../actions/cartActions";

export const initialState = {
    cart: [],
}


export const cartReducer = (state, action) => {
    switch (action.type) {
        case ADD_ITEM:
            const itemIndexAdd = state.cart.findIndex((item) => item.id === action.payload.id);
            if (itemIndexAdd > -1) {
                const newCart = state.cart.map((item, index) =>
                    index === itemIndexAdd ? { ...item, quantity: item.quantity + 1 } : item
                );
                return { ...state, cart: newCart };
            } else {
                return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
            }
        case REMOVE_ITEM:
            return { ...state, cart: state.cart.filter((item) => item.id !== action.payload.id) };
        case INCREASE_QTY:
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };
        case DECREASE_QTY:
            return {
                ...state,
                cart: state.cart
                    .map((item) =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                            : item
                    )
                    .filter((item) => item.quantity > 0),
            };
        case CLEAR_CART:
            return {
                ...state,
                cart: []
            }
        default:
            return state;
    }
};