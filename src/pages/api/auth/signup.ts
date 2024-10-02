import type { APIContext } from "astro";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import { db, lucia } from "@/auth";
import { z } from "astro:schema";

const signUpSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
  confirmPassword: z.string().min(8).trim()
})

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData()
  const { success, error, data } = await signUpSchema.safeParseAsync({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword')
  })

  if (!success) return Response.json({ erros: error.flatten().fieldErrors }, { status: 400 })

  if (data.password !== data.confirmPassword) {
    return Response.json({ message: "Incorrect passwords" }, { status: 400 })
  }

  const { rows } = await db.execute({
    sql: "SELECT EMAIL FROM USER WHERE EMAIL = ?;",
    args: [data.email]
  })

  if (rows[0]) return Response.json({ message: "Email alreadt exist" }, { status: 400 })

  const passwordHash = await hash(data.password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  });

  const userId = generateIdFromEntropySize(10);

  try {
    await db.execute({
      sql: "INSERT INTO USER(ID, EMAIL, PASSWORD_HASH) VALUES(?, ?, ?);",
      args: [userId, data.email, passwordHash]
    })
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return context.redirect("/")
  } catch (error) {
    return Response.json({ message: "error" }, { status: 500 })
  }
}