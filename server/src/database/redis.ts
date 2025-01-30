import { createClient } from 'redis';


export const redisClient = createClient();

export async function connectToRedis() {
  return redisClient
    .on("connect", () => console.log("Redis server connected"))
    .on("error", err => console.log(err))
    .connect();
}

