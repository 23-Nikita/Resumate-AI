import React from 'react'
import { Plus, Trash2, Trophy, Star, Sparkles } from 'lucide-react'

const AchievementsForm = ({ data = [], onChange }) => {
  const handleAdd = () => {
    onChange([...data, { title: '', description: '' }])
  }

  const handleUpdate = (index, field, value) => {
    const updated = [...data]
    updated[index][field] = value
    onChange(updated)
  }

  const handleRemove = (index) => {
    onChange(data.filter((_, i) => i !== index))
  }

  return (
    <div className='w-full'>
      {/* Header Section */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='text-lg font-bold text-white tracking-tight flex items-center gap-2'>
            <Trophy size={18} className="text-emerald-500" /> Achievements
          </h3>
          <p className='text-xs text-slate-500 font-medium uppercase tracking-wider'>Honors, Awards & Recognitions</p>
        </div>

        <button
          onClick={handleAdd}
          className='flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10'
        >
          <Plus className='size-3.5 stroke-[3]' />
          Add Achievement
        </button>
      </div>

      {/* Achievements List */}
      <div className="space-y-6">
        {data.length === 0 ? (
          <div className='text-center py-10 bg-slate-900/30 rounded-[2rem] border border-dashed border-slate-800/50'>
            <Star className='w-10 h-10 mx-auto mb-3 text-slate-700' />
            <p className='text-xs font-bold text-slate-600 uppercase tracking-widest'>No achievements added yet</p>
          </div>
        ) : (
          data.map((ach, index) => (
            <div key={index} className="group relative p-6 bg-slate-900/40 border border-slate-800 rounded-[2rem] space-y-4 hover:border-emerald-500/30 transition-all duration-300 shadow-xl shadow-black/20">
              
              {/* Card Header & Trash */}
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <span className='flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black'>
                    {index + 1}
                  </span>
                  <h4 className='text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]'>Recognition</h4>
                </div>
                <button 
                  onClick={() => handleRemove(index)} 
                  className="p-2 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-full transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Achievement Title</label>
                  <div className='relative'>
                    <Sparkles className='absolute left-4 top-3 size-4 text-slate-600' />
                    <input 
                      type="text" 
                      value={ach.title} 
                      onChange={(e) => handleUpdate(index, 'title', e.target.value)} 
                      placeholder="e.g. Winner - Smart India Hackathon" 
                      className="w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Description (Optional)</label>
                  <textarea 
                    value={ach.description} 
                    onChange={(e) => handleUpdate(index, 'description', e.target.value)} 
                    placeholder="Briefly explain the impact or context..." 
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all h-24 resize-none leading-relaxed" 
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AchievementsForm