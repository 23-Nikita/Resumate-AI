import { Briefcase, Loader2, Plus, Sparkles, Trash2, Calendar, Building2, UserCircle2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import api from '../configs/api'; 

export default function ExperienceForm({data , onChange}) {

  const { token } = useSelector(state => state.auth)
  const [generatingIndex, setGeneratingIndex] = useState(-1)

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false
    };
    onChange([...data, newExperience])
  }

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated)
  }

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const generateDescription = async (index) => {
    if (!data[index].description || data[index].description.length < 5) {
      return toast.error("Please write a short description first so AI can enhance it!");
    }

    setGeneratingIndex(index)
    const experience = data[index]
    const promptText = `enhance this job description: ${experience.description} for the position of ${experience.position} at ${experience.company}.`

    try {
      const response = await api.post("/api/ai/enhance-job-desc", { 
        userContent: promptText 
      });

      if (response.data.enhancedContent) {
        updateExperience(index, "description", response.data.enhancedContent)
        toast.success("Description updated!")
      }
    } catch (error) {
      console.error("AI Error:", error);
      toast.error(error.response?.data?.message || "AI enhancement failed");
    } finally {
      setGeneratingIndex(-1)
    }
  }

  return (
    <div className='w-full'>
      {/* Header Section */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='text-lg font-bold text-white tracking-tight flex items-center gap-2'>
            <Briefcase size={18} className="text-emerald-500" /> Experience
          </h3>
          <p className='text-xs text-slate-500 font-medium uppercase tracking-wider'>Your professional journey</p>
        </div>

        <button
          onClick={addExperience}
          className='flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10'
        >
          <Plus className='size-3.5 stroke-[3]' />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-12 bg-slate-900/30 rounded-[2.5rem] border border-dashed border-slate-800/50'>
          <Briefcase className='w-10 h-10 mx-auto mb-3 text-slate-700' />
          <p className='text-xs font-bold text-slate-600 uppercase tracking-widest'>No work experience added yet</p>
        </div>
      ) : (
        <div className='space-y-6'>
          {data.map((experience, index) => (
            <div key={index} className='group relative p-6 bg-slate-900/40 border border-slate-800 rounded-[2rem] space-y-5 hover:border-emerald-500/30 transition-all duration-300 shadow-xl shadow-black/20'>
              
              {/* Card Header */}
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <span className='flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black'>
                    {index + 1}
                  </span>
                  <h4 className='text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]'>Work Experience</h4>
                </div>
                <button
                  onClick={() => removeExperience(index)}
                  className='p-2 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-full transition-all'
                >
                  <Trash2 className='size-4' />
                </button>
              </div>

              {/* Main Fields Grid */}
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='relative'>
                   <Building2 className='absolute left-4 top-3 size-4 text-slate-600' />
                   <input
                    value={experience.company || ""}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    type="text"
                    placeholder='Company (e.g. Google)'
                    className='w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all'
                  />
                </div>
                
                <div className='relative'>
                  <UserCircle2 className='absolute left-4 top-3 size-4 text-slate-600' />
                  <input
                    value={experience.position || ""}
                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                    type="text"
                    placeholder='Position (e.g. Developer)'
                    className='w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all'
                  />
                </div>

                <div className='relative'>
                  <Calendar className='absolute left-4 top-3 size-4 text-slate-600' />
                  <input
                    value={experience.start_date || ""}
                    onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                    type="month"
                    className='w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all'
                  />
                </div>

                <div className='relative'>
                  <Calendar className='absolute left-4 top-3 size-4 text-slate-600' />
                  <input
                    value={experience.end_date || ""}
                    onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                    type="month"
                    disabled={experience.is_current}
                    className='w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-sm disabled:opacity-30 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all'
                  />
                </div>
              </div>

              {/* Current Working Checkbox */}
              <label className='flex items-center gap-3 cursor-pointer group/check w-fit'>
                <div className='relative flex items-center justify-center'>
                  <input
                    type="checkbox"
                    checked={experience.is_current || false}
                    onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                    className='peer sr-only'
                  />
                  <div className='w-5 h-5 border-2 border-slate-700 rounded-md peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all'></div>
                  <Plus className='absolute size-3.5 text-slate-950 scale-0 peer-checked:scale-100 rotate-45 transition-transform' />
                </div>
                <span className='text-[11px] font-bold text-slate-500 uppercase tracking-widest group-hover/check:text-emerald-400 transition-colors'>Currently working here</span>
              </label>

              {/* Description & AI Enhance */}
              <div className='space-y-3 pt-2'>
                <div className='flex items-center justify-between'>
                  <label className='text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]'>Job Description</label>
                  <button 
                    type="button"
                    onClick={() => generateDescription(index)}
                    disabled={generatingIndex === index || !experience.position || !experience.company}
                    className='flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg hover:bg-emerald-500 hover:text-slate-950 transition-all disabled:opacity-30'
                  >
                    {generatingIndex === index ? (
                      <Loader2 className='w-3 h-3 animate-spin' />
                    ) : (
                      <Sparkles className='w-3 h-3' />
                    )}
                    AI Enhance
                  </button>
                </div>

                <textarea
                  value={experience.description || ""}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  className='w-full bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all resize-none min-h-[120px] leading-relaxed'
                  placeholder='Describe your key responsibilities and achievements...'
                  rows={4}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}