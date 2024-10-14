import { sql } from "@/auth";
import type { APIContext } from "astro";
import { z } from "astro:schema";

const postIdSchema = z.number();
const articleIdSchema = z.number();

export async function GET(context: APIContext): Promise<Response> {
  const { articleId } = context.params;

  if (!articleId) return Response.json("undefined");

  const { success, error, data } = await articleIdSchema.safeParseAsync(
    parseInt(articleId)
  );

  if (!success)
    return Response.json(
      { errors: error.flatten().fieldErrors },
      { status: 400 }
    );

  const rows = await sql(
    "SELECT COMMENT.*, AUTH_USER.username, AUTH_USER.email, AUTH_USER.avatar FROM COMMENT JOIN AUTH_USER ON COMMENT.user_id = AUTH_USER.id WHERE COMMENT.post_id = $1;",
    [data]
  );

  return Response.json(rows);
}
