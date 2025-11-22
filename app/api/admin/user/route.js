import Connection from "@/lib/Database";
import User from "@/model/user.model";
import { NextResponse } from "next/server";
import { userSchema } from "./userSchema";
import { FileUpload } from "@/helper/upload";
import errorOrganize from "@/helper/zError";
import z from "zod";

export async function GET(req) {
    try {
        await Connection();
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        if (id) {
            const user = await User.findById(id);
            return NextResponse.json({ user }, { status: 200 })
        } else {
            const users = await User.find();
            return NextResponse.json({
                users
            })
        }

    } catch (error) {
        console.error("server error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


}

export async function POST(request) {
    try {
        await Connection();
        const formData = await request.formData();
        const body = Object.fromEntries(formData.entries())
        const data = userSchema.parse(body);

        const picture = formData.get('picture');
        if (picture) {
            const picturePath = await FileUpload({ dirpath: 'user', file: picture, file_name: "user" })
            data.picture = picturePath
        }

        const user = await User.create(data)
        return NextResponse.json({user, message: "User Created Succesfully", user });
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = errorOrganize(error.issues);
            return NextResponse.json({ errors }, { status: 400 });
        }
        console.error("MongoDB connection error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}

export async function DELETE(request) {
    const body = await request.json();
    const id = body.user_id
    await User.findByIdAndDelete(id)
    return NextResponse.json({ msg: 'user delete successfully' })
}