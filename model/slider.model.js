import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    picture: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
    },
    description: {
        type: String
    },
    actionLink :{type:String},
    actionLabel :{type:String},

    status: {
        type: true,
        required: true,
    }
})

export default mongoose.model.Slider || mongoose.model("Slider", sliderSchema)
