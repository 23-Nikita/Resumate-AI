import { GoogleGenAI } from "@google/genai";
import { zodToJsonSchema } from "zod-to-json-schema";
import {z} from "zod";
import puppeteer from "puppeteer";

const genAI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});


const analysisReportSchema=z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's  profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behaind asking this question"),
        answer:z.string().describe("How to answer this question, what points to cover , what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them "),
     behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behaind asking this question"),
        answer:z.string().describe("How to answer this question, what points to cover , what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them "),
    skillsGaps: z.array(z.object({
        skill:z.string().describe("The skill which the candidates is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap , i.e and how important is the skill for the  job role. 'high' means the skill is a core requirement and a dealbreaker, 'medium' means it is important but can be learned, and 'low' means it is a preferred or bonus skill. ")

})).describe("List of skill gaps in the candidate's profile along with their severity"),

preparationPlan: z.array(z.object(
    {
        day: z.number().describe("The day number in the preparation plan, strating from 1 "),
        focus:z.string().describe("The main focus of this day in the preparation plan , e.g. data structures, system design , mock interviews , STAR Method Practice or Mastering MERN Integration  "),
        tasks:z.array(z.string()).describe("List of tasks to be done on this day to follow the preperation plan , e.g. read a specific book, Solve 2 LeetCode medium problems on Arrays, Read documentation on Redis Caching , or Build a small prototype implementing Auth")
    }
)).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively "),
title: z.string().describe("The title of the job for which the analysis report is generated"),
})



export async function generateanalysisReport({ resume, selfDescription, jobDescription })  {

const prompt = `
Analyze the following candidate for a MERN Stack Developer role. 
Resume Data: ${resume}
Job Description: ${jobDescription}
Candidate Profile: ${selfDescription}

INSTRUCTIONS FOR CONTENT QUALITY:
1. 'matchScore': Calculate a realistic ATS score (0-100) based on skills and experience.
2. 'technicalQuestions': Generate 7-10 UNIQUE questions. 
   - 'question': Must be technical (e.g., "How did you handle image uploads in StaySpot?").
   - 'answer': Provide a HIGH-LEVEL technical answer using MERN concepts.
   - 'intention': Explain what the interviewer wants to test (e.g., "Testing knowledge of Cloudinary and Multer").
3. 'behavioralQuestions': Focus on teamwork, conflict, and problem-solving.
4. 'skillsGaps': Identify exactly what is missing from the JD in the Resume.
5. 'preparationPlan': 
   - Generate a 7-DAY roadmap. 
   - Each day MUST be different. 
   - Day 1: MERN Basics, Day 2: Advanced Auth, Day 3: Database Optimization, etc.
   - NO REPETITION of tasks. Use specific tasks like "Optimize ChatSphere socket connections".

STRICT JSON FORMAT (Return ONLY this):
{
  "matchScore": 85,
  "technicalQuestions": [
    { 
      "question": "string", 
      "answer": "string", 
      "intention": "string" 
    }
  ],
  "behavioralQuestions": [
    { 
      "question": "string", 
      "answer": "string", 
      "intention": "string" 
    }
  ],
  "skillsGaps": [
    { "skill": "string", "severity": "high/medium" }
  ],
  "preparationPlan": [
    { 
      "day": 1, 
      "focus": "Unique Focus Name", 
      "tasks": ["Specific Task 1", "Specific Task 2", "Specific Task 3"] 
    }
  ]
}`;    

    const response = await genAI.models.generateContent({
        model:  "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(analysisReportSchema)
        }
    });

     return JSON.parse(response.text)
};


async function generatePdfFromHtml(htmlContent){
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, {waitUntil: "networkidle0"})

    const pdfBuffer = await page.pdf({format:"A4", margin:{
          top: "20mm",
          bottom:"20mm",
          left: "15mm",
          right:"15mm"
    }})

    await browser.close()
    return pdfBuffer


}




export async function generateResumePdf({resume, selfDescription, jobDescription}){
    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate a resume for a candidate with the following details:
                     Resume: ${resume}
                     self Description: ${selfDescription}
                     Job Description: ${jobDescription} 
                     
                     the  format shuould be a JSON object with a single field "html" which contains the HTML content of the resume which 
                     can be converted to PDF using any library like puppeteer.
                     The resume should be tailored for the given job description and should highlight the candidate's strengths 
                      and relevant experience. The HTML content should be well-formatted and structured, making it easy to read
                       and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
    
    `
   const response = await  genAI.models.generateContent({
    model: "gemini-3-flash-preview",
    contents:prompt,
    config:{
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(resumePdfSchema),
    }
   })

   const jsonContent = JSON.parse(response.text)

   const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

  return pdfBuffer

}



