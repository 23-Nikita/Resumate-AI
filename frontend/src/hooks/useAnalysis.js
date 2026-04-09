
import { generateAnalysisReport, getAnalysisReportbyId, getAllAnalysisReports , generateResumePdf} from "../services/analysisService"
import { useContext, useCallback } from "react" 
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
    setLoading(true);
    try {
        await api.delete(`/api/interview/${id}`); 
        
        setReports(prev => prev.filter(r => r._id !== id)); 
        
    } catch (error) {
        console.error("Delete Error:", error.response?.data || error.message);
        alert("Failed to delete report.");
    } finally {
        setLoading(false);
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