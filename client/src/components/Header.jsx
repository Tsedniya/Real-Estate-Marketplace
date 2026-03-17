import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {useSelector} from 'react-redux'

const Header = () => {
    const {currentUser} = useSelector(state=>state.user)
  return (
    <nav className=' bg-[#ADEBB3]'>
       <div className='flex items-center justify-between max-w-6xl mx-auto p-3'>
            
            <Link to='/'>
                <h2 className='font-semibold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-black text-2xl'>Tsehay</span>
                    <span className='text-black  text-2xl'>Estate</span>
                </h2>
            </Link>
        

            <form className='bg-sky-100 p-3 rounded-lg flex items-center'>
                <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                <FaSearch className='text-slate-600'/>
            </form>
            <ul className='flex gap-4'>

                <Link to='/'>
                <li className='hidden sm:inline text-black  hover:text-[#2bcebb]'>Home</li>

                </Link>
               
                <Link to='/about'>
                <li className='hidden sm:inline text-black  hover:text-[#2bcebb]'>About</li>
                </Link>
               
                <Link to='/profile'>
                 {currentUser ? (
                    <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'/>
                 ) : (
                    <li className='sm:inline text-black hover:text-[#2bcebb]'>Sign in</li>
                 )}
                 </Link>   
            </ul>
                
                

          
        </div>


    </nav>
  )
}

export default Header ;