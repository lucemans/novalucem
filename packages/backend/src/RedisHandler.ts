import { Logger } from "@lucemans/logger";
import {StreamClient} from "@lucemans/streams";
import chalk from "chalk";
import { RedisClient } from "redis";
import { createClient } from "redis";
import { MUser } from "./DatabaseHandler";

export default class RedisHandler extends Logger {

    redis: RedisClient;
    redis2: RedisClient;
    client: StreamClient;

    constructor() {
        super(chalk.red('REDIS'));
        this.redis = createClient({host: "nl-redis.lvksh.svc.cluster.local"});
        this.redis2 = createClient({host: "nl-redis.lvksh.svc.cluster.local"});
        this.redis.on('ready', () => {
            this.success('Alive (1/2)');
        });
        this.redis2.on('ready', () => {
            this.success('Alive (2/2)');
        });
        this.client = new StreamClient(this.redis);
        this.client.stream('auth_get_account').subject.subscribe(async (a) => {
            this.info("auth_get_account " + a.toString());

            const user = await MUser.findOne({username: a.toString()});

            this.redis2.publish('auth_get_account_' + a.toString(), JSON.stringify(user));

            this.client.stream('auth_get_account').ready();
        });
        this.client.stream('auth_get_account').ready();
    }

}