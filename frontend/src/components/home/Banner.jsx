import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full py-3 bg-[#0B0F1A] border-b border-emerald-500/10 sticky top-0 z-[100] overflow-hidden">
      
      {/* Background Subtle Glows */}
      <div className="absolute inset-0 bg-emerald-500/[0.02] pointer-events-none"></div>
      <div className="absolute -left-10 top-0 h-full w-40 bg-emerald-500/10 blur-[40px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* New Badge with Animation */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600 text-[10px] uppercase tracking-widest font-black text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            New
          </div>
          
          {/* Message & Link (Your original content with new styling) */}
          <p className="text-slate-400 text-xs md:text-sm font-medium tracking-tight text-center sm:text-left">
            Want to see how your resume scores? Try our new <span className="text-emerald-400 font-bold">AI Analysis Report</span>
            
            <button 
              onClick={() => navigate('/app/analyzer')} 
              className="ml-3 font-black text-emerald-500 hover:text-emerald-400 transition-all inline-flex items-center gap-1 group border-b border-emerald-500/20 hover:border-emerald-500 uppercase text-[10px] tracking-widest"
            >
              Check Score
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </p>
        </div>
      </div>

      {/* Subtle bottom line glow */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
    </div>
  )
}

export default Banner