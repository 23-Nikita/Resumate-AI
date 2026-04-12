


import { Github, ExternalLink, Award, ShieldCheck } from "lucide-react";

const MinimalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-12 bg-white text-gray-900 font-light shadow-sm my-4 h-auto">
            {/* Header */}
            <header className="mb-12">
                <h1 className="text-5xl font-extralight mb-6 tracking-tight text-gray-800">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap gap-y-2 gap-x-6 text-[13px] text-gray-500 border-t pt-4">
                    {data.personal_info?.email && <span className="hover:text-gray-800 transition-colors">{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
                    {data.personal_info?.location && <span>{data.personal_info.location}</span>}
                    {data.personal_info?.linkedin && (
                        <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer" className="hover:text-gray-800 underline decoration-gray-300 underline-offset-4">LinkedIn</a>
                    )}
                    {data.personal_info?.github && (
                        <a href={data.personal_info.github} target="_blank" rel="noreferrer" className="hover:text-gray-800 underline decoration-gray-300 underline-offset-4 font-medium">GitHub</a>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-12">
                    <p className="text-gray-600 leading-relaxed max-w-2xl text-lg italic">
                        "{data.professional_summary}"
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-[11px] uppercase tracking-[0.3em] mb-8 font-bold" style={{ color: accentColor }}>
                        Experience
                    </h2>
                    <div className="space-y-10">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="group">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-xl font-normal text-gray-800">{exp.position}</h3>
                                    <span className="text-xs text-gray-400 font-medium tracking-tighter">
                                        {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-sm font-medium mb-3" style={{ color: accentColor }}>{exp.company}</p>
                                {exp.description && (
                                    <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line border-l border-gray-100 pl-4">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Selected Projects - Now Single Column Stack */}
            {data.project && data.project.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-[11px] uppercase tracking-[0.3em] mb-8 font-bold" style={{ color: accentColor }}>
                        Selected Projects
                    </h2>
                    <div className="flex flex-col gap-10">
                        {data.project.map((proj, index) => (
                            <div key={index} className="flex flex-col border-b border-gray-50 pb-6 last:border-0">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-base font-semibold text-gray-800 uppercase tracking-wide">{proj.name}</h3>
                                    <div className="flex gap-3">
                                        {proj.github_link && (
                                            <a href={proj.github_link} target="_blank" rel="noreferrer" title="GitHub Code">
                                                <Github size={16} className="text-gray-400 hover:text-black transition-colors" />
                                            </a>
                                        )}
                                        {proj.live_link && (
                                            <a href={proj.live_link} target="_blank" rel="noreferrer" title="Live Demo">
                                                <ExternalLink size={16} className="text-gray-400 hover:text-black transition-colors" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <p className="text-xs italic mb-2 font-medium" style={{ color: accentColor }}>{proj.type}</p>
                                <p className="text-gray-600 text-sm leading-relaxed">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Bottom Sections - Removed Grid, now all Full Width Stacked */}
            <div className="flex flex-col gap-12">
                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <section>
                        <h2 className="text-[11px] uppercase tracking-[0.3em] mb-6 font-bold" style={{ color: accentColor }}>
                            Education
                        </h2>
                        <div className="space-y-6">
                            {data.education.map((edu, index) => (
                                <div key={index} className="text-sm">
                                    <h3 className="font-medium text-gray-800 leading-snug">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-500">{edu.institution}</p>
                                    <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">
                                        Graduated {formatDate(edu.graduation_date)} {edu.gpa && `• GPA: ${edu.gpa}`}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {data.certifications && data.certifications.length > 0 && (
                    <section>
                        <h2 className="text-[11px] uppercase tracking-[0.3em] mb-6 font-bold" style={{ color: accentColor }}>
                            Certifications
                        </h2>
                        <div className="flex flex-col gap-4">
                            {data.certifications.map((cert, index) => (
                                <div key={index} className="flex gap-3 items-start text-sm">
                                    <ShieldCheck size={16} className="mt-0.5 shrink-0 opacity-40" />
                                    <div>
                                        <p className="font-medium text-gray-800 leading-tight">{cert.name}</p>
                                        <p className="text-xs text-gray-500">{cert.organization}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                    <section>
                        <h2 className="text-[11px] uppercase tracking-[0.3em] mb-6 font-bold" style={{ color: accentColor }}>
                            Expertise
                        </h2>
                        <div className="text-sm text-gray-600 leading-loose tracking-wide">
                            {data.skills.join("  /  ")}
                        </div>
                    </section>
                )}

                {/* Achievements */}
                {data.achievements && data.achievements.length > 0 && (
                    <section>
                        <h2 className="text-[11px] uppercase tracking-[0.3em] mb-6 font-bold" style={{ color: accentColor }}>
                            Achievements
                        </h2>
                        <ul className="space-y-4">
                            {data.achievements.map((ach, index) => (
                                <li key={index} className="flex gap-3 text-sm text-gray-600">
                                    <Award size={16} className="shrink-0 mt-0.5 opacity-40" />
                                    <span>{typeof ach === 'string' ? ach : (ach.description || ach.title)}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
}

export default MinimalTemplate;