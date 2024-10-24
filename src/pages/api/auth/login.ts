import type { APIContext } from "astro";
import { verify } from "@node-rs/argon2";
import { sql, lucia } from "@/auth";
import { z } from "astro:schema";

const signInSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
});

const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  passwordHash: z.string(),
});

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const { success, error, data } = await signInSchema.safeParseAsync({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!success)
    return Response.json(
      { errors: error.flatten().fieldErrors },
      { status: 400 },
    );

  console.log(data);

  const rows = await sql("SELECT * FROM AUTH_USER WHERE EMAIL = $1;", [
    data.email,
  ]);

  if (!rows[0])
    return Response.json({ message: "Invalid credentials" }, { status: 400 });

  const { data: userData, success: successUser } =
    await userSchema.safeParseAsync({
      id: rows[0].id,
      email: rows[0].email,
      passwordHash: rows[0].password_hash,
    });

  if (!successUser) return context.redirect("/auth/signin");

  if (!userData.passwordHash)
    return Response.json({ message: "Invalid user" }, { status: 400 });

  console.log("pasado el hash" + userData);

  const validPassword = await verify(userData.passwordHash, data.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  console.log(userData);

  if (!validPassword) {
    return Response.json("Incorrect email or password", {
      status: 400,
    });
  }

  const session = await lucia.createSession(userData.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return context.redirect("/");
}
