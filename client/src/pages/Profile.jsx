import React from 'react'
import {useSelector} from 'react-redux'
import {useRef} from 'react'

const Profile = () => {
  const fileRef = useRef(null)
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      
      <h1 className='text-3xl text-white font-semibold text-center my-7'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        <input type='file'ref={fileRef} hidden accept='image/*'/>
        
        <img onClick={()=> fileRef.current.click()} src={currentUser.avatar} alt='profile' 
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <input type='text' className='border p-3 rounded-lg text-white' id="username"  placeholder='username'/>
        <input type='email' className='border p-3 rounded-lg text-white'id="email" placeholder='Email'/>
        <input type='password' className='border p-3 rounded-lg text-white ' id="password"  placeholder='password'/>
        <button className='bg-white text-black rounded-lg p-3 uppercase hover:opacity-95
        disable:opacity-80'>Update</button>

      </form>

      <div className='flex justify-between mt-5'>
         <span className='text-[#2bcebb] cursor-pointer'>Delete account</span>
         <span className='text-[#2bcebb] cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}

export default Profile