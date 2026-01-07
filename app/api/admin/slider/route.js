import { NextResponse } from "next/server";
import Slider from "@/model/slider.model";
import Connection from "@/lib/Database";
import { sliderSchema } from "./sliderSchema";
import { FileUpload } from "@/helper/upload";
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

    try {
        await Connection();
        const data = sliderSchema.parse({ ...body, slug })
        const picture = formData.get('picture');
        if (picture) {
            const picturePath = await FileUpload({ dirpath: 'slider', file: picture, file_name: 'slider' })
            data.picture = picturePath
        }
        const slider = await Slider.create(data);
        return NextResponse.json({ slider, message: "Slider Created Successfully" }, { status: 201 })

    } catch (error) {
        await safeDelete(formData.get('picture'));
        if (error instanceof z.ZodError) {
            const errors = errorOrganize(error.issues);
            return NextResponse.json({ errors }, { status: 400 });
        }
        console.error("Server Error:", error);
        return NextResponse.json({ message: "server Error " + error }, { status: 500 });
    }
}
