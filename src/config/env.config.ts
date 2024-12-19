import { z } from "astro:schema";
process.loadEnvFile();

const { REDIS_URL } = process.env;

console.log("REDIS_URL", REDIS_URL);

const EnvSchema = z.object({
  redisUrl: z.string(),
});

export const { redisUrl } = EnvSchema.parse({
  redisUrl: REDIS_URL,
});
