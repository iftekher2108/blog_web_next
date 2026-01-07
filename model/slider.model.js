import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    picture: {
        type: String,
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
        type: String,
        required: true,
    }
})

const Slider = mongoose.models.Slider || mongoose.model("Slider", sliderSchema)
export default Slider
