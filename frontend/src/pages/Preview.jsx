import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../configs/api' 
import ResumePreview from '../components/ResumePreview'
import Loader from '../components/Loader'
import { ArrowLeft, Share2, Download, Zap } from 'lucide-react'

const Preview = () => {
  const { resumeId } = useParams() 
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setResumeData] = useState(null)

  const loadResume = async () => {
    try {
      const { data } = await api.get("/api/resumes/public/" + resumeId)
      if (data && data.resume) {
        setResumeData(data.resume)
      }
    } catch (error) {
      console.log("Error loading resume:", error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadResume()
  }, [resumeId]) 

  if (isLoading) return <Loader />

  return resumeData ? (
    <div className='bg-[#0B0F1A] min-h-screen text-slate-300 font-sans selection:bg-emerald-500/30'>
      
      {/* Floating Header for Preview Mode */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-[#0B0F1A]/80 backdrop-blur-xl p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
         <button 
  onClick={() => navigate('/app/builder')} 
  className="flex items-center gap-2 text-slate-400 hover:text-white transition-all group"
>
  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
  <span className="font-bold text-[10px] uppercase tracking-[0.2em]">Exit Preview</span>
</button>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
               <Zap size={14} className="text-emerald-500 fill-emerald-500/20" />
               <span className="font-black text-[9px] text-white uppercase tracking-widest">Public View</span>
            </div>
          </div>
        </div>
      </nav>

      <div className='max-w-4xl mx-auto pt-28 pb-20 px-4'>
        {/* Resume Paper Container */}
        <div className='relative group'>
          {/* Decorative Glow behind the resume */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className='relative bg-white rounded-2xl shadow-2xl overflow-hidden'>
            <ResumePreview  
              data={resumeData} 
              template={resumeData.template}
              accentColor={resumeData.accent_color}
              classes='py-10' // Resume remains white for print compatibility
            />
          </div>
        </div>

        {/* Mobile Download Action Button */}
        <div className="mt-8 flex justify-center lg:hidden">
             <button className="w-full bg-emerald-500 text-slate-950 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20">
                Download PDF
             </button>
        </div>
      </div>
    </div>
  ) : (
    /* 404 State: Clean & Bold */
    <div className='min-h-screen bg-[#0B0F1A] flex flex-col items-center justify-center p-6 text-center'>
      <div className="relative mb-8">
        <div className="absolute inset-0 blur-3xl bg-rose-500/20 animate-pulse"></div>
        <p className='relative text-8xl md:text-9xl font-black text-slate-800 tracking-tighter'>404</p>
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-2">Resume Not Found</h2>
      <p className="text-slate-500 max-w-xs mb-10 text-sm font-medium">The link might be expired or the resume has been set to private.</p>
      
      <button 
        onClick={() => navigate(`/app/builder/${resumeId}`)}
        className='flex items-center gap-3 bg-slate-900 border border-slate-800 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-slate-950 hover:border-emerald-500 transition-all active:scale-95'
      >
        <ArrowLeft size={16} />
        Back 
      </button>
    </div>
  )
}

export default Preview