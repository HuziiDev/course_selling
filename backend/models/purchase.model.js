import {mongoose} from "mongoose";
const ObjectId = mongoose.Types.ObjectId

const purchaseSchema = mongoose.Schema({
  
    userId: ObjectId,
    courseId: ObjectId
},{timestamps: true})




const Purchase = mongoose.model("Purchase", purchaseSchema)

export default Purchase


