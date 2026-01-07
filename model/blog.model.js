import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    ],
    banner: {
        type: String
    },
    picture: {
        type: String,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    content: {
        type: String,
    },
    keywords: { type: String },
    tags: { type: String },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }
    ],
    views_count: {
        type: Number,
        default: 0,
    },
    likes_count: {
        type: Number,
        default: 0,
    },
    shares_count: {
        type: Number,
        default: 0,
    },
    comments_count: {
        type: Number,
        default: 0,
    },
    related_posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
        },
    ],
    is_comment_enabled: {
        type: Boolean,
        default: true,
    },

    featured: {
        type: Boolean,
        default: false,
    },

    status: {
        type: String,
        enum: ["draft", "published", "archived", "pending", 'review', 'unpublished'],
        default: "draft",
    },

}, {
    timestamps: true
})

blogSchema.index({name:1, status:1, slug: 1 })

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;