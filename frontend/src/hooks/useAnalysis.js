// import { generateAnalysisReport, getAnalysisReportbyId, getAllAnalysisReports } from "../services/analysisService"
// import { useContext, useEffect } from "react"
// import { AnalysisContext } from "../context/AnalysisContext"
// import { useParams } from "react-router-dom"

// export const useAnalysis = () => {
//     const context = useContext(AnalysisContext)
//     // Corrected: useParams is a hook, it needs to be called
//     const { interviewId } = useParams() 
    
//     if (!context) {
//         throw new Error("useAnalysis must be used within an Analysis Provider")
//     }

//     const { loading, setLoading, report, setReport, reports, setReports } = context

//     // --- All functions must be INSIDE useAnalysis ---

//     const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
//         setLoading(true)
//         let response = null
//         try {
//             // Corrected: passing arguments as separate params or as expected by service
//             // response = await generateAnalysisReport(jobDescription, selfDescription, resumeFile)
//             response = await generateAnalysisReport(jobDescription, selfDescription, resumeFile);
//             setReport(response.analysisReport)
//             return response.analysisReport // Directly return the data
//         } catch (error) {
//             console.error("Error generating in analysis report:", error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     const getReportById = async (id) => {
//         setLoading(true)
//         try {
//             const response = await getAnalysisReportbyId(id)
//             setReport(response.analysisReport)
//             return response.analysisReport
//         } catch (error) {
//             console.error("Error fetching report by ID:", error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     const getReports = async () => {
//         setLoading(true)
//         try {
//             const response = await getAllAnalysisReports()
//             setReports(response.analysisReports)
//             return response.analysisReports
//         } catch (error) {
//             console.error("Error fetching all reports:", error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {    
//         if (interviewId) {
//             getReportById(interviewId);
//         } else {
//             getReports();
//         }
//     }, [interviewId]);

//     // This return is now INSIDE the useAnalysis function
//     return { loading, report, reports, generateReport, getReportById, getReports }
// }


import { generateAnalysisReport, getAnalysisReportbyId, getAllAnalysisReports , generateResumePdf} from "../services/analysisService"
import { useContext, useCallback } from "react" // useCallback add kiya
import { AnalysisContext } from "../context/AnalysisContext"
import api from "../configs/api"

export const useAnalysis = () => {
    const context = useContext(AnalysisContext)
    
    if (!context) {
        throw new Error("useAnalysis must be used within an Analysis Provider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    // 1. Generate Report Function (Wrapped in useCallback)
    const generateReport = useCallback(async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        try {
            const response = await generateAnalysisReport(jobDescription, selfDescription, resumeFile);
            setReport(response.analysisReport)
            return response.analysisReport 
        } catch (error) {
            console.error("Error generating analysis report:", error)
        } finally {
            setLoading(false)
        }
    }, [setLoading, setReport]);

    // 2. Get Single Report (Wrapped in useCallback)
    const getReportById = useCallback(async (id) => {
        setLoading(true)
        try {
            const response = await getAnalysisReportbyId(id)
            setReport(response.analysisReport)
            return response.analysisReport
        } catch (error) {
            console.error("Error fetching report by ID:", error)
        } finally {
            setLoading(false)
        }
    }, [setLoading, setReport]);

    // 3. Get All Reports (Wrapped in useCallback)
    const getReports = useCallback(async () => {
        setLoading(true)
        try {
            const response = await getAllAnalysisReports()
            setReports(response.analysisReports)
            return response.analysisReports
        } catch (error) {
            console.error("Error fetching all reports:", error)
        } finally {
            setLoading(false)
        }
    }, [setLoading, setReports]);

    // const getResumePdf = async(interviewReportId)=>{
    //     setLoading(true)
    //     let response = null
    //     try{
    //         response = await generateResumePdf({interviewReportId})
    //         const url= window.URL.createObjectURL(newBlob([response], {type: "application/pdf"}))
    //         const link= document.createAttribute.createElement("a")
    //         link.href= url
    //         link.setAttribute("download", `resume_${interviewReportId}.pdf`)
    //         document.body.appendChild(link)
    //         link.click()
    //     } catch(error){
    //         console.log(error)
    //     } finally{
    //         setLoading(false)
    //     }
    // }

    // NOTE: Yahan se useEffect hata diya hai. 
    // Iska logic ab seedha Report.jsx mein jayega.
         


    const getResumePdf = async (interviewReportId) => {
    setLoading(true)
    try {
        const response = await generateResumePdf({ interviewReportId })

        const blob = new Blob([response], { type: "application/pdf" })
        const url = window.URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", `resume_${interviewReportId}.pdf`)
        document.body.appendChild(link)
        link.click()
        link.remove()

    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
} 
const deleteReport = async (id) => {
    setLoading(true)
    try {
        await api.delete(`/api/analysis/${id}`)
        await getReports()
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
}
    return { 
        loading, 
        report, 
        reports, 
        generateReport, 
        getReportById, 
        getReports ,
        getResumePdf,
        deleteReport
    }
}