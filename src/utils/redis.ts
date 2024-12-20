import { redisUrl } from "@/config/env.config";
import { createClient } from "redis";

// Configura Redis con conexión reutilizable
export const client = createClient({
  url: redisUrl,
});
