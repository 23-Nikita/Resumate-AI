import { GraduationCap, Plus, Trash2, School, Award, CalendarDays } from 'lucide-react';
import React from 'react';

export default function EducationForm({ data = [], onChange }) {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className='w-full'>
      {/* Header Section */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='text-lg font-bold text-white tracking-tight flex items-center gap-2'>
            <GraduationCap size={18} className="text-emerald-500" /> Education
          </h3>
          <p className='text-xs text-slate-500 font-medium uppercase tracking-wider'>Your academic background</p>
        </div>

        <button
          onClick={addEducation}
          className='flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10'
        >
          <Plus className='size-3.5 stroke-[3]' />
          Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-12 bg-slate-900/30 rounded-[2.5rem] border border-dashed border-slate-800/50'>
          <GraduationCap className='w-10 h-10 mx-auto mb-3 text-slate-700' />
          <p className='text-xs font-bold text-slate-600 uppercase tracking-widest'>No education details yet</p>
        </div>
      ) : (
        <div className='space-y-6'>
          {data.map((education, index) => (
            <div key={index} className='group relative p-6 bg-slate-900/40 border border-slate-800 rounded-[2rem] space-y-5 hover:border-emerald-500/30 transition-all duration-300'>
              
              {/* Card Header */}
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <span className='flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black'>
                    {index + 1}
                  </span>
                  <h4 className='text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]'>Qualification</h4>
                </div>
                <button
                  onClick={() => removeEducation(index)}
                  className='p-2 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-full transition-all'
                >
                  <Trash2 className='size-4' />
                </button>
              </div>

              {/* Grid Layout */}
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-1.5'>
                  <label className='text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1'>Institution</label>
                  <div className='relative'>
                    <School className='absolute left-4 top-3 size-4 text-slate-600' />
                    <input
                      value={education.institution || ""}
                      onChange={(e) => updateEducation(index, "institution", e.target.value)}
                      type="text"
                      placeholder='e.g. Gurugram University'
                      className='w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all'
                    />
                  </div>
                </div>

                <div className='space-y-1.5'>
                  <label className='text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1'>Degree</label>
                  <div className='relative'>
                    <Award className='absolute left-4 top-3 size-4 text-slate-600' />
                    <input
                      value={education.degree || ""}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      type="text"
                      placeholder='e.g. Master of Computer Applications'
                      className='w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all'
                    />
                  </div>
                </div>

                <div className='space-y-1.5'>
                  <label className='text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1'>Field of Study</label>
                  <input
                    value={education.field || ""}
                    onChange={(e) => updateEducation(index, "field", e.target.value)}
                    type="text"
                    placeholder='e.g. Information Technology'
                    className='w-full px-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all'
                  />
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <div className='space-y-1.5'>
                    <label className='text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1'>Graduation</label>
                    <div className='relative'>
                      <CalendarDays className='absolute left-3 top-2.5 size-3.5 text-slate-600' />
                      <input
                        value={education.graduation_date || ""}
                        onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                        type="month"
                        className='w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all'
                      />
                    </div>
                  </div>
                  <div className='space-y-1.5'>
                    <label className='text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1'>GPA / %</label>
                    <input
                      value={education.gpa || ""}
                      onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                      type="text"
                      placeholder='e.g. 9.0'
                      className='w-full px-3 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all'
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}