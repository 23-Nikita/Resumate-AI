import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // ❌ Pehle: req.userId = decoded.userId; 
        
        // ✅ Ab: req.user object banaiye taaki controller ko _id mil sake
        // Note: Check kijiye login ke waqt aapne 'id' use kiya tha ya 'userId'
        req.user = { _id: decoded.id || decoded.userId }; 
        
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

export default protect;