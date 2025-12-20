import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'

const Header = () => {
  return (
    <nav className='bg-[#00c4cc]
 shadow-md'>
       <div className='flex items-center justify-between max-w-6xl mx-auto p-3'>
            
            <Link to='/'>
                <h2 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-white text-3xl'>Tsehay</span>
                    <span className='text-[#F54545] text-3xl'>Estate</span>
                </h2>
            </Link>
        

            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                <FaSearch className='text-slate-600'/>
            </form>
            <ul className='flex gap-4'>

                <NavLink to='/' className='hidden sm:inline font-semibold text-black hover:text-[#F54545]'>Home</NavLink>
                <NavLink to='/about' className='hidden sm:inline font-semibold text-black hover:text-[#F54545]'>About</NavLink>
                <NavLink to='/sign-in' className='sm:inline text-black font-semibold hover:text-[#F54545]'>Sign in</NavLink>
            </ul>

          
        </div>


    </nav>
  )
}

export default Header 