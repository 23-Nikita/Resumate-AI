import React from "react";
import { BookOpen, ArrowLeft, Lightbulb, ExternalLink, Code2, GraduationCap, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SkillGapLearning = () => {
  const navigate = useNavigate();

  // Mock data for the vibe
  const skills = [
    { title: "React & Next.js", desc: "Master server-side rendering and state management.", icon: <Code2 />, color: "text-emerald-400" },
    { title: "Node.js Backend", desc: "Build scalable APIs and handle authentication logic.", icon: <GraduationCap />, color: "text-blue-400" },
  ];

  return (
    <div className="min-h-screen p-8 bg-[#0B0F1A] text-slate-300 font-sans selection:bg-emerald-500/30">
      <div className="max-w-6xl mx-auto">

        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate("/app")}
            className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-all group"
          >
            <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl group-hover:border-emerald-500/50 transition-all shadow-lg">
              <ArrowLeft size={18} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Abort to Dashboard</span>
          </button>

          <div className="px-4 py-1.5 rounded-full bg-purple-500/5 border border-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
            <Lightbulb size={12} className="animate-pulse" />
            Curated Roadmap
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20 text-purple-400">
              <BookOpen size={32} />
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter">
              Skill <span className="text-purple-400">Intelligence</span>
            </h1>
          </div>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            We’ve identified gaps in your technical profile. Follow these targeted learning paths to increase your hireability score.
          </p>
        </div>

        {/* Learning Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="group relative bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-purple-500/30 hover:bg-slate-900/60 transition-all duration-500 overflow-hidden"
            >
              {/* Abstract Background Glow */}
              <div className="absolute -right-8 -top-8 size-24 bg-purple-500/5 blur-3xl group-hover:bg-purple-500/10 transition-all"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div className={`p-4 bg-slate-950 rounded-2xl border border-slate-800 ${skill.color} shadow-2xl`}>
                  {skill.icon}
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`h-1 w-4 rounded-full ${i <= 2 ? 'bg-purple-500' : 'bg-slate-800'}`}></div>
                  ))}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-purple-400 transition-colors">
                {skill.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                {skill.desc}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-800/50">
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 hover:text-purple-300 transition-all">
                  Access Modules <ChevronRight size={14} />
                </button>
                
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-500 group-hover:text-white transition-all">
                  <ExternalLink size={16} />
                </div>
              </div>
            </div>
          ))}

          {/* New Suggestion Placeholder */}
          <div className="border-2 border-dashed border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center opacity-50 hover:opacity-100 transition-opacity">
            <div className="size-12 rounded-full border border-slate-700 flex items-center justify-center mb-4">
              <span className="text-xl font-light text-slate-500">+</span>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-600">Analyze More Resumes to unlock paths</p>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-20 flex items-center gap-4 px-6 py-4 bg-slate-900/20 border border-slate-800/50 rounded-2xl">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
            System sync complete. Resources updated for 2026 hiring trends.
          </p>
        </div>

      </div>
    </div>
  );
};

export default SkillGapLearning;