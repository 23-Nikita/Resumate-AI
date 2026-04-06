import Resume from "../models/Resume.js";
import { model as ai } from "../configs/ai.js"; 
import {generateanalysisReport, generateResumePdf} from "../configs/gen-ai.js";
import AnalysisReport from "../models/analysisReport.js"
import fs from "fs";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfUtil = require('pdf-to-text'); // Sabse stable library


// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

       const response =  await ai.chat.completions.create({
         model : "gemini-3-flash-preview",
         messages:[
            {role: "system" , content:`You are an expert in resume writing. Enhance the following professional summary into 1-2 compelling, ATS-friendly sentences. Return ONLY the enhanced text. Summary: ${userContent}`},
            {
                role :"user", 
             content: userContent,
            }
         ]
        })        

        const enhancedContent = response.choices[0].message.content; 
        return res.status(200).json({ enhancedContent });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

       const response =  await ai.chat.completions.create({
         model : "gemini-3-flash-preview",
         messages:[
            {role: "system" , content:"You are an expert in resume writing. Your task is to enhace the  job description of a resume. The job description should be only in 1-2 sentence also highlighting key responsibility and achievements.Use action verbs and quantifiable results where possible. Make it ATS-friendly adn only return text no options or anything else."},
            {
                role :"user", 
             content: userContent,
            }
         ]
        })        

        const enhancedContent = response.choices[0].message.content; 
        return res.status(200).json({ enhancedContent });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// POST: /api/ai/upload-resume
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.user?._id;

        if (!resumeText) {
            return res.status(400).json({ message: "Resume text is missing" });
        }

        const systemPrompt = "You are an expert AI Agent. Your task is to extract professional data from any resume text and map it accurately to the provided JSON structure.";

        const userPrompt = `
        Extract data from this resume text: 
        ---
        ${resumeText}
        ---

        Provide data in the following JSON format strictly. Use empty strings or empty arrays if a field is not found.
        
        {
            "professional_summary": "",
            "skills": [], 
            "personal_info": {
                "full_name": "",
                "profession": "",
                "email": "",
                "phone": "",
                "location": "",
                "linkedin": "",
                "website": ""
            },
            "experience": [
                {
                    "company": "", 
                    "position": "",
                    "start_date": "",
                    "end_date": "",
                    "description": "",
                    "is_current": false
                }
            ],
            "project": [
                {
                   "name": "", 
                   "type": "",
                   "description": ""
                }
            ],
            "education": [
                {
                    "institution": "", 
                    "degree": "",
                    "field": "",
                    "graduation_date": "",
                    "gpa": ""
                }
            ],
            "certifications": [
                {
                    "name": "",
                    "issuer": "",
                    "date": ""
                }
            ],
            "achievements": [
                {
                    "title": "",
                    "description": ""
                }
            ]
        }`;

        const response = await ai.chat.completions.create({
            model: "gemini-3-flash-preview",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: 'json_object' }
        });

        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData);

        // Naya resume create karein with all fields
        const newResume = await Resume.create({
            userId,
            title: title || "Untitled AI Resume",
            ...parsedData
        });

        res.json({ resumeId: newResume._id });

    } catch (error) {
        console.error("AI Controller Error:", error);
        return res.status(500).json({ message: error.message });
    }
};


// POST: /api/interview (Report Generation)

export const analysisController = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "File missing!" });

        const { selfDescription, jobDescription, title } = req.body;

        // 1. PDF Extract
        const extractedText = await new Promise((resolve, reject) => {
            pdfUtil.pdfToText(req.file.path, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // 2. AI Report Generation
        const analysisReportByAi = await generateanalysisReport({
            resume: extractedText,
            selfDescription,
            jobDescription
        });

        // 3. DATA TRANSFORMATION (Strict Schema Match)
       
        const transformQuestions = (data) => {
    if (!Array.isArray(data)) return [];
    
    return data
        .filter(item => typeof item === 'object' && item !== null && item.question) // Sirf wahi lo jisme 'question' key ho
        .map(q => ({
            question: q.question,
            answer: q.answer || "Answer details coming soon...",
            intention: q.intention || "To evaluate specific role competencies."
        }));
};

        

        // 4. Database Entry
     // analysisController.js mein mapping update karein
// const analysisReport = await AnalysisReport.create({
//     user: req.user._id,
//     title: title || analysisReportByAi.title || "Resume Analysis",
//     resume: extractedText,
//     selfDescription,
//     jobDescription,
//     matchScore: Number(analysisReportByAi.matchScore || 0),

//     // 1. Technical Questions Fix
//     technicalQuestions: (analysisReportByAi.technicalQuestions || []).map(q => ({
//         question: typeof q === 'string' ? q : (q.question || "Technical Question"),
//         answer: q.answer || "Answer pending...",
//         intention: q.intention || "Assess core concepts"
//     })),

//     // 2. Behavioral Questions Fix
//     behavioralQuestions: (analysisReportByAi.behavioralQuestions || []).map(q => ({
//         question: typeof q === 'string' ? q : (q.question || "Behavioral Question"),
//         answer: q.answer || "Answer pending...",
//         intention: q.intention || "Assess soft skills"
//     })),

//     // 3. PREPARATION PLAN FIX (Yahan error hai)
//     preparationPlan: Array.isArray(analysisReportByAi.preparationPlan) 
//         ? analysisReportByAi.preparationPlan.map((p, index) => ({
//             day: Number(p.day) || index + 1, // Agar 'day' string hai toh Number mein convert karega
//             focus: p.focus || "Interview Prep",
//             tasks: Array.isArray(p.tasks) ? p.tasks : ["Review key topics"]
//         }))
//         : [{ day: 1, focus: "General Preparation", tasks: ["Review resume and projects"] }], // Default agar AI fail ho jaye

//     skillsGaps: (analysisReportByAi.skillsGaps || []).map(s => ({
//         skill: typeof s === 'string' ? s : (s.skill || "Missing Skill"),
//         severity: s.severity || "medium"
//     }))
// });
// analysisController.js mein mapping se pehle ye line dalo:
// console.log("AI DATA CHECK:", JSON.stringify(analysisReportByAi, null, 2));
// Controller mein mapping ko aise update karein:
// const analysisReport = await AnalysisReport.create({
//     user: req.user._id,
//     title: title || analysisReportByAi.title || "Resume Analysis",
//     resume: extractedText,
//     selfDescription,
//     jobDescription,
//     matchScore: Number(analysisReportByAi.matchScore || 0),

//     // 1. Technical Questions: AI ke array ko directly map karein
//     technicalQuestions: (analysisReportByAi.technicalQuestions || []).map(q => ({
//         question: q.question || "Technical Question",
//         answer: q.answer || "No detailed answer provided by AI",
//         intention: q.intention || "General technical evaluation"
//     })),

//     // 2. Behavioral Questions
//     behavioralQuestions: (analysisReportByAi.behavioralQuestions || []).map(q => ({
//         question: q.question || "Behavioral Question",
//         answer: q.answer || "No answer provided",
//         intention: q.intention || "Soft skills check"
//     })),

//     // 3. PREPARATION PLAN (Roadmap Fix)
//     // Yahan "Review key topics" hta diya hai taaki AI ka asli data dikhe
   
//     preparationPlan: Array.isArray(analysisReportByAi.preparationPlan) 
//     ? analysisReportByAi.preparationPlan.map((p, index) => {
//         // Safety: Agar AI ne 'day' nahi bheja, toh hum index + 1 use karenge
//         const dayNumber = Number(p.day) || (index + 1); 
        
//         return {
//             day: dayNumber, 
//             focus: p.focus || "Interview Preparation",
//             tasks: Array.isArray(p.tasks) && p.tasks.length > 0 
//                    ? p.tasks 
//                    : ["Review specific project modules"]
//         };
//     })
//     : [{ day: 1, focus: "General Preparation", tasks: ["Review resume and projects"] }],

//     // 4. SKILLS GAPS
//     skillsGaps: (analysisReportByAi.skillsGaps || []).map(s => ({
//         skill: s.skill || "Skill identified by AI",
//         severity: s.severity || "medium"
//     }))
// });
// analysisController.js mein mapping ko isse replace karein
const processFlatArray = (arr, fields) => {
    const result = [];
    if (!Array.isArray(arr)) return result;
    
    // Agar AI ne ["key", "value", "key", "value"] format bheja hai (jo aapke log mein dikh raha hai)
    for (let i = 0; i < arr.length; i += fields.length * 2) {
        let obj = {};
        fields.forEach((field, index) => {
            // Hum "field name" ke agle index se "value" uthayenge
            const keyIndex = arr.indexOf(field, i);
            if (keyIndex !== -1 && keyIndex + 1 < arr.length) {
                obj[field] = arr[keyIndex + 1];
            }
        });
        if (Object.keys(obj).length > 0) result.push(obj);
    }
    return result;
};
// analysisController.js

const analysisReport = await AnalysisReport.create({
    user: req.user._id,
    // Error yahan tha: title aur jobDescription missing the ya undefined the
    title: title || analysisReportByAi.title || "Resume Analysis", 
    jobDescription: jobDescription || "No description provided", 
    resume: extractedText,
    selfDescription: selfDescription || "",
    matchScore: Number(analysisReportByAi.matchScore || 0),

    // Baki mapping jo maine pehle di thi (Flat Array handling ke saath)
    technicalQuestions: Array.isArray(analysisReportByAi.technicalQuestions) && typeof analysisReportByAi.technicalQuestions[0] === 'string'
        ? processFlatArray(analysisReportByAi.technicalQuestions, ["question", "answer", "intention"])
        : analysisReportByAi.technicalQuestions,

    behavioralQuestions: Array.isArray(analysisReportByAi.behavioralQuestions) && typeof analysisReportByAi.behavioralQuestions[0] === 'string'
        ? processFlatArray(analysisReportByAi.behavioralQuestions, ["question", "answer", "intention"])
        : analysisReportByAi.behavioralQuestions,

    preparationPlan: Array.isArray(analysisReportByAi.preparationPlan) && typeof analysisReportByAi.preparationPlan[0] === 'string'
        ? processFlatArray(analysisReportByAi.preparationPlan, ["day", "focus", "tasks"])
        : (analysisReportByAi.preparationPlan || []),

    skillsGaps: Array.isArray(analysisReportByAi.skillsGaps) && typeof analysisReportByAi.skillsGaps[0] === 'string'
        ? processFlatArray(analysisReportByAi.skillsGaps, ["skill", "severity"])
        : (analysisReportByAi.skillsGaps || [])
});
// const analysisReport = await AnalysisReport.create({
//     user: req.user._id,
//     matchScore: Number(analysisReportByAi.matchScore || 0),

//     // 1. Technical Questions Fix
//     technicalQuestions: Array.isArray(analysisReportByAi.technicalQuestions) && typeof analysisReportByAi.technicalQuestions[0] === 'string'
//         ? processFlatArray(analysisReportByAi.technicalQuestions, ["question", "answer", "intention"])
//         : analysisReportByAi.technicalQuestions,

//     // 2. Behavioral Questions Fix
//     behavioralQuestions: Array.isArray(analysisReportByAi.behavioralQuestions) && typeof analysisReportByAi.behavioralQuestions[0] === 'string'
//         ? processFlatArray(analysisReportByAi.behavioralQuestions, ["question", "answer", "intention"])
//         : analysisReportByAi.behavioralQuestions,

//     // 3. Preparation Plan Fix
//     preparationPlan: Array.isArray(analysisReportByAi.preparationPlan) && typeof analysisReportByAi.preparationPlan[0] === 'string'
//         ? processFlatArray(analysisReportByAi.preparationPlan, ["day", "focus", "tasks"])
//         : (analysisReportByAi.preparationPlan || []).map((p, i) => ({
//             day: p.day || i + 1,
//             focus: p.focus || "Prep",
//             tasks: Array.isArray(p.tasks) ? p.tasks : [p.tasks]
//           })),

//     // 4. Skills Gaps Fix
//     skillsGaps: Array.isArray(analysisReportByAi.skillsGaps) && typeof analysisReportByAi.skillsGaps[0] === 'string'
//         ? processFlatArray(analysisReportByAi.skillsGaps, ["skill", "severity"])
//         : analysisReportByAi.skillsGaps
// });

        console.log("SUCCESS: Database validation passed! Dashboard setup complete. ✨");
        return res.status(201).json({ message: "Success!", analysisReport });

    } catch (error) {
        console.error("Main Controller Error:", error.message); 
        if (!res.headersSent) {
            return res.status(500).json({ message: error.message });
        }
    }
};
// export const analysisController = async (req, res) => {
//     try {
//         if (!req.file) return res.status(400).json({ message: "File missing!" });

//         const { selfDescription, jobDescription, title } = req.body;

//         // 1. PDF Extract karne ko Promise mein badal diya taaki Node.js RUKKE
//         const extractedText = await new Promise((resolve, reject) => {
//             pdfUtil.pdfToText(req.file.path, (err, data) => {
//                 if (err) reject(err);
//                 else resolve(data);
//             });
//         });

//         // 2. DEBUG: Terminal mein check karo text aa raha hai ya nahi
//         console.log("DEBUG: Extracted Text Length ->", extractedText?.length);
//         
//         if (!extractedText || extractedText.trim().length === 0) {
//              throw new Error("PDF parse toh hui par text khali mila. Ek baar file check karein.");
//         }

//         // 3. AI Report Generation (Ab ye pakka wait karega)
//         // const analysisReportByAi = await generateanalysisReport({
//             
//         //     resume: extractedText,
//         //     selfDescription,
//         //     jobDescription
//         // });
//         // // console.log("AI RESPONSE CHECK:", analysisReportByAi);

//         // // 4. Database Entry
//         // // 4. Database Entry - Mapping AI response to your Schema
//         // const analysisReport = await AnalysisReport.create({
//         //     user: req.user._id,
//         //     title: title || "Resume Analysis",
//         //     resume: extractedText,
//         //     selfDescription,
//         //     jobDescription,
//         //     matchScore: analysisReportByAi.matchScore, 
//         //     technicalQuestions: analysisReportByAi.technicalQuestions,
//         //     behavioralQuestions: analysisReportByAi.behavioralQuestions,
//         //     skillsGaps: analysisReportByAi.skillsGaps,
//         //     preparationPlan: analysisReportByAi.preparationPlan,

//         //     // AI ke naye response fields ko yahan map kar rahe hain:
//         //     // technicalQuestions: analysisReportByAi.evaluation || [], 
//         //     // overallScore: 85, // Score calculation logic baad mein dal sakte hain
//         //     // analysisData: analysisReportByAi.job_fit || "No fit data provided",
//             
//         //     // // Baki fields ko safety ke liye spread kar rahe hain
//         //     // ...analysisReportByAi 
//         // });
//         // ... (extractedText wala part sahi hai)

// // 3. AI Report Generation
// const analysisReportByAi = await generateanalysisReport({
//     resume: extractedText,
//     selfDescription,
//     jobDescription
// });

// // 4. Database Entry - Mapping AI response to your Schema
// // const analysisReport = await AnalysisReport.create({
// //     user: req.user._id,
// //     title: title || analysisReportByAi.title || "Resume Analysis",
// //     resume: extractedText,
// //     selfDescription,
// //     jobDescription,
//     
// //     // YAHAN DHAYAN DEIN: Agar AI field nahi bhejta toh default value set karein
// //     matchScore: analysisReportByAi.matchScore || 0, 
// //     technicalQuestions: analysisReportByAi.technicalQuestions || [],
// //     behavioralQuestions: analysisReportByAi.behavioralQuestions || [],
// //     skillsGaps: analysisReportByAi.skillsGaps || [],
// //     preparationPlan: analysisReportByAi.preparationPlan || [],
// // });
// // aiController.js ke andar
// // analysisController.js mein generateanalysisReport ke baad:
// console.log("ACTUAL AI RESPONSE KEYS:", Object.keys(analysisReportByAi));
// console.log("FULL AI RESPONSE:", JSON.stringify(analysisReportByAi, null, 2));
// const analysisReport = await AnalysisReport.create({
//     user: req.user._id,
//     title: title || analysisReportByAi.title || "Resume Analysis",
//     resume: extractedText,
//     selfDescription,
//     jobDescription,
//     
//     // Fallback logic: Agar technicalQuestions nahi mila toh dusri possibilities check karein
//     matchScore: Number(analysisReportByAi.matchScore || analysisReportByAi.score || 0),

//     technicalQuestions: analysisReportByAi.technicalQuestions || 
//                         analysisReportByAi.technical_questions || 
//                         analysisReportByAi.technicalQuestionsList || [],

//     behavioralQuestions: analysisReportByAi.behavioralQuestions || 
//                          analysisReportByAi.behavioral_questions || [],

//     skillsGaps: analysisReportByAi.skillsGaps || 
//                 analysisReportByAi.skill_gaps || 
//                 analysisReportByAi.skills_gap || [],

//     preparationPlan: analysisReportByAi.preparationPlan || 
//                      analysisReportByAi.preparation_plan || 
//                      analysisReportByAi.studyPlan || [],
// });

//         // console.log("Report Saved Successfully in DB!");
//     //     const analysisReport = await AnalysisReport.create({
//     //         user: req.user._id,
//     //         title: title || "Resume Analysis",
//     //         resume: extractedText,
//     //         selfDescription,
//     //         jobDescription,
//     //         // AI Response ke fields ko apne Model ke fields mein map karo:
//     // technicalQuestions: analysisReportByAi.technical_skill_assessment, 
//     // overallScore: 90, // Ya fir AI se score mangwayein
//     // analysisData: analysisReportByAi.job_fit_analysis,
//     // // ... jo bhi aapke model ke fields hains
//     //         ...analysisReportByAi
//     //     });

//         // 5. Success Response
//         return res.status(201).json({ message: "Success!", analysisReport });

//     } catch (error) {
//         console.error("Main Controller Error:", error.message);
//         if (!res.headersSent) {
//             return res.status(500).json({ message: error.message });
//         }
//     }
// };
// export const analysisController = async(req, res) => {
//     try {
//         // if (!req.file) {
//         //     return res.status(400).json({ message: "Please upload a resume file." });
//         // }
//         if (!req.file) {
//             return res.status(400).json({ message: "Please upload a resume file." });
//         }
// // const data = await parsePdf(req.file.buffer);
//         // const data = await pdf(req.file.buffer); 
//         // const data = await pdfParse(req.file.buffer);
//         // const resumeContent = data.text;
//         // const data = await pdf(req.file.buffer); 
//         // const resumeContent = data.text;
//         // const resumeContent = req.file.buffer.toString("utf-8");
//         // const resumeContent = fs.readFileSync(req.file.path, "utf-8");
//          const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
//         const { selfDescription, jobDescription, title } = req.body;

//         const analysisReportByAi = await generateanalysisReport({
//             resume: resumeContent,
//             selfDescription,
//             jobDescription
//         });

//         const analysisReport = await AnalysisReport.create({
//             user: req.user._id, // Fixed: Using _id
//              title: title || "Resume Analysis",
//             resume: resumeContent, // Fixed: pdf-parse text is already a string
//             selfDescription,
//             jobDescription,
//             ...analysisReportByAi
//         });

//         res.status(201).json({
//             message: "Analysis Report Generated Successfully",
//             analysisReport
//         });
//     } catch (error) {
//         console.error("Analysis Controller Error:", error.message);
//         res.status(500).json({ message: "Error generating analysis report." });
//     }
// }

// GET: /api/interview/report/:interviewId
export const getAnalysisReportbyIdController = async(req, res) => {
    try {
        const { interviewId } = req.params;

        // Fixed: Using _id and safe check for req.user
        const analysisReport = await AnalysisReport.findOne({ 
            _id: interviewId, 
            user: req.user._id 
        });

        if (!analysisReport) {
            return res.status(404).json({
                message: "Analysis report not found."
            });
        }

        res.status(200).json({
            message: "Analysis report fetched successfully.",
            analysisReport
        });
    } catch (error) {
        console.error("Get Report By ID Error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// GET: /api/interview
export const getAllAnalysisReportController = async(req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const analysisReports = await AnalysisReport.find({
            user: req.user._id // Fixed: Using _id
        })
        .sort({ createdAt: -1 })
        .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillsGaps -preparationPlan");

        res.status(200).json({
            message: "Analysis reports fetched successfully.",
            analysisReports
        });
    } catch (error) {
        console.error("Get All Reports Error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//pdf generation controller 

export const generateResumePdfController = async(req, res)=>{
    const {interviewReportId} = req.params
    const analysisReport = await AnalysisReport.findById(interviewReportId)

    if(!analysisReport){
        return res.status(404).json({
            message: "Analysis report not found."
        })
    }

    const {resume , jobDescription , selfDescription } = analysisReport
    const pdfBuffer = await generateResumePdf({resume , jobDescription , selfDescription})

    res.set({
        "Content-Type" : "application/pdf",
        "Content-Dispostion": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)

}