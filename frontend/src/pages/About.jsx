import React from "react";
import { Info, ArrowLeft, ShieldCheck, Sparkles, Workflow, Zap, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 bg-[#0B0F1A] text-slate-300 font-sans selection:bg-emerald-500/30 overflow-hidden relative">
      
      {/* Background Decorative Element */}
      <div className="absolute top-[-10%] right-[-5%] size-[500px] bg-pink-500/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-5%] size-[500px] bg-emerald-500/5 blur-[120px] rounded-full"></div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Back Button */}
        <button
          onClick={() => navigate("/app")}
          className="flex items-center gap-3 mb-12 text-slate-400 hover:text-pink-400 transition-all group"
        >
          <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl group-hover:border-pink-500/50 transition-all shadow-lg">
            <ArrowLeft size={18} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest">System Exit</span>
        </button>

        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-pink-500/10 rounded-2xl border border-pink-500/20 text-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
              <Info size={32} />
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter">
              About <span className="text-pink-500 font-black">ResuMate AI</span>
            </h1>
          </div>
          <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl">
            ResuMate AI isn't just a tool; it's a mission to bridge the gap between talented individuals and their dream careers through neural-enhanced analysis.
          </p>
        </div>

        {/* Main Brand Content */}
        <div className="space-y-12">
          
          {/* Mission Card */}
          <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-white">
              <Workflow size={120} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-tight">
              <Sparkles size={20} className="text-pink-400" />
              The Intelligence Layer
            </h3>
            <p className="text-slate-400 leading-relaxed font-medium relative z-10">
              ResuMate AI leverage advanced Large Language Models to decode complex job descriptions and align them with your unique professional DNA. We build, analyze, and optimize your presence for the 2026 recruitment landscape.
            </p>
          </div>

          {/* Features Grid - Protocols */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "AI Resume Builder", desc: "Automated high-impact bullet generation.", icon: <Zap size={18}/> },
              { title: "Match Analytics", desc: "Real-time synergy scoring vs Job Descriptions.", icon: <Target size={18}/> },
              { title: "Skill Gap Logic", desc: "Personalized learning roadmaps for missing techs.", icon: <Workflow size={18}/> },
              { title: "Privacy Protocol", desc: "Bank-grade data encryption for your career data.", icon: <ShieldCheck size={18}/> }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-5 p-6 bg-slate-950/50 border border-slate-800 rounded-3xl hover:border-pink-500/30 transition-all group">
                <div className="p-3 bg-slate-900 rounded-xl text-pink-500 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1 uppercase tracking-wider">{feature.title}</h4>
                  <p className="text-slate-500 text-xs font-medium leading-normal">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* How it Works - Timeline Vibe */}
          <div className="p-10 border-t border-slate-800">
            <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.4em] mb-10 text-center">Operation Workflow</h3>
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center group">
                <div className="size-12 rounded-full border border-slate-800 flex items-center justify-center mb-4 mx-auto group-hover:border-pink-500 transition-colors">1</div>
                <p className="text-[10px] font-black uppercase text-slate-400">Upload Resume</p>
              </div>
              <div className="hidden md:block h-px flex-1 bg-slate-800"></div>
              <div className="text-center group">
                <div className="size-12 rounded-full border border-slate-800 flex items-center justify-center mb-4 mx-auto group-hover:border-pink-500 transition-colors">2</div>
                <p className="text-[10px] font-black uppercase text-slate-400">Sync Job Data</p>
              </div>
              <div className="hidden md:block h-px flex-1 bg-slate-800"></div>
              <div className="text-center group">
                <div className="size-12 rounded-full border border-slate-800 flex items-center justify-center mb-4 mx-auto group-hover:border-pink-500 transition-colors">3</div>
                <p className="text-[10px] font-black uppercase text-slate-400">Neural Insights</p>
              </div>
            </div>
          </div>
        </div>

        {/* Version Footer */}
        <div className="mt-20 text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-800">
          ResuMate Core Engine // Build 2026.04.11 // Nikita
        </div>

      </div>
    </div>
  );
};

export default About;