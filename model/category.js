import mongoose  from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    picture:{
        type:String,
        required:false,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
});

//Export the model
export default mongoose.models.Category || mongoose.model('Category', categorySchema);