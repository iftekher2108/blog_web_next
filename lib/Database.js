import mongoose from "mongoose";

async function Connection() {
    try {
       await mongoose.connect(process.env.MONGODB_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // bufferCommands: false
        });
        console.log("Database connection successful");
    } catch (e) {
        console.error("MongoDB connection error:", e);  // <-- this shows the real issue
        throw e; // Optional: rethrow if you want to handle it higher up
    }
}

export default Connection;