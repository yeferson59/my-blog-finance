import { db } from "@/auth";
import type { APIContext } from "astro";
import { z } from "astro:schema";

const postIdSchema = z.number()
const articleIdSchema = z.string()

export async function GET(context: APIContext): Promise<Response> {
  const { articleId } = context.params

  if (!articleId) return Response.json('undefined')

  const { success, error, data } = await articleIdSchema.safeParseAsync(articleId)

  if (!success) return Response.json({ errors: error.flatten().fieldErrors }, { status: 400 })

  const { rows: postId } = await db.execute({
    sql: "SELECT ID FROM POST WHERE SLUG = ?;",
    args: [data],
  });

  const post = await postIdSchema.parseAsync(postId[0].id);
  const { rows } = await db.execute({
    sql: "SELECT COMMENT.*, USER.username, USER.email, USER.image FROM COMMENT JOIN USER ON COMMENT.user_id = USER.id WHERE COMMENT.post_id = ?;",
    args: [post],
  });

  return Response.json(rows)
}