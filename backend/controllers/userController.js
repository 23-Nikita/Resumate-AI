import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Resume from "../models/Resume.js"

// Token Generation Logic
const generateToken = (userId) => {
  // Payload mein 'userId' key use ho rahi hai
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
  return token;
}

// POST: /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      name, email, password: hashedPassword
    })

    const token = generateToken(newUser._id)
    newUser.password = undefined;

    return res.status(201).json({ 
      message: "User created successfully", 
      token,
      user: newUser 
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

// POST: /api/users/login 
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    // Yahan check karein ki aapke Model mein comparePassword method hai ya nahi
    // Agar nahi hai toh bcrypt.compare(password, user.password) use karein
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    const token = generateToken(user._id)
    user.password = undefined;

    return res.status(200).json({ 
      message: "Login successful", 
      token,
      user 
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

// GET: /api/users/data
// Isme hi 400 error aa raha tha
export const getUserById = async (req, res) => {
  try {
    // ✅ FIX: Middleware (protect) ne req.user._id set kiya hai
    const userId = req.user._id; 

    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    user.password = undefined;        
    return res.status(200).json({ user })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

// GET: /api/users/resumes
export const getUserResumes = async (req, res) => {
  try {
    // ✅ FIX: req.userId ki jagah req.user._id
    const userId = req.user._id;

    const resumes = await Resume.find({ userId })
    return res.status(200).json({ resumes })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}