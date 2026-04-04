// import React from 'react'

// const CallToAction = () => {
//   return (
//      <div id='cta' className='border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-10 sm:px-16 mt-28'>
//             <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-16 sm:py-20 -mt-10 -mb-10 w-full">
//                 <p className="text-xl font-medium max-w-md text-slate-800">Build a Professional Resume That Helps You Stand Out and Get Hired</p>
//                 <a href="https://prebuiltui.com" className="flex items-center gap-2 rounded py-3 px-8 bg-green-600 hover:bg-green-700 transition text-white">
//                     <span>Get Started</span>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
//                 </a>
//             </div>
//         </div>
//   )
// }

// export default CallToAction

import React from 'react';
import { Link } from 'react-router-dom'; // Link use karenge for internal routing

const CallToAction = () => {
    return (
        <div id='cta' className='border-y border-dashed border-emerald-200/60 w-full max-w-5xl mx-auto px-10 sm:px-16 mt-28 mb-20 font-poppins'>
            <div className="relative flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-6 md:px-12 border-x border-dashed border-emerald-200/60 py-16 sm:py-20 -mt-10 -mb-10 w-full bg-gradient-to-br from-white to-emerald-50/30">
                
                {/* Subtle background decoration */}
                <div className="absolute top-0 right-0 size-32 bg-emerald-100/20 blur-3xl -z-10"></div>

                <div className="max-w-md">
                    <p className="text-2xl font-bold text-slate-800 leading-tight">
                        Ready to land your <span className="text-emerald-600">dream job?</span>
                    </p>
                    <p className="text-slate-500 mt-2 text-sm md:text-base font-medium">
                        Build a professional, ATS-friendly resume that stands out to recruiters in minutes.
                    </p>
                </div>

                {/* Redirecting to login page */}
                <Link 
                    to="/app?state=login" 
                    className="group flex items-center gap-2 rounded-full py-4 px-10 bg-green-600 hover:bg-green-700 active:scale-95 transition-all text-white shadow-xl shadow-green-200 font-semibold text-lg"
                >
                    <span>Get Started</span>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="size-5 group-hover:translate-x-1 transition-transform"
                    >
                        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export default CallToAction;