import mongoose, { Mongoose } from "mongoose"
const GenreSchema = mongoose.Schema

import validator from 'validator'

const genreSchema = new GenreSchema({

    genre: {
        type: String,
        required: [true, "Genre is required"],
        unique: [true, "Genre already exists"],
    }

}, { timestamps: true,})


export default mongoose.model('GenreSchema', genreSchema)