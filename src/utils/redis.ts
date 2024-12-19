import { redisUrl } from "@/config/env.config";
import { createClient } from "redis";

export const client = createClient({
  url: redisUrl,
});
