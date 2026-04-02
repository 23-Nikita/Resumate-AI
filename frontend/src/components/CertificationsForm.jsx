import React from 'react'
import { Plus, Trash2, Link as LinkIcon } from 'lucide-react'

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
    <div className="space-y-4">
      {data.map((cert, index) => (
        <div key={index} className="p-4 border rounded-lg bg-slate-50 relative group">
          <button onClick={() => handleRemove(index)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <Trash2 size={18} />
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase">Certification Name</label>
              <input type="text" value={cert.name} onChange={(e) => handleUpdate(index, 'name', e.target.value)} 
                placeholder="e.g. MERN Stack Developer" className="w-full p-2 border rounded mt-1" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Organization</label>
              <input type="text" value={cert.organization} onChange={(e) => handleUpdate(index, 'organization', e.target.value)} 
                placeholder="e.g. Intel Unnati" className="w-full p-2 border rounded mt-1" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Issue Date</label>
              <input type="text" value={cert.issue_date} onChange={(e) => handleUpdate(index, 'issue_date', e.target.value)} 
                placeholder="e.g. March 2026" className="w-full p-2 border rounded mt-1" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                <LinkIcon size={12}/> Certificate Link
              </label>
              <input type="text" value={cert.certificate_link} onChange={(e) => handleUpdate(index, 'certificate_link', e.target.value)} 
                placeholder="https://..." className="w-full p-2 border rounded mt-1" />
            </div>
          </div>
        </div>
      ))}
      <button onClick={handleAdd} className="flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700">
        <Plus size={18} /> Add Certification
      </button>
    </div>
  )
}

export default CertificationsForm