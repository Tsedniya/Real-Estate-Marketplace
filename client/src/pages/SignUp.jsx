import React from 'react'

const SignUp = () => {
  return (
    <div>
       <h1 className='text-3xl text-center font-semibold text-white'>SignUp</h1>
      <form className='flex flex-col items-center justify-center gap-4'> 
        <input className='border p-3 rounded-lg text-white' id='username' type="text" placeholder='Username'/>
        <input className='border p-3 rounded-lg text-white' type="email" placeholder='Email'/>
        <input className='border p-3 rounded-lg text-white' type="password" placeholder='Password'/>
        <button>SIGN UP</button>
        <button>CONTINUE WITH GOOGLE</button>
      </form>
    </div>
  )
}

export default SignUp