import { headers } from "next/headers";
import Connection from "@/lib/Database";
import { NextResponse } from "next/server"
import Category from "@/model/category.model";
import slugify from "slugify";
import z from "zod";
import { FileUpload } from "@/helper/upload";
import errorOrganize from "@/helper/zError";
import { safeDelete } from "@/helper/helper";
import Blog from "@/model/blog.model";
import { blogSchema } from "./blogSchema";

export async function GET(req) {
    try {
        await Connection();
        const id = req.nextUrl.searchParams.get('id');
        const getCategories = await Category.find().where({ status: 'active' })
        if (id) {
            const blog = await Blog.findById(id);
            return NextResponse.json({ getCategories, blog }, { status: 200 });
        } else {
            const blogs = await Blog.find();
            return NextResponse.json({getCategories, blogs }, { status: 200 });
        }

    } catch (error) {
        return NextResponse.json({ message: "Network Server Error" }, { status: 500 })
    }
}

export async function POST(req) {
    const headersList = headers();
    const userHeader = headersList.get("x-user");
    const user = JSON.parse(userHeader); // ✅ back to object
    const formData = await req.formData();
    const body = Object.fromEntries(formData.entries())
    delete body.picture;
    delete body.banner;
    try {
        await Connection();
        const slug = slugify(body.title, { lower: true, strict: true });
        const data = blogSchema.parse({ ...body, slug, categories: body.categories?.split(',') })

        const picture = formData.get('picture');
        if(picture && picture.size > 0 && picture.name) {
            const picturePath = await FileUpload({ dirpath: 'blog', file: picture, file_name: "blog" });
            data.picture = picturePath
        }

        const banner = formData.get('banner');
        if(banner && banner.size > 0 && banner.name) {
            const bannerPath = await FileUpload({ dirpath: "blog", file: banner, file_name: "blog_banner" })
            data.banner = bannerPath
        }

        
        const blog = await Blog.create({...data, created_by: user._id });
        return NextResponse.json({ blog, message: "Blog Created Successfully" }, { status: 201})

    } catch (error) {
         if (error instanceof z.ZodError) {
            const errors = errorOrganize(error.issues);
            return NextResponse.json({ errors }, { status: 400 });
        }
        return NextResponse.json({ message: "Network Server Error: " + error }, { status: 500 });
    }
}