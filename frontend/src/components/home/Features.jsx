import React from 'react'
import { Brain, Zap, Shield, FileText, Share2, Sparkles } from 'lucide-react';
import Title from './Title';

const Features = () => {
  const featureList = [
    {
      title: "AI Resume Analyzer",
      desc: "Get real-time feedback and scoring based on your job target.",
      icon: <Brain className="size-6 text-indigo-600" />,
      bg: "bg-indigo-50",
      border: "border-indigo-100"
    },
    {
      title: "ATS Optimization",
      desc: "Our AI ensures your resume passes through recruiter filters easily.",
      icon: <Zap className="size-6 text-amber-600" />,
      bg: "bg-amber-50",
      border: "border-amber-100"
    },
    {
      title: "Privacy First",
      desc: "Your data is encrypted and safe with bank-grade security protocols.",
      icon: <Shield className="size-6 text-green-600" />,
      bg: "bg-green-50",
      border: "border-green-100"
    },
    {
      title: "Smart Templates",
      desc: "Professional layouts designed by recruiters for maximum impact.",
      icon: <FileText className="size-6 text-blue-600" />,
      bg: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      title: "Instant Sharing",
      desc: "Generate a live link to share your resume with employers instantly.",
      icon: <Share2 className="size-6 text-purple-600" />,
      bg: "bg-purple-50",
      border: "border-purple-100"
    },
    {
      title: "AI Skill Suggester",
      desc: "Not sure what to add? Let AI suggest skills based on your role.",
      icon: <Sparkles className="size-6 text-rose-600" />,
      bg: "bg-rose-50",
      border: "border-rose-100"
    }
  ];

  return (
  <section id="features" className="py-24 bg-white"> {/* py-20 se py-24 kiya for more breathing space */}
    
    {/* 1. Top Badge */}
    <div className="flex items-center gap-2 w-fit mx-auto mb-4 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-5 py-2 shadow-sm transition-all hover:bg-emerald-100">
      <Zap size={14} className="text-emerald-500 fill-emerald-500" />
      <span className="tracking-wide">Simple Process</span>
    </div>

    {/* 2. Main Title Component */}
  
    <div className="mb-20"> 
      <Title 
        title="Build your resume"
        description="Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features." 
      />
    </div>

    <div className="max-w-7xl mx-auto px-6">
      {/* 3. Why Choose Section - Updated Colors & Spacing */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-6">
          Why Choose <span className="text-emerald-600">ResuMate AI?</span> {/* Indigo ko Emerald kiya */}
        </h2>
        <div className="h-1.5 w-20 bg-emerald-500 mx-auto mb-6 rounded-full"></div> {/* Choti divider line consistency ke liye */}
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Experience the future of job hunting with our cutting-edge AI features designed to get you hired faster.
        </p>
      </div>

      {/* 4. Features Bento-Style Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureList.map((feature, index) => (
          <div 
            key={index}
            className={`p-8 rounded-2xl border ${feature.border} ${feature.bg} transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group`}
          >
            <div className="mb-4 p-3 bg-white rounded-lg w-fit shadow-sm group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
};

export default Features;