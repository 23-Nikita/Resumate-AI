import { Plus, Sparkles, X } from 'lucide-react'
import React, { useState } from 'react'

export default function SkillsForm({ data = [], onChange }) { // data=[] for safety
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (indexToRemove) => {
    // onchange ko onChange kiya
    onChange(data.filter((_, index) => index !== indexToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  }

  return (
    <div className='space-y-4'>
      <div>
        <h3 className='flex items-center gap-2 text-lg font-semibold'>Skills</h3>
        <p className='text-sm text-gray-500'>Add your technical and soft skills</p>
      </div>

      <div className='flex gap-2'>
        <input 
          type="text" 
          placeholder='Enter a skill...' 
          className='flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg' // border added
          onChange={(e) => setNewSkill(e.target.value)}
          value={newSkill}
          onKeyDown={handleKeyPress}
        />
        <button 
          onClick={addSkill} 
          disabled={!newSkill.trim()} // trim() calls the function
          className='flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50'
        >
          <Plus className='size-4' /> Add
        </button>
      </div>

      {data.length > 0 ? (
        <div className='flex flex-wrap gap-2'>
          {/* Changed {} to () for implicit return */}
          {data.map((skill, index) => (
            <span key={index} className='flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>
              {skill}
              <button onClick={() => removeSkill(index)} className='ml-1 hover:bg-blue-200 rounded-full p-0.5'>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className='text-center py-6 text-gray-500'>
          <Sparkles className='w-10 h-10 mx-auto mb-2 text-gray-300' />
          <p>No skills added yet.</p>
        </div>
      )}

      <div className='bg-blue-50 p-3 rounded-lg'>
        <p className='text-sm text-blue-800'><strong>Tip:</strong> Add 8-12 relevant skills.</p>
      </div>
    </div>
  )
}