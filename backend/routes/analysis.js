import express from "express";
import protect from "../middlewares/authMiddleware.js"
import {analysisController, getAnalysisReportbyIdController , getAllAnalysisReportController,generateResumePdfController} from "../controllers/aiController.js"
import upload from '../configs/multer.js'


const analysisRouter = express.Router();

analysisRouter.post("/",  protect,upload.single("resume"), analysisController )

analysisRouter.get("/report/:interviewId",  protect, getAnalysisReportbyIdController)

analysisRouter.get("/" , protect , getAllAnalysisReportController)

// analysisRouter.post("/resume/pdf/:interviewReportId", protect ,generateResumePdfController )
analysisRouter.get("/resume/pdf/:interviewReportId", protect, generateResumePdfController);


export default analysisRouter;