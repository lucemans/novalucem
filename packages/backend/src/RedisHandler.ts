import { Logger } from "@lucemans/logger";
import {StreamClient} from "@lucemans/streams";
import chalk from "chalk";
import { RedisClient } from "redis";
import { createClient } from "redis";

export default class RedisHandler extends Logger {

    redis: RedisClient;
    client: StreamClient;

    constructor() {
        super(chalk.red('REDIS'));
        this.redis = createClient({host: "nl-redis.lvksh.svc.cluster.local"});
        this.client = new StreamClient(this.redis);
        this.client.stream('auth_get_account').subject.subscribe((a) => {
            this.info("auth_get_account " + a.toString());
            this.client.stream('auth_get_account').ready();
        });
        this.client.stream('auth_get_account').ready();
    }

}