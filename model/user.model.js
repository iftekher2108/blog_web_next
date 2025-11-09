import mongoose from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        index:true
    },
    mobile:{
        type:String,
        required:false,
        index:true
    },
    role: {
        type: String,
        enum: ['admin','editor','user'],
        default: 'user',
    },
    password:{
        type:String,
        required:true,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
},{
    timestamps: true
});

//Export the model
export default mongoose.models.User || mongoose.model('User', userSchema);