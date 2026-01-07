import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }
    ],
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        enum: ['approved', 'pending', 'rejected'],
        default: 'pending',
    },
    deleted_at: {
        type: Date,
        default: null,
    },
    edited: [
        {
           type: String,
           dateTime: Date,
        }
       
    ]
},{
    timestamps: true
})
const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;

