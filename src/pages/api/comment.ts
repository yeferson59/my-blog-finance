import { db } from "@/auth";
import type { APIContext } from "astro";
import { z } from "astro:schema";

const bodySchema = z.object({
  content: z.string(),
  postSlug: z.string(),
  userId: z.string(),
})

export async function POST(context: APIContext): Promise<Response> {
  const user = context.locals.user
  if (!user) return Response.json({ message: "Unauthentication" }, { status: 401 })
  const { content, postSlug, userId } = await context.request.json()
  const { success, error, data } = await bodySchema.safeParseAsync({
    content,
    postSlug,
    userId
  })
  if (!success) return Response.json({ erros: error.flatten().fieldErrors }, { status: 400 })
  try {
    const { rows: post } = await db.execute({
      sql: "SELECT ID FROM POST WHERE SLUG = ?;",
      args: [data.postSlug]
    })

    const postId = z.number()

    const id = await postId.parseAsync(post[0].id)
    const commentId = crypto.randomUUID()

    await db.execute({
      sql: "INSERT INTO COMMENT(ID, POST_ID, USER_ID, CONTENT) VALUES(?, ?, ?, ?)",
      args: [commentId, id, data.userId, data.content]
    })

    const { rows } = await db.execute({
      sql: "SELECT COMMENT.*, USER.username, USER.email, USER.image FROM COMMENT JOIN USER ON COMMENT.user_id = USER.id WHERE COMMENT.id = ?;",
      args: [commentId]
    })
    return Response.json(rows[0], { status: 200 })
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}