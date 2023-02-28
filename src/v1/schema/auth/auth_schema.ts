import mongoose, { Mongoose } from "mongoose"
const AuthSchema = mongoose.Schema


import validator from 'validator'

const authSchema = new AuthSchema({


    admin: {
        type: Boolean,
        default: false
    },

    email: {
        type: String,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email!'
        },
        unique: [true, "Email already exists in database!"],
        required: [true, 'Email is required'],
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
    },

    name: {
        type: String,
        default: null
    },

    pronouns: {
        type: String,
        default: null
    },

    preferred_sleep_time: {
        type: String,
        default: null
    },

    age: {
        type: String,
        default: null
    },

    content: {
        type: [String],
        default: []
    },

    genre: {
        type: [String],
        default: []
    },

    scene_image_url: {
        type: String,
        default: null
    },


    country_code: {
        type: String,
        default: null
    },

    phone: {
        type: String,
        default: null
    },


    email_verified: {
        type: Boolean,
        default: false
    },

    phone_verified: {
        type: Boolean,
        default: false
    },

    email_verified_at: {
        type: Date,
        default: null
    },

    phone_verified_at: {
        type: Date,
        default: null
    },

    fcm_token: {
        type: String,
        default: null,
    },

    trial_accepted_date: {
        type: Date,
        default: null,
    },

    questions_completed: {
        type: Boolean,
        default: false
    },


}, { timestamps: true })


export default mongoose.model('AuthSchema', authSchema)