import React from "react";
import { BarChart3, ArrowLeft, Target, Cpu, Hash, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResumeMatchInsights = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 bg-[#0B0F1A] text-slate-300 font-sans selection:bg-emerald-500/30">
      <div className="max-w-6xl mx-auto">

        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate("/app")}
            className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-all group"
          >
            <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl group-hover:border-emerald-500/50 transition-all">
              <ArrowLeft size={18} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Return to System</span>
          </button>

          <div className="px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <Activity size={12} />
            Live Analysis Engine
          </div>
        </div>

        {/* Main Title Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-500">
              <BarChart3 size={32} />
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter">
              Match <span className="text-emerald-500">Insights</span>
            </h1>
          </div>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            Deep-dive visual breakdown of your profile's synergy with the target role's core requirements.
          </p>
        </div>

        {/* Main Insight Container */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Chart Area - Occupies 2 columns */}
          <div className="lg:col-span-2 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[2.5rem] blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-12 rounded-[2.5rem] h-[450px] flex flex-col items-center justify-center text-center">
              <div className="relative size-64 mb-8">
                {/* Visual Placeholder for Radar/Bar Chart */}
                <div className="absolute inset-0 border-4 border-dashed border-slate-800 rounded-full animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute inset-8 border-2 border-emerald-500/20 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BarChart3 size={60} className="text-emerald-500/20" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter">Neural Synergy Mapping</h3>
              <p className="text-slate-500 text-sm">Visual match data is being synthesized...</p>
            </div>
          </div>

          {/* Metrics Sidebar */}
          <div className="flex flex-col gap-6">
            
            {/* Skill Match Card */}
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] hover:border-emerald-500/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-950 rounded-xl text-emerald-400 border border-slate-800">
                  <Cpu size={20} />
                </div>
                <span className="text-3xl font-black text-white tracking-tighter">--<span className="text-xs text-emerald-500 ml-1">%</span></span>
              </div>
              <h4 className="font-bold text-slate-200 uppercase text-xs tracking-[0.2em]">Technical Stack Synergy</h4>
              <div className="mt-4 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[0%] group-hover:w-[45%] transition-all duration-1000"></div>
              </div>
            </div>

            {/* Experience Match Card */}
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] hover:border-blue-500/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-950 rounded-xl text-blue-400 border border-slate-800">
                  <Target size={20} />
                </div>
                <span className="text-3xl font-black text-white tracking-tighter">--<span className="text-xs text-blue-500 ml-1">%</span></span>
              </div>
              <h4 className="font-bold text-slate-200 uppercase text-xs tracking-[0.2em]">Experience Alignment</h4>
              <div className="mt-4 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[0%] group-hover:w-[60%] transition-all duration-1000"></div>
              </div>
            </div>

            {/* Keywords Match Card */}
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] hover:border-purple-500/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-950 rounded-xl text-purple-400 border border-slate-800">
                  <Hash size={20} />
                </div>
                <span className="text-3xl font-black text-white tracking-tighter">--<span className="text-xs text-purple-500 ml-1">%</span></span>
              </div>
              <h4 className="font-bold text-slate-200 uppercase text-xs tracking-[0.2em]">ATS Keyword Density</h4>
              <div className="mt-4 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[0%] group-hover:w-[30%] transition-all duration-1000"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center py-6 border-t border-slate-800/50">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">
            Powered by ResuMate AI Intelligence Engine v2.0
          </p>
        </div>

      </div>
    </div>
  );
};

export default ResumeMatchInsights;