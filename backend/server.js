import "dotenv/config";
import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRouter.js";
import aiRouter from "./routes/aiRoutes.js";
import analysisRouter from "./routes/analysis.js";



const app  = express();
const PORT = process.env.PORT || 3000;

//Database Connection 


await connectDB()



app.use(express.json())
app.use(cors())
app.get("/", (req, res)=> res.send("Server is live..."))
app.use('/api/users', userRouter )
app.use("/api/resumes" , resumeRouter)
app.use("/api/ai", aiRouter)
app.use("/api/interview", analysisRouter)


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})