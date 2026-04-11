import React from 'react'
import { Github, Linkedin, Twitter, Terminal, Cpu } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="relative bg-[#020617] pt-24 pb-12 px-6 md:px-16 lg:px-24 xl:px-32 text-[12px] text-slate-500 font-sans border-t border-slate-800/50 overflow-hidden">
            
            {/* Background Aesthetic Glow: Border line pe subtle emerald glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-emerald-500/5 blur-[80px] rounded-full"></div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16 relative z-10">
                
                {/* Brand Section: ResuMate AI CamelCase Fix */}
                <div className="flex flex-col gap-6 max-w-xs">
                    <div className="flex items-center gap-2 group cursor-default">
                        
                        {/* Fix: removed 'uppercase' class to allow CamelCase */}
                        <span className="text-xl font-black text-white tracking-tight">
                            ResuMate <span className="text-emerald-500">AI</span>
                        </span>
                    </div>
                    <p className="leading-relaxed text-slate-400 font-medium">
                        Advancing career intelligence through neural-enhanced resume analysis and real-time skill mapping.
                    </p>
                    <div className="flex items-center gap-4 text-slate-500">
                        <a href="https://github.com" className="hover:text-emerald-500 transition-all p-2 bg-[#0B101B] border border-slate-800 rounded-xl"><Github size={16} /></a>
                        <a href="https://linkedin.com" className="hover:text-emerald-500 transition-all p-2 bg-[#0B101B] border border-slate-800 rounded-xl"><Linkedin size={16} /></a>
                        <a href="https://twitter.com" className="hover:text-emerald-500 transition-all p-2 bg-[#0B101B] border border-slate-800 rounded-xl"><Twitter size={16} /></a>
                    </div>
                </div>

                {/* Links Grid: High-contrast headings */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
                    <div>
                        <p className="text-white font-black uppercase tracking-[0.2em] mb-6 text-[10px] opacity-80">Protocol</p>
                        <ul className="space-y-4">
                            <li><a href="#features" className="hover:text-emerald-400 transition-colors">Neural Features</a></li>
                            <li><a href="/app" className="hover:text-emerald-400 transition-colors">AI Engine</a></li>
                            <li><a href="#testimonials" className="hover:text-emerald-400 transition-colors">User Logs</a></li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-white font-black uppercase tracking-[0.2em] mb-6 text-[10px] opacity-80">Data Stream</p>
                        <ul className="space-y-4">
                            <li><a href="/" className="hover:text-emerald-400 transition-colors">Documentation</a></li>
                            <li><a href="/" className="hover:text-emerald-400 transition-colors">Source Code</a></li>
                            <li><a href="/about" className="hover:text-emerald-400 transition-colors">Project Wiki</a></li>
                        </ul>
                    </div>

                    <div className="hidden md:block">
                        <p className="text-white font-black uppercase tracking-[0.2em] mb-6 text-[10px] opacity-80">System Status</p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-slate-400 font-medium">Node Active</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="size-1.5 rounded-full bg-emerald-500"></div>
                                <span className="text-slate-400 font-medium">LLM Connected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar: Clean spacing and copyright */}
            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-800/40 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2 text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
                    <Terminal size={12} className="text-emerald-500/50" />
                    <span>Run: deploy_production_v2.0</span>
                </div>
                
                <p className="text-slate-500 font-bold tracking-tight text-[11px]">
                    © {new Date().getFullYear()} ResuMate AI <span className="mx-2 text-slate-800">|</span> 
                    <span className="text-emerald-500/80"> Designed by Nikita</span>
                </p>

                <div className="flex gap-6 text-slate-600 font-bold text-[10px] uppercase tracking-widest">
                    <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer