
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { 
  ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, 
  DownloadIcon, EyeIcon, EyeOffIcon, FileText, 
  FolderIcon, GraduationCap, Share2Icon, Sparkles, User, Award, Trophy 
} from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EduactionForm from '../components/EduactionForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import CertificationsForm from '../components/CertificationsForm'
import AchievementsForm from '../components/AchievementsForm'

import api from "../configs/api";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const [resumeData, setResumeData] = useState({
    id: '',
    title: '',
    personal_info: {
      github: '',
    },
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    certifications: [],
    achievements: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  })

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "skills", name: "Skills", icon: Sparkles },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "certifications", name: "Certifications", icon: Award },
    { id: "achievements", name: "Achievements", icon: Trophy }
  ]

  const activeSection = sections[activeSectionIndex]

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get("/api/resumes/get/" + resumeId)
      if (data.resume) {
        setResumeData(data.resume)
        document.title = data.resume.title || "Resume Builder";
      }
    } catch (error) {
      console.error(error.message)
      toast.error("Failed to load resume")
    }
  }

  useEffect(() => {
    loadExistingResume()
  }, [resumeId])

  const changeResumeVisibility = async () => {
    try {
      const newStatus = !resumeData.public;
      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify({ public: newStatus }))

      await api.put("/api/resumes/update", formData)
      setResumeData(prev => ({ ...prev, public: newStatus }))
      toast.success(`Resume is now ${newStatus ? 'Public' : 'Private'}`)
    } catch (error) {
      toast.error("Failed to update visibility")
    }
  }

  const handleShare = () => {
    const frontendUrl = window.location.origin;
    const resumeUrl = `${frontendUrl}/view/${resumeId}`;
    
    if (navigator.share) {
      navigator.share({ url: resumeUrl, title: resumeData.title, text: "Check out my resume!" })
    } else {
      navigator.clipboard.writeText(resumeUrl);
      toast.success('Link copied to clipboard!');
    }
  }

  const downloadResume = () => {
    window.print();
  }

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData);

      // Nayi image upload ke liye logic
      if (resumeData.personal_info?.image && typeof resumeData.personal_info.image === "object") {
        delete updatedResumeData.personal_info.image;
      }
      
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));
      
      // Background Removal Logic: Sirf tabhi jayega jab checkbox true ho
      if (removeBackground) {
        formData.append("removeBackground", "true");
      }

      if (resumeData.personal_info?.image && typeof resumeData.personal_info.image === "object") {
        formData.append('image', resumeData.personal_info.image);
      }

      const { data } = await api.put("/api/resumes/update", formData);

      if (data.resume) {
        setResumeData(data.resume);
        // Success ke baad removeBackground ko wapas false kar rahe hain
        setRemoveBackground(false); 
      }
      return data.message || "Saved successfully";
    } catch (error) {
      console.error("Save Error:", error);
      throw error; 
    }
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-6'>
      <div className='mb-4'>
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className='size-4' />Back to Dashboard
        </Link>
      </div>

      <div className='grid lg:grid-cols-12 gap-8'>
        
        {/* Left Panel - Form Sections */}
        <div className='lg:col-span-5'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative overflow-hidden'>
            <div className='absolute top-0 left-0 right-0 h-1 bg-gray-100'>
              <div 
                className='h-full bg-emerald-500 transition-all duration-300'
                style={{ width: `${((activeSectionIndex + 1) * 100) / sections.length}%` }}
              />
            </div>

            <div className='flex justify-between items-center mb-6 pt-2'>
              <div className='flex items-center gap-3'>
                <TemplateSelector 
                  selectedTemplate={resumeData.template}
                  onChange={(template) => setResumeData(prev => ({ ...prev, template }))}
                />
                <ColorPicker 
                  selectedColor={resumeData.accent_color}
                  onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} 
                />
              </div>
              <div className='flex gap-1'>
                <button 
                  disabled={activeSectionIndex === 0}
                  onClick={() => setActiveSectionIndex(prev => prev - 1)}
                  className='p-2 text-gray-400 hover:text-emerald-600 disabled:opacity-30'
                >
                  <ChevronLeft />
                </button>
                <button 
                  disabled={activeSectionIndex === sections.length - 1}
                  onClick={() => setActiveSectionIndex(prev => prev + 1)}
                  className='p-2 text-gray-400 hover:text-emerald-600 disabled:opacity-30'
                >
                  <ChevronRight />
                </button>
              </div>
            </div>

            <div className='min-h-[400px]'>
              <h2 className='text-xl font-bold text-slate-800 mb-4 flex items-center gap-2'>
                <activeSection.icon className='size-5 text-emerald-500' />
                {activeSection.name}
              </h2>
              
              {activeSection.id === 'personal' && (
                <PersonalInfoForm 
                  data={resumeData.personal_info}
                  onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                  removeBackground={removeBackground} 
                  setRemoveBackground={setRemoveBackground} 
                />
              )}
              {activeSection.id === 'summary' && (
                <ProfessionalSummaryForm data={resumeData.professional_summary}
                  onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))}
                  setResumeData={setResumeData} />
              )}
              {activeSection.id === 'skills' && (
                <SkillsForm data={resumeData.skills}
                  onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
              )}
              {activeSection.id === 'projects' && (
                <ProjectForm data={resumeData.project}
                  onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} />
              )}
              {activeSection.id === 'education' && (
                <EduactionForm data={resumeData.education}
                  onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
              )}
              {activeSection.id === 'experience' && (
                <ExperienceForm data={resumeData.experience}
                  onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />
              )}
              {activeSection.id === 'certifications' && (
                <CertificationsForm data={resumeData.certifications}
                  onChange={(data) => setResumeData(prev => ({ ...prev, certifications: data }))} />
              )}
              {activeSection.id === 'achievements' && (
                <AchievementsForm data={resumeData.achievements}
                  onChange={(data) => setResumeData(prev => ({ ...prev, achievements: data }))} />
              )}
            </div>
            
            <button 
              onClick={() => { toast.promise(saveResume(), { loading: "Saving...", success: (msg) => msg, error: "Error saving!" }) }} 
              className='w-full bg-emerald-500 text-white font-bold py-3 rounded-lg mt-8 hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-100'
            >
              Save Progress
            </button>
          </div>
        </div>

        {/* Right Panel - Action Buttons & Preview */}
        <div className="lg:col-span-7">
          <div className='flex flex-wrap items-center justify-end gap-3 mb-6'>
            <button 
              onClick={() => window.open(`/view/${resumeId}`, '_blank')}
              className='flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all shadow-sm'
            >
              <EyeIcon className='size-4' /> Live Preview
            </button>

            {resumeData.public && (
              <button onClick={handleShare} className='flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all'>
                <Share2Icon className='size-4' /> Share
              </button>
            )}
            
            <button onClick={changeResumeVisibility} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${resumeData.public ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-500'}`}>
              {resumeData.public ? <EyeIcon className='size-4' /> : <EyeOffIcon className='size-4' />}
              {resumeData.public ? 'Public' : 'Private'}
            </button>

            <button onClick={downloadResume} className='flex items-center gap-2 px-4 py-2 text-sm font-medium bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all'>
              <DownloadIcon className='size-4' /> Download
            </button>
          </div>

          <div className='bg-white shadow-2xl rounded-xl border border-slate-100 overflow-hidden sticky top-6'>
            <ResumePreview 
              data={resumeData} 
              template={resumeData.template} 
              accentColor={resumeData.accent_color} 
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default ResumeBuilder;