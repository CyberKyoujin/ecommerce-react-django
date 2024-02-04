import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, UPDATE_TOKEN, LOGIN_ERROR, REGISTER_ERROR, RESET_LOGIN_ERROR, RESET_REGISTER_ERROR, SET_USER_PROFILE, SET_USER_ADRESSES, ADRESSES_ERROR, SET_USER_PAYMENT_METHODS, SET_USER_ORDERS } from "../actions/userActions";
import { jwtDecode } from "jwt-decode";


export const initialState = {
    isAuthenticated: !!localStorage.getItem('authTokens'),
    userData: localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access) : null,
    authTokens: localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null,
    loading: false,
    loginError: null,
    registerError: null,
    userProfile: null,
    userAdresses: [],
    userPaymentMethods: [],
    adressesError: null,
    paymentMethodsError: null,
    userOrders: [],
};

export const userReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                registerError: null
            }
        case REGISTER_ERROR:
            return {
                ...state,
                registerError: action.payload
            }
        case RESET_REGISTER_ERROR:
            return {
                ...state,
                registerError: null
            }
        case LOGIN_USER:
            return {
                ...state,
                isAuthenticated: true,
                userData: action.payload.userData,
                authTokens: action.payload.authTokens,
                loginError: null
            };
        case LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
                userData: null,
                authTokens: null,
            };
        case UPDATE_TOKEN:
            return {
                ...state,
                authTokens: action.payload.authTokens,
                userData: jwtDecode(action.payload.authTokens.access),
            };
        case LOGIN_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                loginError: action.payload,
            }
        case RESET_LOGIN_ERROR:
            return {
                ...state,
                loginError: null
            }
        case SET_USER_PROFILE:
            return{
                ...state,
                userProfile: action.payload
            }
        case SET_USER_ADRESSES:
            return {
                ...state,
                userAdresses: action.payload,
                adressesError: null
            }
        case ADRESSES_ERROR:
            return {
                ...state,
                adressesError: action.payload
            }
        case SET_USER_PAYMENT_METHODS:
            return {
                ...state,
                userPaymentMethods: action.payload,
                paymentMethodsError: null
            }
        case ADRESSES_ERROR:
            return {
                ...state,
                paymentMethodsError: action.payload
            }
        case SET_USER_ORDERS:
            return {
                ...state,
                userOrders: action.payload,
            }
        default:
            return state;
    }
};