import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutGrid, FileText, BarChart3, ShieldCheck, Share2, Lightbulb, ArrowLeft, Clock, BookOpen, Info, Zap } from 'lucide-react'
import { useAnalysis } from '../hooks/useAnalysis';

const SelectionPage = () => {
    const navigate = useNavigate();
    const { reports } = useAnalysis();
    const latestReport = reports && reports.length > 0 ? reports[0] : null;

    const features = [
        {
            title: "AI Resume Builder",
            desc: "Create professional resumes with step-by-step guidance.",
            icon: <FileText className="text-emerald-400" />,
            path: "/app/builder",
            borderColor: "group-hover:border-emerald-500/50"
        },
        {
            title: "AI Resume Analyzer",
            desc: "Get real-time feedback and scoring based on your job target.",
            icon: <LayoutGrid className="text-indigo-400" />,
            path: "/app/analyzer",
            borderColor: "group-hover:border-indigo-500/50"
        },
        {
            title: "Recent Reports",
            desc: latestReport 
                ? `Last Match: ${latestReport.matchScore}% Found` 
                : "View your previous analysis history here.",
            icon: <Clock className="text-blue-400" />,
            path: "/app/reports", 
            borderColor: "group-hover:border-blue-500/50"
        },
        {
            title: "Resume Match Insights",
            desc: "Visual breakdown of how your resume matches job requirements.",
            icon: <BarChart3 className="text-amber-400" />,
            path: "/app/insights",
            borderColor: "group-hover:border-amber-500/50"
        },
        {
            title: "Skill Gap Learning",
            desc: "Recommended resources to improve missing skills.",
            icon: <BookOpen className="text-purple-400" />,
            path: "/app/learning",
            borderColor: "group-hover:border-purple-500/50"
        },
        {
            title: "About ResuMate AI",
            desc: "Learn how ResuMate AI helps analyze resumes and improve job match.",
            icon: <Info className="text-rose-400" />,
            path: "/app/about",
            borderColor: "group-hover:border-rose-500/50"
        }
    ]

    return (
        <div className="min-h-screen bg-[#0B0F1A] p-10 font-sans selection:bg-emerald-500/30">
            <div className="max-w-7xl mx-auto">
                
                {/* --- Back to Home Button --- */}
                <div className="mb-12">
                    <button 
                        onClick={() => navigate('/')} 
                        className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-all group"
                    >
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="font-bold uppercase tracking-widest text-xs">Back to Home</span>
                    </button>
                </div>

                {/* --- Header --- */}
                <div className="mb-16 relative">
                    <div className="absolute -left-10 top-0 w-1 h-20 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                    <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
                        Welcome to <span className="text-emerald-500">ResuMate AI</span>
                    </h1>
                    <p className="text-slate-400 text-lg font-medium max-w-xl leading-relaxed">
                        Your professional transformation starts here. Select a specialized tool to refine your career path.
                    </p>
                </div>
                
                {/* --- Grid Layout --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => item.path && navigate(item.path)}
                            className={`group relative p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 transition-all duration-500 hover:-translate-y-2 hover:bg-slate-900 cursor-pointer overflow-hidden ${item.borderColor}`}
                        >
                            {/* Decorative Glow */}
                            <div className="absolute -right-10 -top-10 size-32 bg-white/5 blur-[50px] group-hover:bg-emerald-500/10 transition-all duration-700"></div>

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-slate-800 transition-all duration-500 shadow-xl">
                                    {item.icon}
                                </div>
                                
                                <h3 className="text-2xl font-bold mb-3 text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                                    {item.title}
                                </h3>
                                
                                <p className="text-slate-400 text-sm font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                    {item.desc}
                                </p>

                                
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Footer Stat --- */}
                <div className="mt-20 py-8 border-t border-slate-800/50 flex justify-center">
                    <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        System Online: Ready for Analysis
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectionPage;