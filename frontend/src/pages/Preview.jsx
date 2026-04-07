
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../configs/api' 
import ResumePreview from '../components/ResumePreview'
import Loader from '../components/Loader'
import { ArrowLeftIcon } from 'lucide-react'

const Preview = () => {
  const { resumeId } = useParams() 
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
    <div className='bg-slate-100 min-h-screen'>
      <div className='max-w-3xl mx-auto py-10 shadow-lg'>
        <ResumePreview  
          data={resumeData} 
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes='py-4 bg-white'
        />
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center h-screen'>
      <p className='text-center text-6xl text-slate-400 font-medium'>Resume not found</p>
      <a href="/" className='mt-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6 h-9 flex items-center transition-colors'>
        <ArrowLeftIcon className='mr-2 size-4'/>
        go to home page
      </a>
    </div>
  )
}

export default Preview