import Connection from "@/lib/Database";
import User from "@/model/user.model";
import { NextResponse } from "next/server";
import { userSchema } from "./userSchema";
import { FileUpload } from "@/helper/upload";
import errorOrganize from "@/helper/zError";
import z from "zod";
import { safeDelete } from "@/helper/helper";

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
    const formData = await request.formData();
    const body = Object.fromEntries(formData.entries())
    try {
        await Connection();
        const data = userSchema.parse(body);

        const picture = formData.get('picture');
        if (picture) {
            const picturePath = await FileUpload({ dirpath: 'user', file: picture, file_name: "user" })
            data.picture = picturePath
        }

        const user = await User.create(data)
        return NextResponse.json({ user, message: "User Created Succesfully" }, { status: 201 });
    } catch (error) {
        await safeDelete(formData.get('picture'));
        if (error instanceof z.ZodError) {
            const errors = errorOrganize(error.issues);
            return NextResponse.json({ errors }, { status: 400 });
        }
        console.error("MongoDB connection error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}

export async function PUT(request) {
    const formData = await request.formData();
    const body = Object.fromEntries(formData.entries())
    try {
        await Connection();
        const id = request.nextUrl.searchParams.get("id");
        const data = userSchema.parse(body);
        const user = await User.findById(id);

        const picture = formData.get('picture');
        if (picture) {
            await safeDelete(user.picture);
            const picturePath = await FileUpload({ dirpath: 'user', file: picture, file_name: "user" })
            data.picture = picturePath
        }
        await User.findByIdAndUpdate(id, data);
        return NextResponse.json({ user, message: "User Updated Successfully" }, { status: 200 });
    } catch (error) {
        await safeDelete(formData.get('picture'));
        if (error instanceof z.ZodError) {
            const errors = errorOrganize(error.issues);
            return NextResponse.json({ errors }, { status: 400 });
        }
        console.error("MongoDB connection error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await Connection();
        const id = req.nextUrl.searchParams.get('id');
        const user = await User.findByIdAndDelete(id)
        await safeDelete(user.picture)
        return NextResponse.json({ message: "User Deleted Successfully" }, { status: 200 });

    } catch (error) {
        console.error("server error", error)
    }
}