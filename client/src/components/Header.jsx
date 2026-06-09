import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {useSelector} from 'react-redux'


const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="w-full border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <span className="text-xl font-semibold text-slate-900 tracking-tight">
            Tsehay
          </span>
          <span className="text-xl font-semibold text-blue-600 tracking-tight">
            Estate
          </span>
        </Link>

        {/* Search */}
        <form className="hidden sm:flex items-center bg-slate-100 px-3 py-2 rounded-full w-[280px] focus-within:ring-2 focus-within:ring-blue-500 transition">
          <input
            type="text"
            placeholder="Search properties..."
            className="bg-transparent w-full text-sm outline-none placeholder:text-slate-400"
          />
          <FaSearch className="text-slate-500 text-sm" />
        </form>

        {/* Nav */}
        <nav className="flex items-center gap-5 text-sm">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-medium"
                : "text-slate-600 hover:text-slate-900 transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-medium"
                : "text-slate-600 hover:text-slate-900 transition"
            }
          >
            About
          </NavLink>

          <NavLink to="/profile" className="flex items-center gap-2">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-200"
              />
            ) : (
              <span className="px-3 py-1.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
                Sign in
              </span>
            )}
          </NavLink>

        </nav>
      </div>
    </header>
  );
};

export default Header;

