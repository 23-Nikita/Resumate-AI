import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    title: { type: String, default: "Untitled Resume" },
    public: { type: Boolean, default: false },
    template: { type: String, default: "classic" },
    accent_color: { type: String, default: "#3B82F6" },
    professional_summary: { type: String, default: "" },
    skills: [{ type: String }], 

    personal_info: {
        image: { type: String, default: "" },
        full_name: { type: String, default: "" },
        profession: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        location: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        github: { type: String, default: "" },    // NEW: Added GitHub Profile
        website: { type: String, default: "" },
    },

    experience: [
        {
            company: { type: String }, 
            postion: { type: String }, // Note: You might want to fix this to "position" later
            start_date: { type: String },
            end_date: { type: String },
            description: { type: String },
            is_current: { type: Boolean, default: false },
        }
    ],

    project: [
        {
           name: { type: String }, 
           type: { type: String },
           description: { type: String },
           github_link: { type: String, default: "" }, // NEW: GitHub Repo Link
           live_link: { type: String, default: "" },   // NEW: Live Demo Link
        }
    ],

    education: [
        {
            institution: { type: String }, 
            degree: { type: String },
            field: { type: String },
            graduation_date: { type: String }, 
            gpa: { type: String },
        }
    ],

    // NEW: Added Certifications Section
    certifications: [
        {
            name: { type: String },
            organization: { type: String },
            issue_date: { type: String },
            certificate_link: { type: String, default: "" }
        }
    ],

    // NEW: Added Achievements Section
    achievements: [
        {
            title: { type: String },
            description: { type: String }
        }
    ],

    // NEW: Added Languages (Optional but good for general resumes)
    languages: [{ type: String }]

}, { timestamps: true, minimize: false });

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;