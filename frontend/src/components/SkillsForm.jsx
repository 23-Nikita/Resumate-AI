import { Plus, Sparkles, X, Terminal } from 'lucide-react'
import React, { useState } from 'react'

export default function SkillsForm({ data = [], onChange }) { 
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  }

  return (
    <div className='w-full'>
      {/* Header Section */}
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-white tracking-tight flex items-center gap-2'>
          <Terminal size={18} className="text-emerald-500" /> Skills
        </h3>
        <p className='text-xs text-slate-500 font-medium uppercase tracking-wider'>Technical & Soft Skills</p>
      </div>

      {/* Input Section */}
      <div className='flex gap-3 mb-6'>
        <div className='flex-1 relative group'>
          <input 
            type="text" 
            placeholder='e.g. React.js' 
            className='w-full bg-slate-900/50 border border-slate-800 text-slate-200 px-4 py-2.5 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all text-sm placeholder:text-slate-700'
            onChange={(e) => setNewSkill(e.target.value)}
            value={newSkill}
            onKeyDown={handleKeyPress}
          />
        </div>
        <button 
          onClick={addSkill} 
          disabled={!newSkill.trim()} 
          className='flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400 disabled:opacity-30 transition-all shadow-lg shadow-emerald-500/10'
        >
          <Plus className='size-3.5 stroke-[3]' /> Add
        </button>
      </div>

      {/* Skills Tags Area */}
      {data.length > 0 ? (
        <div className='flex flex-wrap gap-2 mb-6'>
          {data.map((skill, index) => (
            <span 
              key={index} 
              className='group flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-emerald-500 hover:text-slate-950 transition-all'
            >
              {skill}
              <button 
                onClick={() => removeSkill(index)} 
                className='text-emerald-500/50 group-hover:text-slate-950 transition-colors'
              >
                <X className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className='text-center py-10 bg-slate-900/30 rounded-[2rem] border border-dashed border-slate-800/50 mb-6'>
          <Sparkles className='w-8 h-8 mx-auto mb-3 text-slate-700' />
          <p className='text-xs font-bold text-slate-600 uppercase tracking-widest'>No skills added yet</p>
        </div>
      )}

      {/* Dynamic Tip Box */}
      <div className='bg-slate-900/50 border-l-2 border-emerald-500 p-4 rounded-r-xl'>
        <p className='text-[11px] font-medium text-slate-400 uppercase tracking-[0.05em]'>
          <strong className='text-emerald-500 mr-1'>Pro Tip:</strong> 
          {data.length < 8 ? "Aim for 8-12 skills to optimize for ATS." : "Great selection of skills!"}
        </p>
      </div>
    </div>
  )
}