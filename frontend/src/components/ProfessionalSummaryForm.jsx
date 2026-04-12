import { Loader2, Sparkles, Wand2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import api from "../configs/api"; 

export default function ProfessionalSummaryForm({ data, onChange, setResumeData }) {
    const [isGenerating, setIsGenerating] = useState(false)

    const generateSummary = async () => {
        try {
            if (!data || data.trim().length < 10) {
                return toast.error("Please write a bit about yourself first!")
            }

            setIsGenerating(true)
            
            const response = await api.post("/api/ai/enhance-pro-sum", { 
                userContent: data 
            })

            if (response.data.enhancedContent) {
                onChange(response.data.enhancedContent); 
                
                setResumeData(prev => ({
                    ...prev,
                    professional_summary: response.data.enhancedContent
                }))
                
                toast.success("Summary enhanced!")
            }

        } catch (error) {
            console.error("AI Frontend Error:", error.response?.data)
            toast.error(error?.response?.data?.message || "AI service is currently busy")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className='w-full'>
            <div className='flex items-center justify-between mb-6'>
                <div>
                    <h3 className='text-lg font-bold text-white tracking-tight'>
                        Professional Summary
                    </h3>
                    <p className='text-xs text-slate-500 font-medium uppercase tracking-wider'>Highlight your expertise</p>
                </div>
                
                {/* Updated AI Button: Glass effect with Emerald Glow */}
                <button 
                    disabled={isGenerating} 
                    onClick={generateSummary} 
                    className='group relative flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl hover:bg-emerald-500 hover:text-slate-950 transition-all duration-300 disabled:opacity-50 overflow-hidden shadow-lg shadow-emerald-500/5'
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    {isGenerating ? <Loader2 className='size-3.5 animate-spin' /> : <Wand2 className='size-3.5' />}
                    {isGenerating ? "Processing..." : "AI Enhance"}
                </button>
            </div>
            
            <div className='relative group'>
                {/* Glow effect for Textarea */}
                <div className="absolute -inset-0.5 bg-gradient-to-b from-slate-800 to-transparent rounded-2xl opacity-50 group-focus-within:opacity-100 transition-opacity blur-[1px]"></div>
                
                <textarea 
                    value={data || ""} 
                    onChange={(e) => onChange(e.target.value)} 
                    className='relative w-full bg-slate-900/50 border border-slate-800 text-slate-200 p-4 rounded-2xl text-sm placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all resize-none leading-relaxed'
                    placeholder='Describe your experience and career goals...'
                    rows={6}
                />

                {/* Status indicator bottom right */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 pointer-events-none">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                        {data?.length || 0} characters
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full ${data?.length > 10 ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                </div>
            </div>
        </div>
    )
}