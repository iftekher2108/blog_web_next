import Connection from "@/lib/Database";
import { NextResponse } from "next/server";
import { categorySchema } from "./categorySchema";
import Category from "@/model/category.model";
import slugify from "slugify";
import path from "path"
import z from "zod";

export async function GET(req) {
    try {
        await Connection();
        return NextResponse.json({ message: "successful" });
    } catch (error) {
        console.error("server error", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const formData = await req.formData();
        const body = Object.fromEntries(formData.entries());
        const slug = slugify(body.name, { lower: true, strict: true });
        const data = categorySchema.parse({...body,slug})
        const file = await formData.get('picture')
        if (!file) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }
        if (file) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filePath = path.join(process.cwd(), "public/upload", file.name);
            await writeFile(filePath, buffer);
            data.picture = "upload/" + file.name
        }
        const category = await Category.create(data,{new: true});
        return NextResponse.json({ category, message: "Category Created Successfully"},{ status:201 })

    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = errorOrganize(error.issues);
            return NextResponse.json({ errors },{ status: 400 });
        }
        return NextResponse.json({message: "server Error"},{status: 500});
    }
}