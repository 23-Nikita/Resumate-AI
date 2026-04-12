import { Check, Layout, ChevronDown, Layers } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'

export default function TemplateSelector({ selectedTemplate, onChange }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    const templates = [
        {
            id: "classic",
            name: "Classic",
            preview: "Traditional format with clear professional sections."
        },
        {
            id: "modern",
            name: "Modern",
            preview: "Sleek design with strategic color use and modern fonts."
        },
        {
            id: "minimal-image",
            name: "Minimal Image",
            preview: "Clean layout with a profile photo focus."
        },
        {
            id: "minimal",
            name: "Minimal",
            preview: "Ultra-clean design focusing purely on your content."
        },
    ]

    // Outside click logic to prevent menu sticking
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className='relative' ref={dropdownRef}>
            {/* compact Trigger Button for your sidebar */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-2 bg-slate-900 border transition-all rounded-xl shadow-md group ${
                    isOpen ? 'border-emerald-500 ring-2 ring-emerald-500/10' : 'border-slate-800'
                }`}
            >
                <Layout size={14} className={selectedTemplate ? "text-emerald-500" : "text-slate-500"} />
                <span className='text-[10px] font-black uppercase tracking-wider text-slate-300'>
                    {selectedTemplate ? selectedTemplate : 'Template'}
                </span>
                <ChevronDown size={12} className={`text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu - Changed to top-full to avoid cutting */}
            {isOpen && (
                <div className='absolute top-full mt-2 left-0 w-64 p-3 bg-slate-900/98 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl z-[999] animate-in fade-in slide-in-from-top-2 duration-200'>
                    <div className='mb-3 px-1'>
                        <h4 className='text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2'>
                           <Layers size={10} /> Layout Style
                        </h4>
                    </div>

                    <div className='space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar'>
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                onClick={() => {
                                    onChange(template.id);
                                    setIsOpen(false)
                                }}
                                className={`group p-3 rounded-xl border transition-all cursor-pointer ${
                                    selectedTemplate === template.id
                                        ? "border-emerald-500 bg-emerald-500/10"
                                        : "border-slate-800 bg-slate-950/50 hover:border-slate-700"
                                }`}
                            >
                                <div className='flex items-center justify-between mb-1'>
                                    <h4 className={`text-[11px] font-bold ${
                                        selectedTemplate === template.id ? "text-emerald-400" : "text-slate-200"
                                    }`}>
                                        {template.name}
                                    </h4>
                                    {selectedTemplate === template.id && (
                                        <Check className='w-3 h-3 text-emerald-500 stroke-[3]' />
                                    )}
                                </div>
                                <p className='text-[9px] text-slate-500 leading-snug'>
                                    {template.preview}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}