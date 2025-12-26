import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
       <h1 className='my-7 text-3xl text-center font-semibold text-white'>SignUp</h1>
      <form className='flex flex-col gap-4'> 
        <input className='border p-3 rounded-lg text-white w-full' id='username' type="text" placeholder='Username'/>
        <input className='border p-3 rounded-lg text-white w-full' type="email" placeholder='Email'/>
        <input className='border p-3 rounded-lg text-white w-full' type="password" placeholder='Password'/>
        <button className="border p-3 rounded-lg w-full bg-white text-[#022222] hover:bg-[#022222] hover:text-white uppercase">SIGN UP</button>
        <button className='className="border p-3 rounded-lg uppercase bg-white text-[#022222] hover:bg-[#022222] hover:text-white w-full'>CONTINUE WITH GOOGLE</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p className='text-white'>Have an account?</p>
        <Link to={"/signin"}>
            <span className='text-sky-300'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp