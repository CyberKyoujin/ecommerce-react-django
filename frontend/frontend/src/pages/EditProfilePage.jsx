import React, { useEffect, useState } from 'react'
import avatar from '../assets/avatar.png'
import { useUserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';


const EditProfilePage = () => {

  
  const [location, setLocation] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);

  const { userProfile, fetchUserProfile, userData, updateProfile } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (profileImage) {
      formData.append('profile_image', profileImage);
    }
    formData.append('location', location);

    await updateProfile(formData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileUrl(URL.createObjectURL(file));  
    }
  };

  const profileImageUrl = userProfile?.profile_image_url || avatar;


  return (
    <div className='main-container'>
        <form className='edit-container' onSubmit={handleSubmit}>
            <div className='edit-header'>
                <img src={profileUrl || profileImageUrl} alt="Profile" />
                <input type="file" id="file-input" onChange={handleFileChange} style={{ display: 'none' }} />
                <label htmlFor="file-input" className="file-label">Choose Image</label>
            </div>
            <div className='edit-footer'>
                <input type="text" placeholder='Enter your location...' onChange={(e) => setLocation(e.target.value)}/>
                <button className='save-btn' type='submit'>Save</button>
                <button className='cancel-btn' onClick={() => navigate('/profile')}> Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default EditProfilePage