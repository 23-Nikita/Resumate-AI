import React from 'react'
import { Plus, Trash2 } from 'lucide-react'

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
    <div className="space-y-4">
      {data.map((ach, index) => (
        <div key={index} className="p-4 border rounded-lg bg-slate-50 relative group">
          <button onClick={() => handleRemove(index)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <Trash2 size={18} />
          </button>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Achievement Title</label>
              <input type="text" value={ach.title} onChange={(e) => handleUpdate(index, 'title', e.target.value)} 
                placeholder="e.g. Won College Hackathon 2026" className="w-full p-2 border rounded mt-1" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Description (Optional)</label>
              <textarea value={ach.description} onChange={(e) => handleUpdate(index, 'description', e.target.value)} 
                placeholder="Briefly explain your achievement..." className="w-full p-2 border rounded mt-1 h-20" />
            </div>
          </div>
        </div>
      ))}
      <button onClick={handleAdd} className="flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700">
        <Plus size={18} /> Add Achievement
      </button>
    </div>
  )
}

export default AchievementsForm