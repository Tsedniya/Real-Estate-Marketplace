import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const SignUp = () => {
      
  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  //console.log(formData)
  
  const handleSubmit= async(e)=>{
      e.preventDefault()
      const res = await fetch('/api/auth/signup',
        
      {
        method:'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data)
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
       <h1 className='my-7 text-3xl text-center font-semibold text-white'>SignUp</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'> 
        <input className='border p-3 rounded-lg text-white w-full' id='username' type="text" placeholder='Username' onChange={handleChange}/>
        <input className='border p-3 rounded-lg text-white w-full' id="email" type="email" placeholder='Email' onChange={handleChange}/>
        <input className='border p-3 rounded-lg text-white w-full' id="password" type="password" placeholder='Password' onChange={handleChange}/>
        <button className="border p-3 rounded-lg w-full bg-white text-[#022222] hover:bg-[#022222] hover:text-white uppercase">SIGN UP</button>
        <button className="border p-3 rounded-lg w-full bg-white text-[#022222] hover:bg-[#022222] hover:text-white uppercase">CONTINUE WITH GOOGLE</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p className='text-white'>Have an account?</p>
        <Link to={"/signin"}>
            <span className='text-[#2bcebb]'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp