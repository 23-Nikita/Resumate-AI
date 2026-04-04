// import React from 'react'

// const Banner = () => {
//   return (
    
     
//        <div className="w-full py-3 font-medium text-sm text-emerald-900 
//      text-center bg-gradient-to-r from-emerald-100 via-emerald-50 to-white border-b border-emerald-100">
//     <p className="flex items-center justify-center gap-2">
//         <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold text-white bg-emerald-600 shadow-sm">
//           New
//         </span>
//         <span>AI Feature Added: Enhance your resume with smart suggestions</span>
//     </p>
// </div>  
    
//   )
// }

// export default Banner




import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full py-2.5 font-medium text-sm text-emerald-900 
      bg-white/80 backdrop-blur-md border-b border-emerald-100/50 sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* New Badge with Animation */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-widest font-bold text-white bg-emerald-600 shadow-sm shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            New
          </div>
          
          {/* Message & Link */}
          <p className="text-slate-600 tracking-tight">
            Want to see how your resume scores? Try our new <span className="font-bold text-emerald-700">AI Analysis Report</span>
            <button 
              onClick={() => navigate('/app/analyzer')} 
              className="ml-3 font-bold text-emerald-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-0.5 group border-b border-transparent hover:border-emerald-600"
            >
              Check Score
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Banner