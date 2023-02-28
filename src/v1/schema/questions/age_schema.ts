import mongoose, { Mongoose } from "mongoose"
const AgeSchema = mongoose.Schema

import validator from 'validator'

const ageSchema = new AgeSchema({

    age: {
        type: String,
        required: [true, "Age is required"],
        unique: [true, "Age already exists"],
    }

}, { timestamps: true,})


export default mongoose.model('AgeSchema', ageSchema)