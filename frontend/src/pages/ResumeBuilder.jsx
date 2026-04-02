// // import React, { useEffect, useState } from 'react'
// // import { Link, useParams } from 'react-router-dom'
// // import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User } from 'lucide-react'
// // import PersonalInfoForm from '../components/PersonalInfoForm'
// // import ResumePreview from '../components/ResumePreview'
// // import TemplateSelector from '../components/TemplateSelector'
// // import ColorPicker from '../components/ColorPicker'
// // import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
// // import ExperienceForm from '../components/ExperienceForm'
// // import EduactionForm from '../components/EduactionForm'
// // import ProjectForm from '../components/ProjectForm'
// // import SkillsForm from '../components/SkillsForm'
// // import { useSelector } from 'react-redux'

// // import api from "../configs/api";
// // import toast from "react-hot-toast";

// // const ResumeBuilder = () => {
// //   const { resumeId } = useParams()
// //   const { token } = useSelector(state => state.auth)
// //   const [activeSectionIndex, setActiveSectionIndex] = useState(0)
// //   const [removeBackground, setRemoveBackground] = useState(false)

// //   const [resumeData, setResumeData] = useState({
// //     id: '',
// //     title: '',
// //     personal_info: {},
// //     experience: [],
// //     education: [],
// //     project: [],
// //     skills: [],
// //     template: "classic",
// //     accent_color: "#3B82F6",
// //     public: false,
// //   })

// //   const sections = [
// //     { id: "personal", name: "Personal Info", icon: User },
// //     { id: "summary", name: "Summary", icon: FileText },
// //     { id: "experience", name: "Experience", icon: Briefcase },
// //     { id: "education", name: "Education", icon: GraduationCap },
// //     { id: "projects", name: "Projects", icon: FolderIcon },
// //     { id: "skills", name: "Skills", icon: Sparkles }
// //   ]

// //   const activeSection = sections[activeSectionIndex]

// //   const loadExistingResume = async () => {
// //     try {
// //       const { data } = await api.get("/api/resumes/get/" + resumeId)
// //       if (data.resume) {
// //         setResumeData(data.resume)
// //         document.title = data.resume.title;
// //       }
// //     } catch (error) {
// //       console.error(error.message)
// //       toast.error("Failed to load resume")
// //     }
// //   }

// //   useEffect(() => {
// //     loadExistingResume()
// //   }, [])

// //   const changeResumeVisibility = async () => {
// //     try {
// //       const formData = new FormData()
// //       formData.append("resumeId", resumeId)
// //       formData.append("resumeData", JSON.stringify({ public: !resumeData.public }))

// //       const { data } = await api.put("/api/resumes/update", formData)
// //       setResumeData({ ...resumeData, public: !resumeData.public })
// //       toast.success(data.message || "Visibility updated")
// //     } catch (error) {
// //       console.error("Error updating visibility:", error)
// //       toast.error("Failed to update visibility")
// //     }
// //   }

// //   const handleShare = () => {
// //     const frontendUrl = window.location.href.split('/app/')[0];
// //     const resumeUrl = frontendUrl + '/view/' + resumeId;
// //     if (navigator.share) {
// //       navigator.share({ url: resumeUrl, title: "My Resume", text: "Check out my resume!" })
// //     } else {
// //       navigator.clipboard.writeText(resumeUrl);
// //       toast.success('Link copied to clipboard!');
// //     }
// //   }

// //   const downloadResume = () => {
// //     window.print();
// //   }

// //   // --- UPDATED SAVE LOGIC ---
// //   const saveResume = async () => {
// //     try {
// //       let updatedResumeData = structuredClone(resumeData);

// //       // Handle image reference for JSON stringify
// //       if (resumeData.personal_info.image && typeof resumeData.personal_info.image === "object") {
// //         delete updatedResumeData.personal_info.image;
// //       }
      
// //       const formData = new FormData();
// //       formData.append("resumeId", resumeId);
// //       formData.append("resumeData", JSON.stringify(updatedResumeData)); // Includes accent_color
      
// //       if (removeBackground) {
// //         formData.append("removeBackground", "yes");
// //       }

// //       if (resumeData.personal_info.image && typeof resumeData.personal_info.image === "object") {
// //         formData.append('image', resumeData.personal_info.image);
// //       }

// //       const { data } = await api.put("/api/resumes/update", formData);

// //       // Persist all data (Education, GPA, Colors) from backend response
// //       if (data.resume) {
// //         setResumeData(data.resume);
// //       }
// //       return data.message || "Saved successfully";
// //     } catch (error) {
// //       console.error("Error saving resume:", error);
// //       throw error; 
// //     }
// //   }

// //   return (
// //     <div className='max-w-7xl mx-auto px-4 py-6'>
// //       <div>
// //         <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
// //           <ArrowLeftIcon className='size-4' />Back to Dashboard
// //         </Link>
// //       </div>
// //       <div className='max-w-7xl mx-auto px-4 pb-8'>
// //         <div className='grid lg:grid-cols-12 gap-8'>
          
// //           {/* Left Panel - Form */}
// //           <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
// //             <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
// //               <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
// //               <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-green-600 border-none transition-all duration-200'
// //                 style={{ width: `${(activeSectionIndex * 100) / (sections.length - 1)}%` }} />

// //               <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
// //                 <div className='flex items-center gap-2 '>
// //                   <TemplateSelector selectedTemplate={resumeData.template}
// //                     onChange={(template) => setResumeData(prev => ({ ...prev, template }))}
// //                   />
// //                   {/* ColorPicker integration with snake_case state */}
// //                   <ColorPicker selectedColor={resumeData.accent_color}
// //                     onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
// //                 </div>
// //                 <div className='flex items-center'>
// //                   {activeSectionIndex !== 0 && (
// //                     <button onClick={() => setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
// //                       className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all'>
// //                       <ChevronLeft className='size-4' />Previous
// //                     </button>
// //                   )}
// //                   <button onClick={() => setActiveSectionIndex((prevIndex) => Math.min(prevIndex + 1, sections.length - 1))}
// //                     className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`}
// //                     disabled={activeSectionIndex === sections.length - 1}>
// //                     Next <ChevronRight className='size-4' />
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className='space-y-6'>
// //                 {activeSection.id === 'personal' && (
// //                   <PersonalInfoForm data={resumeData.personal_info}
// //                     onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
// //                     removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
// //                 )}
// //                 {activeSection.id === 'summary' && (
// //                   <ProfessionalSummaryForm data={resumeData.professional_summary}
// //                     onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))}
// //                     setResumeData={setResumeData} />
// //                 )}
// //                 {activeSection.id === 'experience' && (
// //                   <ExperienceForm data={resumeData.experience}
// //                     onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />
// //                 )}
// //                 {activeSection.id === 'education' && (
// //                   <EduactionForm data={resumeData.education}
// //                     onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
// //                 )}
// //                 {activeSection.id === 'projects' && (
// //                   <ProjectForm data={resumeData.project}
// //                     onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} />
// //                 )}
// //                 {activeSection.id === 'skills' && (
// //                   <SkillsForm data={resumeData.skills}
// //                     onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
// //                 )}
// //               </div>
              
// //               <button onClick={() => { toast.promise(saveResume(), { loading: "Saving...", success: (msg) => msg, error: "Error saving changes!" }) }} 
// //                 className='bg-gradient-to-br from-emerald-100 to-emerald-200 ring-emerald-300 text-emerald-600 ring hover:ring-emerald-400 transition-all rounded-md px-6 py-2 mt-6 text-sm font-semibold'>
// //                 Save Changes
// //               </button>
// //             </div>
// //           </div>

// //           {/* Right Panel - Preview */}
// //           <div className="lg:col-span-7 max-lg:mt-6">
// //             <div className='relative w-full mb-4'>
// //               <div className='flex items-center justify-end gap-2'>
// //                 {resumeData.public && (
// //                   <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-blue-100 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
// //                     <Share2Icon className='size-4' /> Share
// //                   </button>
// //                 )}
// //                 <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-purple-100 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors'>
// //                   {resumeData.public ? <EyeIcon className='size-4' /> : <EyeOffIcon className='size-4' />}
// //                   {resumeData.public ? 'Public' : 'Private'}
// //                 </button>
// //                 <button onClick={downloadResume} className='flex items-center gap-2 px-6 p-2 text-xs bg-emerald-100 text-emerald-600 rounded-lg ring-emerald-300 hover:ring transition-colors'>
// //                   <DownloadIcon className='size-4' /> Download
// //                 </button>
// //               </div>
// //             </div>
// //             <div className='bg-white shadow-xl rounded-lg'>
// //               {/* Passing accentColor prop explicitly to match child expectations */}
// //               <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default ResumeBuilder;


// import React, { useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'
// import { 
//   ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, 
//   DownloadIcon, EyeIcon, EyeOffIcon, FileText, 
//   FolderIcon, GraduationCap, Share2Icon, Sparkles, User 
// } from 'lucide-react'
// import PersonalInfoForm from '../components/PersonalInfoForm'
// import ResumePreview from '../components/ResumePreview'
// import TemplateSelector from '../components/TemplateSelector'
// import ColorPicker from '../components/ColorPicker'
// import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
// import ExperienceForm from '../components/ExperienceForm'
// import EduactionForm from '../components/EduactionForm'
// import ProjectForm from '../components/ProjectForm'
// import SkillsForm from '../components/SkillsForm'
// import { useSelector } from 'react-redux'

// import api from "../configs/api";
// import toast from "react-hot-toast";

// const ResumeBuilder = () => {
//   const { resumeId } = useParams()
//   const [activeSectionIndex, setActiveSectionIndex] = useState(0)
//   const [removeBackground, setRemoveBackground] = useState(false)

//   const [resumeData, setResumeData] = useState({
//     id: '',
//     title: '',
//     personal_info: {},
//     professional_summary: '',
//     experience: [],
//     education: [],
//     project: [],
//     skills: [],
//     template: "classic",
//     accent_color: "#3B82F6",
//     public: false,
//   })

//   const sections = [
//     { id: "personal", name: "Personal Info", icon: User },
//     { id: "summary", name: "Summary", icon: FileText },
//     { id: "experience", name: "Experience", icon: Briefcase },
//     { id: "education", name: "Education", icon: GraduationCap },
//     { id: "projects", name: "Projects", icon: FolderIcon },
//     { id: "skills", name: "Skills", icon: Sparkles }
//   ]

//   const activeSection = sections[activeSectionIndex]

//   const loadExistingResume = async () => {
//     try {
//       const { data } = await api.get("/api/resumes/get/" + resumeId)
//       if (data.resume) {
//         setResumeData(data.resume)
//         document.title = data.resume.title || "Resume Builder";
//       }
//     } catch (error) {
//       console.error(error.message)
//       toast.error("Failed to load resume")
//     }
//   }

//   useEffect(() => {
//     loadExistingResume()
//   }, [resumeId])

//   const changeResumeVisibility = async () => {
//     try {
//       const newStatus = !resumeData.public;
//       const formData = new FormData()
//       formData.append("resumeId", resumeId)
//       formData.append("resumeData", JSON.stringify({ public: newStatus }))

//       await api.put("/api/resumes/update", formData)
//       setResumeData(prev => ({ ...prev, public: newStatus }))
//       toast.success(`Resume is now ${newStatus ? 'Public' : 'Private'}`)
//     } catch (error) {
//       toast.error("Failed to update visibility")
//     }
//   }

//   const handleShare = () => {
//     const frontendUrl = window.location.origin;
//     const resumeUrl = `${frontendUrl}/view/${resumeId}`;
    
//     if (navigator.share) {
//       navigator.share({ url: resumeUrl, title: resumeData.title, text: "Check out my resume!" })
//     } else {
//       navigator.clipboard.writeText(resumeUrl);
//       toast.success('Link copied to clipboard!');
//     }
//   }

//   const downloadResume = () => {
//     window.print();
//   }

//   const saveResume = async () => {
//     try {
//       let updatedResumeData = structuredClone(resumeData);

//       // Backend image handling
//       if (resumeData.personal_info?.image && typeof resumeData.personal_info.image === "object") {
//         delete updatedResumeData.personal_info.image;
//       }
      
//       const formData = new FormData();
//       formData.append("resumeId", resumeId);
//       formData.append("resumeData", JSON.stringify(updatedResumeData));
      
//       if (removeBackground) formData.append("removeBackground", "true");

//       if (resumeData.personal_info?.image && typeof resumeData.personal_info.image === "object") {
//         formData.append('image', resumeData.personal_info.image);
//       }

//       const { data } = await api.put("/api/resumes/update", formData);

//       if (data.resume) {
//         setResumeData(data.resume);
//       }
//       return data.message || "Saved successfully";
//     } catch (error) {
//       console.error("Save Error:", error);
//       throw error; 
//     }
//   }

//   return (
//     <div className='max-w-7xl mx-auto px-4 py-6'>
//       <div className='mb-4'>
//         <Link to={'/app/builder'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
//           <ArrowLeftIcon className='size-4' />Back to Dashboard
//         </Link>
//       </div>

//       <div className='grid lg:grid-cols-12 gap-8'>
        
//         {/* Left Panel - Form Sections */}
//         <div className='lg:col-span-5'>
//           <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative overflow-hidden'>
//             <div className='absolute top-0 left-0 right-0 h-1 bg-gray-100'>
//               <div 
//                 className='h-full bg-emerald-500 transition-all duration-300'
//                 style={{ width: `${((activeSectionIndex + 1) * 100) / sections.length}%` }}
//               />
//             </div>

//             <div className='flex justify-between items-center mb-6 pt-2'>
//               <div className='flex items-center gap-3'>
//                 <TemplateSelector 
//                   selectedTemplate={resumeData.template}
//                   onChange={(template) => setResumeData(prev => ({ ...prev, template }))}
//                 />
//                 <ColorPicker 
//                   selectedColor={resumeData.accent_color}
//                   onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} 
//                 />
//               </div>
//               <div className='flex gap-1'>
//                 <button 
//                   disabled={activeSectionIndex === 0}
//                   onClick={() => setActiveSectionIndex(prev => prev - 1)}
//                   className='p-2 text-gray-400 hover:text-emerald-600 disabled:opacity-30'
//                 >
//                   <ChevronLeft />
//                 </button>
//                 <button 
//                   disabled={activeSectionIndex === sections.length - 1}
//                   onClick={() => setActiveSectionIndex(prev => prev + 1)}
//                   className='p-2 text-gray-400 hover:text-emerald-600 disabled:opacity-30'
//                 >
//                   <ChevronRight />
//                 </button>
//               </div>
//             </div>

//             <div className='min-h-[400px]'>
//               <h2 className='text-xl font-bold text-slate-800 mb-4 flex items-center gap-2'>
//                 <activeSection.icon className='size-5 text-emerald-500' />
//                 {activeSection.name}
//               </h2>
              
//               {activeSection.id === 'personal' && (
//                 <PersonalInfoForm data={resumeData.personal_info}
//                   onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
//                   removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
//               )}
//               {activeSection.id === 'summary' && (
//                 <ProfessionalSummaryForm data={resumeData.professional_summary}
//                   onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))}
//                   setResumeData={setResumeData} />
//               )}
//               {activeSection.id === 'experience' && (
//                 <ExperienceForm data={resumeData.experience}
//                   onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />
//               )}
//               {activeSection.id === 'education' && (
//                 <EduactionForm data={resumeData.education}
//                   onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
//               )}
//               {activeSection.id === 'projects' && (
//                 <ProjectForm data={resumeData.project}
//                   onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} />
//               )}
//               {activeSection.id === 'skills' && (
//                 <SkillsForm data={resumeData.skills}
//                   onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
//               )}
//             </div>
            
//             <button 
//               onClick={() => { toast.promise(saveResume(), { loading: "Saving...", success: (msg) => msg, error: "Error saving!" }) }} 
//               className='w-full bg-emerald-500 text-white font-bold py-3 rounded-lg mt-8 hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-100'
//             >
//               Save Progress
//             </button>
//           </div>
//         </div>

//         {/* Right Panel - Action Buttons & Preview */}
//         <div className="lg:col-span-7">
//           <div className='flex flex-wrap items-center justify-end gap-3 mb-6'>
            
//             {/* LIVE PREVIEW BUTTON */}
//             <button 
//               onClick={() => window.open(`/view/${resumeId}`, '_blank')}
//               className='flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all shadow-sm'
//             >
//               <EyeIcon className='size-4' /> Live Preview
//             </button>

//             {resumeData.public && (
//               <button onClick={handleShare} className='flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all'>
//                 <Share2Icon className='size-4' /> Share
//               </button>
//             )}
            
//             <button onClick={changeResumeVisibility} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${resumeData.public ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-500'}`}>
//               {resumeData.public ? <EyeIcon className='size-4' /> : <EyeOffIcon className='size-4' />}
//               {resumeData.public ? 'Public' : 'Private'}
//             </button>

//             <button onClick={downloadResume} className='flex items-center gap-2 px-4 py-2 text-sm font-medium bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all'>
//               <DownloadIcon className='size-4' /> Download
//             </button>
//           </div>

//           <div className='bg-white shadow-2xl rounded-xl border border-slate-100 overflow-hidden sticky top-6'>
//             <ResumePreview 
//               data={resumeData} 
//               template={resumeData.template} 
//               accentColor={resumeData.accent_color} 
//             />
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default ResumeBuilder;

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