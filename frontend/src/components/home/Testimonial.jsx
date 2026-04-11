import React from 'react'
import Title from './Title'
import { BookUserIcon, Quote, ShieldCheck } from 'lucide-react'

const Testimonial = () => {
  const cardsData = [
    {
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
        name: 'Amit Sharma',
        handle: '@amit_dev',
        text: "AI suggestions ne mere resume ke bullet points ko ekdum professional bana diya. Must try!"
    },
    {
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
        name: 'Sneha Kapoor',
        handle: '@sneha_hr',
        text: "Being an HR, I can say these templates are 100% ATS-friendly. Great job!"
    },
    {
        image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
        name: 'Rahul Verma',
        handle: '@rahul_works',
        text: "Sirf 5 minute mein mera resume ready ho gaya. AI analyzer feature kamaal ka hai."
    },
    {
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
        name: 'Priya Das',
        handle: '@priya_ai',
        text: "Clean UI aur easy navigation. Portfolio ke liye best resume builder tool hai."
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-8 rounded-[2.5rem] mx-4 bg-slate-900/40 backdrop-blur-md border border-slate-800 shadow-2xl hover:border-emerald-500/30 transition-all duration-500 w-[350px] shrink-0 group relative overflow-hidden">
        {/* Decorative Quote Icon Background */}
        <Quote className="absolute -right-2 -bottom-2 size-24 text-white opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" />
        
        <div className="flex gap-4 relative z-10">
            <div className="relative">
                <img className="size-14 rounded-2xl object-cover border border-slate-700 p-1 group-hover:border-emerald-500/50 transition-colors" src={card.image} alt="User" />
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border-2 border-[#0B0F1A]">
                    <ShieldCheck size={10} className="text-white" />
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                    <p className="font-bold text-white tracking-tight">{card.name}</p>
                    <svg className="fill-emerald-500 size-3.5" viewBox="0 0 12 12">
                        <path d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" />
                    </svg>
                </div>
                <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">{card.handle}</span>
            </div>
        </div>
        <p className="text-sm pt-6 text-slate-400 leading-relaxed font-medium relative z-10 italic">
          "{card.text}"
        </p>
    </div>
  );

  return (
    <section id="testimonials" className='flex flex-col items-center py-32 bg-[#0B0F1A] overflow-hidden relative'> 
        
        {/* Background Glowing Orbs */}
        <div className="absolute top-0 left-1/4 size-96 bg-emerald-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 size-96 bg-purple-500/5 blur-[120px] rounded-full"></div>

        <div className="flex items-center gap-2 w-fit mx-auto mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 bg-emerald-500/5 border border-emerald-500/10 rounded-full px-6 py-2.5 shadow-xl">
            <BookUserIcon size={12} className="animate-pulse" />
            <span>Neural Feedback Loop</span>
        </div>

        <div className="mb-20 text-center relative z-10"> 
            <h2 className="text-5xl font-black text-white tracking-tighter mb-4">
              Real Stories. <span className="text-emerald-500">Real Results.</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              Join thousands of developers leveraging ResuMate AI to break through the ATS wall.
            </p>
        </div>

        {/* Marquee Container */}
        <div className="w-full relative py-8">
            {/* Edge Fades for Dark Mode */}
            <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#0B0F1A] to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#0B0F1A] to-transparent z-10"></div>

            <div className="marquee-inner flex gap-6 min-w-max animate-scroll">
                {[...cardsData, ...cardsData].map((card, index) => (
                    <CreateCard key={index} card={card} />
                ))}
            </div>
        </div>

        {/* System Summary Line */}
        <div className="mt-20 flex items-center gap-4 px-6 py-3 bg-slate-900/20 border border-slate-800/50 rounded-2xl opacity-50">
          <div className="size-1.5 rounded-full bg-emerald-500"></div>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">
            Success Rate: 98.4% // Total Reports Generated: 12.4k+
          </p>
        </div>

        <style>{`
            @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-50% - 1.5rem)); }
            }
            .animate-scroll {
                animation: scroll 40s linear infinite;
            }
            .animate-scroll:hover {
                animation-play-state: paused;
            }
        `}</style>
    </section>
  )
}

export default Testimonial;