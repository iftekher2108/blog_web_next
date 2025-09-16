import Connection from "@/lib/Database";
import User from "@/model/user";
import { NextResponse } from "next/server";

export async function GET() {
    await Connection();
    const users = await User.find();
    return NextResponse.json({
        users
    })
}

export async function POST(request) {
    try {
        await Connection();
        const formData = await request.formData();
        const { name, email, mobile, password } = Object.fromEntries(formData) ;
        //  const { name, email, mobile, password } = Object.fromEntries(formData);
        const user = await User.create({
            name,
            email,
            mobile,
            password
        })
        return NextResponse.json({msg: "user create Succesfully", user});
    } catch (error) {
        // return NextResponse.json({error})
        console.error("MongoDB connection error:", error);
        throw error;
    }


}

export async function DELETE(request) {
        const body = await request.json();
        const id = body.user_id
        await User.findByIdAndDelete(id)
   return NextResponse.json({msg:'user delete successfully'})
}