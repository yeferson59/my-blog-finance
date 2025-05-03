import { sql } from "@/auth";
import type { APIContext } from "astro";
import { z } from "astro:schema";

const articleIdSchema = z.number();

export async function GET(context: APIContext): Promise<Response> {
  const { articleId } = context.params;
  const header = new Headers({
    "Cache-Control": "no-store", // Ensure fresh data for comments
  });

  if (!articleId)
    return new Response("articleId is undefined", { status: 400 });

  const { success, error, data } = await articleIdSchema.safeParseAsync(
    parseInt(articleId),
  );

  if (!success) {
    return new Response(
      JSON.stringify({ errors: error.flatten().fieldErrors }),
      { status: 400 },
    );
  }

  try {
    const articleData = await sql`SELECT * FROM ARTICLES WHERE ID = ${data};`;

    if (articleData.length === 0) {
      return new Response("Article not found", { status: 404 });
    }

    const documentId = articleData[0].document_id;

    const articlesDocument = await sql`
      SELECT * FROM ARTICLES WHERE DOCUMENT_ID = ${documentId} AND PUBLISHED_AT IS NULL;
    `;

    if (articlesDocument.length === 0) {
      return new Response("Document not found", { status: 404 });
    }

    const rows = await sql`
      SELECT COMMENT.*, AUTH_USER.username, AUTH_USER.email, AUTH_USER.avatar
      FROM COMMENT
      JOIN AUTH_USER ON COMMENT.user_id = AUTH_USER.id
      WHERE COMMENT.post_id = ${articlesDocument[0].id};
    `;

    return new Response(JSON.stringify(rows), { status: 200, headers: header });
  } catch (err) {
    console.error("Database error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
