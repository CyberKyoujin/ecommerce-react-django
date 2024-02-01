import React from 'react'
import logo from '../assets/logo_1.png'
import { FaUser } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { useUserContext } from '../context/userContext';
import { useEffect, useRef } from 'react';
import { useProductsContext } from '../context/ProductsContext';


const Navbar = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [togglerOpen, setTogglerOpen] = useState(false);
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');

  const togglerRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, userData, logoutUser, userProfile } = useUserContext();
  const { searchProducts, productsSearchItems } = useProductsContext();

  const handleSubmit = async(e) => {
    e.preventDefault();
    await searchProducts(search);
    
    navigate('/search-products');
    
  }


  useEffect(() => {
    const placeTogglerNextToProfile = () => {
      const profileButton = document.querySelector('.btn-profile');
      const toggler = document.querySelector('.toggler');
      if (profileButton && toggler) {
        const buttonRect = profileButton.getBoundingClientRect();
        toggler.style.top = `${buttonRect.bottom + window.scrollY + 30}px`;
        toggler.style.right = `${window.innerWidth - buttonRect.right}px`;
      }
    };

    placeTogglerNextToProfile();
    window.addEventListener('resize', placeTogglerNextToProfile);
    return () => window.removeEventListener('resize', placeTogglerNextToProfile);
  }, []); 

  useEffect(() => {
    setTogglerOpen(false);
    setSidebarOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (togglerRef.current && !togglerRef.current.contains(event.target)) {
        setTogglerOpen(false); 
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className='navbar'>

        <div className='nav-container'>
            <div className='nav-header'>
                <Link to="/"><img src={logo} alt="" className='logo-img'/></Link>
                <button className='categories-button' onClick={() => setSidebarOpen(!sidebarOpen)}>All Products<GiHamburgerMenu className='categories-icon'/></button>
            </div>
           
                <form className='nav-center' onSubmit={handleSubmit}>
                <input type="search" name="" id="" className='nav-input' placeholder='Search for items...' onChange={(e) => setSearch(e.target.value)}/>
                <button className='search-icon'><BsSearch type='submit'/></button>
                </form>
          
            <div className='nav-end'>
                <button className='btn-cart' onClick={() => navigate('/cart')}><IoMdCart/></button>
                <button className='btn-profile' onClick={() => setTogglerOpen(!togglerOpen)}><FaUser/></button>
            </div>
        </div>

        <aside className={sidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}>
            <div className='sidebar-header'>
                <img src={logo} alt="" className='logo-img'/>
                <IoMdClose className='sidebar-icon' onClick={() => setSidebarOpen(!sidebarOpen)}/>
            </div>
            <div className='divider-container'>
                <hr className='sidebar-divider'/>
            </div>
            <div className='categories-container'>
                    <div className='category-container'>
                        <Link className='category-name' to="/products">All Products</Link>
                        <IoIosArrowForward className='category-icon'/>
                    </div>
                    <div className='category-container'>
                        <Link className='category-name' to="/smartphones">Smartphones</Link>
                        <IoIosArrowForward className='category-icon'/>
                    </div>
                    <div className='category-container'>
                        <Link className='category-name' to="/tablets">Tablets</Link>
                        <IoIosArrowForward className='category-icon'/>
                    </div>
                    <div className='category-container'>
                        <Link className='category-name' to="/laptops">Laptops</Link>
                        <IoIosArrowForward className='category-icon'/>
                    </div>
            </div>
        </aside>

        <div className={togglerOpen ? 'toggler show-toggler' : 'toggler'}  ref={togglerRef}>
            {isAuthenticated ? (
                
                <>
                    <div className='username-container'>
                        <h1>Hi, {userData?.username}</h1>
                    </div>
                    <div>
                        <button className='login-btn' onClick={() => navigate('/profile')}>To Profile</button>
                    </div>
                    <div>
                        <button className='signup-btn' onClick={() => logoutUser()}>Logout</button>
                    </div>
                </>
            ) 
            : 
            (
                <>
                    <div>
                        <button className='login-btn' onClick={() => navigate('/login')}>Login</button>
                    </div>
                    <div>
                        <button className='signup-btn' onClick={() => navigate('/register')}>Sign Up</button>
                    </div>
                </>

            )}
            
        </div>


    </nav>
  )
}

export default Navbar