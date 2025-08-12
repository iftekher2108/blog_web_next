import { NextResponse } from "next/server";
import { loginSchema } from "./loginSchema";
import User from "@/model/User";
import { z } from "zod";
import Connection from "@/lib/Database";

export async function POST(req) {
await Connection();
  try {
    const formData = await req.formData();
    const data = loginSchema.parse(formData);

    // Find user by email (await needed!)
    const user = await User.findOne({ email: data.email }).exec();
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Compare hashed passwords
    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // TODO: Generate JWT or session cookie here
    const token = "fake-jwt-token";

    return NextResponse.json({ message: "Login successful", token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}