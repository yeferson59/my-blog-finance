import { z } from "astro:schema";

const { REDIS_URL } = import.meta.env;

const EnvSchema = z.object({
  redisUrl: z.string(),
});

export const { redisUrl } = EnvSchema.parse({
  redisUrl: REDIS_URL,
});
