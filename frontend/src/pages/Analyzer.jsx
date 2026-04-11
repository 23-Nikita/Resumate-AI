import React, { useState, useRef } from 'react';
import { Sparkles, Upload, FileText, User, Zap, ArrowLeft, CheckCircle2, FileCheck, BrainCircuit } from 'lucide-react';
import { useAnalysis } from '../hooks/useAnalysis';
import { useNavigate } from 'react-router';

const Analyzer = () => {
    const { loading, generateReport } = useAnalysis();
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const resumeInputRef = useRef();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setSelectedFile(file);
    };

    const handleGenerateReport = async () => {
        const resumeFile = selectedFile || resumeInputRef.current.files[0];
        if (!resumeFile || !jobDescription) {
            alert("Please upload a resume and provide a job description.");
            return;
        }
        const data = await generateReport({ jobDescription, selfDescription, resumeFile });
        if (data?._id) navigate(`/app/interview/${data._id}`);
    }

    if (loading) {
        return (
            <main className='min-h-screen bg-[#0B0F1A] flex flex-col items-center justify-center text-white font-sans'>
                <div className='flex flex-col items-center gap-8'>
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500 blur-[80px] animate-pulse rounded-full opacity-20"></div>
                        <BrainCircuit className='relative text-emerald-500 animate-pulse' size={80} />
                    </div>
                    <div className="text-center">
                        <h1 className='text-3xl font-black tracking-tighter'>Analyzing Your DNA...</h1>
                        <p className="text-slate-500 mt-2 font-medium tracking-widest uppercase text-[10px]">AI is scanning skills & matching requirements</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0B0F1A] text-slate-300 p-6 md:p-12 flex flex-col items-center font-sans selection:bg-emerald-500/30">
            
            {/* --- Header Section --- */}
            <div className="w-full max-w-6xl mb-12 flex items-center justify-between">
                <button 
                    onClick={() => navigate('/app')} 
                    className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-all group"
                >
                    <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl group-hover:border-emerald-500/50 transition-all">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">Dashboard</span>
                </button>
                
            </div>

            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4">
                    ResuMate <span className="text-emerald-500">Analyzer</span>
                </h1>
                <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
                    Bridge the gap between your resume and your dream job.
                </p>
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 relative">
                
                {/* --- Left Side: Job Description --- */}
                <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
                    <div className="absolute -right-20 -top-20 size-40 bg-emerald-500/5 blur-[60px] group-hover:bg-emerald-500/10 transition-all"></div>
                    
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-emerald-400 shadow-xl">
                            <FileText size={22} />
                        </div>
                        <h3 className="font-bold text-white text-xl tracking-tight">Job Description</h3>
                    </div>
                    
                    <textarea 
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="w-full h-[450px] bg-slate-950/50 border border-slate-800 rounded-2xl p-6 text-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 focus:outline-none transition-all resize-none font-medium placeholder:text-slate-600"
                        placeholder="Paste the Job Description (JD) here..."
                    ></textarea>
                </div>

                {/* --- Right Side: Resume & Launch --- */}
                <div className="flex flex-col gap-8">
                    
                    {/* Resume Upload */}
                    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-blue-500/30 transition-all duration-500">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-blue-400 shadow-xl">
                                <Upload size={22} />
                            </div>
                            <h3 className="font-bold text-white text-xl tracking-tight">Upload Resume</h3>
                        </div>
                        
                        <div 
                            onClick={() => resumeInputRef.current.click()}
                            className={`relative cursor-pointer border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-500 ${
                                selectedFile ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-800 bg-slate-950/30 hover:border-emerald-500/50'
                            }`}
                        >
                            <input ref={resumeInputRef} type="file" accept='.pdf' className="hidden" onChange={handleFileChange} />
                            
                            <div className={`size-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all ${selectedFile ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-slate-900 text-slate-500'}`}>
                                {selectedFile ? <FileCheck size={28} /> : <Upload size={28} />}
                            </div>
                            
                            <p className="text-sm font-bold text-white mb-1">
                                {selectedFile ? selectedFile.name : "Select PDF Document"}
                            </p>
                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                                {selectedFile ? "File Ready for Scan" : "Drag & Drop Support"}
                            </p>
                        </div>
                    </div>

                    {/* Self Description */}
                    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-amber-500/30 transition-all duration-500">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-amber-400 shadow-xl">
                                <User size={22} />
                            </div>
                            <h3 className="font-bold text-white text-xl tracking-tight">Self Description <span className="text-[10px] text-slate-500 ml-2 font-normal uppercase tracking-widest">(Optional)</span></h3>
                        </div>
                        <textarea 
                            onChange={(e) => setSelfDescription(e.target.value)}
                            className="w-full h-24 bg-slate-950/50 border border-slate-800 rounded-2xl p-5 text-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 focus:outline-none transition-all resize-none font-medium placeholder:text-slate-600"
                            placeholder="Add your core strengths or focus area..."
                        ></textarea>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleGenerateReport}
                        className="group relative w-full py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black text-lg transition-all shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                        <Zap size={22} className="fill-current" />
                        <span className="uppercase tracking-widest">Initiate Analysis</span>
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Analyzer;