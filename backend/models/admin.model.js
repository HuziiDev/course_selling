import mongoose from "mongoose";


const adminSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
       
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true})



const Admin = mongoose.model("Admin", adminSchema)

export default Admin


