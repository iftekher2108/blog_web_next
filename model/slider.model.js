import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
    name: {
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
    action1 :{type:String},
    action2: {type: String},
    status: {
        type: true,
        required: true,
    }
})

export default mongoose.model.Slider || mongoose.model("Slider",sliderSchema)
