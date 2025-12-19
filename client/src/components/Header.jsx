import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'

const Header = () => {
  return (
    <nav className='bg-[#50C878] shadow-md'>
       <div className='flex items-center justify-between max-w-6xl mx-auto p-3'>
            
            <Link to='/'>
                <h2 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Tsehay</span>
                    <span className='text-slate-500'>Estate</span>
                </h2>
            </Link>
        

            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                <FaSearch className='text-slate-600'/>
            </form>
            <ul className='flex gap-4'>

                <NavLink to='/' className='hidden sm:inline text-slate-700 hover:underline'>Home</NavLink>
                <NavLink to='/about' className='hidden sm:inline text-slate-700 hover:underline'>About</NavLink>
                <NavLink to='/sign-in' className='sm:inline text-slate-700 hover:underline'>Sign in</NavLink>
            </ul>

          
        </div>


    </nav>
  )
}

export default Header 