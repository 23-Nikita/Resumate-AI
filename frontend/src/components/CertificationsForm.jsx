import React from 'react'
import { Plus, Trash2, Link as LinkIcon, Medal, Award, Calendar } from 'lucide-react'

const CertificationsForm = ({ data = [], onChange }) => {
  const handleAdd = () => {
    onChange([...data, { name: '', organization: '', issue_date: '', certificate_link: '' }])
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
            <Award size={18} className="text-emerald-500" /> Certifications
          </h3>
          <p className='text-xs text-slate-500 font-medium uppercase tracking-wider'>Your verified achievements</p>
        </div>

        <button
          onClick={handleAdd}
          className='flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10'
        >
          <Plus className='size-3.5 stroke-[3]' />
          Add Certification
        </button>
      </div>

      {/* Certifications List */}
      <div className='space-y-6'>
        {data.length === 0 ? (
          <div className='text-center py-10 bg-slate-900/30 rounded-[2rem] border border-dashed border-slate-800/50'>
            <Medal className='w-10 h-10 mx-auto mb-3 text-slate-700' />
            <p className='text-xs font-bold text-slate-600 uppercase tracking-widest'>No certifications added yet</p>
          </div>
        ) : (
          data.map((cert, index) => (
            <div key={index} className="group relative p-6 bg-slate-900/40 border border-slate-800 rounded-[2rem] space-y-4 hover:border-emerald-500/30 transition-all duration-300">
              
              {/* Card Header & Trash */}
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <span className='flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black'>
                    {index + 1}
                  </span>
                  <h4 className='text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]'>Certification Details</h4>
                </div>
                <button 
                  onClick={() => handleRemove(index)} 
                  className="p-2 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-full transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Certification Name</label>
                  <div className='relative'>
                    <Medal className='absolute left-4 top-3 size-4 text-slate-600' />
                    <input 
                      type="text" 
                      value={cert.name} 
                      onChange={(e) => handleUpdate(index, 'name', e.target.value)} 
                      placeholder="e.g. AWS Certified Cloud Practitioner" 
                      className="w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all" 
                    />
                  </div>
                </div>

                <div className='space-y-1.5'>
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Organization</label>
                  <input 
                    type="text" 
                    value={cert.organization} 
                    onChange={(e) => handleUpdate(index, 'organization', e.target.value)} 
                    placeholder="e.g. Intel / Coursera" 
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all" 
                  />
                </div>

                <div className='space-y-1.5'>
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Issue Date</label>
                  <div className='relative'>
                    <Calendar className='absolute left-4 top-3 size-4 text-slate-600' />
                    <input 
                      type="text" 
                      value={cert.issue_date} 
                      onChange={(e) => handleUpdate(index, 'issue_date', e.target.value)} 
                      placeholder="e.g. March 2026" 
                      className="w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all" 
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1 flex items-center gap-1">
                    <LinkIcon size={12}/> Certificate Link (Credential URL)
                  </label>
                  <input 
                    type="text" 
                    value={cert.certificate_link} 
                    onChange={(e) => handleUpdate(index, 'certificate_link', e.target.value)} 
                    placeholder="https://..." 
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all" 
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

export default CertificationsForm