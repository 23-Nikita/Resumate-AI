import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import React from 'react';

export default function EducationForm({ data, onChange }) {
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
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
            <GraduationCap className='size-5 text-purple-600' />
            Education
          </h3>
          <p className='text-sm text-gray-500'>Add your academic qualifications</p>
        </div>

        <button
          onClick={addEducation}
          className='flex items-center gap-2 px-4 py-2 text-sm bg-purple-600
          text-white rounded-lg hover:bg-purple-700 transition-all shadow-sm'
        >
          <Plus className='size-4' />
          Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50'>
          <GraduationCap className='w-12 h-12 mx-auto mb-3 text-gray-300' />
          <p className='text-gray-600 font-medium'>No education details added yet.</p>
          <p className='text-sm text-gray-400'>Click "Add Education" to start building your profile.</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {data.map((education, index) => (
            <div key={index} className='p-5 border border-gray-200 rounded-xl bg-white shadow-sm space-y-4 relative group'>
              <div className='flex justify-between items-center border-b border-gray-100 pb-2'>
                <h4 className='text-sm font-bold text-purple-600 uppercase tracking-wider'>
                  Education #{index + 1}
                </h4>
                <button
                  onClick={() => removeEducation(index)}
                  className='p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all'
                  title="Remove Education"
                >
                  <Trash2 className='size-4' />
                </button>
              </div>

              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-700'>Institution Name</label>
                  <input
                    value={education.institution || ""}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    type="text"
                    placeholder='e.g. World College of Technology'
                    className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all'
                  />
                </div>

                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-700'>Degree</label>
                  <input
                    value={education.degree || ""}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    type="text"
                    placeholder="e.g. Bachelor's, Master's"
                    className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all'
                  />
                </div>

                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-700'>Field of Study</label>
                  <input
                    value={education.field || ""}
                    onChange={(e) => updateEducation(index, "field", e.target.value)}
                    type="text"
                    placeholder='e.g. Computer Science'
                    className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all'
                  />
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <div className='space-y-1'>
                    <label className='text-xs font-medium text-gray-700'>Graduation Date</label>
                    <input
                      value={education.graduation_date || ""}
                      onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                      type="month"
                      className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all'
                    />
                  </div>
                  <div className='space-y-1'>
                    <label className='text-xs font-medium text-gray-700'>GPA (Optional)</label>
                    <input
                      value={education.gpa || ""}
                      onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                      type="text"
                      placeholder='e.g. 8.5 or 85%'
                      className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all'
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