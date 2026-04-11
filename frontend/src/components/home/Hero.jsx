import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, CheckCircle2, Cpu } from 'lucide-react';

const Hero = () => {
    const { user } = useSelector(state => state.auth)

    return (
        <>
            {/* Main Wrapper: Full Dark Theme */}
            <div className="min-h-screen bg-[#020617] font-poppins text-slate-300 selection:bg-emerald-500/30 overflow-hidden relative">

                {/* Ambient Glows: AI/Neural Vibe */}
                <div className="absolute top-0 left-1/4 size-[600px] bg-emerald-500/5 blur-[150px] rounded-full -z-10 animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 size-[500px] bg-emerald-500/5 blur-[150px] rounded-full -z-10"></div>

                {/* --- Navbar Section --- */}
                <nav className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800/50">
                    <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-40 py-5">

                        {/* Logo: ResuMate AI with proper spacing */}
                        <Link to="/" className="flex items-center gap-2 group transition-transform active:scale-95">
                            <div className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                <Cpu size={18} className="text-emerald-500" />
                            </div>
                            <span className="text-xl font-black text-white tracking-tight">
                                <span className="mr-1">ResuMate</span> 
                                <span className="text-emerald-500">AI</span>
                            </span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            <a href="/" className="hover:text-emerald-400 transition-colors">Home</a>
                            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
                            <a href="#testimonials" className="hover:text-emerald-400 transition-colors">Testimonials</a>
                            <a href="#cta" className="hover:text-emerald-400 transition-colors">Contact</a>
                        </div>

                        {/* Auth Logic: Dashboard only for logged-in users */}
                        <Link
                            to={user ? "/app" : "/app?state=login"}
                            className="bg-emerald-500 text-slate-950 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-95"
                        >
                            {user ? "Dashboard" : "Login / Register"}
                        </Link>

                    </div>
                </nav>

                {/* --- Hero Content --- */}
                <section className="px-6 md:px-16 lg:px-24 xl:px-40 py-24 md:py-32">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* Left Side: Headline & CTA */}
                        <div className="relative">
                            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] text-white tracking-tighter uppercase">
                                DON'T JUST BUILD <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                                    ANALYZE
                                </span>
                            </h1>

                            <p className="mt-8 text-lg text-slate-500 max-w-lg font-medium leading-relaxed">
                                Our AI Analyzer detects hidden flaws that the human eye misses. Score your resume against industry standards and optimize for success before you even apply.
                            </p>

                            <div className="mt-12">
                                <Link
                                    to="/app"
                                    className="inline-block bg-emerald-500 text-slate-950 px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-emerald-400 transition-all active:scale-95"
                                >
                                    Create Resume
                                </Link>
                            </div>
                        </div>

                        {/* Right Side: Feature Cards */}
                        <div className="space-y-6">
                            {[
                                { 
                                    icon: <Sparkles className="text-emerald-500" />, 
                                    title: "AI RESUME ANALYSIS", 
                                    desc: "Instantly analyze your resume and improve your chances." 
                                },
                                { 
                                    icon: <Zap className="text-emerald-500" />, 
                                    title: "LIGHTNING FAST BUILDER", 
                                    desc: "Create professional resumes in minutes." 
                                },
                                { 
                                    icon: <CheckCircle2 className="text-emerald-500" />, 
                                    title: "ATS FRIENDLY TEMPLATES", 
                                    desc: "Designed to pass recruiter screening systems." 
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="group flex items-start gap-5 bg-[#0B101B]/60 backdrop-blur-xl p-7 rounded-[2.5rem] border border-slate-800 hover:border-emerald-500/30 transition-all duration-500">
                                    <div className="p-3.5 bg-slate-950 rounded-2xl group-hover:scale-110 transition-transform shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-white text-xs uppercase tracking-widest mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm font-medium">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
                .font-poppins { font-family: 'Poppins', sans-serif; }
                `}
            </style>
        </>
    );
};

export default Hero;