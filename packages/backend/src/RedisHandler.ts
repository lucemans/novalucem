import redis, { RedisClient } from 'redis';

export default class RedisHandler {

    client: RedisClient;

    constructor() {
        this.client = redis.createClient("redis://nl-redis.lvksh.svc.cluster.local:6379")
        this.client.on('ready', () => {
            console.log('REDIS READY');
        });
    }
}
