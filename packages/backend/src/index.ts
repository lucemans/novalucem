import RedisHandler from './RedisHandler';
import NetHandler from './NetHandler';

console.log('Setting up App');
export namespace Global {
    net: new NetHandler();
    redis: new RedisHandler();
}