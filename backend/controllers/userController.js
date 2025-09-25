import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'



export const signup = async (req, res) => {
    try {
        const { firstName,lastName, email, password } = req.body

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                message: "User Already Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_USER_SECRET, { expiresIn: '1h' })

        return res.status(200).json({
            message: "User created successfully",
            token
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: error.message
        })
    }
}



export const signin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const verifyPassword = await bcrypt.compare(password, user.password)

        if (!verifyPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_USER_SECRET, { expiresIn: '1h' })

        return res.status(200).json({
            message: "User logged in successfully",
            token
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: error.message
        })
    }
}
