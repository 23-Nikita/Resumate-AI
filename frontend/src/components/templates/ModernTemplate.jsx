
import { Mail, Phone, Linkedin, Globe, Github, ExternalLink, Award, ShieldCheck } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    // Helper for Section Titles with a line
    const SectionTitle = ({ title }) => (
        <div className="mb-6 mt-8">
            <h2 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: accentColor }}>
                <span className="w-6 h-1" style={{ backgroundColor: accentColor }}></span>
                {title}
            </h2>
            <div className="h-[1px] w-full bg-gray-100 mt-2"></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800 shadow-lg my-4 h-auto overflow-hidden">
            
            {/* Header - Colored background */}
            <header className="p-10 text-white" style={{ backgroundColor: accentColor }}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-5xl font-light tracking-tight mb-2">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        <p className="text-lg opacity-90 font-medium tracking-widest uppercase mb-4">
                            {data.personal_info?.profession || "Full Stack Developer"}
                        </p>
                        <div className="w-24 h-px bg-white/30"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-y-2 text-sm opacity-90">
                        {data.personal_info?.email && (
                            <div className="flex items-center gap-3">
                                <Mail className="size-4 shrink-0" />
                                <span>{data.personal_info.email}</span>
                            </div>
                        )}
                        {data.personal_info?.phone && (
                            <div className="flex items-center gap-3">
                                <Phone className="size-4 shrink-0" />
                                <span>{data.personal_info.phone}</span>
                            </div>
                        )}
                        <div className="flex gap-4 mt-2">
                            {data.personal_info?.linkedin && (
                                <a target="_blank" rel="noreferrer" href={data.personal_info.linkedin} className="hover:scale-110 transition-transform">
                                    <Linkedin className="size-5" />
                                </a>
                            )}
                            {data.personal_info?.github && (
                                <a target="_blank" rel="noreferrer" href={data.personal_info.github} className="hover:scale-110 transition-transform">
                                    <Github className="size-5" />
                                </a>
                            )}
                            {data.personal_info?.website && (
                                <a target="_blank" rel="noreferrer" href={data.personal_info.website} className="hover:scale-110 transition-transform">
                                    <Globe className="size-5" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="p-10">
                {/* Professional Summary */}
                {data.professional_summary && (
                    <section>
                        <SectionTitle title="About Me" />
                        <p className="text-gray-600 leading-relaxed text-lg text-justify">{data.professional_summary}</p>
                    </section>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section>
                        <SectionTitle title="Experience" />
                        <div className="space-y-8">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="relative pl-8 border-l-2" style={{ borderColor: 'transparent' }}>
                                    <div className="absolute left-[-6px] top-2 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 leading-tight">{exp.position}</h3>
                                            <p className="font-semibold" style={{ color: accentColor }}>{exp.company}</p>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                            {formatDate(exp.start_date)} — {exp.is_current ? "PRESENT" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line mt-3">
                                        {exp.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Featured Projects - Full Width Stack */}
                {data.project && data.project.length > 0 && (
                    <section>
                        <SectionTitle title="Featured Projects" />
                        <div className="flex flex-col gap-6">
                            {data.project.map((p, index) => (
                                <div key={index} className="p-5 rounded-xl border border-gray-100 bg-gray-50/50">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">{p.name}</h3>
                                        <div className="flex gap-2">
                                            {p.github_link && <a href={p.github_link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black"><Github size={16}/></a>}
                                            {p.live_link && <a href={p.live_link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black"><ExternalLink size={16}/></a>}
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-bold mb-3 uppercase tracking-tighter px-2 py-0.5 rounded inline-block text-white" style={{ backgroundColor: accentColor }}>
                                        {p.type}
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed">{p.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education, Certifications, Skills & Honors - All stacked Single Column */}
                <div className="flex flex-col gap-4">
                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <SectionTitle title="Education" />
                            <div className="space-y-6">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="pl-4 border-l-2" style={{ borderColor: accentColor }}>
                                        <h3 className="font-bold text-gray-900 uppercase text-sm">{edu.degree}</h3>
                                        <p className="text-sm font-medium text-gray-600">{edu.institution}</p>
                                        <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">
                                            {formatDate(edu.graduation_date)} {edu.gpa && `• GPA: ${edu.gpa}`}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {data.certifications && data.certifications.length > 0 && (
                        <section>
                            <SectionTitle title="Certifications" />
                            <div className="flex flex-col gap-3">
                                {data.certifications.map((cert, index) => (
                                    <div key={index} className="flex gap-3 items-center p-3 rounded-lg border border-gray-50 hover:bg-gray-50 transition-colors">
                                        <ShieldCheck size={20} style={{ color: accentColor }} className="shrink-0" />
                                        <div>
                                            <p className="font-bold text-xs text-gray-800 leading-tight">{cert.name}</p>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase">{cert.organization}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <SectionTitle title="Skills" />
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 text-[11px] font-bold border border-gray-200 rounded-md bg-white shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Honors/Achievements */}
                    {data.achievements && data.achievements.length > 0 && (
                        <section>
                            <SectionTitle title="Honors" />
                            <ul className="space-y-4">
                                {data.achievements.map((ach, index) => (
                                    <li key={index} className="flex gap-3 text-sm text-gray-600 items-start">
                                        <Award size={18} className="shrink-0" style={{ color: accentColor }} />
                                        <span className="leading-tight">
                                            {typeof ach === 'string' ? ach : (ach.description || ach.title)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModernTemplate;