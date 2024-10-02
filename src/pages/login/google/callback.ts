import { google } from "@/lib/auth";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import type { APIContext } from "astro";
import { db, lucia } from "@/auth";
import { z } from "astro:schema";

const oauthAccountSchema = z.object({
  providerId: z.string(),
  providerUserId: z.string(),
  userId: z.string()
});

export async function GET(context: APIContext): Promise<Response> {
  const code = context.url.searchParams.get("code");
  const state = context.url.searchParams.get("state");
  const storedState = context.cookies.get("google_oauth_state")?.value ?? null;
  const storedCodeVerifier = context.cookies.get("google_oauth_code_verifier")?.value ?? null
  if (!code || !state || !storedState || state !== storedState || !storedCodeVerifier) {
    return new Response(null, { status: 400 });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
    const googleUserResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const googleUser: GoogleUser = await googleUserResponse.json();

    const { rows } = await db.execute({
      sql: "SELECT * FROM OAUTH_ACCOUNT WHERE (PROVIDER_ID = 'google') AND (PROVIDER_USER_ID = ?);",
      args: [googleUser.sub]
    });

    if (rows.length === 1) {
      const existingAccount = await oauthAccountSchema.parseAsync({
        providerId: rows[0].provider_id,
        providerUserId: rows[0].provider_user_id,
        userId: rows[0].user_id
      });

      const session = await lucia.createSession(existingAccount.userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      return context.redirect("/");
    }

    const userId = generateIdFromEntropySize(10);
    await db.batch([
      {
        sql: "INSERT INTO USER(ID, USERNAME, EMAIL, EMAIL_VERIFIED, IMAGE) VALUES(?, ?, ?, ?, ?);",
        args: [userId, googleUser.name, googleUser.email, googleUser.email_verified, googleUser.picture]
      },
      {
        sql: "INSERT INTO OAUTH_ACCOUNT(PROVIDER_ID, PROVIDER_USER_ID, USER_ID) VALUES(?, ?, ?);",
        args: ["google", googleUser.sub, userId]
      }
    ], "write");

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return context.redirect("/");
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, { status: 400 });
    }
    return new Response(null, { status: 500 });
  }
}

interface GoogleUser {
  sub: string;
  name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}