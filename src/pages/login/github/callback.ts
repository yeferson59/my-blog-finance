// pages/login/github/callback.ts
import { github } from "@/lib/auth";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";

import type { APIContext } from "astro";
import { sql, lucia } from "@/auth";
import { z } from "astro:schema";

const oauthAccountSchema = z.object({
  providerId: z.string(),
  providerUserId: z.string(),
  userId: z.string(),
});

export async function GET(context: APIContext): Promise<Response> {
  const code = context.url.searchParams.get("code");
  const state = context.url.searchParams.get("state");
  const storedState = context.cookies.get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();
    // Replace this with your own DB client.
    const rows = await sql(
      "SELECT * FROM OAUTH_ACCOUNT WHERE (PROVIDER_ID = 'github') AND (PROVIDER_USER_ID = $1);",
      [githubUser.id],
    );

    if (rows.length === 1) {
      const existingAccount = await oauthAccountSchema.parseAsync({
        providerId: rows[0].provider_id,
        providerUserId: rows[0].provider_user_id,
        userId: rows[0].user_id,
      });
      const session = await lucia.createSession(existingAccount.userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return context.redirect("/");
    }

    const userId = generateIdFromEntropySize(10); // 16 characters long

    await sql.transaction([
      sql("INSERT INTO AUTH_USER(ID, USERNAME, AVATAR) VALUES($1, $2, $3);", [
        userId,
        githubUser.login,
        githubUser.avatar_url,
      ]),
      sql(
        "INSERT INTO OAUTH_ACCOUNT(PROVIDER_ID, PROVIDER_USER_ID, USER_ID) VALUES($1, $2, $3);",
        ["github", githubUser.id, userId],
      ),
    ]);

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return context.redirect("/");
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GitHubUser {
  id: string;
  login: string;
  avatar_url: string;
}
