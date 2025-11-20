import mongoose  from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    banner: {
        type: String,
    },
    picture:{
        type:String,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
        }
    ],
    status: {
        type: String,
        required: true,
    }
},{
    timestamps: true
});
//Export the model
export default mongoose.models.Category || mongoose.model('Category', categorySchema);