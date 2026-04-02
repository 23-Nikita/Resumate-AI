import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    // 1. Check karo ki token localStorage mein hai ya nahi
    const token = localStorage.getItem("token");

    // 2. Agar token nahi hai, toh user ko wapas "/login" bhej do
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 3. Agar token hai, toh jo page maanga hai (children) usey dikha do
    return children;
};

export default Protected;