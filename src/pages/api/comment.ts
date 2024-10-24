import { sql } from "@/auth";
import type { APIContext } from "astro";
import { z } from "astro:schema";

const bodySchema = z.object({
  content: z.string(),
  articleId: z.number(),
  documentId: z.string(),
});

export async function POST(context: APIContext): Promise<Response> {
  const user = context.locals.user;
  if (!user)
    return Response.json({ message: "Unauthentication" }, { status: 401 });

  const { content, articleId, documentId } = await context.request.json();

  const { success, error, data } = await bodySchema.safeParseAsync({
    content,
    articleId,
    documentId,
  });
  if (!success)
    return Response.json(
      { erros: error.flatten().fieldErrors },
      { status: 400 },
    );

  try {
    const [articlesDocument] = await sql(
      "SELECT * FROM ARTICLES WHERE DOCUMENT_ID = $1 AND PUBLISHED_AT IS NULL;",
      [data.documentId],
    );

    await sql(
      "INSERT INTO COMMENT(POST_ID, USER_ID, CONTENT) VALUES($1, $2, $3);",
      [articlesDocument.id, user.id, data.content],
    );

    const [rows] = await sql(
      "SELECT COMMENT.*, AUTH_USER.username, AUTH_USER.email, AUTH_USER.avatar FROM COMMENT JOIN AUTH_USER ON COMMENT.user_id = AUTH_USER.id WHERE COMMENT.post_id = $1;",
      [articlesDocument.id],
    );
    return Response.json(rows, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
