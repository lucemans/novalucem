import express, { Request, Response } from 'express';
import buildUrl from 'build-url';
import fetch, { Headers } from 'node-fetch';
import JWT from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import AuthPayload from '../../common/AuthPayload';

const app = express();
const port = 8080;

const returnURL: { [key: string]: string } = {};

app.get('/', (req: Request, res: Response) => {
    res.send('AUTH OK');
});

app.get('/login', (req: Request, res: Response) => {
    if (req.query['callback']) {
        const funnyNum = nanoid();
        returnURL[funnyNum] = req.query['callback'].toString();
        res.redirect(buildUrl('https://github.com/login/oauth/authorize', {
            queryParams: {
                client_id: process.env.CLIENT_ID,
                redirect_uri: 'https://auth.lvk.sh/github-callback',
                login: '',
                state: funnyNum,
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
                    auth: JWT.sign({user: userPayload}, process.env.JWT_SECRET, { expiresIn: "1d", issuer: "nl-auth" })
                }
            })
        );
    } else {
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log('ONLINE');
});