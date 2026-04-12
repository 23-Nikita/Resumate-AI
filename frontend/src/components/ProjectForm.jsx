import { Plus, Trash2, Github, ExternalLink, Box } from 'lucide-react';
import React from 'react'

export default function ProjectForm({data, onChange}) {
    const addProject = () =>{
        const newProject = {
            name: "",
            type: "",
            description: "",
            github_link: "", 
            live_link: "",   
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
     <div className='w-full'>
        {/* Header Section */}
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h3 className='text-lg font-bold text-white tracking-tight flex items-center gap-2'>
              <Box size={18} className="text-emerald-500" /> Projects
            </h3>
            <p className='text-xs text-slate-500 font-medium uppercase tracking-wider'>Showcase your best work with links</p>
          </div>

          <button
            onClick={addProject}
            className='flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10'
          >
            <Plus className='size-3.5 stroke-[3]' />
            Add Project
          </button>
        </div>

        {/* Projects List */}
        <div className='space-y-6'>
          {data.map((project, index)=>(
            <div key={index} className='group relative p-6 bg-slate-900/40 border border-slate-800 rounded-[2rem] space-y-4 hover:border-emerald-500/30 transition-all duration-300'>
                
                {/* Project Number & Delete */}
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <span className='flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black'>
                            {index + 1}
                        </span>
                        <h4 className='text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]'>Project Details</h4>
                    </div>

                    <button
                        onClick={()=>removeProject(index)}
                        className='p-2 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-full transition-all'
                    >
                        <Trash2 className='size-4' />
                    </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <input
                        value={project.name  || ""}
                        onChange={(e)=> updateProject(index, "name", e.target.value)}
                        type="text"
                        placeholder='Project Name (e.g. StaySpot)'
                        className='w-full bg-slate-900 border border-slate-800 text-slate-200 px-4 py-2.5 rounded-xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all'
                    />
                    
                    <input
                        value={project.type  || ""}
                        onChange={(e)=> updateProject(index, "type", e.target.value)}
                        type="text"
                        placeholder='Tech Stack (e.g. MERN Stack)'
                        className='w-full bg-slate-900 border border-slate-800 text-slate-200 px-4 py-2.5 rounded-xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all'
                    />

                    {/* GitHub Link */}
                    <div className='relative'>
                        <Github className='absolute left-4 top-3 size-4 text-slate-600 group-focus-within:text-emerald-500 transition-colors' />
                        <input
                            value={project.github_link || ""}
                            onChange={(e)=> updateProject(index, "github_link", e.target.value)}
                            type="text"
                            placeholder='GitHub Repository Link'
                            className='w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all'
                        />
                    </div>

                    {/* Live Demo Link */}
                    <div className='relative'>
                        <ExternalLink className='absolute left-4 top-3 size-4 text-slate-600 group-focus-within:text-emerald-500 transition-colors' />
                        <input
                            value={project.live_link || ""}
                            onChange={(e)=> updateProject(index, "live_link", e.target.value)}
                            type="text"
                            placeholder='Live Demo Link'
                            className='w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all'
                        />
                    </div>
                </div>

                <textarea
                    value={project.description || ""}
                    onChange={(e)=> updateProject(index, "description", e.target.value)}
                    placeholder='Describe your project features and your role...'
                    className='w-full bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all resize-none min-h-[100px] leading-relaxed'
                />
            </div>
          ))}
        </div>
     </div>
  )
}