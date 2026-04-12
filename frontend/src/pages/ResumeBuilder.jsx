

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { 
  ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, 
  DownloadIcon, EyeIcon, EyeOffIcon, FileText, 
  FolderIcon, GraduationCap, Share2Icon, Sparkles, User, Award, Trophy,
  Rocket, Save
} from 'lucide-react'
// Form Imports... (same as before)
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
    personal_info: { github: '' },
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    certifications: [],
    achievements: [],
    template: "classic",
    accent_color: "#10B981", 
    public: false,
  })

  const sections = [
    { id: "personal", name: "Personal", icon: User },
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
      toast.error("Failed to load resume")
    }
  }

  useEffect(() => { loadExistingResume() }, [resumeId])

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData);
      if (resumeData.personal_info?.image && typeof resumeData.personal_info.image === "object") {
        delete updatedResumeData.personal_info.image;
      }
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));
      if (removeBackground) formData.append("removeBackground", "true");
      if (resumeData.personal_info?.image && typeof resumeData.personal_info.image === "object") {
        formData.append('image', resumeData.personal_info.image);
      }
      const { data } = await api.put("/api/resumes/update", formData);
      if (data.resume) {
        setResumeData(data.resume);
        setRemoveBackground(false); 
      }
      return data.message || "Saved successfully";
    } catch (error) { throw error; }
  }

  const changeResumeVisibility = async () => {
    try {
      const newStatus = !resumeData.public;
      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify({ public: newStatus }))
      await api.put("/api/resumes/update", formData)
      setResumeData(prev => ({ ...prev, public: newStatus }))
      toast.success(`Resume is now ${newStatus ? 'Public' : 'Private'}`)
    } catch (error) { toast.error("Failed to update visibility") }
  }

  const downloadResume = () => { window.print(); }

  const handleShare = () => {
    const resumeUrl = `${window.location.origin}/view/${resumeId}`;
    if (navigator.share) {
      navigator.share({ url: resumeUrl, title: resumeData.title, text: "Check out my resume!" })
    } else {
      navigator.clipboard.writeText(resumeUrl);
      toast.success('Link copied to clipboard!');
    }
  }

  return (
    <div className='min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-emerald-500/30'>
      <div className='max-w-[1600px] mx-auto px-6 py-6'>
        
        {/* Top Header Section */}
        <div className='flex items-center justify-between mb-8'>
          <Link to={'/app'} className='group flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-all text-xs font-bold uppercase tracking-widest'>
            <ArrowLeftIcon className='size-4 group-hover:-translate-x-1 transition-transform' />
            Back to Dashboard
          </Link>
          
          <div className='flex items-center gap-4 bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800/50 backdrop-blur-md'>
             <TemplateSelector 
               selectedTemplate={resumeData.template}
               onChange={(template) => setResumeData(prev => ({ ...prev, template }))}
             />
             <ColorPicker 
               selectedColor={resumeData.accent_color}
               onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} 
             />
          </div>
        </div>

        <div className='grid lg:grid-cols-12 gap-8 items-start'>
          
          {/* LEFT PANEL: The Glass Form Container */}
          <div className='lg:col-span-5 sticky top-6'>
            <div className='bg-[#0A0A0A] rounded-[2.5rem] border border-slate-800/60 shadow-2xl overflow-hidden flex flex-col h-[82vh]'>
              
              {/* Progress Bar */}
              <div className='h-1.5 w-full bg-slate-900'>
                <div 
                  className='h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  style={{ width: `${((activeSectionIndex + 1) * 100) / sections.length}%` }}
                />
              </div>

              {/* Form Header */}
              <div className='p-8 pb-4 flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <div className='p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20'>
                    <activeSection.icon className='size-6 text-emerald-500' />
                  </div>
                  <div>
                    <h2 className='text-xl font-black text-white tracking-tight'>{activeSection.name}</h2>
                    <p className='text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]'>Step {activeSectionIndex + 1} of {sections.length}</p>
                  </div>
                </div>
                
                <div className='flex gap-2'>
                  <button 
                    disabled={activeSectionIndex === 0}
                    onClick={() => setActiveSectionIndex(prev => prev - 1)}
                    className='size-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 disabled:opacity-20 transition-all'
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    disabled={activeSectionIndex === sections.length - 1}
                    onClick={() => setActiveSectionIndex(prev => prev + 1)}
                    className='size-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 disabled:opacity-20 transition-all'
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Form Content Area */}
              <div className='flex-1 overflow-y-auto px-8 py-4 custom-scrollbar'>
                <div className='animate-in fade-in slide-in-from-bottom-4 duration-500'>
                  {activeSection.id === 'personal' && <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />}
                  {activeSection.id === 'summary' && <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} setResumeData={setResumeData} />}
                  {activeSection.id === 'skills' && <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />}
                  {activeSection.id === 'projects' && <ProjectForm data={resumeData.project} onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} />}
                  {activeSection.id === 'education' && <EduactionForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />}
                  {activeSection.id === 'experience' && <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />}
                  {activeSection.id === 'certifications' && <CertificationsForm data={resumeData.certifications} onChange={(data) => setResumeData(prev => ({ ...prev, certifications: data }))} />}
                  {activeSection.id === 'achievements' && <AchievementsForm data={resumeData.achievements} onChange={(data) => setResumeData(prev => ({ ...prev, achievements: data }))} />}
                </div>
              </div>

              {/* Save Button (Fixed at bottom of glass container) */}
              <div className='p-6 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent'>
                <button 
                  onClick={() => { toast.promise(saveResume(), { loading: "Deploying Changes...", success: (msg) => msg, error: "Sync Error!" }) }} 
                  className='group w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 rounded-2xl transition-all shadow-[0_10px_30px_rgba(16,185,129,0.2)] flex items-center justify-center gap-3 uppercase tracking-widest text-xs'
                >
                  <Save size={16} className='group-hover:scale-110 transition-transform' />
                  Save Progress
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Preview & Quick Actions */}
          <div className="lg:col-span-7">
            <div className='flex flex-wrap items-center justify-between gap-4 mb-6 px-2'>
               <div className='flex items-center gap-2'>
                 <div className='size-2 bg-emerald-500 rounded-full animate-pulse' />
                 <span className='text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]'>Live Engine Active</span>
               </div>

               <div className='flex gap-3'>
                <button onClick={() => window.open(`/view/${resumeId}`, '_blank')} className='flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-slate-900 border border-slate-800 text-slate-300 rounded-xl hover:bg-slate-800 transition-all'>
                  <EyeIcon className='size-3.5 text-emerald-500' /> Preview
                </button>
                <button onClick={changeResumeVisibility} className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest border rounded-xl transition-all ${resumeData.public ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                  {resumeData.public ? <Share2Icon size={14} /> : <EyeOffIcon size={14} />}
                  {resumeData.public ? 'Public' : 'Private'}
                </button>
                <button onClick={downloadResume} className='flex items-center gap-2 px-5 py-2 text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-slate-950 rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all'>
                  <DownloadIcon size={14} /> Download
                </button>
              </div>
            </div>

            {/* Resume Preview Paper Effect */}
            <div className='bg-[#111111] p-4 rounded-[2.5rem] border border-slate-800/40 shadow-inner relative group'>
              <div className='absolute inset-0 bg-emerald-500/5 rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700' />
              <div className='relative rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.01] origin-top'>
                <ResumePreview 
                  data={resumeData} 
                  template={resumeData.template} 
                  accentColor={resumeData.accent_color} 
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder;