
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Award, ShieldCheck, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr || typeof dateStr !== 'string') return "";
        try {
            const parts = dateStr.split("-");
            const year = parts[0];
            const month = parts[1] || 1;
            return new Date(year, month - 1).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short"
            });
        } catch (e) {
            return dateStr;
        }
    };

    return (
        /* h-auto ensures the page grows with content */
        <div className="max-w-4xl mx-auto p-10 bg-white text-gray-800 leading-relaxed shadow-lg my-4 h-auto">
            
            {/* Header - No Top Line, Line only under Personal Info */}
            <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: accentColor }}>
                <h1 className="text-4xl font-extrabold mb-2 uppercase tracking-tight" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <p className="text-lg font-semibold text-gray-600 uppercase tracking-widest mb-4">
                    {data.personal_info?.profession || "Full Stack Developer"}
                </p>

                <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 text-sm text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail className="size-4" style={{ color: accentColor }} />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone className="size-4" style={{ color: accentColor }} />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1.5">
                            <MapPin className="size-4" style={{ color: accentColor }} />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 text-sm mt-3">
                    {data.personal_info?.linkedin && (
                        <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-medium text-gray-700 no-underline hover:text-black">
                            <Linkedin className="size-4" style={{ color: accentColor }} /> LinkedIn
                        </a>
                    )}
                    {data.personal_info?.github && (
                        <a href={data.personal_info.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-medium text-gray-700 no-underline hover:text-black">
                            <Github className="size-4" style={{ color: accentColor }} /> GitHub
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a href={data.personal_info.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-medium text-gray-700 no-underline hover:text-black">
                            <Globe className="size-4" style={{ color: accentColor }} /> Portfolio
                        </a>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-8">
                    <h2 className="text-md font-bold mb-3 inline-block" style={{ color: accentColor }}>
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-gray-700 text-sm leading-relaxed text-justify no-underline">{data.professional_summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-md font-bold mb-4 inline-block" style={{ color: accentColor }}>
                        PROFESSIONAL EXPERIENCE
                    </h2>
                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-900 text-base no-underline">{exp.position}</h3>
                                    <span className="text-sm font-semibold text-gray-600">
                                        {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-gray-800 font-bold text-sm italic mb-2 no-underline">{exp.company}</p>
                                {exp.description && (
                                    <div className="text-gray-700 text-sm whitespace-pre-line leading-relaxed text-justify no-underline">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects Section */}
            {data.project && data.project.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-md font-bold mb-4 inline-block" style={{ color: accentColor }}>
                        KEY PROJECTS
                    </h2>
                    <div className="space-y-6">
                        {data.project.map((proj, index) => (
                            <div key={index} className="text-sm">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-gray-900 uppercase no-underline">{proj.name}</h3>
                                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-bold no-underline">{proj.type}</span>
                                    </div>
                                    <div className="flex gap-3">
                                        {proj.github_link && (
                                            <a href={proj.github_link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[11px] text-gray-600 no-underline hover:text-black font-semibold border px-2 py-0.5 rounded">
                                                Source
                                            </a>
                                        )}
                                        {proj.live_link && (
                                            <a href={proj.live_link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[11px] text-gray-600 no-underline hover:text-black font-semibold border px-2 py-0.5 rounded">
                                                Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed text-justify no-underline">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-md font-bold mb-4 inline-block" style={{ color: accentColor }}>
                        EDUCATION
                    </h2>
                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start text-sm">
                                <div>
                                    <h3 className="font-bold text-gray-900 no-underline">{edu.degree}</h3>
                                    <p className="text-gray-700 no-underline">{edu.institution}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-600">{formatDate(edu.graduation_date)}</p>
                                    <p className="text-gray-500 italic">{edu.gpa && `GPA: ${edu.gpa}`}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-md font-bold mb-3 inline-block" style={{ color: accentColor }}>
                        CORE SKILLS
                    </h2>
                    <div className="flex gap-2 flex-wrap mt-1">
                        {data.skills.map((skill, index) => (
                            <span key={index} className="text-[12px] font-semibold text-gray-700 border border-gray-200 px-3 py-1 rounded-sm no-underline shadow-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-md font-bold mb-4 inline-block" style={{ color: accentColor }}>
                        CERTIFICATIONS
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.certifications.map((cert, index) => (
                            <div key={index} className="text-sm flex items-start gap-3 pl-0">
                                <ShieldCheck className="size-5 shrink-0" style={{ color: accentColor }} />
                                <div>
                                    <h3 className="font-bold text-gray-900 leading-tight no-underline">{cert.name}</h3>
                                    <p className="text-gray-600 text-xs no-underline">{cert.organization} {cert.issue_date && `| ${formatDate(cert.issue_date)}`}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Achievements */}
            {data.achievements && data.achievements.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-md font-bold mb-3 inline-block" style={{ color: accentColor }}>
                        ACHIEVEMENTS
                    </h2>
                    <ul className="space-y-3">
                        {data.achievements.map((ach, index) => (
                            <li key={index} className="text-sm flex gap-3 text-gray-700 items-start">
                                <Award className="size-5 shrink-0" style={{ color: accentColor }} />
                                <span className="leading-relaxed no-underline">
                                    {typeof ach === 'string' ? ach : (ach.description || ach.title)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}

export default ClassicTemplate;