import z from "zod";
import { registerSchema } from "./registerSchema";
import Connection from "@/lib/Database";
import User from "@/model/User";


export async function POST(req) {
  await Connection(); // make sure DB is connected

  try {
    const json = await req.json();
    const data = registerSchema.parse(json);

    // Check if user exists
    const exists = await User.findOne({ email: data.email }).exec();
    if (exists) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user with hashed password
    await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    console.error("Register error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
