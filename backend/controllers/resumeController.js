// import imagekit from "../configs/imageKit.js";
// import Resume from "../models/Resume.js";
// import fs from "fs";

// //controller for creating a new resume
// //POST: //api/resumes/create



// export const createResume = async(req , res)=>{
//     try{
//       const userId = req.userId;
//       const{title}=req.body;

//       //create new resume
//       const newResume = await Resume.create({userId, title })
//       //return sucess message
//       return res.status(201).json({message:"Resume created sucessfully", 
//         resume: newResume
//       })
//     } catch(error){
//         return res.status(400).json({message: error.message})
//     }
// }


// //controller for deleting a resume
// //DELETE: //api/resumes/delete

// export const deleteResume = async(req , res)=>{
//     try{
//       const userId = req.userId;
//       const{resumeId}=req.params;

//       await Resume.findOneAndDelete({userId, _id: resumeId})

//       //return sucess message
//       return res.status(200).json({message:"Resume  deleted sucessfully" })
//     } catch(error){
//         return res.status(400).json({message: error.message})
//     }
// }

// //get user resume by id 
// //GET: //api/resumes/get

// export const getResumeById = async(req , res)=>{
//     try{
//       const userId = req.userId;
//       const{resumeId}=req.params;

//       const resume = await  Resume.findOne({userId, _id: resumeId})
//       if(!resume){
//         return res.status(404).json({message: "Resume not found"})
//       }   
//       resume.__v = undefined;
//       resume.createdAt = undefined;
//       resume.updatedAt = undefined;


//       return res.status(200).json({resume})
//     } catch(error){
//         return res.status(400).json({message: error.message})
//     }
// }


// //get resume by id public
// //GET: /api/resumes/public

// export const getPublicResumeById = async(req, res)=>{
//     try{
//         const {id} = req.params;
//         const resume = await Resume.findOne({public:true, _id: id})

//         if(!resume){
//         return res.status(404).json({message: "Resume not found"})
//       }  
//       return res.status(200).json({resume})
//     }catch(error){
//         return res.status(400).json({message: error.message})
//     }
// }

// //controller for updating a resume
// //PUT: /api/resumes/update

// export const updateResume = async(req,res)=>{
//     try{
//         const userId = req.user._id;
//         const {resumeId, resumeData , removeBackground} = req.body
//         const image = req.file;
        
//         let resumeDataCopy;
//         if(typeof resumeData === "string"){
//           resumeDataCopy = await JSON.parse(resumeData)
//         } else{
//           resumeDataCopy= structuredClone(resumeData)
//         }

//         if(image){
//             const imageBufferData = fs.createReadStream(image.path)
//             const response = await imagekit.files.upload({
//              file: imageBufferData,
//               fileName: 'resume.jpg',
//               folder: "user-resumes",
//               transformation:{
//                 pre :"w-300, h-300, fo-face, z-0.75" +(removeBackground ? ", e-bgremove" : "" )
//               }

//               });

//               resumeDataCopy.personal_info.image = response.url

//         }

//        const  resume =  await Resume.findOneAndUpdate({userId , _id: resumeId}, resumeDataCopy,
//         {new:true})

//          return res.status(200).json({message:"Saved sucessfully", resume})
//     }catch(error){
//              return res.status(400).json({message: error.message})

//     }
// }

import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

// NOTE: Make sure your auth middleware sets req.user
const getUserId = (req) => req.user?._id || req.userId;

// POST: /api/resumes/create
export const createResume = async (req, res) => {
    try {
        const userId = getUserId(req);
        const { title } = req.body;

        const newResume = await Resume.create({ userId, title });
        return res.status(201).json({ 
            message: "Resume created successfully", 
            resume: newResume 
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// DELETE: /api/resumes/:resumeId
export const deleteResume = async (req, res) => {
    try {
        const userId = getUserId(req);
        const { resumeId } = req.params;

        const deleted = await Resume.findOneAndDelete({ userId, _id: resumeId });
        if (!deleted) return res.status(404).json({ message: "Resume not found" });

        return res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// GET: /api/resumes/:resumeId
export const getResumeById = async (req, res) => {
    try {
        const userId = getUserId(req);
        const { resumeId } = req.params; // Make sure this matches your route (:resumeId)

        const resume = await Resume.findOne({ userId, _id: resumeId });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        // Cleaner way to remove fields
        const resumeObj = resume.toObject();
        delete resumeObj.__v;
        delete resumeObj.createdAt;
        delete resumeObj.updatedAt;

        return res.status(200).json({ resume: resumeObj });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// GET: /api/resumes/public/:resumeId
export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params; // Changed 'id' to 'resumeId' to stay consistent
        const resume = await Resume.findOne({ public: true, _id: resumeId });

        if (!resume) {
            return res.status(404).json({ message: "Public resume not found" });
        }
        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
    try {
        const userId = getUserId(req);
        // Frontend should send resumeId in the body or params
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;

        let resumeDataCopy;
        if (typeof resumeData === "string") {
            resumeDataCopy = JSON.parse(resumeData);
        } else {
            resumeDataCopy = structuredClone(resumeData);
        }

        if (image) {
            const imageBufferData = fs.createReadStream(image.path);
            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: `resume_${resumeId}.jpg`,
                folder: "user-resumes",
                transformation: {
                    pre: `w-300,h-300,fo-face,z-0.75${removeBackground === 'true' ? ",e-bgremove" : ""}`
                }
            });
            
            // Ensure personal_info exists before assigning image
            if (!resumeDataCopy.personal_info) resumeDataCopy.personal_info = {};
            resumeDataCopy.personal_info.image = response.url;
            
            // Cleanup temp file after upload
            fs.unlinkSync(image.path);
        }

        const resume = await Resume.findOneAndUpdate(
            { userId, _id: resumeId }, 
            { $set: resumeDataCopy }, // Use $set for safer updates
            { new: true, runValidators: true }
        );

        if (!resume) return res.status(404).json({ message: "Resume not found to update" });

        return res.status(200).json({ message: "Saved successfully", resume });
    } catch (error) {
        console.error("Update Error:", error);
        return res.status(400).json({ message: error.message });
    }
}