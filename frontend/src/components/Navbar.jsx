import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice';
import { LogOut, Cpu } from 'lucide-react'; 

export default function Navbar() {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const logoutUser = () => {
    navigate("/");
    dispatch(logout())
  }

  return (
    /* Theme Change: Match with Footer background */
    <div className='sticky top-0 z-[100] bg-[#020617] border-b border-slate-800/60 shadow-2xl'>
      <nav className='flex items-center justify-between max-w-7xl mx-auto px-6 py-4 transition-all'>
        
        {/* Logo: Removed 'uppercase' for CamelCase */}
        <Link to="/" className="flex items-center gap-2 group transition-transform active:scale-95">
          
          <span className="text-xl font-black text-white tracking-tight">
            ResuMate <span className="text-emerald-500">AI</span>
          </span>
          {/* Status Indicator Glow */}
        </Link>

        {/* Right Side: Auth Info and Action */}
        <div className='flex items-center gap-6 text-sm'>
          <div className="text-right hidden sm:block">
            <p className='text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none mb-1 opacity-70'>Authorized</p>
            <p className='font-bold text-white tracking-tight text-xs'>Hi, {user?.name}</p>
          </div>

          <button 
            onClick={logoutUser} 
            className='group flex items-center gap-2 bg-slate-900/50 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/50 px-5 py-2 rounded-xl text-white/80 hover:text-red-500 font-bold text-[10px] uppercase tracking-widest transition-all duration-300 active:scale-95'
          >
            Logout
            <LogOut size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

      </nav>
    </div>
  )
}