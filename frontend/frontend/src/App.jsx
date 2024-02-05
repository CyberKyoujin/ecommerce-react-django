import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './pages/Navbar'
import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import Home from './pages/Home'
import SuccessfulRegister from './pages/SuccessfulRegister'
import LoginPage from './pages/LoginPage'
import UserProfile from './pages/UserProfile'
import EditProfilePage from './pages/EditProfilePage'
import AllProducts from './pages/AllProducts'
import ProductDetails from './pages/ProductDetails'
import Laptops from './pages/Laptops'
import Tablets from './pages/Tablets'
import Smartphones from './pages/Smartphones'
import AddNewAdress from './pages/AddNewAdress'
import AddNewCard from './pages/AddNewCard'
import SearchResults from './pages/SearchResults'
import Cart from './pages/Cart'
import UserOrders from './pages/UserOrders'
import Footer from './components/Footer'


function App() {

  return (

    <main>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/register-success' element={<SuccessfulRegister/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/profile' element={<UserProfile/>}/>
          <Route path='/profile-edit' element={<EditProfilePage/>}/>
          <Route path='/products' element={<AllProducts/>}/>
          <Route path='/products/:productId' element={<ProductDetails/>}/>
          <Route path='/smartphones' element={<Smartphones/>}/>
          <Route path='/tablets' element={<Tablets/>}/>
          <Route path='/laptops' element={<Laptops/>}/>
          <Route path='/add-new-adress' element={<AddNewAdress/>}/>
          <Route path='/add-new-card' element={<AddNewCard/>}/>
          <Route path='/search-products' element={<SearchResults/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/orders' element={<UserOrders/>}/>
        </Routes>
        <Footer/>
    </main>

  )

}

export default App
