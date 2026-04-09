import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import { useDispatch, useSelector } from 'react-redux'
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice.js'
import { Toaster } from "react-hot-toast"
import SelectionPage from './pages/SelectionPage' 
import Analyzer from './pages/Analyzer'
import Report from './pages/Report.jsx'
import ReportHistory from './pages/ReportHistory.jsx'
import { AnalysisProvider } from './context/AnalysisContext.jsx'
import SkillGapLearning from './pages/SkillGapLearning.jsx'
import About from './pages/About.jsx'
import ResumeMatchInsights from './pages/ResumeMatchInsights.jsx'

const App = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const getUserData = async () => {
    const token = localStorage.getItem("token")
    
    if (!token) {
      dispatch(setLoading(false)) 
      return
    }

    try {
      const { data } = await api.get('/api/users/data')
      if (data && data.user) {
        dispatch(login({ token, user: data.user }))
      }
    } catch (error) {
      console.log("Auth Check Error:", error.message)
      localStorage.removeItem("token")
    } finally {
      dispatch(setLoading(false)) 
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <AnalysisProvider>      
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />

        {/* /app routes setup */}
        <Route path='/app' element={<Layout />}>
          <Route index element={<SelectionPage />} /> 
          <Route path='builder' element={<Dashboard />} /> 
          <Route path='analyzer' element={<Analyzer />} />
          <Route path='reports' element={<ReportHistory />} />
          <Route path='interview/:interviewId' element={<Report />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
          <Route path="/app/insights" element={<ResumeMatchInsights/>} />
          <Route path="/app/learning" element={<SkillGapLearning />} />
          <Route path="/app/about" element={<About />} />
        </Route>

        <Route path='/view/:resumeId' element={<Preview />} />
        
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </AnalysisProvider>
  )
}

export default App