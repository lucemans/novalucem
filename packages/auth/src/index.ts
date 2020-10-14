import express, { Request, Response } from 'express';
import buildUrl from 'build-url';
import fetch, { Headers } from 'node-fetch';
import JWT from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { AuthPayload } from '@novalucem/common';
import chalk from 'chalk';
import { Logger } from '@lucemans/logger';
import { createClient as createRedisClient } from 'redis';
import { StreamClient } from '@lucemans/streams';
import { request } from 'http';

const app = express();
const port = 8080;

const redis = createRedisClient({host:"nl-redis.lvksh.svc.cluster.local"});
const streams = new StreamClient(redis);

const returnURL: { [key: string]: string } = {};
const authlog = new Logger(chalk.red('AUTH'));

app.get('/', (req: Request, res: Response) => {
    res.send('AUTH OK');
});

app.get('/healthz', (req: Request, res: Response) => {
    res.status(200);
});

app.get('/login', (req: Request, res: Response) => {
    if (req.query['callback']) {
        const funnyNum = nanoid();
        authlog.info('/login ' + funnyNum);
        returnURL[funnyNum] = req.query['callback'].toString();
        res.redirect('/user/?state='+funnyNum);
        return;
    }
    res.status(500);
    res.send();
});

app.get('/github-login', async (req: Request, res: Response) => {
    if (req.query['state']) {
        res.redirect(buildUrl('https://github.com/login/oauth/authorize', {
            queryParams: {
                client_id: process.env.CLIENT_ID,
                redirect_uri: 'https://auth.lvk.sh/github-callback',
                login: '',
                state: req.query['state'].toString(),
                scope: 'user:email'
            }
        }));
        return;
    }
    res.status(500);
    res.send();
});

app.get('/github-callback', async (req: Request, res: Response) => {
    if (req.query['code'] && req.query['state']) {
        const res2 = await fetch(buildUrl('https://github.com/login/oauth/access_token', {
            queryParams: {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code: req.query['code'].toString(),
                state: req.query['state'].toString()
            }
        }), {
            method: 'POST',
        });
        // access_token=d609721308daa60bbae21bc60210e242b349364a&scope=user%3Aemail&token_type=bearer
        const response = (await res2.text()).replace(/.*?=(.*?)&.*/g, '$1');

        if (response.length <= 5) {
            res.status(500);
            res.send('Something went wrong');
            return;
        }

        console.log('visiting with ' + response);

        const hd = new Headers();
        hd.set('Authorization', 'token ' + response);
        const res3 = await fetch('https://api.github.com/user', { headers: hd, method: 'GET' })
        const res4 = await res3.json();

        const userPayload: AuthPayload = {
            id: res4['id'],
            name: res4['name'],
            profile: res4['avatar_url'],
        }

        console.log(req.query['state']);

        res.redirect(
            buildUrl(returnURL[req.query['state'].toString()], {
                queryParams: {
                    auth: JWT.sign({ user: userPayload }, process.env.JWT_SECRET, { expiresIn: "1d", issuer: "nl-auth" })
                }
            })
        );
    } else if (req.query['error'] && req.query['state']) {
        res.send('Welp, it appears you didnt want to be logged in. You can go back to <a href=\"' + returnURL[req.query['state'].toString()] + '\">' + returnURL[req.query['state'].toString()] + '</a>');
    } else {
        res.sendStatus(500);
    }
});

app.use('/user/', express.static('front/dist'));

app.get('/add-account', (req: Request, res: Response) => {
    console.log('WIP');
    const username = req.query['username'].toString();
    streams.stream('auth_get_account').next(username);
});

app.listen(port, () => {
    authlog.success('Online');
});