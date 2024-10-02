// src/auth.ts
import { Lucia } from "lucia";
import { LibSQLAdapter } from "@lucia-auth/adapter-sqlite";
import { createClient } from "@libsql/client";

export const db = createClient({
  url: import.meta.env.TURSO_DATABASE_URL,
  authToken: import.meta.env.TURSO_AUTH_TOKEN
});

const adapter = new LibSQLAdapter(db, {
  user: "user",
  session: "session"
}); // your adapter

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: import.meta.env.PROD
    }
  },
  getUserAttributes: (attributes) => {
    return {
      // we don't need to expose the password hash!
      email: attributes.email,
      username: attributes.username,
      image: attributes.image,
      emailVerification: attributes.email_verified,
    };
  }
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
      username: string;
      image: string;
      email_verified: boolean;
    };
  }
}