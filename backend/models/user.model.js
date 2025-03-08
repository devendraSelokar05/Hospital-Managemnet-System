import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type:String,
        enum: ["admin", "doctor", "patient", "nurse", "receptionist"],
        required: true
    },
    gender:{
        type:String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },
    profilePicture:{
        type:String,
        default: ""
    },
    phone:{
        type:Number,
    },
    address:{
        type:String,
    }
}, {timestamps: true});



userSchema.methods.Authtoken = function(){
  const token = jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
  return token

}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}

export const User = mongoose.model("User", userSchema);