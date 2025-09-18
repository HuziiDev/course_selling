import {mongoose} from "mongoose";
const ObjectId = mongoose.Types.ObjectId

const courseSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
       
    },
    price:{
        type: Number,
        required: true,
       
    },
    imageUrl:{
        type: String,
        
    },
    creatorId: ObjectId
},{timestamps: true})




const Course = mongoose.model("Course", courseSchema)

export default Course


