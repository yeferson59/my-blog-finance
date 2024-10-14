// src/auth.ts
import { Lucia } from "lucia";
import { NeonHTTPAdapter } from "@lucia-auth/adapter-postgresql";
import { neon } from "@neondatabase/serverless";

export const sql = neon(import.meta.env.NEON_URL);

const adapter = new NeonHTTPAdapter(sql, {
  user: "auth_user",
  session: "user_session",
}); // your adapter

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: import.meta.env.PROD,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // we don't need to expose the password hash!
      email: attributes.email,
      username: attributes.username,
      avatar: attributes.avatar,
      emailVerification: attributes.email_verified,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
      username: string;
      avatar: string;
      email_verified: boolean;
    };
  }
}
