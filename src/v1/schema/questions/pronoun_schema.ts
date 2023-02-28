import mongoose, { Mongoose } from "mongoose"
const PronounSchema = mongoose.Schema

const pronounSchema = new PronounSchema({

    pronoun: {
        type: String,
        required: [true, "Pronoun name is required"],
        unique: [true, "Pronoun already exists"],
    }

}, { timestamps: true,})


export default mongoose.model('PronounSchema', pronounSchema)