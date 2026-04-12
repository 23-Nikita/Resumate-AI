import { ArrowLeft, FilePenIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon, Sparkles } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import toast from 'react-hot-toast';
import api from "../configs/api";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
    const { user } = useSelector(state => state.auth)
    // Dark theme optimized colors
    const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ec4899"]

    const [allResumes, setAllResumes] = useState([])
    const [showCreateResume, setShowCreateResume] = useState(false)
    const [showUploadResume, setShowUploadResume] = useState(false)
    const [title, setTitle] = useState('')
    const [resume, setResume] = useState(null)
    const [editResumeId, setEditResumeId] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const loadAllResumes = async () => {
        try {
            const { data } = await api.get("/api/users/resumes")
            setAllResumes(data.resumes)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    const createResume = async (event) => {
        event.preventDefault()
        try {
            const { data } = await api.post("/api/resumes/create", { title })
            setAllResumes([...allResumes, data.resume])
            setTitle("")
            setShowCreateResume(false)
            navigate(`/app/builder/${data.resume._id}`)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    const uploadResume = async (event) => {
        event.preventDefault()
        if (!resume) return toast.error("Please select a PDF file first");
        
        setIsLoading(true)
        try {
            const resumeText = await pdfToText(resume)
            if (!resumeText || resumeText.trim().length === 0) {
                throw new Error("Could not read text from this PDF.");
            }
            const { data } = await api.post("/api/ai/upload-resume", { 
                title: title || "AI Analyzed Resume", 
                resumeText 
            })
            setTitle("")
            setResume(null)
            setShowUploadResume(false)
            toast.success("Resume analyzed and created!")
            navigate(`/app/builder/${data.resumeId}`)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Failed to analyze resume");
        } finally {
            setIsLoading(false)
        }
    }

    const editTitle = async (event) => {
        event.preventDefault()
        try {
            const { data } = await api.put(`/api/resumes/update`, {
                resumeId: editResumeId,
                resumeData: { title }
            })
            setAllResumes(allResumes.map(r => r._id === editResumeId ? { ...r, title } : r))
            setTitle("")
            setEditResumeId("")
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    const deleteResume = async (resumeId) => {
        if (window.confirm('Are you sure you want to delete this resume?')) {
            try {
                const { data } = await api.delete(`/api/resumes/delete/${resumeId}`)
                setAllResumes(allResumes.filter(r => r._id !== resumeId))
                toast.success(data.message)
            } catch (error) {
                toast.error(error?.response?.data?.message || error.message)
            }
        }
    }

    useEffect(() => {
        loadAllResumes()
    }, [])

    return (
        <div className='min-h-screen bg-[#020617] pb-20 font-poppins text-slate-300 relative overflow-hidden'>
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
            
            <div className='max-w-7xl mx-auto px-6 py-10 relative z-10'>
                {/* Back Button */}
                <button onClick={() => navigate('/app')} className='flex items-center gap-2 text-slate-500 hover:text-emerald-500 mb-10 transition-all group'>
                    <ArrowLeft className='size-4 group-hover:-translate-x-1 transition-transform'/>
                    <span className='text-xs font-black uppercase tracking-widest'>Back to Features</span>
                </button>

                {/* Header Section */}
                <div className='flex justify-between items-center mb-12'>
                    <div>
                        <h1 className='text-4xl font-black text-white tracking-tighter uppercase'>
                            My <span className='text-emerald-500'>Resumes</span>
                        </h1>
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'>
                    
                    {/* Action Card: Create New */}
                    <div onClick={() => setShowCreateResume(true)} 
                        className='h-72 flex flex-col items-center justify-center rounded-[2rem] gap-4 bg-slate-900/40 border-2 border-dashed border-slate-800 group hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-500 cursor-pointer shadow-xl'>
                        <div className='p-5 bg-emerald-500/10 text-emerald-500 rounded-2xl group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-500'>
                            <PlusIcon className='size-8' />
                        </div>
                        <p className='font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 group-hover:text-emerald-500'>Create New</p>
                    </div>

                    {/* Action Card: Upload PDF */}
                    <div onClick={() => setShowUploadResume(true)} 
                        className='h-72 flex flex-col items-center justify-center rounded-[2rem] gap-4 bg-slate-900/40 border-2 border-dashed border-slate-800 group hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-500 cursor-pointer shadow-xl'>
                        <div className='p-5 bg-blue-500/10 text-blue-400 rounded-2xl group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-slate-950 transition-all duration-500'>
                            <UploadCloudIcon className='size-8' />
                        </div>
                        <p className='font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-400'>Upload PDF</p>
                    </div>

                    {/* Resume List Cards */}
                    {allResumes.map((resume, index) => {
                        const baseColor = colors[index % colors.length]
                        return (
                            <div key={resume._id} onClick={() => navigate(`/app/builder/${resume._id}`)} 
                                className='relative h-72 flex flex-col items-center justify-center rounded-[2rem] gap-4 border border-slate-800/60 shadow-2xl hover:border-emerald-500/30 hover:-translate-y-2 transition-all duration-500 cursor-pointer bg-slate-900/30 backdrop-blur-md overflow-hidden group'>
                                
                                <div className='absolute top-0 left-0 w-full h-1' style={{ backgroundColor: baseColor }}></div>
                                
                                <div className='p-6 rounded-2xl mb-2 transition-transform group-hover:scale-110' style={{ backgroundColor: `${baseColor}10` }}>
                                    <FilePenIcon className='size-10' style={{ color: baseColor }} />
                                </div>
                                
                                <div className='text-center px-6'>
                                    <p className='font-black text-white text-sm uppercase tracking-tight line-clamp-2 mb-1'>{resume.title}</p>
                                    <p className='text-[9px] font-bold text-slate-500 uppercase tracking-widest'>
                                        Updated {new Date(resume.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* Floating Actions */}
                                <div onClick={e => e.stopPropagation()} className='absolute bottom-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0'>
                                    <button onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} className='p-2.5 bg-slate-800 text-slate-400 hover:text-emerald-500 rounded-xl border border-slate-700 transition-colors'><PencilIcon className='size-4' /></button>
                                    <button onClick={() => deleteResume(resume._id)} className='p-2.5 bg-slate-800 text-slate-400 hover:text-red-500 rounded-xl border border-slate-700 transition-colors'><TrashIcon className='size-4' /></button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* --- MODALS (Dark Themed) --- */}
            
            {/* Modal: Create/Edit/Upload Container (Logic merged for brevity) */}
            {(showCreateResume || showUploadResume || editResumeId) && (
                <div className='fixed inset-0 bg-[#020617]/90 backdrop-blur-xl flex items-center justify-center z-[1000] p-4'>
                    <div className='bg-[#0B0F1A] border border-slate-800 rounded-[2.5rem] w-full max-w-md p-10 shadow-3xl relative overflow-hidden'>
                        
                        <button onClick={() => {setShowCreateResume(false); setShowUploadResume(false); setEditResumeId(""); setTitle(""); setResume(null)}} 
                            className='absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors'>
                            <XIcon className='size-5 text-slate-500' />
                        </button>

                        <h2 className='text-2xl font-black text-white uppercase tracking-tighter mb-8'>
                            {showCreateResume ? "Crearte Resume" : showUploadResume ? "Upload Resume" : "Rename Archive"}
                        </h2>

                        <form onSubmit={showCreateResume ? createResume : showUploadResume ? uploadResume : editTitle} className='space-y-6'>
                            <div className='space-y-2'>
                                <label className='text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1'>Archive Title</label>
                                <input autoFocus type='text' placeholder='e.g. SENIOR DEVELOPER' 
                                    className='w-full bg-slate-950/50 border border-slate-800 px-5 py-4 rounded-2xl text-white font-bold focus:border-emerald-500 outline-none transition-all placeholder:text-slate-700' 
                                    value={title} onChange={(e) => setTitle(e.target.value)} required={!showUploadResume} />
                            </div>

                            {showUploadResume && (
                                <div className='relative h-40 w-full border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center bg-slate-950/30 hover:bg-emerald-500/5 hover:border-emerald-500/50 transition-all group'>
                                    <input type='file' accept='.pdf' className='absolute inset-0 w-full h-full opacity-0 cursor-pointer' onChange={(e) => setResume(e.target.files[0])} required />
                                    <UploadCloud className='size-10 text-slate-600 mb-3 group-hover:text-emerald-500 transition-colors' />
                                    <p className='text-[10px] text-slate-500 font-black uppercase tracking-widest px-4 text-center'>{resume ? resume.name : "Select PDF for Analysis"}</p>
                                </div>
                            )}

                            <button disabled={isLoading} type='submit' 
                                className={`w-full py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex justify-center items-center gap-3 transition-all active:scale-95 shadow-lg
                                ${showUploadResume ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20' : 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20 text-slate-950'}`}>
                                {isLoading ? <LoaderCircleIcon className='animate-spin size-5'/> : 
                                    <>
                                        {showUploadResume && <Sparkles className="size-4" />}
                                        {showCreateResume ? "Create Resume" : showUploadResume ? "  Upload Resume" : "Save Changes"}
                                    </>
                                }
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard;