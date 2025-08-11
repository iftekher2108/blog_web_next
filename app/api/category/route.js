import Connection from "@/lib/Database";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await Connection();
        return NextResponse.json({ message: "successful" });
    } catch (error) {
        console.error("server error", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}