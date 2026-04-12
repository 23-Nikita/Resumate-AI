

import { Mail, Phone, MapPin, Github, ExternalLink, Award, ShieldCheck, Linkedin } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-zinc-800">
            <div className="grid grid-cols-3">

                <div className="col-span-1 py-10">
                    {/* Image */}
                    {data.personal_info?.image && typeof data.personal_info.image === 'string' ? (
                        <div className="mb-6">
                            <img src={data.personal_info.image} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto" style={{ border: `3px solid ${accentColor}` }} />
                        </div>
                    ) : (
                        data.personal_info?.image && typeof data.personal_info.image === 'object' ? (
                            <div className="mb-6">
                                <img src={URL.createObjectURL(data.personal_info.image)} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto" style={{ border: `3px solid ${accentColor}` }} />
                            </div>
                        ) : null
                    )}
                </div>

                {/* Name + Title */}
                <div className="col-span-2 flex flex-col justify-center py-10 px-8">
                    <h1 className="text-4xl font-bold text-zinc-700 tracking-widest uppercase">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="uppercase text-zinc-600 font-medium text-sm tracking-[0.2em] mt-1">
                        {data?.personal_info?.profession || "Profession"}
                    </p>
                </div>

                {/* Left Sidebar */}
                <aside className="col-span-1 border-r border-zinc-200 p-6 pt-0">
                    {/* Contact */}
                    <section className="mb-8">
                        <h2 className="text-xs font-bold tracking-widest text-zinc-400 mb-4 uppercase">
                            CONTACT
                        </h2>
                        <div className="space-y-3 text-sm">
                            {data.personal_info?.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone size={14} style={{ color: accentColor }} />
                                    <span>{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.email && (
                                <div className="flex items-center gap-3">
                                    <Mail size={14} style={{ color: accentColor }} />
                                    <span className="break-all">{data.personal_info.email}</span>
                                </div>
                            )}
                            {data.personal_info?.linkedin && (
                                <div className="flex items-center gap-3">
                                    <Linkedin size={14} style={{ color: accentColor }} />
                                    <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
                                </div>
                            )}
                            {/* NEW: GitHub Profile */}
                            {data.personal_info?.github && (
                                <div className="flex items-center gap-3">
                                    <Github size={14} style={{ color: accentColor }} />
                                    <a href={data.personal_info.github} target="_blank" rel="noreferrer" className="hover:underline text-xs">GitHub</a>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-center gap-3">
                                    <MapPin size={14} style={{ color: accentColor }} />
                                    <span>{data.personal_info.location}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xs font-bold tracking-widest text-zinc-400 mb-4 uppercase">
                                EDUCATION
                            </h2>
                            <div className="space-y-4 text-sm">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <p className="font-semibold text-zinc-700">{edu.degree}</p>
                                        <p className="text-zinc-500 text-xs">{edu.institution}</p>
                                        <p className="text-[10px] text-zinc-400 uppercase mt-1">
                                            {formatDate(edu.graduation_date)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* NEW: Certifications in Sidebar */}
                    {data.certifications && data.certifications.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xs font-bold tracking-widest text-zinc-400 mb-4 uppercase">
                                CERTIFICATIONS
                            </h2>
                            <div className="space-y-4 text-sm">
                                {data.certifications.map((cert, index) => (
                                    <div key={index} className="flex gap-2 items-start">
                                        <ShieldCheck size={14} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                                        <div>
                                            <p className="font-medium text-zinc-700 leading-tight">{cert.name}</p>
                                            <p className="text-[10px] text-zinc-400 uppercase">{cert.organization}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold tracking-widest text-zinc-400 mb-4 uppercase">
                                SKILLS
                            </h2>
                            <div className="flex flex-wrap gap-2 text-[11px]">
                                {data.skills.map((skill, index) => (
                                    <span key={index} className="px-2 py-1 bg-zinc-100 rounded text-zinc-600">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Right Content */}
                <main className="col-span-2 p-8 pt-0">

                    {/* Summary */}
                    {data.professional_summary && (
                        <section className="mb-8">
                            <h2 className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: accentColor }} >
                                PROFESSIONAL PROFILE
                            </h2>
                            <p className="text-sm text-zinc-600 leading-relaxed text-justify">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: accentColor }} >
                                WORK EXPERIENCE
                            </h2>
                            <div className="space-y-6">
                                {data.experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-zinc-800 uppercase text-sm tracking-wide">
                                                    {exp.position}
                                                </h3>
                                                <p className="text-xs font-medium" style={{ color: accentColor }}>
                                                    {exp.company}
                                                </p>
                                            </div>
                                            <span className="text-[10px] text-zinc-400 font-bold uppercase">
                                                {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        {exp.description && (
                                            <ul className="mt-2 list-disc list-inside text-xs text-zinc-600 leading-relaxed space-y-1">
                                                {exp.description.split("\n").map((line, i) => (
                                                    <li key={i}>{line}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects - Updated with Links */}
                    {data.project && data.project.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: accentColor }}>
                                KEY PROJECTS
                            </h2>
                            <div className="space-y-5">
                                {data.project.map((project, index) => (
                                    <div key={index} className="border-l-2 pl-4 py-1" style={{ borderColor: accentColor + '30' }}>
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-wide">{project.name}</h3>
                                            <div className="flex gap-2">
                                                {project.github_link && (
                                                    <a href={project.github_link} target="_blank" rel="noreferrer" title="View Code">
                                                        <Github size={14} className="text-zinc-400 hover:text-black transition-colors" />
                                                    </a>
                                                )}
                                                {project.live_link && (
                                                    <a href={project.live_link} target="_blank" rel="noreferrer" title="Live Demo">
                                                        <ExternalLink size={14} className="text-zinc-400 hover:text-black transition-colors" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-[11px] font-semibold italic mb-2" style={{ color: accentColor }} >
                                            {project.type}
                                        </p>
                                        <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                                            {project.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* NEW: Achievements Section */}
                    {data.achievements && data.achievements.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: accentColor }}>
                                ACHIEVEMENTS
                            </h2>
                            <ul className="space-y-3">
                                {data.achievements.map((ach, index) => (
                                    <li key={index} className="text-xs flex gap-3 text-zinc-600">
                                        <Award size={14} className="shrink-0" style={{ color: accentColor }} />
                                        <span>{ach.description}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}

export default MinimalImageTemplate;