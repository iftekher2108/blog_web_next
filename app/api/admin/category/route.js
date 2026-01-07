import Connection from "@/lib/Database";
import { NextResponse } from "next/server";
import { categorySchema } from "./categorySchema";
import Category from "@/model/category.model";
import slugify from "slugify";
import z from "zod";
import { FileUpload } from "@/helper/upload";
import errorOrganize from "@/helper/zError";
import { safeDelete } from "@/helper/helper";

export async function GET(req) {
    try {
        await Connection();
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        if (id) {
            const category = await Category.findById(id);
            return NextResponse.json({ category }, { status: 200 });
        } else {
            const categories = await Category.find();
            return NextResponse.json({ categories }, { status: 200 });
        }
    } catch (error) {
        console.error("server error", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    const formData = await req.formData();
    const body = Object.fromEntries([...formData.entries()].filter(([key]) => key !== 'picture' && key !== 'banner'));
    try {
        await Connection();
        const slug = slugify(body.name, { lower: true, strict: true });
        const data = categorySchema.parse({ ...body, slug })

        const picture = formData.get('picture');
        // if (!picture) {
        //     return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        // }
        if (picture) {
           const picturePath = await FileUpload({ dirpath: 'category', file: picture, file_name: 'cat' })
            data.picture = picturePath
        }

        const banner = formData.get('banner');
        // if (!banner) {
        //     return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        // }
        if (banner) {
           const bannerPath = await FileUpload({ dirpath: "category", file: banner, file_name: 'cat_banner' })
            data.banner = bannerPath
        }

        const category = await Category.create(data);
        return NextResponse.json({ category, message: "Category Created Successfully" }, { status: 201 })

    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = errorOrganize(error.issues);
            return NextResponse.json({ errors }, { status: 400 });
        }
        console.error("Server Error:", error);
        return NextResponse.json({ message: "server Error " + error }, { status: 500 });
    }
}

export async function PUT(req) {
    const formData = await req.formData();
    const body = Object.fromEntries([...formData.entries()].filter(([key]) => key !== 'picture' && key !== 'banner'));
    try {
        await Connection();
        const id = req.nextUrl.searchParams.get("id");
        const slug = slugify(body.name, { lower: true, strict: true });

        const data = categorySchema.parse({ ...body, slug })
        const category = await Category.findById(id);
        console.log(data)

        const picture = formData.get('picture');
        if (picture) {
           await safeDelete(category.picture)
           const picturePath = await FileUpload({ dirpath: 'category', file: picture, file_name: 'cat' })
            data.picture = picturePath
        }

        const banner = formData.get('banner');
        if (banner) {
           await safeDelete(category.banner)
           const bannerPath = await FileUpload({ dirpath: "category", file: banner, file_name: 'cat_banner' })
            data.banner = bannerPath
        }

        await Category.findByIdAndUpdate(id, data);
        return NextResponse.json({ category, message: "Category Updated Successfully" }, { status: 201 })

    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = errorOrganize(error.issues);
            return NextResponse.json({ errors }, { status: 400 });
        }
        console.error("Server Error:", error);
        return NextResponse.json({ message: "server Error " + error }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await Connection();
        const id = req.nextUrl.searchParams.get('id');
        const category = await Category.findByIdAndDelete(id)
        await safeDelete(category.picture)
        await safeDelete(category.banner)
        return NextResponse.json({ message: "Category Deleted Successfully" },{status: 200});

    } catch (error) {
        console.error("server error", error)
    }
}