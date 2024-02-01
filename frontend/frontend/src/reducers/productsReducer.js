
import { SET_ALL_PRODUCTS, PRODUCTS_FETCH_ERROR, SET_SEARCH_PRODUCTS } from "../actions/productsActions"


export const initialState = {
    products: [],
    loading: true,
    error: null,
    productsSearchItems: [],
}


export const productsReducer = (state, action) => {
    switch (action.type) {
        case SET_ALL_PRODUCTS:
        return {
            ...state,
            products: action.payload,
            loading: false
        }
        case PRODUCTS_FETCH_ERROR:
        return {
            ...state,
            products: [],
            error: action.payload
        }
        case SET_SEARCH_PRODUCTS:
        return {
            ...state,
            productsSearchItems: action.payload
        }
    }

}