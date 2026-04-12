import { Lock, Mail, User2Icon, ArrowRight, ChevronLeft } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from "../app/features/authSlice";
import api from "../configs/api";

const Login = () => {
    const dispatch = useDispatch()
    const query = new URLSearchParams(window.location.search);
    const urlState = query.get('state');
    const [state, setState] = React.useState(urlState || "login")

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await api.post(`/api/users/${state}`, formData)
            dispatch(login(data))
            localStorage.setItem('token', data.token)
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-[#020617] p-6 font-sans relative'>
            
            {/* Back to Home Button */}
            <Link 
                to="/" 
                className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-all font-bold text-[10px] uppercase tracking-[0.2em] group"
            >
                <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg group-hover:border-emerald-500/50 transition-all">
                    <ChevronLeft size={14} />
                </div>
                <span>Back to Home</span>
            </Link>

            {/* Background Glow */}
            <div className="absolute top-0 left-0 size-[400px] bg-emerald-500/5 blur-[120px] -z-10"></div>

            <div className="w-full max-w-[400px]">
                <form onSubmit={handleSubmit} className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl">
                    
                    <header className="text-center mb-8">
                        <h1 className="text-white text-3xl font-black tracking-tight">
                            {state === "login" ? "Welcome Back" : "Create Account"}
                        </h1>
                        <p className="text-slate-500 text-sm mt-2">
                            {state === "login" ? "Login to manage your resumes" : "Join ResuMate AI today"}
                        </p>
                    </header>

                    <div className="space-y-4">
                        {state !== "login" && (
                            <div className="flex items-center bg-slate-950/50 border border-slate-800 h-12 rounded-xl px-4 gap-3">
                                <User2Icon size={18} className="text-slate-600" />
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="Full Name" 
                                    className="bg-transparent border-none outline-none text-white w-full text-sm" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        )}

                        <div className="flex items-center bg-slate-950/50 border border-slate-800 h-12 rounded-xl px-4 gap-3">
                            <Mail size={18} className="text-slate-600" />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email Address" 
                                className="bg-transparent border-none outline-none text-white w-full text-sm" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className="flex items-center bg-slate-950/50 border border-slate-800 h-12 rounded-xl px-4 gap-3">
                            <Lock size={18} className="text-slate-600" />
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                className="bg-transparent border-none outline-none text-white w-full text-sm" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="mt-3 text-right">
                        <button type="button" className="text-[10px] font-bold text-slate-500 hover:text-emerald-500 transition-colors uppercase tracking-widest">
                            Forgot Password?
                        </button>
                    </div>

                    <button 
                        type="submit" 
                        className="mt-6 w-full h-12 rounded-xl text-[#020617] bg-emerald-500 font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                    >
                        {state === "login" ? "Login" : "Sign Up"}
                        <ArrowRight size={16} />
                    </button>

                    <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                        <p className="text-slate-500 text-xs">
                            {state === "login" ? "New here?" : "Already have an account?"}
                            <button 
                                type="button"
                                onClick={() => setState(prev => prev === "login" ? "register" : "login")} 
                                className="ml-1 text-emerald-500 hover:underline font-bold"
                            >
                                {state === "login" ? "Create Account" : "Login Now"}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login