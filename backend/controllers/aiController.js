import Resume from "../models/Resume.js";
import { model as ai } from "../configs/ai.js"; 
import {generateanalysisReport, generateResumePdf} from "../configs/gen-ai.js";
import AnalysisReport from "../models/analysisReport.js"
import fs from "fs";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfUtil = require('pdf-to-text'); 


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

        

       
const processFlatArray = (arr, fields) => {
    const result = [];
    if (!Array.isArray(arr)) return result;
    
    for (let i = 0; i < arr.length; i += fields.length * 2) {
        let obj = {};
        fields.forEach((field, index) => {
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
    title: title || analysisReportByAi.title || (jobDescription ? jobDescription.split('\n')[0].substring(0, 50) : "Resume Analysis"),
    jobDescription: jobDescription || "No description provided", 
    resume: extractedText,
    selfDescription: selfDescription || "",
    matchScore: Number(analysisReportByAi.matchScore || 0),

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


        console.log("SUCCESS: Database validation passed! Dashboard setup complete. ✨");
        return res.status(201).json({ message: "Success!", analysisReport });

    } catch (error) {
        console.error("Main Controller Error:", error.message); 
        if (!res.headersSent) {
            return res.status(500).json({ message: error.message });
        }
    }
};






// GET: /api/interview/report/:interviewId
export const getAnalysisReportbyIdController = async(req, res) => {
    try {
        const { interviewId } = req.params;


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
            user: req.user._id 
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



export const deleteAnalysisController = async (req, res) => {
    try {
        const { id } = req.params; 
        
        const deletedReport = await AnalysisReport.findByIdAndDelete(id); 

        if (!deletedReport) {
            return res.status(404).json({ message: "Report not found in database" });
        }

        res.status(200).json({ message: "Report deleted successfully from DB" });
    } catch (error) {
        res.status(500).json({ message: "Server error during deletion", error: error.message });
    }
};