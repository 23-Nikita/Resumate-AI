import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    ChevronDown, Terminal, MessageSquare, Map, 
    Download, ArrowLeft, Sparkles, CheckCircle2,
    Target, Lightbulb, Zap, TrendingUp, ShieldAlert
} from 'lucide-react';
import { useAnalysis } from "../hooks/useAnalysis";

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Prep', icon: <Terminal size={18} /> },
    { id: 'behavioral', label: 'Behavioral Prep', icon: <MessageSquare size={18} /> },
    { id: 'roadmap', label: 'Preperation Roadmap', icon: <Map size={18} /> },
];

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false);
    if (!item?.question) return null;

    return (
        <div className={`transition-all duration-300 mb-4 ${open ? 'scale-[1.01]' : ''}`}>
            <div className={`bg-[#0F172A] border ${open ? 'border-emerald-500/50' : 'border-slate-800'} rounded-2xl overflow-hidden`}>
                <div className='p-5 cursor-pointer flex items-center justify-between gap-4' onClick={() => setOpen(!open)}>
                    <div className="flex items-center gap-4 flex-1">
                        <span className={`w-10 h-10 flex items-center justify-center rounded-xl text-xs font-black ${open ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-emerald-500 border border-slate-800'}`}>
                            {index + 1}
                        </span>
                        <p className='text-slate-100 font-bold text-base leading-snug'>{item.question}</p>
                    </div>
                    <ChevronDown size={18} className={`transition-transform duration-300 ${open ? 'rotate-180 text-emerald-500' : 'text-slate-500'}`} />
                </div>
                
                {open && (
                    <div className='px-5 pb-6 pt-2 space-y-4 animate-in fade-in slide-in-from-top-2'>
                        <div className="pl-4 border-l-2 border-emerald-500/30">
                            <span className='text-[10px] font-black uppercase tracking-widest text-emerald-500/80 block mb-1'>Why this matters</span>
                            <p className="text-slate-400 text-sm italic">"{item.intention || "This evaluates your core skills."}"</p>
                        </div>
                        <div className="bg-emerald-500/5 rounded-xl border border-emerald-500/10 p-4">
                            <span className='text-[10px] font-black uppercase tracking-widest text-emerald-400 block mb-2'>Suggested Answer</span>
                            <p className="text-slate-200 text-sm leading-relaxed">{item.answer}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Report = () => {
    const [activeNav, setActiveNav] = useState('technical');
    const { report, getReportById, loading, getResumePdf } = useAnalysis();
    const { interviewId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (interviewId) getReportById(interviewId);
    }, [interviewId, getReportById]);

    if (loading || !report) {
        return (
            <div className='min-h-screen bg-[#0B0F1A] flex flex-col items-center justify-center p-6'>
                <Zap size={40} className="text-emerald-500 animate-pulse" />
                <h1 className="text-sm font-bold mt-6 text-white tracking-widest uppercase">Analyzing Resume...</h1>
            </div>
        );
    }

    const score = report?.matchScore || 0;
    const scoreColor = score >= 80 ? 'text-emerald-500' : score >= 60 ? 'text-amber-400' : 'text-rose-500';

    return (
        <div className='min-h-screen bg-[#0B0F1A] text-slate-300 font-sans pb-10'>
            {/* Header */}
            <header className="border-b border-slate-800/50 p-4 md:p-5 sticky top-0 bg-[#0B0F1A]/90 backdrop-blur-md z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button onClick={() => navigate('/app/reports')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-all">
                        <ArrowLeft size={16} />
                        <span className="font-bold text-[10px] uppercase tracking-wider">Back</span>
                    </button>
                    <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="font-bold text-[9px] text-white uppercase tracking-widest">AI Verified</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr_300px] gap-6 p-4 md:p-8'>
                
                {/* Score */}
                <aside className="lg:hidden">
                    <div className='bg-slate-900/50 border border-slate-800 rounded-3xl p-6 text-center'>
                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest">Match Score</p>
                        <div className={`text-6xl font-black ${scoreColor}`}>{score}</div>
                    </div>
                </aside>

                {/* Navigation */}
                <aside className="lg:sticky lg:top-28 self-start overflow-x-auto">
                    <div className="flex lg:flex-col gap-2 min-w-max lg:min-w-0">
                        {NAV_ITEMS.map(item => (
                            <button key={item.id} onClick={() => setActiveNav(item.id)}
                                className={`flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all ${activeNav === item.id 
                                    ? 'bg-emerald-500 text-white font-bold' 
                                    : 'bg-slate-900/50 text-slate-500 border border-slate-800 hover:border-slate-700'}`}>
                                {item.icon}
                                <span className='text-xs'>{item.label}</span>
                            </button>
                        ))}
                        <button onClick={() => getResumePdf(interviewId)} className="flex lg:hidden items-center gap-3 px-5 py-3.5 rounded-xl bg-slate-800 text-white font-bold">
                            <Download size={18} /> <span className="text-xs">PDF</span>
                        </button>
                    </div>
                </aside>

                {/* Main Section */}
                <main className="min-w-0">
                    <div className="bg-[#0F172A]/40 border border-slate-800 p-6 md:p-8 rounded-[2rem]">
                        <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4 uppercase tracking-tight">
                            {NAV_ITEMS.find(n => n.id === activeNav).label}
                        </h2>
                        <div className="space-y-1">
                            {activeNav === 'technical' && report?.technicalQuestions?.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
                            {activeNav === 'behavioral' && report?.behavioralQuestions?.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
                            {activeNav === 'roadmap' && (
                                <div className="space-y-6">
                                    {report.preparationPlan?.map((day, idx) => (
                                        <div key={idx} className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
                                            <span className='text-emerald-400 text-[10px] font-black uppercase'>Phase {day.day}</span>
                                            <h3 className="text-white font-bold mb-3">{day.focus}</h3>
                                            <ul className="space-y-2">
                                                {day.tasks?.map((t, i) => (
                                                    <li key={i} className="flex gap-2 text-sm text-slate-400"><CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" /> {t}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* Stats (Desktop Only) */}
                <aside className="hidden lg:flex flex-col gap-6 sticky top-28 self-start">
                    <div className='bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 text-center'>
                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-4 tracking-widest">Match Score</p>
                        <div className={`text-7xl font-black ${scoreColor}`}>{score}</div>
                        <div className="mt-6 h-1 bg-slate-950 rounded-full overflow-hidden">
                            <div className={`h-full ${score >= 70 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${score}%` }}></div>
                        </div>
                    </div>

                    <div className='bg-[#0F172A]/30 border border-slate-800 rounded-[2rem] p-6'>
                        <div className="flex items-center gap-2 text-white text-[10px] mb-5 font-bold uppercase tracking-widest">
                            <ShieldAlert size={14} className="text-rose-500" /> Improvement Areas
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            {report.skillsGaps?.map((gap, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-900 border border-slate-800 text-slate-400">
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                        <button onClick={() => getResumePdf(interviewId)} className="w-full mt-6 bg-emerald-500 text-slate-950 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all">
                            Download Resume PDF
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

// YEH LINE ZAROORI HAI ERROR FIX KARNE KE LIYE
export default Report;