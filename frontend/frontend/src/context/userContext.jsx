import { useState, createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, UPDATE_TOKEN, LOGIN_ERROR, REGISTER_ERROR, SET_USER_PROFILE, SET_USER_ADRESSES, ADRESSES_ERROR, SET_USER_PAYMENT_METHODS, PAYMENT_METHODS_ERROR, SET_USER_ORDERS } from "../actions/userActions";
import { userReducer } from "../reducers/userReducer";
import { initialState } from "../reducers/userReducer";

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const navigate = useNavigate();

    axios.defaults.baseURL = 'http://127.0.0.1:8000/';

    const registerUser = async(email, username, password) => {
        try{
            const response = await axios.post('user/register/', {email, username, password});
            if (response.status === 201){
                dispatch({
                    type: REGISTER_USER
                })
                navigate('/register-success');
            } else {
                dispatch({
                    type: REGISTER_ERROR,
                    payload: 'Sign up failed with status: ' + response.status
                })
            }
        } catch(err){
            console.log(err.message);
            dispatch({
                type: REGISTER_ERROR,
                payload: err.response?.data?.detail || 'Sign up failed with status code 401',
            });
        }
    }

    const loginUser = async (username, password) => {
        try {
            const response = await axios.post('user/login/', { username, password });
            if (response.status === 200) {
                localStorage.setItem('authTokens', JSON.stringify(response.data));
                dispatch({
                    type: LOGIN_USER,
                    payload: {
                        authTokens: response.data,
                        userData: jwtDecode(response.data.access),
                    },
                });
                navigate('/');
            } else{
                dispatch({
                    type: LOGIN_ERROR,
                    payload: 'Login failed with status: ' + response.status
                })
            }
        } catch (err) {
            console.log(err.message);
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response?.data?.detail || 'Login failed with status code 401',
            });
        }
    };

    const logoutUser = () => {
        localStorage.removeItem('authTokens');
        dispatch({ type: LOGOUT_USER });
        navigate('/login');
    };

    const updateToken = async () => {
        const authTokens = JSON.parse(localStorage.getItem('authTokens'));
        if (!authTokens) {
            navigate('/login');
        };
        
        try {
            const response = await axios.post('user/token-refresh/', { refresh: authTokens.refresh });
            if (response.status === 200) {
                localStorage.setItem('authTokens', JSON.stringify(response.data));
                dispatch({
                    type: UPDATE_TOKEN,
                    payload: { authTokens: response.data },
                });
            } else {
                logoutUser();
            }
        } catch (err) {
            console.log(err);
            logoutUser();
        }
    };

    const fetchUserProfile = async () => {
        if (state.authTokens && state.authTokens.access) { 
            try {
                const response = await axios.get('user/profile/', {
                    headers: {
                        'Authorization': `Bearer ${state.authTokens.access}` 
                    }
                });
    
                if (response.status === 200) {
                    dispatch({
                        type: SET_USER_PROFILE,
                        payload: response.data
                    });
                }
            } catch (err) {
                console.log('Error fetching user profile:', err);
            }
        }
    };

    const updateProfile = async(formData) => {
        try{
            const response = await axios.put('user/profile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${state.authTokens.access}`
                }
            });
            if (response.status === 200) {
                navigate('/profile');
            }
        } catch (error){
            console.error('Error updating profile:', err);
        }
    }


    const fetchUserAdresses = async() => {
        try{
            const response = await axios.get('user/adresses/', {
                headers: {
                    'Authorization': `Bearer ${state.authTokens.access}`
                }
            })
            if (response.status === 200){
                dispatch({
                    type: SET_USER_ADRESSES,
                    payload: response.data
                })
            }
        }catch(error){
            dispatch({
                type: ADRESSES_ERROR,
                payload: error.message
            })
        }
    }

    const fetchUserCards = async() => {
        try{
            const response = await axios.get('user/cards/', {
                headers: {
                    'Authorization': `Bearer ${state.authTokens.access}`
                }
            })
            if (response.status === 200){
                dispatch({
                    type: SET_USER_PAYMENT_METHODS,
                    payload: response.data
                })
            }
        }catch(error){
            dispatch({
                type: PAYMENT_METHODS_ERROR,
                payload: error.message
            })
        }
    }

    const removeAdress = async( id ) => {

        try{
            const response = await axios.delete(`/user/delete-adress/${id}`, {
                headers: {
                    'Authorization': `Bearer ${state.authTokens.access}`
                }
            })
            if (response.status === 200){
                console.log('Successfully deleted adress!!!')
            }
        } catch(err){
            console.log(err.message);
        }


    }

    const removeCard = async( id ) => {

        try{
            const response = await axios.delete(`/user/delete-card/${id}`, {
                headers: {
                    'Authorization': `Bearer ${state.authTokens.access}`
                }
            })
            if (response.status === 200){
                console.log('Successfully deleted card!!!')
            }
        } catch(err){
            console.log(err.message);
        }


    }

    const addNewAdress = async(formData) => {

        try{
            const response = await axios.post('/user/create-address/', formData, {
                headers: {
                    'Authorization': `Bearer ${state.authTokens.access}`
                }
            })
            if (response.status === 201){
                console.log('Successfully created adress!!!')
            }
        } catch(err){
            console.log(err.message);
        }

    }

    const addNewCard = async(formData) => {

        try{
            const response = await axios.post('/user/create-card/', formData, {
                headers: {
                    'Authorization': `Bearer ${state.authTokens.access}`
                }
            })
            if (response.status === 201){
                console.log('Successfully created adress!!!')
            }
        } catch(err){
            console.log(err.message);
        }

    }

    const fetchUserOrders = async() => {
        try{
            const response = await axios.get('/order/user-orders/', {
                headers: {
                    'Authorization': `Bearer ${state.authTokens.access}`
                }
            });
            if(response.status === 200){
                dispatch({
                    type: SET_USER_ORDERS,
                    payload: response.data
                })
            }
        } catch(err){
            console.log(err.message);
        }
    }

    useEffect(() => {
        const fourMinutes = 1000 * 60 * 4;
        const interval = setInterval(() => {
            if (state.isAuthenticated) {
                updateToken();
            }
        }, fourMinutes);

        return () => clearInterval(interval);
    }, [state.isAuthenticated]);

    return (
        <UserContext.Provider value={{ ...state, registerUser, loginUser, logoutUser, dispatch, fetchUserProfile, updateProfile, fetchUserAdresses, fetchUserCards, removeAdress, removeCard, addNewAdress, addNewCard, fetchUserOrders}}>
            {children}
        </UserContext.Provider>
    );
};


export const useUserContext = () => useContext(UserContext);