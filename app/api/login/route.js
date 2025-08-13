import { NextResponse } from "next/server";
import { loginSchema } from "./loginSchema";
import User from "@/model/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { z } from "zod";
import Connection from "@/lib/Database";

export async function POST(req) {
  // const password = "parvezkhan123456"
  // const salt = bcrypt.genSaltSync(10);
  //       const hashedPassword = bcrypt.hashSync(password, salt);
  // console.log(hashedPassword)
  // return NextResponse.json({password: password })
  await Connection();
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData.entries());
    const data = loginSchema.parse(body);

    // Find user by email (await needed!)
    const user = await User.findOne({ email: data.email }).exec();
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Compare hashed passwords
    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email & passwords" }, { status: 401 });
    }

    // TODO: Generate JWT or session cookie here
     const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
    return NextResponse.json({ message: "Login successful", token, user });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}