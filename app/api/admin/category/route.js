import Connection from "@/lib/Database";
import { NextResponse } from "next/server";
import { categorySchema } from "./categorySchema";
import Category from "@/model/category.model";
import slugify from "slugify";
import z from "zod";
import { FileUpload } from "@/helper/upload";

export async function GET(req) {
    try {
        await Connection();
        const categories = Category.find();
        return NextResponse.json({ categories },{ status: 200 });
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

        const picture = await formData.get('picture');
        if (!picture) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }
        if (picture) {
           await FileUpload({dirpath:'category', file:picture, file_name:'cat'})
            data.picture = "category/" + picture.name
        }

        const banner = await formData.get('banner');
        if (!banner) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }
        if (banner) {
           await FileUpload({dirpath:"category", file:banner, file_name:'cat_banner'})
            data.banner = "category/" + banner.name
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