// import { ArrowLeft, FilePenIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from "react-redux"
// import toast from 'react-hot-toast';
// import api from "../configs/api";
// import pdfToText from "react-pdftotext";

// const Dashboard = () => {
//     const { user, token } = useSelector(state => state.auth)
//     const colors = ["#10b981", "#059669", "#0284c7", "#d97706", "#4f46e5"]

//     const [allResumes, setAllResumes] = useState([])
//     const [showCreateResume, setShowCreateResume] = useState(false)
//     const [showUploadResume, setShowUploadResume] = useState(false)
//     const [title, setTitle] = useState('')
//     const [resume, setResume] = useState(null)
//     const [editResumeId, setEditResumeId] = useState('')
//     const [isLoading, setIsLoading] = useState(false)

//     const navigate = useNavigate()

//     const loadAllResumes = async () => {
//         try {
//             const { data } = await api.get("/api/users/resumes")
//             setAllResumes(data.resumes)
//         } catch (error) {
//             toast.error(error?.response?.data?.message || error.message)
//         }
//     }

//     const createResume = async (event) => {
//         event.preventDefault()
//         try {
//             const { data } = await api.post("/api/resumes/create", { title })
//             setAllResumes([...allResumes, data.resume])
//             setTitle("")
//             setShowCreateResume(false)
//             navigate(`/app/builder/${data.resume._id}`)
//         } catch (error) {
//             toast.error(error?.response?.data?.message || error.message)
//         }
//     }

//     const uploadResume = async (event) => {
//         event.preventDefault()
//         setIsLoading(true)
//         try {
//             const resumeText = await pdfToText(resume)
//             const { data } = await api.post("/api/ai/upload-resume", { title, resumeText })
//             setTitle("")
//             setResume(null)
//             setShowUploadResume(false)
//             navigate(`/app/builder/${data.resumeId}`)
//         } catch (error) {
//             toast.error(error?.response?.data?.message || error.message)
//         }
//         setIsLoading(false)
//     }

//     const editTitle = async (event) => {
//         event.preventDefault()
//         try {
//             const { data } = await api.put(`/api/resumes/update`, {
//                 resumeId: editResumeId,
//                 resumeData: { title }
//             })
//             setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title } : resume))
//             setTitle("")
//             setEditResumeId("")
//             toast.success(data.message)
//         } catch (error) {
//             toast.error(error?.response?.data?.message || error.message)
//         }
//     }

//     const deleteResume = async (resumeId) => {
//         const confirm = window.confirm('Are you sure you want to delete this resume?')
//         if (confirm) {
//             try {
//                 const { data } = await api.delete(`/api/resumes/delete/${resumeId}`)
//                 setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
//                 toast.success(data.message)
//             } catch (error) {
//                 toast.error(error?.response?.data?.message || error.message)
//             }
//         }
//     }

//     useEffect(() => {
//         loadAllResumes()
//     }, [])

//     return (
//         <div className='min-h-screen bg-white pb-20'>
//             <div className='max-w-7xl mx-auto px-4 py-8'>
//                 <button onClick={() => navigate('/app')} className='flex items-center gap-2 text-slate-500 hover:text-emerald-600 mb-6 transition-colors group'>
//                     <ArrowLeft className='size-4 group-hover:-translate-x-1 transition-transform'/>
//                     <span className='text-sm font-medium'>Back to Features</span>
//                 </button>

//                 <div className='flex justify-between items-center mb-8'>
//                     <div>
//                         <h1 className='text-3xl font-bold text-slate-900'>My Resumes</h1>
//                         <p className='text-slate-500'>Create or edit your professional resumes</p>
//                     </div>
//                 </div>

//                 <div className='flex flex-wrap gap-6'>
//                     <div onClick={() => setShowCreateResume(true)} className='w-full sm:w-[180px] h-60 flex flex-col items-center justify-center rounded-2xl gap-3 text-slate-500 border-2 border-dashed border-slate-200 group hover:border-emerald-500 hover:bg-emerald-50/30 transition-all duration-300 cursor-pointer'>
//                         <div className='p-4 bg-emerald-100 text-emerald-600 rounded-full group-hover:scale-110 transition-transform'>
//                             <PlusIcon className='size-8' />
//                         </div>
//                         <p className='font-semibold group-hover:text-emerald-700'>Create New</p>
//                     </div>

//                     <div onClick={() => setShowUploadResume(true)} className='w-full sm:w-[180px] h-60 flex flex-col items-center justify-center rounded-2xl gap-3 text-slate-500 border-2 border-dashed border-slate-200 group hover:border-blue-500 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer'>
//                         <div className='p-4 bg-blue-100 text-blue-600 rounded-full group-hover:scale-110 transition-transform'>
//                             <UploadCloudIcon className='size-8' />
//                         </div>
//                         <p className='font-semibold group-hover:text-blue-700'>Upload PDF</p>
//                     </div>

//                     {allResumes.map((resume, index) => {
//                         const baseColor = colors[index % colors.length]
//                         return (
//                             <div key={index} onClick={() => navigate(`/app/builder/${resume._id}`)} className='relative w-full sm:w-[180px] h-60 flex flex-col items-center justify-center rounded-2xl gap-3 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white overflow-hidden group'>
//                                 <div className='absolute top-0 left-0 w-full h-1.5' style={{ backgroundColor: baseColor }}></div>
//                                 <div className='p-4 rounded-xl mb-2' style={{ backgroundColor: `${baseColor}15` }}>
//                                     <FilePenIcon className='size-10' style={{ color: baseColor }} />
//                                 </div>
//                                 <p className='font-bold text-slate-800 px-4 text-center line-clamp-2 leading-tight'>{resume.title}</p>
//                                 <p className='text-[11px] font-medium text-slate-400 uppercase tracking-wider'>Updated: {new Date(resume.updatedAt).toLocaleDateString()}</p>
//                                 <div onClick={e => e.stopPropagation()} className='absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
//                                     <button onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} className='p-2 bg-white shadow-md rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'><PencilIcon className='size-4' /></button>
//                                     <button onClick={() => deleteResume(resume._id)} className='p-2 bg-white shadow-md rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50'><TrashIcon className='size-4' /></button>
//                                 </div>
//                             </div>
//                         )
//                     })}
//                 </div>
//             </div>

//             {/* --- MODALS SECTION START --- */}
//             {showCreateResume && (
//                 <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
//                     <div className='bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-300'>
//                         <div className='flex justify-between items-center mb-6'>
//                             <h2 className='text-xl font-bold text-slate-900'>Create New Resume</h2>
//                             <button onClick={() => setShowCreateResume(false)} className='p-2 hover:bg-slate-100 rounded-full transition-colors'><XIcon className='size-5 text-slate-500' /></button>
//                         </div>
//                         <form onSubmit={createResume}>
//                             <div className='mb-6'>
//                                 <label className='block text-sm font-medium text-slate-700 mb-2'>Resume Title</label>
//                                 <input autoFocus type='text' placeholder='e.g. MERN Stack Developer' className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none' value={title} onChange={(e) => setTitle(e.target.value)} required />
//                             </div>
//                             <button type='submit' className='w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl'>Create Resume</button>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {showUploadResume && (
//                 <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
//                     <div className='bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-300'>
//                         <div className='flex justify-between items-center mb-6'>
//                             <h2 className='text-xl font-bold text-slate-900'>Upload Existing Resume</h2>
//                             <button onClick={() => setShowUploadResume(false)} className='p-2 hover:bg-slate-100 rounded-full transition-colors'><XIcon className='size-5 text-slate-500' /></button>
//                         </div>
//                         <form onSubmit={uploadResume}>
//                             <div className='space-y-4'>
//                                 <input type='text' placeholder='Resume Title' className='w-full px-4 py-3 rounded-xl border border-slate-200' value={title} onChange={(e) => setTitle(e.target.value)} required />
//                                 <div className='relative h-32 w-full border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center bg-slate-50/50'>
//                                     <input type='file' accept='.pdf' className='absolute inset-0 w-full h-full opacity-0 cursor-pointer' onChange={(e) => setResume(e.target.files[0])} required />
//                                     <UploadCloud className='size-8 text-slate-400 mb-2' />
//                                     <p className='text-xs text-slate-500'>{resume ? resume.name : "Select PDF File"}</p>
//                                 </div>
//                             </div>
//                             <button disabled={isLoading} type='submit' className='w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex justify-center items-center gap-2'>
//                                 {isLoading ? <LoaderCircleIcon className='animate-spin size-5'/> : 'Upload and Analyze'}
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {editResumeId && (
//                 <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
//                     <div className='bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl'>
//                         <div className='flex justify-between items-center mb-6'>
//                             <h2 className='text-xl font-bold text-slate-900'>Edit Resume Title</h2>
//                             <button onClick={() => setEditResumeId("")} className='p-2 hover:bg-slate-100 rounded-full'><XIcon className='size-5 text-slate-500' /></button>
//                         </div>
//                         <form onSubmit={editTitle}>
//                             <input autoFocus type='text' className='w-full px-4 py-3 rounded-xl border border-slate-200 mb-6' value={title} onChange={(e) => setTitle(e.target.value)} required />
//                             <button type='submit' className='w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl'>Update Title</button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//             {/* --- MODALS SECTION END --- */}
//         </div>
//     )
// }

// export default Dashboard;

import { ArrowLeft, FilePenIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import toast from 'react-hot-toast';
import api from "../configs/api";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
    const { user } = useSelector(state => state.auth)
    const colors = ["#10b981", "#059669", "#0284c7", "#d97706", "#4f46e5"]

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

    // --- FULLY UPDATED UPLOAD LOGIC ---
    const uploadResume = async (event) => {
        event.preventDefault()
        if (!resume) return toast.error("Please select a PDF file first");
        
        setIsLoading(true)
        try {
            // Step 1: PDF se text extract karein
            const resumeText = await pdfToText(resume)
            
            if (!resumeText || resumeText.trim().length === 0) {
                throw new Error("Could not read text from this PDF. It might be a scanned image.");
            }

            // Step 2: Backend ko JSON payload bhejein (Matching your AI Controller)
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
            console.error("Upload error:", error);
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
        <div className='min-h-screen bg-white pb-20'>
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <button onClick={() => navigate('/app')} className='flex items-center gap-2 text-slate-500 hover:text-emerald-600 mb-6 transition-colors group'>
                    <ArrowLeft className='size-4 group-hover:-translate-x-1 transition-transform'/>
                    <span className='text-sm font-medium'>Back to Features</span>
                </button>

                <div className='flex justify-between items-center mb-8'>
                    <div>
                        <h1 className='text-3xl font-bold text-slate-900'>My Resumes</h1>
                        <p className='text-slate-500'>Create or edit your professional resumes</p>
                    </div>
                </div>

                <div className='flex flex-wrap gap-6'>
                    {/* Create New Card */}
                    <div onClick={() => setShowCreateResume(true)} className='w-full sm:w-[180px] h-60 flex flex-col items-center justify-center rounded-2xl gap-3 text-slate-500 border-2 border-dashed border-slate-200 group hover:border-emerald-500 hover:bg-emerald-50/30 transition-all duration-300 cursor-pointer'>
                        <div className='p-4 bg-emerald-100 text-emerald-600 rounded-full group-hover:scale-110 transition-transform'>
                            <PlusIcon className='size-8' />
                        </div>
                        <p className='font-semibold group-hover:text-emerald-700'>Create New</p>
                    </div>

                    {/* Upload PDF Card */}
                    <div onClick={() => setShowUploadResume(true)} className='w-full sm:w-[180px] h-60 flex flex-col items-center justify-center rounded-2xl gap-3 text-slate-500 border-2 border-dashed border-slate-200 group hover:border-blue-500 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer'>
                        <div className='p-4 bg-blue-100 text-blue-600 rounded-full group-hover:scale-110 transition-transform'>
                            <UploadCloudIcon className='size-8' />
                        </div>
                        <p className='font-semibold group-hover:text-blue-700'>Upload PDF</p>
                    </div>

                    {/* List of Resumes */}
                    {allResumes.map((resume, index) => {
                        const baseColor = colors[index % colors.length]
                        return (
                            <div key={resume._id} onClick={() => navigate(`/app/builder/${resume._id}`)} className='relative w-full sm:w-[180px] h-60 flex flex-col items-center justify-center rounded-2xl gap-3 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white overflow-hidden group'>
                                <div className='absolute top-0 left-0 w-full h-1.5' style={{ backgroundColor: baseColor }}></div>
                                <div className='p-4 rounded-xl mb-2' style={{ backgroundColor: `${baseColor}15` }}>
                                    <FilePenIcon className='size-10' style={{ color: baseColor }} />
                                </div>
                                <p className='font-bold text-slate-800 px-4 text-center line-clamp-2 leading-tight'>{resume.title}</p>
                                <p className='text-[11px] font-medium text-slate-400 uppercase tracking-wider'>Updated: {new Date(resume.updatedAt).toLocaleDateString()}</p>
                                <div onClick={e => e.stopPropagation()} className='absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                                    <button onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} className='p-2 bg-white shadow-md rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'><PencilIcon className='size-4' /></button>
                                    <button onClick={() => deleteResume(resume._id)} className='p-2 bg-white shadow-md rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50'><TrashIcon className='size-4' /></button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Modal: Create New */}
            {showCreateResume && (
                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-300'>
                        <div className='flex justify-between items-center mb-6'>
                            <h2 className='text-xl font-bold text-slate-900'>Create New Resume</h2>
                            <button onClick={() => {setShowCreateResume(false); setTitle("")}} className='p-2 hover:bg-slate-100 rounded-full'><XIcon className='size-5 text-slate-500' /></button>
                        </div>
                        <form onSubmit={createResume}>
                            <div className='mb-6'>
                                <label className='block text-sm font-medium text-slate-700 mb-2'>Resume Title</label>
                                <input autoFocus type='text' placeholder='e.g. MERN Stack Developer' className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none' value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>
                            <button type='submit' className='w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl'>Create Resume</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Upload & Analyze */}
            {showUploadResume && (
                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-300'>
                        <div className='flex justify-between items-center mb-6'>
                            <h2 className='text-xl font-bold text-slate-900'>Upload Existing Resume</h2>
                            <button onClick={() => {setShowUploadResume(false); setTitle(""); setResume(null)}} className='p-2 hover:bg-slate-100 rounded-full'><XIcon className='size-5 text-slate-500' /></button>
                        </div>
                        <form onSubmit={uploadResume}>
                            <div className='space-y-4'>
                                <input type='text' placeholder='Resume Title (Optional)' className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none' value={title} onChange={(e) => setTitle(e.target.value)} />
                                <div className='relative h-32 w-full border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors'>
                                    <input type='file' accept='.pdf' className='absolute inset-0 w-full h-full opacity-0 cursor-pointer' onChange={(e) => setResume(e.target.files[0])} required />
                                    <UploadCloud className='size-8 text-slate-400 mb-2' />
                                    <p className='text-xs text-slate-500 font-medium'>{resume ? resume.name : "Click or drag to select PDF"}</p>
                                </div>
                            </div>
                            <button disabled={isLoading} type='submit' className='w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex justify-center items-center gap-2 disabled:opacity-70'>
                                {isLoading ? <LoaderCircleIcon className='animate-spin size-5'/> : <><Sparkles className="size-4" /> Upload and Analyze</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Edit Title */}
            {editResumeId && (
                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl'>
                        <div className='flex justify-between items-center mb-6'>
                            <h2 className='text-xl font-bold text-slate-900'>Edit Resume Title</h2>
                            <button onClick={() => {setEditResumeId(""); setTitle("")}} className='p-2 hover:bg-slate-100 rounded-full'><XIcon className='size-5 text-slate-500' /></button>
                        </div>
                        <form onSubmit={editTitle}>
                            <input autoFocus type='text' className='w-full px-4 py-3 rounded-xl border border-slate-200 mb-6' value={title} onChange={(e) => setTitle(e.target.value)} required />
                            <button type='submit' className='w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl'>Update Title</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

// Sparkles icon import miss thi toh niche add kar di hai
const Sparkles = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
)

export default Dashboard;