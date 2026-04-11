import React from 'react';
import { Sparkles, Target, Brain, Shield } from 'lucide-react';

const Features = () => {
  const featureList = [
    {
      title: "AI Resume Builder",
      desc: "Generate professional bullet points and summaries tailored to your target job role instantly.",
      icon: <Sparkles className="size-6 text-emerald-400" />,
      color: "emerald"
    },
    {
      title: "AI Resume Analyzer",
      desc: "Get real-time feedback and scoring based on your job target with actionable insights.",
      icon: <Brain className="size-6 text-indigo-400" />,
      color: "indigo"
    },
    {
      title: "ATS Optimization",
      desc: "Our AI ensures your resume passes through recruiter filters easily by matching industry standards.",
      icon: <Target className="size-6 text-blue-400" />,
      color: "blue"
    },
    {
      title: "Privacy First",
      desc: "Your data is encrypted and safe with bank-grade security protocols for total peace of mind.",
      icon: <Shield className="size-6 text-emerald-400" />,
      color: "emerald"
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#0B0F1A] font-sans">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* --- Header --- */}
        <div className="text-left mb-20 border-l-4 border-emerald-500 pl-8">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Why Choose <span className="text-emerald-500">ResuMate AI?</span>
          </h2>
          <p className="text-slate-400 max-w-xl text-lg font-medium leading-relaxed">
            Experience the future of job hunting with our cutting-edge AI features designed to get you hired faster.
          </p>
        </div>

        <div className="relative space-y-1">
          <div className="absolute left-[27px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-emerald-500/50 via-indigo-500/50 to-transparent hidden md:block"></div>

          {featureList.map((feature, index) => (
            <div key={index} className="relative pl-0 md:pl-20 py-12 group">
              
              {/* Timeline Dot/Icon */}
              <div className="absolute left-0 top-12 hidden md:flex size-14 rounded-2xl bg-slate-900 border border-slate-800 items-center justify-center z-10 group-hover:border-emerald-500/50 transition-all duration-500 shadow-2xl">
                {feature.icon}
                {/* Subtle Glow */}
                <div className="absolute inset-0 bg-emerald-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Content Side */}
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800">
                    {feature.icon}
                  </div>
                  <span className="text-emerald-500 font-black text-xs uppercase tracking-[0.3em]">
                    Feature 0{index + 1}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 text-lg leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>

              <div className="mt-12 h-[1px] w-full bg-gradient-to-r from-slate-800 to-transparent md:hidden"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;