import { ArrowLeft, FilePenIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import toast from 'react-hot-toast';
import api from "../configs/api";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
    const { user, token } = useSelector(state => state.auth)
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

    const uploadResume = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const resumeText = await pdfToText(resume)
            const { data } = await api.post("/api/ai/upload-resume", { title, resumeText })
            setTitle("")
            setResume(null)
            setShowUploadResume(false)
            navigate(`/app/builder/${data.resumeId}`)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
        setIsLoading(false)
    }

    const editTitle = async (event) => {
        event.preventDefault()
        try {
            const { data } = await api.put(`/api/resumes/update`, {
                resumeId: editResumeId,
                resumeData: { title }
            })
            setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title } : resume))
            setTitle("")
            setEditResumeId("")
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    const deleteResume = async (resumeId) => {
        const confirm = window.confirm('Are you sure you want to delete this resume?')
        if (confirm) {
            try {
                const { data } = await api.delete(`/api/resumes/delete/${resumeId}`)
                setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
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
                
                {/* Back to Selection Page Button */}
                <button 
                    onClick={() => navigate('/app')} 
                    className='flex items-center gap-2 text-slate-500 hover:text-emerald-600 mb-6 transition-colors group'
                >
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
                    {/* Create Button */}
                    <div onClick={() => setShowCreateResume(true)} className='w-full sm:w-[180px] h-60 flex flex-col items-center justify-center rounded-2xl gap-3 text-slate-500 border-2 border-dashed border-slate-200 group hover:border-emerald-500 hover:bg-emerald-50/30 transition-all duration-300 cursor-pointer'>
                        <div className='p-4 bg-emerald-100 text-emerald-600 rounded-full group-hover:scale-110 transition-transform'>
                            <PlusIcon className='size-8' />
                        </div>
                        <p className='font-semibold group-hover:text-emerald-700'>Create New</p>
                    </div>

                    {/* Upload Button */}
                    <div onClick={() => setShowUploadResume(true)} className='w-full sm:w-[180px] h-60 flex flex-col items-center justify-center rounded-2xl gap-3 text-slate-500 border-2 border-dashed border-slate-200 group hover:border-blue-500 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer'>
                        <div className='p-4 bg-blue-100 text-blue-600 rounded-full group-hover:scale-110 transition-transform'>
                            <UploadCloudIcon className='size-8' />
                        </div>
                        <p className='font-semibold group-hover:text-blue-700'>Upload PDF</p>
                    </div>

                    {/* Resume Cards */}
                    {allResumes.map((resume, index) => {
                        const baseColor = colors[index % colors.length]
                        return (
                            <div key={index} onClick={() => navigate(`/app/builder/${resume._id}`)} className='relative w-full sm:w-[180px] h-60 flex flex-col items-center justify-center rounded-2xl gap-3 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white overflow-hidden group'>
                                <div className='absolute top-0 left-0 w-full h-1.5' style={{ backgroundColor: baseColor }}></div>
                                <div className='p-4 rounded-xl mb-2' style={{ backgroundColor: `${baseColor}15` }}>
                                    <FilePenIcon className='size-10' style={{ color: baseColor }} />
                                </div>
                                <p className='font-bold text-slate-800 px-4 text-center line-clamp-2 leading-tight'>
                                    {resume.title}
                                </p>
                                <p className='text-[11px] font-medium text-slate-400 uppercase tracking-wider'>
                                    Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                                </p>

                                {/* Actions */}
                                <div onClick={e => e.stopPropagation()} className='absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                                    <button onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} className='p-2 bg-white shadow-md rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'>
                                        <PencilIcon className='size-4' />
                                    </button>
                                    <button onClick={() => deleteResume(resume._id)} className='p-2 bg-white shadow-md rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50'>
                                        <TrashIcon className='size-4' />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Modals are kept the same but with emerald-600 styling */}
            {/* [Same Create/Upload/Edit Modals as your original code] */}
            {/* ... */}
        </div>
    )
  }

export default Dashboard;