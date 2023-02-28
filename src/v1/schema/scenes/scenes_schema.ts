import mongoose from "mongoose";
const ScenesSchema = mongoose.Schema;

const scenesSchema = new ScenesSchema({

    scene_name: {
        type: String,
        required: [true, "Scene Name is required"],
        unique: [true, "Scene Name exists"],
    },

    scene_url: {
        type: String,
        default: '',
    },

    file_type: {
        type: String,
        enum: ['mp4', 'gif',],
        default: null,
    } 


}, { timestamps: true,})

export default mongoose.model('ScenesSchema', scenesSchema)