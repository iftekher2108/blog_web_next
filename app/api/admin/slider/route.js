import { NextResponse } from "next/server";
import Slider from "@/model/slider.model";
import Connection from "@/lib/Database";
import { sliderSchema } from "./sliderSchema";
import { FileUpload } from "@/helper/upload";
import { safeDelete } from "@/helper/helper";
import errorOrganize from "@/helper/zError";
import { z } from "zod";
export async function GET(req) {
    try {
        await Connection();
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        if (id) {
            const slider = await Slider.findById(id);
            return NextResponse.json({ slider }, { status: 200 });
        } else {
            const sliders = await Slider.find();
            return NextResponse.json({ sliders }, { status: 200 });
        }
    } catch (error) {
        console.error("server error", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    const formData = await req.formData();
    const body = Object.fromEntries(formData.entries());
    delete body.picture;
    try {
        await Connection();
        const data = sliderSchema.parse({ ...body })
        const picture = formData.get('picture');
        if (picture && picture.size > 0) {
            const picturePath = await FileUpload({ dirpath: 'slider', file: picture, file_name: 'slider' })
            data.picture = picturePath
        }
        const slider = await Slider.create(data);
        return NextResponse.json({ slider, message: "Slider Created Successfully" }, { status: 201 })

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
    const body = Object.fromEntries(formData.entries());
    delete body.picture

    try {
        await Connection();
        const id = req.nextUrl.searchParams.get("id");
        const data = { ...body }

        const slider = await Slider.findById(id);
        console.log(data)

        const picture = formData.get('picture');
        if (picture && picture.size > 0 && picture.name) {
            await safeDelete(slider.picture)
            const picturePath = await FileUpload({ dirpath: 'slider', file: picture, file_name: 'slider' })
            data.picture = picturePath
        }
        await Slider.findByIdAndUpdate(id, data);
        return NextResponse.json({ message: "Slider Updated Successfully" }, { status: 201 })

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
        const slider = await Slider.findByIdAndDelete(id)
        await safeDelete(slider.picture)
        await safeDelete(slider.banner)
        return NextResponse.json({ message: "Slider Deleted Successfully" },{status: 200});

    } catch (error) {
        console.error("server error", error)
    }
}

