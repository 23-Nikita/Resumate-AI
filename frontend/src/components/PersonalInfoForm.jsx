// 

import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User, Github } from 'lucide-react' // Github icon import karein
import React from 'react'

export default function PersonalInfoForm({data, onChange, removeBackground, setRemoveBackground}) {

  const handleChange = (field, value) => {
    onChange({...data, [field]: value})
  }

  const fields=[
    {key:"full_name" , label: "Full Name", icon: User, type: "text", 
      required:true
    },
    {key: "email" , label: "Email Address", icon: Mail, type: "email" , 
      required:true
    },
    {key:"phone" , label: "Phone Number", icon: Phone, type: "tel"},
    {key:"location" , label: "Location", icon: MapPin, type: "text"},
    {key:"profession" , label: "Profession", icon:BriefcaseBusiness, type: "text"},
    {key:"linkedin" , label: "LinkedIn Profile", icon: Linkedin, type: "url"},
    {key:"github" , label: "GitHub Profile", icon: Github, type: "url"}, // NEW: GitHub Field added
    {key:"website" , label: "Personal Website", icon: Globe, type: "url"}
  ]

  return (
    <div className='w-full'>
      <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
      <p className='text-sm text-gray-600'>Get Started with the personal information</p>
      
      <div className='flex items-center gap-6 mt-4'>
        {/* Profile Image Section */}
        <label className="cursor-pointer">
          {data.image ? (
            <img 
              src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} 
              alt="user-image" 
              className='w-20 h-20 rounded-full object-cover ring-2 ring-slate-200 hover:opacity-90 transition-all'
            />
          ) : (
            <div className='flex flex-col items-center gap-2 text-slate-500 hover:text-slate-700'>
              <div className="p-4 border-2 border-dashed border-slate-300 rounded-full">
                <User className="size-8" />
              </div>
              <span className="text-xs font-medium">Upload Image</span>
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
          <div className='flex flex-col gap-2 border-l pl-6 border-slate-200'>
            <p className='text-sm font-medium text-gray-700'>Remove Background</p>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input 
                type="checkbox" 
                className='sr-only peer' 
                onChange={() => setRemoveBackground(prev => !prev)} 
                checked={removeBackground} 
              />
              <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
              <div className="absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5 shadow-sm"></div>
            </label>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4"> {/* Optional: Added grid for better layout */}
        {
          fields.map((field)=>{
            const Icon = field.icon;
            return(
              <div key={field.key} className='space-y-1 mt-5'>
                <label className='flex items-center gap-2 text-sm font-medium text-gray-600'>
                    <Icon className='size-4 text-emerald-500' /> {/* Emerald color for consistency */}
                    {field.label}
                    {field.required && <span className='text-red-500'>*</span>}
                </label>
                <input 
                  type= {field.type} 
                  value={data[field.key] || ""} 
                  onChange={(e) => handleChange(field.key , e.target.value) } 
                  className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-emerald-200 focus:border-emerald-500 outline-none transition-all text-sm' 
                  placeholder={`Enter your ${field.label.toLowerCase()}`} 
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