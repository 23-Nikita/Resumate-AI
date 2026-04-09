import { createContext, useState } from "react";

export const AnalysisContext = createContext()

export const AnalysisProvider = ({children}) =>{
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState(null)
    const [reports, setReports] = useState([])

    return (
        <AnalysisContext.Provider value={{loading, setLoading, report , setReport , reports, setReports}}>
            {children}
        </AnalysisContext.Provider>
    )
}