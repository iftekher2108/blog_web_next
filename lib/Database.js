import mongoose from "mongoose";
async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    } catch(e) {
        console.log('server error'+e )
    }
}

export default connect;