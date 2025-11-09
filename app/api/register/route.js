import z from "zod";
import { registerSchema } from "./registerSchema";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import Connection from "@/lib/Database";
import User from "@/model/user.model";
import jwt from 'jsonwebtoken'
import errorOrganize from "@/helper/zError";


export async function POST(req) {
  await Connection(); // make sure DB is connected

  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData.entries());
    const data = registerSchema.parse(body);

    // Check if user exists
    const exists = await User.findOne({ email: data.email }).exec();
    if (exists) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user with hashed password
    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

    return NextResponse.json({ message: "User registered", token,  user }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = errorOrganize(error.issues)
      return NextResponse.json({ errors }, { status: 400 });
    }
    console.error("Register error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
