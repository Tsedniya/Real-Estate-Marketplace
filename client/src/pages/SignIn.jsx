import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice'

const SignIn = () => {
      
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
      const res = await fetch('/api/auth/signin',
        
      {
        method:'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
         dispatch(signInFailure(data.message))
      
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/')

      }catch(error){
        dispatch(signInFailure(error.message))
      }
     
      //console.log(data)
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
       <h1 className='my-7 text-3xl text-center font-semibold text-white'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'> 
        <input className='border p-3 rounded-lg text-white w-full' id="email" type="email" placeholder='Email' onChange={handleChange}/>
        <input className='border p-3 rounded-lg text-white w-full' id="password" type="password" placeholder='Password' onChange={handleChange}/>
        <button disabled={loading} className="border p-3 rounded-lg w-full bg-white text-[#022222] hover:bg-[#022222] hover:text-white uppercase">{loading ? 'Loading..' : 'Sign In'}</button>
        <button className="border p-3 rounded-lg w-full bg-white text-[#022222] hover:bg-[#022222] hover:text-white uppercase">CONTINUE WITH GOOGLE</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p className='text-white'>Don't have an account?</p>
        <Link to={"/sign-up"}>
            <span className='text-[#2bcebb]'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn