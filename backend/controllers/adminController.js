import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Admin from "../models/admin.model.js"
import Course from "../models/course.model.js"



export const signup = async (req, res) => {
    try {
        const { firstName,lastName, email, password } = req.body

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const existingAdmin = await User.findOne({ email })
        if (existingAdmin) {
            return res.status(409).json({
                message: "User Already Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await Admin.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_ADMIN_SECRET, { expiresIn: '1h' })

        return res.status(200).json({
            message: "Admin created successfully",
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

        const admin = await Admin.findOne({ email })

        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const verifyPassword = await bcrypt.compare(password, admin.password)

        if (!verifyPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_ADMIN_SECRET, { expiresIn: '1h' })

        return res.status(200).json({
            message: "Admin logged in successfully",
            token
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: error.message
        })
    }
}
 
export const createCourse = async () => {
     const adminId = req.userId
     const {title, description, imageUrl, price } = req.body


    const course =  await Course.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
     })


      res.json({
        success:true,
        message:"Course created succesfully",
        courseId: course._id
      })


}


export const updateCourse = async () =>{
      const adminId = req.userId
     const {title, description, imageUrl, price, courseId } = req.body
    
     const updateCourse = await Course.updateOne({
        _id: courseId,
        creatorId: adminId
     },{
        title: title,
        description: description,
        price: price, 
        imageUrl: imageUrl
     })

  
     res.json({
        message: "Course updated Succesfully",
        courseId: updateCourse._id
     })
}


export const getBulkCourse = async () => {
     const adminId = req.userId
     const courses = await Course.findOne({
        creatorId: adminId
     })

  
     res.json({
        message: "Got courses succesfylly",
        
     })
}