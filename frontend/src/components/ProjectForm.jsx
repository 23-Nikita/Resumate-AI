import { Plus, Trash2, Github, ExternalLink } from 'lucide-react';
import React from 'react'

export default function ProjectForm({data, onChange}) {
    const addProject = () =>{
        const newProject = {
            name: "",
            type: "",
            description: "",
            github_link: "", // NEW: Added for model consistency
            live_link: "",   // NEW: Added for model consistency
        };

        onChange([...data , newProject])
    }

    const removeProject =(index) =>{
         const updated = data.filter((_, i)=> i !== index);
         onChange(updated)
    }

    const updateProject =(index, field, value) =>{
         const updated = [...data];
         updated[index] ={...updated[index], [field]: value}
         onChange(updated)
    }

  return (
     <div>
        <div className='flex items-center justify-between'>
          <div>
           <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
            Projects
           </h3>
           <p className='text-sm text-gray-500'>Showcase your best work with links</p>
          </div>

          <button
          onClick={addProject}
          className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100
          text-purple-700 rounded hover:bg-purple-200 transition-colors'>
             <Plus className='size-4' />
              Add Project
          </button>
        </div>

          <div className='space-y-4 mt-6 '>
            {data.map((project, index)=>(
                <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3 bg-white'>

                        <div className='flex justify-between items-start'>
                            <h4 className='font-medium text-slate-700'>Project #{index + 1}</h4>

                            <button
                            onClick={()=>removeProject(index)}
                            className='text-red-400 hover:text-red-600 transition-colors'>
                                <Trash2 className='size-4' />
                            </button>
                        </div>

                        <div className='grid gap-3'>
                                <input
                                value={project.name  || ""}
                                onChange={(e)=> updateProject(index, "name", e.target.value)}
                                type="text"
                                placeholder='Project Name (e.g. StaySpot)'
                                className='px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-emerald-400'
                                />
                                
                                <input
                                value={project.type  || ""}
                                onChange={(e)=> updateProject(index, "type", e.target.value)}
                                type="text"
                                placeholder='Tech Stack (e.g. MERN, Next.js 15)'
                                className='px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-emerald-400'
                                />

                                {/* NEW: GitHub Link Input */}
                                <div className='relative'>
                                    <Github className='absolute left-3 top-2.5 size-4 text-gray-400' />
                                    <input
                                    value={project.github_link || ""}
                                    onChange={(e)=> updateProject(index, "github_link", e.target.value)}
                                    type="text"
                                    placeholder='GitHub Repository Link'
                                    className='w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-emerald-400'
                                    />
                                </div>

                                {/* NEW: Live Demo Link Input */}
                                <div className='relative'>
                                    <ExternalLink className='absolute left-3 top-2.5 size-4 text-gray-400' />
                                    <input
                                    value={project.live_link || ""}
                                    onChange={(e)=> updateProject(index, "live_link", e.target.value)}
                                    type="text"
                                    placeholder='Live Demo Link (Render/Vercel)'
                                    className='w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-emerald-400'
                                    />
                                </div>

                                <textarea
                                value={project.description || ""}
                                onChange={(e)=> updateProject(index, "description", e.target.value)}
                                placeholder='Describe what you built and the features...'
                                className='w-full px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none min-h-[100px] focus:outline-emerald-400'
                                />
                        </div>
                </div>
            ))}
          </div>
    </div>
  )
}