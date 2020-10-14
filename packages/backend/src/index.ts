import RedisHandler from './RedisHandler';
import NetHandler from './NetHandler';
import DatabaseHandler from './DatabaseHandler';

console.log('Setting up App');
export namespace Global {
    net: new NetHandler();
    redis: new RedisHandler();
    data: new DatabaseHandler();
}