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
  if (!user) {
    return Response.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const { content, articleId, documentId } = await context.request.json();
  const { success, error, data } = await bodySchema.safeParseAsync({
    content,
    articleId,
    documentId,
  });

  if (!success) {
    return Response.json(
      { errors: error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const [articlesDocument] = await sql(
      "SELECT * FROM ARTICLES WHERE DOCUMENT_ID = $1 AND PUBLISHED_AT IS NULL;",
      [data.documentId],
    );

    const comment = await sql(
      `INSERT INTO COMMENT(POST_ID, USER_ID, CONTENT)
       VALUES($1, $2, $3)
       RETURNING COMMENT.*, AUTH_USER.username, AUTH_USER.email, AUTH_USER.avatar`,
      [articlesDocument.id, user.id, data.content],
    );

    return Response.json(comment, { status: 200 });
  } catch (error) {
    console.error("Error saving comment:", error);
    return Response.json({ error: "Failed to save comment" }, { status: 500 });
  }
}
