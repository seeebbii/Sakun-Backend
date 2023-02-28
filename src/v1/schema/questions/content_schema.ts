import mongoose, { Mongoose } from "mongoose"
const ContentSchema = mongoose.Schema

import validator from 'validator'

const contentSchema = new ContentSchema({

    type: {
        type: String,
        required: [true, "Type is required"],
        unique: [true, "Content Type already exists"],
    }

}, { timestamps: true,})


export default mongoose.model('ContentSchema', contentSchema)