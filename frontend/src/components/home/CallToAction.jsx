import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const CallToAction = () => {
    return (
        <div className='w-full bg-[#020617] py-20 overflow-hidden'> 
            
            <div id='cta' className='max-w-6xl mx-auto px-6 font-poppins relative'>
                
                {/* Neon Glows: Background ko depth dene ke liye */}
                <div className="absolute top-0 right-1/4 size-96 bg-emerald-500/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
                <div className="absolute bottom-0 left-1/4 size-72 bg-emerald-500/5 blur-[120px] rounded-full -z-10"></div>

                {/* Main Card: Pure Dark #0B101B with no patterns */}
                <div className="relative overflow-hidden bg-[#0B101B] border border-slate-800/60 p-12 md:p-20 rounded-[3rem] shadow-2xl group">
                    
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                        
                        <div className="max-w-xl text-center lg:text-left">
                            

                            {/* Heading */}
                            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.0] tracking-tighter uppercase">
                                Ready to land your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                                    dream job?
                                </span>
                            </h2>
                            
                            <p className="text-slate-500 mt-8 text-base md:text-lg font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Build a professional, ATS-friendly resume that stands out to recruiters in minutes.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-4 shrink-0">
                            {/* Initialize Session Button */}
                            <Link 
                                to="/app" 
                                className="group flex items-center gap-4 rounded-2xl py-6 px-14 bg-emerald-500 hover:bg-emerald-400 active:scale-95 transition-all text-[#0B0F1A] shadow-[0_20px_50px_rgba(16,185,129,0.25)] font-black text-[12px] uppercase tracking-[0.2em]"
                            >
                                <span>Get Started</span>
                                <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                            
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">
                                No credit card required
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CallToAction;