import React from 'react'
import { useNavigate } from 'react-router-dom'
// ArrowLeft icon add kiya hai
import { LayoutGrid, FileText, BarChart3, ShieldCheck, Share2, Lightbulb, ArrowLeft ,Clock} from 'lucide-react'
import { useAnalysis } from '../hooks/useAnalysis';

const SelectionPage = () => {
    const navigate = useNavigate();
    const { reports } = useAnalysis();
   const latestReport = reports && reports.length > 0 ? reports[0] : null;
    const features = [
        {
            title: "AI Resume Builder",
            desc: "Create professional resumes with step-by-step guidance.",
            icon: <FileText className="text-blue-500" />,
            path: "/app/builder",
            bg: "bg-blue-50"
        },
        {
            title: "AI Resume Analyzer",
            desc: "Get real-time feedback and scoring based on your job target.",
            icon: <LayoutGrid className="text-indigo-500" />,
            path: "/app/analyzer",
            bg: "bg-indigo-50"
        },
        {
            title: "ATS Optimization",
            desc: "Ensure your resume passes through recruiter filters easily.",
            icon: <BarChart3 className="text-yellow-500" />,
            path: "/app/analyzer", 
            bg: "bg-yellow-50"
        },
        {
    title: "Recent Reports",
    desc: latestReport 
        ? `Last Match: ${latestReport.matchScore}% Found` 
        : "View your previous analysis history here.",
    icon: <Clock className="text-emerald-500" />,
    path: "/app/reports", // <-- Isko change kiya
    bg: "bg-emerald-50"
},
        {
            title: "Instant Sharing",
            desc: "Generate a live link to share your resume with employers.",
            icon: <Share2 className="text-purple-500" />,
            path: "/app/builder",
            bg: "bg-purple-50"
        },
        {
            title: "AI Skill Suggester",
            desc: "Not sure what to add? Let AI suggest skills based on your role.",
            icon: <Lightbulb className="text-pink-500" />,
            path: "/app/builder",
            bg: "bg-pink-50"
        }
    ]

    return (
        <div className="p-10 max-w-7xl mx-auto">
            {/* --- Back to Home Button --- */}
            <div className="mb-8">
                <button 
                    onClick={() => navigate('/')} 
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-all group"
                >
                    <div className="p-2 rounded-full group-hover:bg-gray-100 transition-all">
                        <ArrowLeft size={20} />
                    </div>
                    <span className="font-medium">Back to Home</span>
                </button>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to ResuMate AI</h1>
            <p className="text-gray-500 mb-10">Choose a tool to start your career journey.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((item, index) => (
                    <div 
                        key={index}
                        onClick={() => item.path && navigate(item.path)}
                        className={`p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer ${item.bg}`}
                    >
                        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mb-4 shadow-sm">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectionPage