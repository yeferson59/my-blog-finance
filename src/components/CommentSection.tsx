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
    return new Response(JSON.stringify({ message: "Unauthenticated" }), {
      status: 401,
    });
  }

  try {
    const { content, articleId, documentId } = await context.request.json();

    // Validar el cuerpo del request
    const { success, error, data } = await bodySchema.safeParseAsync({
      content,
      articleId,
      documentId,
    });

    if (!success) {
      return new Response(
        JSON.stringify({ errors: error.flatten().fieldErrors }),
        { status: 400 },
      );
    }

    // Obtener el documento del artículo basado en el documentId
    const articlesDocument = await sql(
      "SELECT * FROM ARTICLES WHERE DOCUMENT_ID = $1 AND PUBLISHED_AT IS NULL;",
      [data.documentId],
    );

    // Verificar si el documento existe
    if (!articlesDocument || articlesDocument.length === 0) {
      return new Response(JSON.stringify({ message: "Article not found" }), {
        status: 404,
      });
    }

    // Insertar el comentario
    const insertedComment = await sql(
      `INSERT INTO COMMENT(POST_ID, USER_ID, CONTENT)
       VALUES($1, $2, $3)
       RETURNING *`,
      [articlesDocument[0].id, user.id, data.content],
    );

    // Obtener el comentario recién insertado con la información del usuario
    const [commentWithUser] = await sql(
      `SELECT COMMENT.*, AUTH_USER.username, AUTH_USER.email, AUTH_USER.avatar
       FROM COMMENT
       JOIN AUTH_USER ON COMMENT.user_id = AUTH_USER.id
       WHERE COMMENT.id = $1;`,
      [insertedComment[0].id],
    );

    return new Response(JSON.stringify(commentWithUser), { status: 200 });
  } catch (error) {
    console.error("Error al guardar el comentario:", error);
    return new Response(JSON.stringify({ message: "Error saving comment" }), {
      status: 500,
    });
  }
}
