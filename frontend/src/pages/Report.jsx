// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { 
//     ChevronDown, Terminal, MessageSquare, Map, 
//     Download, ArrowLeft, AlertCircle, Sparkles, CheckCircle2
// } from 'lucide-react';
// import { useAnalysis } from "../hooks/useAnalysis";

// const NAV_ITEMS = [
//     { id: 'technical', label: 'Technical Questions', icon: <Terminal size={18} /> },
//     { id: 'behavioral', label: 'Behavioral Prep', icon: <MessageSquare size={18} /> },
//     { id: 'roadmap', label: 'Study Roadmap', icon: <Map size={18} /> },
// ];

// const QuestionCard = ({ item, index }) => {
//     const [open, setOpen] = useState(false);
//     return (
//         <div className={`bg-white border ${open ? 'border-indigo-500 ring-1 ring-indigo-500/20' : 'border-slate-200'} rounded-2xl mb-4 overflow-hidden transition-all shadow-sm hover:shadow-md`}>
//             <div className='p-6 cursor-pointer flex items-center justify-between' onClick={() => setOpen(!open)}>
//                 <div className="flex items-center gap-4">
//                     <span className='text-indigo-600 font-bold bg-indigo-50 w-10 h-10 flex items-center justify-center rounded-xl text-sm'>Q{index + 1}</span>
//                     <p className='text-slate-800 font-bold tracking-tight'>{item?.question || "Question analysis in progress..."}</p>
//                 </div>
//                 <ChevronDown className={`text-slate-400 transition-transform duration-300 ${open ? 'rotate-180 text-indigo-500' : ''}`} size={20} />
//             </div>
//             {open && (
//                 <div className='p-6 bg-slate-50 border-t border-slate-100 space-y-6 animate-in fade-in slide-in-from-top-2'>
//                     <div>
//                         <span className='text-[10px] font-black uppercase tracking-widest text-indigo-500 block mb-3'>Interviewer's Focus</span>
//                         <div className="bg-white p-4 rounded-xl border border-slate-200 text-slate-600 leading-relaxed text-sm italic shadow-sm">
//                             "{item?.intention || "Exploring candidate's depth in this area."}"
//                         </div>
//                     </div>
//                     <div>
//                         <span className='text-[10px] font-black uppercase tracking-widest text-emerald-600 block mb-3'>Expert Suggested Answer</span>
//                         <div className="text-slate-700 leading-relaxed text-sm bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
//                             {item?.answer || "Structure your answer using the STAR method for best results."}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// const Report = () => {
//     const [activeNav, setActiveNav] = useState('technical');
//     const { report, getReportById, loading ,getResumePdf} = useAnalysis();
//     const { interviewId } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (interviewId) {
//             getReportById(interviewId);
//         }
//     }, [interviewId, getReportById]);
//     console.log("FINAL REPORT DATA:", report);

//     if (loading || !report) {
//         return (
//             <div className='min-h-screen bg-white flex flex-col items-center justify-center'>
//                 <div className="relative">
//                     <Sparkles size={60} className="text-indigo-600 animate-bounce" />
//                     <div className="absolute inset-0 animate-ping rounded-full bg-indigo-100 -z-10"></div>
//                 </div>
//                 <h1 className="text-2xl font-black mt-8 text-slate-800 tracking-tight">Generating Your AI Insights...</h1>
//                 <p className="text-slate-500 mt-2 font-medium">Crunching data for match score and roadmap.</p>
//             </div>
//         );
//     }

//     const score = report?.matchScore || 0;
//     const scoreColor = score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-amber-500' : 'text-rose-600';

//     return (
//         <div className='min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100'>
//             {/* Header */}
//             <header className="border-b border-slate-200 p-5 sticky top-0 bg-white/80 backdrop-blur-xl z-50 no-print">
//                 <div className="max-w-7xl mx-auto flex items-center justify-between">
//                     <button onClick={() => navigate('/app/analyzer')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-all font-bold text-xs uppercase tracking-widest">
//                         <ArrowLeft size={16} strokeWidth={3} />
//                         <span>Back to Portal</span>
//                     </button>
//                     <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
//                             <CheckCircle2 size={22} className="text-white" />
//                         </div>
//                         <span className="font-black text-xl tracking-tighter text-slate-800">ResuMate <span className='text-indigo-600'>AI</span></span>
//                     </div>
//                     <div className="w-[120px]"></div> {/* Spacer for balance */}
//                 </div>
//             </header>

//             <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-8 p-8'>
                
//                 {/* 1. LEFT SIDEBAR (SECTIONS & DOWNLOAD) */}
//                 <aside className="flex flex-col gap-4 sticky top-28 self-start h-[calc(100vh-140px)] no-print">
//                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-2">Sections</p>
                    
//                     <div className="flex-grow space-y-2">
//                         {NAV_ITEMS.map(item => (
//                             <button key={item.id} onClick={() => setActiveNav(item.id)}
//                                 className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${activeNav === item.id 
//                                     ? 'bg-white text-indigo-600 shadow-xl shadow-indigo-100/50 border border-indigo-50 font-black' 
//                                     : 'text-slate-400 hover:bg-slate-100 font-bold hover:text-slate-600'}`}>
//                                 {item.icon} <span className='text-sm'>{item.label}</span>
//                             </button>
//                         ))}
//                     </div>

//                     {/* Image-Style Download Button */}
//                     <div className="pt-6 border-t border-slate-200">
//                         <button 
//                             onClick={()=>{getResumePdf(interviewId)}}
//                             className="w-full bg-rose-500 hover:bg-rose-600 text-white p-5 rounded-[24px] font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-rose-200 active:scale-95 group"
//                         >
//                             <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
//                             <span className='tracking-tight'>Download Resume</span>
//                         </button>
//                     </div>
//                 </aside>

//                 {/* 2. CENTER CONTENT (MAIN) */}
//                 <main className="min-w-0">
//                     <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
//                         <div className='flex items-center justify-between mb-10'>
//                             <h2 className="text-3xl font-black text-slate-800 tracking-tight">
//                                 {NAV_ITEMS.find(n => n.id === activeNav).label}
//                             </h2>
//                             <div className='h-1 w-20 bg-indigo-100 rounded-full'></div>
//                         </div>
                        
//                         <div className="space-y-3">
//                             {activeNav === 'technical' && report.technicalQuestions?.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
//                             {activeNav === 'behavioral' && report.behavioralQuestions?.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
//                             {activeNav === 'roadmap' && (
//                                 <div className="space-y-6">
//                                     {report.preparationPlan?.map((day, idx) => (
//                                         <div key={idx} className="bg-slate-50 border border-slate-100 rounded-[24px] p-6">
//                                             <div className='flex items-center gap-4 mb-4'>
//                                                 <span className='bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-black uppercase'>Day {day.day}</span>
//                                                 <h3 className="text-lg font-black text-slate-800">{day.focus}</h3>
//                                             </div>
//                                             <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                                                 {day.tasks?.map((t, i) => (
//                                                     <li key={i} className="flex items-center gap-3 text-slate-600 text-sm bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
//                                                         <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
//                                                         {t}
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </main>

//                 {/* 3. RIGHT SIDEBAR (STATS) */}
//                 <aside className="space-y-6 sticky top-28 self-start no-print">
//                     <div className='bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm text-center'>
//                         <p className="text-[10px] font-black text-slate-400 uppercase mb-6 tracking-widest">Match Score</p>
//                         <div className={`text-8xl font-black tracking-tighter ${scoreColor} drop-shadow-sm leading-none`}>
//                             {score}<span className="text-2xl ml-1 font-black opacity-50">%</span>
//                         </div>
//                         <div className="w-full bg-slate-100 h-2.5 rounded-full mt-8 overflow-hidden">
//                             <div className={`h-full transition-all duration-1000 ${score >= 70 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${score}%` }}></div>
//                         </div>
//                         <p className="text-[11px] text-slate-400 mt-4 font-black uppercase tracking-wider">ATS Alignment Score</p>
//                     </div>

//                     <div className='bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm'>
//                         <div className="flex items-center gap-2 text-slate-800 text-[10px] mb-6 font-black uppercase tracking-widest">
//                             <AlertCircle size={18} className="text-rose-500" /> Skill Gaps Detected
//                         </div>
//                         <div className='flex flex-wrap gap-2'>
//                             {report.skillsGaps?.map((gap, i) => (
//                                 <div key={i} className={`px-4 py-2 rounded-xl text-xs font-black border transition-all ${
//                                     gap.severity === 'high' 
//                                     ? 'bg-rose-50 border-rose-100 text-rose-600' 
//                                     : 'bg-amber-50 border-amber-100 text-amber-600'
//                                 }`}>
//                                     {gap.skill}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </aside>
//             </div>
//         </div>
//     );
// };

// export default Report;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    ChevronDown, Terminal, MessageSquare, Map, 
    Download, ArrowLeft, AlertCircle, Sparkles, CheckCircle2,
    Target, Lightbulb
} from 'lucide-react';
import { useAnalysis } from "../hooks/useAnalysis";

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: <Terminal size={18} /> },
    { id: 'behavioral', label: 'Behavioral Prep', icon: <MessageSquare size={18} /> },
    { id: 'roadmap', label: 'Study Roadmap', icon: <Map size={18} /> },
];

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false);
    
    // Safety check for malformed data
    if (!item?.question || item.question.toLowerCase().includes("answer:")) return null;

    return (
        <div className={`bg-white border ${open ? 'border-indigo-500 ring-2 ring-indigo-500/10' : 'border-slate-200'} rounded-[24px] mb-5 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md`}>
            <div className='p-6 cursor-pointer flex items-center justify-between gap-4' onClick={() => setOpen(!open)}>
                <div className="flex items-center gap-5 flex-1">
                    <span className='text-indigo-600 font-black bg-indigo-50 min-w-[44px] h-11 flex items-center justify-center rounded-2xl text-sm'>Q{index + 1}</span>
                    <p className='text-slate-800 font-bold text-[15px] leading-tight tracking-tight'>{item.question}</p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${open ? 'bg-indigo-500 text-white rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                    <ChevronDown size={18} />
                </div>
            </div>
            
            {open && (
                <div className='px-6 pb-6 pt-2 space-y-5 animate-in slide-in-from-top-2 duration-300'>
                    {/* Interviewer's Intention */}
                    <div className="group">
                        <div className='flex items-center gap-2 mb-2'>
                            <Target size={14} className="text-indigo-500" />
                            <span className='text-[10px] font-black uppercase tracking-[0.15em] text-indigo-500'>Interviewer's Focus</span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-600 text-sm italic leading-relaxed">
                            "{item.intention || "This evaluates your core understanding of the topic and practical implementation."}"
                        </div>
                    </div>
                    
                    {/* Expert Suggested Answer */}
                    <div>
                        <div className='flex items-center gap-2 mb-2'>
                            <Lightbulb size={14} className="text-emerald-500" />
                            <span className='text-[10px] font-black uppercase tracking-[0.15em] text-emerald-600'>Expert Suggested Answer</span>
                        </div>
                        <div className="text-slate-700 text-sm leading-relaxed bg-emerald-50/30 p-5 rounded-2xl border border-emerald-100/50 shadow-inner">
                            {item.answer || "Detail your experience with MERN stack, focusing on state management and API efficiency."}
                        </div>
                    </div>
                </div>
            )}
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
            <div className='min-h-screen bg-white flex flex-col items-center justify-center'>
                <div className="relative">
                    <Sparkles size={60} className="text-indigo-600 animate-pulse" />
                    <div className="absolute inset-0 animate-ping rounded-full bg-indigo-100 -z-10 opacity-20"></div>
                </div>
                <h1 className="text-2xl font-black mt-8 text-slate-800 tracking-tight">Crafting Your Analysis...</h1>
                <p className="text-slate-400 mt-2 font-medium">Matching your skills with industry standards.</p>
            </div>
        );
    }

    // CLEANING DATA FOR PROPER UI
    const cleanTechnical = report?.technicalQuestions?.filter(q => q.question && q.question.length > 10) || [];
    const cleanBehavioral = report?.behavioralQuestions?.filter(q => q.question && q.question.length > 10) || [];
    const score = report?.matchScore || 0;
    const scoreColor = score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-amber-500' : 'text-rose-600';

    return (
        <div className='min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100'>
            {/* Sticky Header */}
            <header className="border-b border-slate-200 p-5 sticky top-0 bg-white/90 backdrop-blur-xl z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button onClick={() => navigate('/app/analyzer')} className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all font-black text-[10px] uppercase tracking-widest">
                        <ArrowLeft size={16} strokeWidth={3} />
                        <span>Back to Dashboard</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                            <CheckCircle2 size={22} className="text-white" />
                        </div>
                        <span className="font-black text-xl tracking-tighter text-slate-800">ResuMate <span className='text-indigo-600'>AI</span></span>
                    </div>
                    <div className="w-[120px]"></div>
                </div>
            </header>

            <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-8 p-8'>
                
                {/* Left Navigation */}
                <aside className="space-y-2 sticky top-28 self-start">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-4">Focus Areas</p>
                    {NAV_ITEMS.map(item => (
                        <button key={item.id} onClick={() => setActiveNav(item.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${activeNav === item.id 
                                ? 'bg-white text-indigo-600 shadow-xl shadow-indigo-100/50 border border-indigo-50 font-black scale-105' 
                                : 'text-slate-400 hover:bg-slate-100 font-bold hover:text-slate-600'}`}>
                            {item.icon} <span className='text-sm'>{item.label}</span>
                        </button>
                    ))}
                    <div className="pt-6 mt-4 border-t border-slate-200">
                        <button onClick={() => getResumePdf(interviewId)} className="w-full bg-rose-500 hover:bg-rose-600 text-white p-5 rounded-[24px] font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-rose-200 active:scale-95 group">
                            <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                            <span className='text-sm'>Get Resume PDF</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="min-w-0">
                    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 min-h-[700px]">
                        <div className='flex items-center justify-between mb-10'>
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                                {NAV_ITEMS.find(n => n.id === activeNav).label}
                            </h2>
                            <div className='h-1.5 w-16 bg-indigo-600 rounded-full'></div>
                        </div>
                        
                        <div className="space-y-2">
                            {activeNav === 'technical' && cleanTechnical.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
                            {activeNav === 'behavioral' && cleanBehavioral.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
                            
                            {activeNav === 'roadmap' && (
                                <div className="space-y-0 ml-6">
                                    {report.preparationPlan?.map((day, idx) => (
                                        <div key={idx} className="relative pl-10 pb-12 border-l-2 border-dashed border-slate-200 last:border-0">
                                            {/* Sheryians Style Timeline Dot */}
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-indigo-600 shadow-sm z-10"></div>
                                            
                                            <div className="bg-slate-50 border border-slate-100 rounded-[32px] p-8 hover:shadow-lg transition-all duration-300">
                                                <div className='flex items-center gap-4 mb-6'>
                                                    <span className='bg-indigo-600 text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider'>Phase {day.day}</span>
                                                    <h3 className="text-xl font-black text-slate-800">{day.focus}</h3>
                                                </div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {day.tasks?.map((t, i) => (
                                                        <div key={i} className="flex items-center gap-4 text-slate-600 text-sm bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group hover:border-indigo-200 transition-colors">
                                                            <div className="w-2 h-2 rounded-full bg-indigo-400 group-hover:scale-125 transition-transform"></div>
                                                            <span className='font-medium'>{t}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* Right Sidebar Stats */}
                <aside className="space-y-6 sticky top-28 self-start">
                    <div className='bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm text-center transform hover:scale-[1.02] transition-transform'>
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-6 tracking-widest">ATS Match Score</p>
                        <div className={`text-8xl font-black tracking-tighter ${scoreColor} leading-none`}>
                            {score}<span className="text-2xl ml-1 opacity-40">%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full mt-10 overflow-hidden border border-slate-50">
                            <div className={`h-full transition-all duration-1000 ease-out ${score >= 70 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${score}%` }}></div>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-5 font-bold uppercase tracking-wider">Based on Profile Analysis</p>
                    </div>

                    <div className='bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm'>
                        <div className="flex items-center gap-3 text-slate-800 text-[10px] mb-6 font-black uppercase tracking-widest">
                            <AlertCircle size={18} className="text-rose-500" /> Improvement Areas
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            {report.skillsGaps?.map((gap, i) => (
                                <div key={i} className={`px-4 py-2 rounded-xl text-[11px] font-black border ${
                                    gap.severity === 'high' 
                                    ? 'bg-rose-50 border-rose-100 text-rose-600' 
                                    : 'bg-amber-50 border-amber-100 text-amber-600'
                                }`}>
                                    {gap.skill}
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Report;