import React, { useState, useRef } from 'react';
import { Sparkles, Upload, FileText, User, Zap, ArrowLeft, CheckCircle2, FileCheck } from 'lucide-react';
import { useAnalysis } from '../hooks/useAnalysis';
import { useNavigate } from 'react-router';

const Analyzer = () => {
    const { loading, generateReport, reports } = useAnalysis();
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null); // File selection state
    const resumeInputRef = useRef();
    const navigate = useNavigate();

    // Handle file selection logic
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleGenerateReport = async () => {
        const resumeFile = selectedFile || resumeInputRef.current.files[0];
        
        if (!resumeFile || !jobDescription) {
            alert("Please upload a resume and provide a job description.");
            return;
        }

        const data = await generateReport({ jobDescription, selfDescription, resumeFile });
        if (data?._id) {
            navigate(`/app/interview/${data._id}`);
        }
    }

    if (loading) {
        return (
            <main className='min-h-screen bg-white flex flex-col items-center justify-center text-slate-800 font-poppins'>
                <div className='flex flex-col items-center gap-6'>
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-200 blur-2xl animate-pulse rounded-full"></div>
                        <Zap className='relative text-emerald-600 animate-bounce' size={64} fill="currentColor" />
                    </div>
                    <div className="text-center">
                        <h1 className='text-2xl font-bold text-slate-900'>Analyzing your Resume...</h1>
                        <p className="text-slate-500 mt-2">AI is matching your profile with the job description.</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#fcfdfd] text-slate-800 p-6 md:p-12 flex flex-col items-center font-poppins relative">
            
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-emerald-50/50 to-transparent -z-10"></div>

            <div className="w-full max-w-6xl mb-10">
                <button 
                    onClick={() => navigate('/app')} 
                    className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-all group"
                >
                    <div className="p-2 bg-white border border-slate-200 rounded-xl shadow-sm group-hover:border-emerald-200 group-hover:bg-emerald-50 transition-all">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="text-sm font-semibold">Back to Dashboard</span>
                </button>
            </div>

            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4">
                    <Sparkles size={14} className="fill-emerald-500" />
                    <span>AI-Powered Analysis</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                    ResuMate <span className="text-emerald-600">AI</span>
                </h1>
                <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto font-medium">
                    Analyze your resume against any job description in seconds.
                </p>
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                {/* Left Side: Job Description */}
                <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-emerald-100/20 transition-all group">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                            <FileText size={22} />
                        </div>
                        <label htmlFor="jobDescription" className="font-bold text-slate-800 text-lg">Target Job Description</label>
                    </div>
                    <textarea 
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="w-full h-[400px] bg-slate-50 border border-slate-200 rounded-2xl p-5 text-slate-700 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:outline-none transition-all resize-none font-medium placeholder:text-slate-400"
                        placeholder="Paste the Job Description (JD) here..."
                    ></textarea>
                </div>

                {/* Right Side: Resume & Self Desc */}
                <div className="flex flex-col gap-8">
                    {/* Updated Upload Box */}
                    <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                <Upload size={22} />
                            </div>
                            <span className="font-bold text-slate-800 text-lg">Upload Your Resume</span>
                        </div>
                        <div 
                            onClick={() => resumeInputRef.current.click()}
                            className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
                                selectedFile ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 hover:bg-emerald-50/30 hover:border-emerald-500'
                            }`}
                        >
                            <input 
                                ref={resumeInputRef} 
                                type="file" 
                                accept='.pdf' 
                                className="hidden" 
                                onChange={handleFileChange}
                            />
                            <div className="size-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                {selectedFile ? <FileCheck className="text-emerald-600" size={28} /> : <Upload className="text-emerald-600" size={28} />}
                            </div>
                            <p className="text-sm font-bold text-slate-700">
                                {selectedFile ? selectedFile.name : "Click to browse or drag & drop"}
                            </p>
                            <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">
                                {selectedFile ? "File Selected" : "Only PDF files supported"}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                                <User size={22} />
                            </div>
                            <label className="font-bold text-slate-800 text-lg">Self Description (Optional)</label>
                        </div>
                        <textarea 
                            onChange={(e) => setSelfDescription(e.target.value)}
                            className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl p-5 text-slate-700 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:outline-none transition-all resize-none font-medium placeholder:text-slate-400"
                            placeholder="Briefly describe your core strengths..."
                        ></textarea>
                    </div>

                    <button
                        onClick={handleGenerateReport}
                        className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] font-bold text-xl hover:shadow-2xl hover:shadow-emerald-200 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-100"
                    >
                        <Zap size={22} fill="currentColor" />
                        Generate Analysis Report
                    </button>
                </div>
            </div>

            {/* Recent Reports Section */}
            {reports && reports.length > 0 && (
                <div className="w-full max-w-6xl mt-24 pb-20">
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                            <CheckCircle2 size={28} className="text-emerald-500" /> Recent Analyses
                        </h2>
                        <div className="h-[2px] flex-1 bg-gradient-to-r from-slate-100 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reports.map((report) => (
                            <div 
                                key={report._id} 
                                onClick={() => navigate(`/app/interview/${report._id}`)}
                                className="bg-white border border-slate-100 p-6 rounded-[2rem] hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/50 cursor-pointer transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/50 rounded-bl-[4rem] -z-10 group-hover:bg-emerald-100 transition-colors"></div>
                                
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                                        <Zap size={20} fill="currentColor" />
                                    </div>
                                    <span className="text-sm font-black text-emerald-700 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200">
                                        {report.matchScore}% Match
                                    </span>
                                </div>
                                
                                <h3 className="font-bold text-slate-800 text-lg line-clamp-1 group-hover:text-emerald-700 mb-1 transition-colors">
                                    {report.jobTitle || "Full Stack Developer"}
                                </h3>
                                <p className="text-[11px] text-slate-400 uppercase font-bold tracking-tighter mb-6">
                                    {new Date(report.createdAt).toLocaleDateString()}
                                </p>

                                <div className="flex items-center justify-between text-sm text-emerald-600 font-bold group-hover:gap-2 transition-all">
                                    <span>View Full Report</span>
                                    <ArrowLeft size={18} className="rotate-180" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}

export default Analyzer;