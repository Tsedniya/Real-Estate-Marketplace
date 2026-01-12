import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useState } from 'react';
import OAuth from '../components/OAuth'
import {useDispatch,useSelector} from 'react-redux';

const SignUp = () => {
      
  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector((state)=> state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  //console.log(formData)
  
  const handleSubmit= async(e)=>{
      e.preventDefault();

    try{
       dispatch(signInStart())
      // request backend
      const res = await fetch('/api/auth/signup',
        
      {
        method:'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        setLoading(false);
        setError(data.message);
      
        return;
      }
      setLoading(false)
      setError(null)
      navigate('signin')

      }catch(error){
        setLoading(false)
        setError(Error.message)
      }
     
      //console.log(data)
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
       <h1 className='my-7 text-3xl text-center font-semibold text-white'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'> 
        <input className='border p-3 rounded-lg text-white w-full' id='username' type="text" placeholder='Username' onChange={handleChange}/>
        <input className='border p-3 rounded-lg text-white w-full' id="email" type="email" placeholder='Email' onChange={handleChange}/>
        <input className='border p-3 rounded-lg text-white w-full' id="password" type="password" placeholder='Password' onChange={handleChange}/>
        <button disabled={loading} className="border p-3 rounded-lg w-full bg-white text-[#022222] hover:bg-[#022222] hover:text-white uppercase">{loading ? 'Loading..' : 'Sign Up'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p className='text-white'>Have an account?</p>
        <Link to={"/sign-in"}>
            <span className='text-[#2bcebb]'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp