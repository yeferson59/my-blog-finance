import { sql } from "@/auth";
import type { APIContext } from "astro";
import { z } from "astro:schema";

const bodySchema = z.object({
  content: z.string(),
  articleId: z.number(),
  userId: z.string(),
});

export async function POST(context: APIContext): Promise<Response> {
  const user = context.locals.user;
  if (!user)
    return Response.json({ message: "Unauthentication" }, { status: 401 });
  const { content, articleId, userId } = await context.request.json();
  const { success, error, data } = await bodySchema.safeParseAsync({
    content,
    articleId,
    userId,
  });
  if (!success)
    return Response.json(
      { erros: error.flatten().fieldErrors },
      { status: 400 }
    );

  try {
    await sql(
      "INSERT INTO COMMENT(POST_ID, USER_ID, CONTENT) VALUES($1, $2, $3)",
      [data.articleId, data.userId, data.content]
    );

    const rows = await sql(
      "SELECT COMMENT.*, AUTH_USER.username, AUTH_USER.email, AUTH_USER.avatar FROM COMMENT JOIN AUTH_USER ON COMMENT.user_id = AUTH_USER.id WHERE COMMENT.post_id = $1;",
      [data.articleId]
    );
    return Response.json(rows[0], { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
