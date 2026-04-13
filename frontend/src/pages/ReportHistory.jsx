import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnalysis } from '../hooks/useAnalysis'
import { Zap, ArrowLeft, CheckCircle2, Search, Loader2, Trash2, Calendar, FileText } from 'lucide-react'

const ReportsHistory = () => {
    const { reports, loading, getReports, deleteReport } = useAnalysis()
    const navigate = useNavigate()
    const [search, setSearch] = useState("")

    useEffect(() => {
        getReports()
    }, [])

    const renderTitle = (report) => {
        return  "Resume Analysis";
        
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        const confirmDelete = window.confirm("Delete this report?")
        if (!confirmDelete) return
        await deleteReport(id)
    }

    const filteredReports = reports?.filter((report) => {
        const displayTitle = renderTitle(report);
        return displayTitle.toLowerCase().includes(search.toLowerCase())
    })

    return (
        <main className="min-h-screen bg-[#0B0F1A] text-slate-300 p-6 md:p-12 flex flex-col items-center font-sans selection:bg-emerald-500/30">
            
            {/* Header Section */}
            <div className="w-full max-w-6xl flex justify-between items-center mb-16 relative">
                 <button 
                    onClick={() => navigate('/app')} 
                    className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-all group"
                >
                    <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl group-hover:border-emerald-500/50 transition-all">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">Dashboard</span>
                </button>

                <div className="flex items-center gap-3 px-5 py-3 bg-slate-900/50 border border-slate-800 rounded-2xl focus-within:border-emerald-500/50 transition-all z-20">
                    <Search size={18} className="text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search archives..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent outline-none text-sm w-48 text-white placeholder:text-slate-600 font-medium"
                    />
                </div>
            </div>

            {/* Title Section */}
            <div className="w-full max-w-6xl mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    <CheckCircle2 size={12} />
                    <span>Intelligence Archive</span>
                </div>
                <h1 className="text-5xl font-black text-white tracking-tighter">
                    Analysis <span className="text-emerald-500">History</span>
                </h1>
                <p className="text-slate-500 mt-4 text-lg font-medium">Access and manage your previous resume intelligence reports.</p>
            </div>

            {/* Grid Section with Fix */}
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                {loading ? (
                    <div className="col-span-full flex flex-col items-center py-20">
                        <Loader2 className="animate-spin text-emerald-500 mb-6" size={48} />
                        <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Accessing Database...</p>
                    </div>
                ) : filteredReports && filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                        <div 
                            key={report._id}
                            onClick={() => navigate(`/app/interview/${report._id}`)}
                            className="group bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-emerald-500/30 hover:bg-slate-900/60 cursor-pointer transition-all duration-500 relative overflow-hidden"
                        >
                            {/* Decorative Glow */}
                            <div className="absolute -right-10 -top-10 size-32 bg-emerald-500/5 blur-[50px] group-hover:bg-emerald-500/10 transition-all"></div>

                            {/* --- FIX: Repositioned Delete Button & Hierarchy --- */}
                            <button
                                onClick={(e) => handleDelete(e, report._id)}
                                className="absolute top-6 right-6 text-slate-600 hover:text-rose-500 hover:scale-110 p-2 z-20 transition-all duration-300 bg-slate-950/50 rounded-lg"
                                title="Delete report"
                            >
                                <Trash2 size={18}/>
                            </button>

                            {/* --- FIX: Added specific Padding-Right (pr-20) to Title section --- */}
                            <div className="flex justify-between items-start mb-8 pr-16 relative z-10">
                                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-emerald-400 shadow-xl group-hover:text-emerald-300 transition-colors">
                                    <FileText size={24} />
                                </div>
                                
                                <div className="flex flex-col items-end">
                                    <span className="text-xl font-black text-white leading-none">
                                        {report.matchScore}<span className="text-[10px] text-emerald-500 ml-0.5">%</span>
                                    </span>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 mt-1">Match Score</span>
                                </div>
                            </div>

                            {/* DYNAMIC TITLE DISPLAY */}
                            <h3 className="font-bold text-white text-xl mb-2 pr-4 truncate tracking-tight">      
                                {renderTitle(report)}
                            </h3>

                            <div className="flex items-center gap-2 text-slate-500 mb-8 font-medium">
                                <Calendar size={14} />
                                <span className="text-xs uppercase tracking-tighter">
                                    {new Date(report.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-800/50 relative z-10">
                                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-500 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                                    Open Report
                                </span>
                                <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]">
                                    <Zap size={14} fill="currentColor" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-32 text-center bg-slate-900/20 rounded-[3rem] border border-dashed border-slate-800">
                        <p className="text-slate-600 font-bold tracking-widest uppercase text-sm">No Analysis Reports Found</p>
                    </div>
                )}
            </div>
        </main>
    )
}

export default ReportsHistory;