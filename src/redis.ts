import * as bluebird from "bluebird";
import * as redis from "redis";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379/0";
export const DEFAULT_REDIS_CLIENT = redis.createClient(REDIS_URL);
