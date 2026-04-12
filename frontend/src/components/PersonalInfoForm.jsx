import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User, Github } from 'lucide-react' 
import React from 'react'

export default function PersonalInfoForm({data, onChange, removeBackground, setRemoveBackground}) {

  const handleChange = (field, value) => {
    onChange({...data, [field]: value})
  }

  const fields=[
    {key:"full_name" , label: "Full Name", icon: User, type: "text", required:true},
    {key: "email" , label: "Email Address", icon: Mail, type: "email" , required:true},
    {key:"phone" , label: "Phone Number", icon: Phone, type: "tel"},
    {key:"location" , label: "Location", icon: MapPin, type: "text"},
    {key:"profession" , label: "Profession", icon:BriefcaseBusiness, type: "text"},
    {key:"linkedin" , label: "LinkedIn Profile", icon: Linkedin, type: "url"},
    {key:"github" , label: "GitHub Profile", icon: Github, type: "url"}, 
    {key:"website" , label: "Personal Website", icon: Globe, type: "url"}
  ]

  return (
    <div className='w-full bg-transparent'>
      {/* Text colors changed to White/Slate for Dark Theme */}
      <h3 className='text-lg font-bold text-white tracking-tight'>Personal Information</h3>
      <p className='text-sm text-slate-400'>Get Started with the personal information</p>
      
      <div className='flex items-center gap-6 mt-6'>
        {/* Profile Image Section */}
        <label className="cursor-pointer group">
          {data.image ? (
            <img 
              src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} 
              alt="user-image" 
              className='w-20 h-20 rounded-full object-cover ring-2 ring-slate-800 group-hover:ring-emerald-500 transition-all'
            />
          ) : (
            <div className='flex flex-col items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors'>
              <div className="p-4 border-2 border-dashed border-slate-700 rounded-full group-hover:border-emerald-500">
                <User className="size-8" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Upload</span>
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            className='hidden'
            onChange={(e) => {
              const file = e.target.files?.[0]
              if(file) handleChange("image", file)
            }}
          />
        </label>

        {/* Toggle Background Section */}
        {data.image && (
          <div className='flex flex-col gap-2 border-l pl-6 border-slate-800'>
            <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>Remove Background</p>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input 
                type="checkbox" 
                className='sr-only peer' 
                onChange={() => setRemoveBackground(prev => !prev)} 
                checked={removeBackground} 
              />
              {/* Green/Emerald switch like your reports page */}
              <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-checked:bg-emerald-600 transition-colors duration-200"></div>
              <div className="absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5 shadow-sm"></div>
            </label>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        {
          fields.map((field)=>{
            const Icon = field.icon;
            return(
              <div key={field.key} className='space-y-1 mt-6'>
                <label className='flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest'>
                    <Icon className='size-3.5 text-emerald-500' />
                    {field.label}
                    {field.required && <span className='text-rose-500'>*</span>}
                </label>
                <input 
                  type= {field.type} 
                  value={data[field.key] || ""} 
                  onChange={(e) => handleChange(field.key , e.target.value) } 
                  // Input theme changed to dark/transparent with emerald focus
                  className='mt-1 w-full bg-slate-900/50 border border-slate-800 text-slate-200 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm placeholder:text-slate-700' 
                  placeholder={`Enter ${field.label.toLowerCase()}`} 
                  required={field.required}
                />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}